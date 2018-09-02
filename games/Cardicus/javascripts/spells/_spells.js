let recycle = function(owner, spell) {
  if (spell.recycle) {
    owner = C.players[owner];
    owner.graveyard.push(U.clone(spell))
  } else {}
}
let sound = function(owner, spell) {
  if (owner != 'HumanPlayer') C.events.message(`<i>${owner} casts <b>${spell.name}</b>`)
  if (spell.music && spell.music.cast) {
    let audio = new Audio(spell.music.cast);
    audio.volume = 1 * volume.overall * volume.sfx
    audio.play()
  }
}
window.imports._spells = {
  10: function(board, card, target, display,owner, callback) {
    sound(owner, card)
    let base = 2;
    if (owner !== 'HumanPlayer') base = 1
    let loc = U.getXY(D.find('#_'+target[2]+'_D'))
    display.rangedAttack([0,0,base],[0,0,target[2]],{projectile: card.graphics.projectile, speed: 1.5, callback: function() {
      board.damagePhysSpell(card, target, owner)
      display.update()
      display.effects.explosion(loc, function() {
        callback()
      })
    }})
  },
  17: function(board, card, target, display,owner, callback) {
    sound(owner, card)
    board.damagePhysSpell(card, target, owner)
    let n = 10;
    for (let t = 0; t < n; t++) {
      if (t < n-1) {
        setTimeout(function(){
          document.querySelector('#_' + target[2] + '_D').style["box-shadow"] = '0px 0px 4px ' + t + 'px yellow'
        }, 30 * t)
      } else {
        setTimeout(function() {
          display.update()
          callback()
        }, 30*t)
      }
    }
  },
  18: function(board, card, target, display,owner, callback) {
    sound(owner, card)
    let loc = U.getXY(D.find('#_'+target[2]+'_D'))
    let base = 2;
    if (owner !== 'HumanPlayer') base = 1
    display.rangedAttack([0,0, base],[0,0,target[2]],{projectile: card.graphics.projectile, speed: 1.5, callback: function() {
      if (!target[3].type.includes('building')) {
        board.damagePhysSpell(card, target, owner)
      } else {
        board.damagePhysSpell(card, target, owner, {damage: Math.round(card.stats.damage * .5)})
      }
      setTimeout(function() {
        display.update()
        callback()
      }, 300)
    }})
  },
  19: function(board, card, display,owner, callback) {
    sound(owner, card)
    if (owner == 'HumanPlayer') {
      board.human.draw(2)
      if (card.recycle) {
        board.human.graveyard.push(U.clone(card))
      }
      display.update()
      callback();
    } else {
      board.ai.draw(2)
      if (card.recycle) {
        board.ai.graveyard.push(U.clone(card))
      }
      display.update()
      callback();
    }
  },
  23: function(board, card, target, display,owner, callback) {
    sound(owner, card)
    board.damagePhysSpell(card, target, owner)
    let unit = D.find('#_' + target[2] + '_D')
    unit.style.transition = "box-shadow 1.4s ease-out"
    U.reflow()
    unit.style['box-shadow'] = '0px 0px .4rem .4rem rgba(255,255,0,.8)'
    setTimeout(function() {
      display.update()
      callback()
    }, 1000)
  },
  43: function(board, card, target, display,owner, callback) {
    sound(owner, card)
    target[3].stats.MS += 1;
    let n = 30;
    recycle(owner, card)
    for (let t = 0; t < n; t++) {
      if (t < n-1) {
        setTimeout(function(){
          document.querySelector('#_' + target[2] + '_D').style["box-shadow"] = '0px 0px .2rem ' + t/10 + 'vh yellow'
        }, 30 * t)
      } else {
        setTimeout(function() {
          display.update()
          callback()
        }, 30*t)
      }
    }
  },
  45: function(board, card, target, display,owner, callback) {
    sound(owner, card)
    target[3].stats.MS -= 1;
    recycle(owner, card)
    let n = 10;
    for (let t = 0; t < n; t++) {
      if (t < n-1) {
        setTimeout(function(){
          document.querySelector('#_' + target[2] + '_D').style["box-shadow"] = '0px 0px 4px ' + t + 'px violet'
        }, 30 * t)
      } else {
        setTimeout(function() {
          display.update()
          callback()
        }, 30*t)
      }
    }
  },
  46: function(board, card, target, display,owner, callback) {
    sound(owner, card)
    let base = 2;
    if (owner !== 'HumanPlayer') base = 1
    display.rangedAttack([0,0, base],[0,0,target[2]],{projectile: card.graphics.projectile, speed: 1.5, callback: function() {
      setTimeout(function() {
        target[3].stats.HP = Math.ceil(target[3].stats.HP / 2);
        recycle(owner, card)
        display.update()
        callback()
      }, 245)
    }})


    /*let n = 10;
    for (let t = 0; t < n; t++) {
      if (t < n-1) {
        setTimeout(function(){
          document.querySelector('#_' + target[2] + '_D').style["box-shadow"] = '0px 0px 4px ' + t + 'px violet'
        }, 30 * t)
      } else {
        setTimeout(function() {
          display.update()
          callback()
        }, 30*t)
      }
    } */
  },
  47: function(board, card, target, display,owner, callback) {
    sound(owner, card)
    let loc = U.getXY(D.find('#_'+target[2]+'_D'))
    let base = 2;
    if (owner !== 'HumanPlayer') base = 1
    display.rangedAttack([0,0, base],[0,0,target[2]],{projectile: card.graphics.projectile, speed: 1.5, callback: function() {
      board.damagePhysSpell(card, target, owner)
      setTimeout(function() {
        display.update()
        callback()
      }, 300)
    }})
  },
  48: function(board, card, square, display,owner, callback) {
    sound(owner, card)
    let box = masterState[square.i].units[square.bot]
    let base = 2;
    if (owner !== 'HumanPlayer') base = 1
    for (let i = 0; i < box.length; i++) {
      let target = box[i]
      let loc = U.getXY(D.find('#_'+target[2]+'_D'))
      display.rangedAttack([0,0, base],[0,0,target[2]],{projectile: card.graphics.projectile, speed: 1.5, callback: function() {
        board.damagePhysSpell(card, target, owner, {recycle: false})
        setTimeout(function() {
          display.update()
          callback()
        }, 300)
      }})
    }
    recycle(owner, card)
  },
  59: function(board, card, square, display,owner, callback) {
    sound(owner, card)
    let box = masterState[square.i].units[square.bot]
    masterState[square.i].element[square.bot] = "water"
    let base = 2;
    if (owner !== 'HumanPlayer') base = 1
    for (let i = 0; i < box.length; i++) {
      let target = box[i]
      let loc = U.getXY(D.find('#_'+target[2]+'_D'))

      display.rangedAttack([0,0, base],[0,0,target[2]],{projectile: card.graphics.projectile, speed: 1.5, callback: function() {
        board.damagePhysSpell(card, target, owner)
        setTimeout(function() {
          display.update()
          display.updateElement(square.i, square.bot)
          callback()
        }, 300)
      }})
    }
    recycle(owner, card)
  },
  60: function(board, card, square, display,owner, callback) {
    sound(owner, card)
    let box = masterState[square.i].units[square.bot]
    let base = 2;
    if (owner !== 'HumanPlayer') base = 1
    for (let i = 0; i < box.length; i++) {
      let target = box[i]
      let loc = U.getXY(D.find('#_'+target[2]+'_D'))

      display.rangedAttack([0,0, base],[0,0,target[2]],{projectile: card.graphics.projectile, speed: 1.5, callback: function() {
        board.damagePhysSpell(card, target, owner)
        setTimeout(function() {
          display.update()
          callback()
        }, 300)
      }})
    }
    recycle(owner, card)
  },
  61: function(board, card, target, display,owner, callback) {
    sound(owner, card)
    if (target[3].stats.attack) target[3].stats.attack = Math.ceil(.5 * target[3].stats.attack);
    if (target[1].stats.attack) target[1].stats.attack = Math.ceil(.5 * target[1].stats.attack);
    let n = 30;
    for (let t = 0; t < n; t++) {
      if (t < n-1) {
        setTimeout(function(){
          document.querySelector('#_' + target[2] + '_D').style["box-shadow"] = '0px 0px .2rem ' + (30-t)/10 + 'vh #3c043c'
        }, 30 * t)
      } else {
        setTimeout(function() {
          display.update()
          callback()
        }, 30*t)
      }
    }
    recycle(owner, card)
  },
  75: function(board, card, display,owner, callback) {
    sound(owner, card)
    let player = C.players[owner]
    player.materia += 5
    recycle(owner, card)
    display.update()
    callback();
  },
  76: function(board, card, display,owner, callback) {
    sound(owner, card)
    let player = C.players[owner]
    player.plants += .25
    recycle(owner, card)
    display.update()
    callback();
  },
  77: function(board, card, display,owner, callback) {
    sound(owner, card)
    let player = C.players[owner]
    player.miners += .25
    recycle(owner, card)
    display.update()
    callback();
  },
  78: function(board, card, display,owner, callback) {
    sound(owner, card)
    let player = C.players[owner]
    player.materia += 5
    recycle(owner, card)
    display.update()
    callback();
  },
}
