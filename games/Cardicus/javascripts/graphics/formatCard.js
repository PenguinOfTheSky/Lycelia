
if (window.imports._graphics == undefined) window.imports._graphics = {}
window.imports._graphics.formatCard = function(unit, square) {
  'use strict'
  let [player, original, id, card] = unit
  let summoned;
  if (id === game.lastSummoned) {
    summoned = true;
    if (card.music && card.music.summon) {
      let audio = new Audio(card.music.summon)
      audio.play();
      let mute = function() {
        setTimeout(function() {
          if (!audio.ended) {
            audio.volume *=.85
            mute()
          }
        },200)
      }
      mute()
    }
  }
    let direction = (player == 'HumanPlayer' ? 1 : -1)
    let output = U.make('div', {
      style:`position:relative;display:inline-block;margin: 0 auto;${summoned ? 'transform: perspective(10rem) translate3d(' + direction * 5 + 'vh, ' + direction * 5 + 'vh, 5rem);transition: all .6s ease-out;' : ''}`,
      className: 'cardInPlay'
    });
    let scale = 1 - (square.length ** .7)/10
    let HP = U.createNode('div', {
      "title": 'Health',
      "style": `border-radius:.4rem;
        position: absolute;
        z-index:1;
        left: 50%;
        transform: translate(-50%,-50%);
        margin: 0 auto;
        padding: 0rem .07rem;
        line-height: .85;
        font-size:${scale}rem;
        background: linear-gradient(90deg, rgba(50,255,50,1) ` + card.stats.HP/original.stats.HP * 100 + "%, rgba(255,50,50,1))",
      "innerHTML" : card.stats.HP + "/" + original.stats.HP
    })
    let attack = U.createNode('div', {
      "style": `border-radius:50%;
        position: absolute;
        z-index:1;
        bottom:0%;
        display:flex;
        ${(player == 'HumanPlayer'? 'left: 60%' : 'right: 60%')};
        font-size:${scale}rem;
        padding: .1rem;
        background-color:rgb(255,55,55);`,
      "innerHTML" : `<img src="${(card.stats.range > 0) ? 'images/icons/bow&arrow.svg': 'images/icons/melee.png'}" style='height:${scale}rem;width:${scale}rem;'>`+ card.stats.attack
    })
    let info = U.createNode('div', {
      "style": `border-radius:50%;
        position: absolute;
        z-index:2;
        bottom:-4%;
        box-shadow:0px 0px .1rem white inset;
        cursor: auto;
        display:flex;
        padding:.2rem;
        ${(player == 'HumanPlayer'? 'left:-5%;' : 'right:-5%;')};
        font-size:${scale + .07}rem;
        color:white;
        background-color:rgb(0,0,0);`,
      "innerHTML" : `?`
    })
    let graphics;
		if (card.graphics.atRest != undefined) {
      graphics = U.createNode('img', {
        class: 'unitGraphic',
        "style": "position: relative;  width:72px;height:72px;max-width:100%;max-height:100%;",
        "src": card.graphics.atRest
      })
      if (card.level) {
        graphics.className += ' level' + card.level
      }
		}  else {
      graphics = document.createTextNode(card.graphics[0])
		}
    if (card.playOptions && unit[0] == 'HumanPlayer' && C.activeGame.playerTurn && C.activeGame.playerTurn.name == 'HumanPlayer') {
      let optionsHolder = U.make('div', {
        style: `display:none;position:absolute;z-index:2;top:90%;width:10rem;`
      })
      card.playOptions.forEach((ele, i)=> {
        let opt = U.make('div', {
          innerHTML: `${ele.text}`,
          className: 'btn playOption',
          style: ``
        })
        if (unit[3].summonSickness) {
          opt.title = 'Affected by Summon Sickness'
          opt.className += ' btnDisabled'
        } else {
          opt.onclick = function() {
            C.engine.input.upgrade({ele: ele,i: i, unit: unit, player: C.activeGame.players.HumanPlayer})
          }
        }

        optionsHolder.append(opt)
      })
      graphics.onmouseenter = function() {
        optionsHolder.style.display = 'inline-block'
      }
      optionsHolder.onmouseleave = function() {
        optionsHolder.style.display = 'none'
      }
      output.append(optionsHolder)
    }
    let hoverText = U.createNode('div', {
      "class" : "hoverCardInPlay",
      "style" : 'display: inline-block;color: black; max-width: 20vw;border-radius:25%; position: absolute;  z-index: 99; background-color: transparent;',
      "innerHTML" : U.longCardFormat(card)
    })
    let anim
    let infoTimer
    info.onmouseenter = function(event) {
      infoTimer = setTimeout(function() {
        anim = info.parentNode.parentNode.style.animation
        info.parentNode.parentNode.style.animation = ''
        let mouse = [event.clientX, event.clientY]
        let xy = mouse;
        let max = [window.innerWidth, window.innerHeight]
        hoverText.style.left = mouse[0] - 10 + 'px'
        hoverText.style.top = mouse[1] - 10 + 'px'
        if (xy[0] > max[0]/2 && xy[1] > max[1]/2) {
          hoverText.style.transform = 'translate(-100%, -100%)'
        } else {
          if (xy[0] > max[0]/2) {
          //  hoverText.style.right = max[0] - mouse[0] - 15 + 'px'
          hoverText.style.transform = 'translateX(-100%)'
          } else {
          //  hoverText.style.left = mouse[0] - 8 + 'px'
          }
          if (xy[1] > max[1]/2) {
          //  hoverText.style.bottom = max[1] - mouse[1] - 15 + 'px'
          hoverText.style.transform = 'translateY(-100%)'
          } else {
          //  hoverText.style.top = mouse[1] - 8 + 'px'
          }
        }

        D.find('#main_game').append(hoverText)
        setTimeout(function() {
          if (!D.find(`#_${id}_D`)) {
            info.parentNode.parentNode.style.animation = anim
            hoverText.remove()
          }
        },40)
      }, 130)
    }
    info.onmouseleave = function() {
      clearTimeout(infoTimer)
    }
    hoverText.onmouseleave = function() {
      info.parentNode.parentNode.style.animation = anim
      hoverText.remove();
    }
    //info.append(hoverText)
    output.append(HP,info, graphics)
    if (card.stats.attack !== false) output.append(attack)

    return output;
  }
