'use strict'
if (window.imports._graphics == undefined) window.imports._graphics = {}
window.imports._graphics[0] = function (player) {
	C.data.displayReadout = []
	this.level = 0;
  this.target = player;
  let friendly = player.name

  let formatSquare = function(square, narrow) {
    let output = document.createDocumentFragment();
    for (let i = 0; i < square.length; i++) {
      let owner = (square[i][0] == friendly ? 'mine' : 'not_mine');
			let item = U.createNode('div', {
				"class": '_' + square[i][0] + "_D unit " + owner,
				"id": "_" + square[i][2] + "_D",
				style: `${(!narrow) && square.length > 2 ? "width: 40%;" : "width: 90%;"}display:inline-flex;${square.length > 4 ? "height:" + (100/(Math.ceil(square.length))) + '%' : ""}; justify-content:center; position: relative; border-radius:25%; `
			})
			if (square[i][3].stats.special.Flying) {
				item.style.setProperty("filter", "drop-shadow(.05rem .05rem .2rem #222)");
				item.style.animation = "flyHover 2s ease-in-out infinite alternate"

			}
			item.appendChild(imports._graphics.formatCard(square[i], square, player))
      output.appendChild(item);
    }
    return output;
  }
  function costDisplay (target) {
    let cost = eval(target)
    let output = ``;
    output += `<span style='background-color: #020202; border-radius: 20%;'> <span style='color:white'>Cost:</span>
			<span style='color:rgb(50, 230, 150)'>${cost.materia ? cost.materia : 0}</span>
			<span style='color: rgb(220, 220, 20)'>${cost.energy ? cost.energy : 0}</span>
			<span style='color: rgb(255, 80, 235)'>${cost.souls ? cost.souls : 0}</span>
    </span>`
    return output;
  }
	this.dying = function(unit) {
		if (unit[3].music && unit[3].music.death) {
			let audio = new Audio(unit[3].music.death)
			audio.play()
		}
		let id = unit[2]
		D.find(`#_${id}_D`).style.filter = `invert(100%)`
		D.find(`#_${id}_D`).style.transition = '.35s all linear'
		U.reflow()
		D.find(`#_${id}_D`).style.transform = ' scale(.6) rotateX(360deg)'
	}
  //variables should be strings.
  this.injured = function(defender, damage) {
		let id = defender[2]
		let hp = defender[3].stats.HP
		if (damage > hp * .25) {
			D.find(`#_${id}_D`).style.filter = `invert(100%)`
		}
		if (damage > hp * .5) {
			if (!defender[3].type.includes('building')) {
				C.display.effects.bloodspray(U.getXY(D.find(`#_${id}_D`)))
			} else {
				C.display.effects.explosion(U.getXY(D.find(`#_${id}_D`)))
			}

		}
		D.find(`#_${id}_D`).style.transition = 'all .1s linear'
		U.reflow()
		let skew = Math.log(damage) * 8
		D.find(`#_${id}_D`).style.transform = `skew(${skew}deg, 0deg)`
		setTimeout(function() {
			D.find(`#_${id}_D`).style.transform = `skew(0deg, ${skew}deg)`
		}, 100)
		setTimeout(function() {
			D.find(`#_${id}_D`).style.transform = 'skew(0deg, 0deg)'
		}, 200)
		let loc = U.getXY(document.querySelector('#_'+defender[2]+'_D'))
		let bullet = U.createNode('span', {
			"style": "color: red;font-weight:700;font-size:1.9rem; position: absolute;width:40px;height:30px; z-index: 5; left: "+loc[0] + "px;top: "+loc[1]+"px;",
			"innerHTML": `-${damage}`
		})
		document.body.appendChild(bullet)
		for (let i = 2; i < 7; i++) {
			setTimeout(function() {
				bullet.style.opacity = 1 - i/10;
			}, i * 200)
		}
		setTimeout(function() {
			document.body.removeChild(bullet)
		}, 1000)
  }
	this.hint = imports._graphics.hint
  this.hand = function() {
    let checkCastType = function (input, id, optionsNumber) {
      let word = input.match(/\w*/)
      let checkingNow = function() {
        if (word == "Summon") {return costDisplay('player.hand[' + id + '].cost')}
        else if (word == "Evolve") {return costDisplay('player.hand[' + id + '].evolveCost')}
        else if (word == "Build") {return costDisplay('player.hand[' + id + '].cost')}
        else if (word == "Cast") {return costDisplay('player.hand[' + id + '].cost')}
        else {console.log('fixTypeButton')}
      }
      return `<button class = '${word} btn' style='font-size:.9rem;' data-text ="${input}" data-optionsNumber="${optionsNumber}" id = '${id}_${word}'>${input}<br>${checkingNow()}</button><br>`
    }
    let output = ``;
		let testOutput = ``
    for (let x = 0; x < player.hand.length; x++) {
        let options = []

      for (let i = 0; i < player.hand[x].options.length; i++) {
        options.push(checkCastType(player.hand[x].options[i], x, i))
      }
			let degrees = (player.hand.length * 3) ** .5
			let middle = (player.hand.length-1)/2
			let position = x - middle;
			let rotateZ = ((position * degrees)) + 'deg'
			testOutput += `<div class = 'handCard' id = '${x}_Hover' style='transform: rotateZ(${rotateZ});'>`
			testOutput += U.longCardFormat(player.hand[x], 'niceCard', 1)
			testOutput += `<div class = 'cardOptions' >${options.join('')}</div></div>`
      output += `<div class = 'handCard' id = '${x}_Hover' style=''>
        ${player.hand[x].name}`
				if (player.hand[x].graphics.handCard != undefined) {
					output += `<img src = "${player.hand[x].graphics.handCard}" >`
				}
				output += `<br>${options.join('')}</div>`
    }
    return testOutput;
  }
  this.endPlayerTurn = function(a) {
		if (a != 'HumanPlayer') D.find('#endTurn').style.display = 'inline-block'
		D.find('#surrender').style.display = 'inline-block'
    C.data.displayReadout.unshift(`<p>${a}'s turn ends</p>`)
  }
  this.resources = function() {
    let resourceArray = player.checkResources();
		let resourceNames = ['<img src="images/icons/diamond.svg"> ', '<img src="images/icons/lightning.svg"> ', '<img src="images/icons/spirit.svg"> ']
		let resourceColors = ['rgba(50, 230, 150, 1)', 'rgba(220, 220, 20, 1)', 'rgb(255, 80, 235)']
		let resources = document.createDocumentFragment();
		let resourcesContainer = U.make('div', {
			style: "display: flex; background-color: #020202",
			title: 'Materia / Energy / Souls'
		})
		resourcesContainer.id = 'resourceContainer'
		for (let i = 0; i < 3; i++) {
			resourcesContainer.innerHTML += `<flex style='color:${resourceColors[i]};'>${resourceNames[i]}${resourceArray[i]}</flex>`
		}
		resources.appendChild(resourcesContainer)
		let libState = document.createElement('div')
		libState.classList.add('resources')
		libState.id = 'cardResources'
		libState.innerHTML = `<div id='graveDeckUI'><flex><img src='images/icons/grave.svg'>${player.graveyard.length}</flex>
		<flex><img src='images/icons/cards.svg'> ${player.deck.length}</div></flex>`
			resources.appendChild(libState)
    return resources;
  }
	let switchOwnership = function(square, b, bot) {
		if (bot) b = 'B' + b
		switch (square) {
			case 'neutral' :
				document.querySelector('#board' + b).style["box-shadow"] = "0px 0px 2px 2px #ffd900 inset, 0px 0px .25vh .15vh #ffd900 inset"
				break;
			case friendly :
				document.querySelector('#board' + b).style["box-shadow"] = "0px 0px 2px 2px #0F2 inset,0px 0px .25vh .15vh #0F2 inset"
				break;
			case 'contested' :
				document.querySelector('#board' + b).style["box-shadow"] = "0px 0px 2px 2px blue inset, 0px 0px .25vh .15vh blue inset"
				break;
			default :
				document.querySelector('#board' + b).style["box-shadow"] = "0px 0px 2px 2px #F00 inset, 0px 0px .25vh .15vh #F00 inset"
		}
	}
	this.updateElement = function(i, bot) {
		D.find('#board' + (bot? 'B' : '') + i).style['background-image'] = `url('./images/land/${masterState[i].element[bot]}.jpg')`
	}
  this.update = function() {
		this.updateBoard()
		this.updateHand()
  }
	this.updateBoard = function() {
    for (let b = 0; b <= 10; b++) {
			let narrow;
			if (b <=1 || b >= 9) narrow = true
			D.find('#board' + b).onclick = null
			document.querySelector('#board' + b).innerHTML = '';
			document.querySelector('#board' + b).appendChild(formatSquare(masterState[b].units[0], narrow))
			switchOwnership(masterState[b].ownership[0], b)
			if (b >= 2 && b <= 8) {
				D.find('#boardB' + b).onclick = null
				document.querySelector('#boardB' + b).innerHTML = '';
				document.querySelector('#boardB' + b).appendChild(formatSquare(masterState[b].units[1]))
				switchOwnership(masterState[b].ownership[1], b, 1)
			}
    }
		if (game.lastSummoned) {
			U.reflow()
			D.find(`#_${game.lastSummoned}_D .cardInPlay`).style.transform = 'none'
			game.lastSummoned = ''
		}
  }
	this.updateHand = function() {
		this.updateCards()
		this.updateResources()
	}
	this.updateCards = function() {
		$('#UIoutput').html(this.hand())
		D.findAll('.handCard').forEach(ele=> ele.style.width = 98/player.hand.length + '%')
	}
	this.updateResources = function() {
		$('#UIresources').html(this.resources())
	}
  this.moveAnim = function(opts) {
  	opts.unit.querySelector('.unitGraphic').style.border = '3px solid blue';
		opts.unit.style.transition = '.6s all ease-in-out'
		U.reflow()
		opts.unit.style.transform = `translate(${opts.diff.x}px, ${opts.diff.y}px)`
  }
	this.topOwnership = function(name) {
		let loc = U.getXY(D.find('#board5'))
		let info = U.make('span', {
			innerHTML: "<b>+1</b>",
			style: `color: yellow; position:absolute; left:${loc[0]*.96}px; top:${loc[1]}px; z-index:10;transition: all 2.7s ease-in; font-size:2.5rem; text-shadow:1px 1px .1rem black;`
		})
		D.find('#main_game').append(info)
		U.reflow()
		info.style.opacity='.2'
		if (name == "HumanPlayer") info.style.transform = 'translate(-10vw,0)'
		else info.style.transform = 'translate(10vw,0)'
		setTimeout(function(){
			info.remove()
		},2700)
	}
	this.botOwnership = function(name) {
		let loc = U.getXY(D.find('#boardB5'))
		let info = U.make('span', {
			innerHTML: "<b style='color:green;'>+1</b>",
			style: `position:absolute; left:${loc[0]*.91}px; top:${loc[1]}px; z-index:10;transition: all 2.7s ease-in; font-size:2.5rem;text-shadow:1px 1px .1rem black;`
		})
		D.find('#main_game').append(info)
		U.reflow()
		info.style.opacity='.2'
		if (name == "HumanPlayer") info.style.transform = 'translate(-10vw,0)'
		else info.style.transform = 'translate(10vw,0)'
		setTimeout(function(){
			info.remove()
		},2700)
	}
	this.highlight = function(node) {
		if (node.querySelector('.unitGraphic')) {
			node.querySelector('.unitGraphic').style.animation = "castOption 5s linear infinite alternate"
		} else {
			node.style.animation = "castOption 5s linear infinite alternate"
		}
	}
	this.miss = function(defender) {
		let loc = U.getXY(document.querySelector('#_'+defender[2]+'_D'))
		let bullet = U.createNode('span', {
			"style": "color: red;font-size:1.1rem; position: absolute;width:40px;height:30px; z-index: 5; left: "+loc[0] + "px;top: "+loc[1]+"px;",
			"innerHTML": "<b>Dodged!</b>"
		})
		document.body.appendChild(bullet)
		setTimeout(function() {
			document.body.removeChild(bullet)
		}, 320)
	}
	this.resist = function(defender) {
		let loc = U.getXY(document.querySelector('#_'+defender[2]+'_D'))
		let bullet = U.createNode('span', {
			"style": "color: red;font-size:1.1rem; position: absolute;width:40px;height:30px; z-index: 5; left: "+loc[0] + "px;top: "+loc[1]+"px;",
			"innerHTML": "<b>Resisted!</b>"
		})
		document.body.appendChild(bullet)
		setTimeout(function() {
			document.body.removeChild(bullet)
		}, 320)
	}
	this.meleeAttack = function(attacker, defender) {
		D.find(`#_${attacker[2]}_D`).style.animation = ''
		D.find(`#_${defender[2]}_D`).style.animation = ''
		let loc1 = U.getXY(D.find(`#_${attacker[2]}_D`))
		let loc2 = U.getXY(D.find(`#_${defender[2]}_D`))
		let locDiff = [loc2[0] - loc1[0], loc2[1] - loc1[1]]
		let attUnit = D.find(`#_${attacker[2]}_D`)
		let defUnit = D.find(`#_${defender[2]}_D`)
		attUnit.style.transition = 'all .3s ease-in-out'
		U.reflow()
		let defWidth = defUnit.clientWidth *.8
		attUnit.style.transform = `scale(1.1) translate(${locDiff[0] *.75}px, ${locDiff[1] *.75}px)`
		setTimeout(function() {
			attUnit.style.transform = 'scale(1) translate(0)'
		}, 300)
	}
	this.effects = {
		generateResource: function(type, amount, id) {
			let color;
			if (type == 'materia') color = 'green'
			else if (type =='energy') color = 'yellow'
			else color = 'rgb(255, 80, 235)'
			let loc = U.getXY(D.find(`#_${id}_D`))
			let info = U.make('span', {
				innerHTML: `<b>+${amount}</b>`,
				style: `color: ${color}; position:absolute; left:${loc[0]*.96}px; top:${loc[1]}px; z-index:10;transition: all 2.7s ease-in; font-size:1.25rem; text-shadow:1px 1px .1rem black;`
			})
			D.find('#main_game').append(info)
			U.reflow()
			info.style.opacity='.2'
			info.style.transform = 'translate(0,5vh)'
			setTimeout(function(){
				info.remove()
			},2700)
			C.display.updateResources()
		},
		regen: function({id, change}, callback) {
			let loc = U.getXY(D.find('#_'+id+'_D'))
			let img = U.createNode('div', {
				"style": "display:inline-block;transition: all .35s linear; color: gold;font-weight:700;font-size:1.2rem; position: absolute; z-index: 5; left: "+loc[0] + "px;top: "+loc[1] +"px;",
				"innerHTML": `+${change}`
			})
			D.find('#main_game').append(img)
			U.reflow();
			img.style.transform= `scale(2)`
			setTimeout(function(img) {
				img.style.transform= `scale(.4)`
			}, 250, img)
			setTimeout(function(){
				img.remove()
				if (callback) callback();
			},600)
		},
		explosion: function(loc, callback) {
			let img = U.createNode('img', {
				src: 'images/effects/explosion.svg',
				style: `left: ${loc[0]}px; top: ${loc[1]}px; width: 2vw; height: 2vw;position:absolute; z-index:5000; transition: transform .2s linear;`
			})
			D.find('#main_game').append(img)
			U.reflow()
			img.style.transform = `rotate(360deg) scale(4)`
			setTimeout(function(){
				img.remove()
				if (callback) callback();
			},250)
		},
		bloodspray: function(loc, callback) {
			let img = U.createNode('img', {
				src: 'images/effects/blood.svg',
				style: `left: ${loc[0]}px; top: ${loc[1]}px; width: 2vw; height: 2vw;position:absolute; z-index:5000; transition: transform .2s linear;`
			})
			D.find('#main_game').append(img)
			U.reflow()
			img.style.transform = ` scale(4)`
			setTimeout(function(){
				img.remove()
				if (callback) callback();
			},250)
		}
	}

	this.rangedAttack = function(attacker, defender, opts) {
		if (!opts) opts = {}
		let loc1 = U.getXY(document.querySelector('#_'+attacker[2]+'_D'))
		let loc2 = U.getXY(document.querySelector('#_'+defender[2]+'_D'))
		let locDiff = [loc2[0] - loc1[0], loc2[1] - loc1[1]]
		let rotation = Math.atan2(locDiff[1], locDiff[0]) + 1.57
		if (!opts.speed) opts.speed = 1;
		if (!opts.projectile) {

			if (attacker[1].graphics) opts.projectile = attacker[1].graphics.projectile
		}
		//double bezier to produce arc?
		let bullet = U.createNode('span', {
			style: `
				${opts.projectile ? "background-image: url('"+ opts.projectile + "');": "background-color: purple;"};
				transition: transform ${.4 * opts.speed}s linear;
				transform: rotate(${rotation}rad);
				background-size:100% 100%;
				width:3rem;height:3rem; min-width:3vh;min-height:3vh;
				border-radius: 50%;
				position: absolute;z-index: 5;
				left: `+loc1[0] + "px;top: "+loc1[1]+"px;"
		})
		document.body.appendChild(bullet)
		U.reflow()
		bullet.style.transform = ` translate(${locDiff[0]}px,${locDiff[1]}px) rotate(${rotation}rad)`
		setTimeout(function() {
			bullet.remove()
			if (opts.callback) opts.callback();
		},400 * opts.speed)
	}
}
