imports._game.Table = function (display, player1, player2) {
  'use strict'
  let checkOwnership = window.imports._game.Ownership.checkAllOwnership
  let changeOwnership = window.imports._game.Ownership.checkOneOwnership
  let movement = window.imports._game.movement
  let allAttack = window.imports._game.allAttack
  this.human = player1
  this.ai = player2
  this.spellQ = []
//error with those moving > 1 space ownership reset
  game.counter = 1;

let setOwnership = function(i, owner,bot) {
  masterState[i].ownership[bot] = owner
}
  let options = {
    0: 'grass',
    1: 'water',
    2: 'stone',
    3: 'forest'
  }
  for (let i = 0; i <= 10; i++) {
    masterState.push({"units": [[],[]],"ownership": ['neutral','neutral'], "element": [], weather: []})
    if (i <=2) {
      masterState[i].ownership = ['HumanPlayer','HumanPlayer']
    } else if (i >= 8) {
      masterState[i].ownership = [game.AI.name,game.AI.name]
    }
    if (i > 0 && i < 10) {
      for (let bot = 0; bot <=1; bot++) {
        if (bot && (i === 1 || i === 9)) break;
        if (game.elements) {
          masterState[i].element[bot] = (options[game.elements[i][bot]])
        } else {
          if (game.landPref && Math.random() > .4) {
            if (typeof(game.landPref) == 'object') {
              masterState[i].element[bot] = game.landPref[Math.floor(Math.random()*game.landPref.length)]
            } else {
              masterState[i].element[bot] = game.landPref
            }
          } else {
            masterState[i].element[bot] = options[Math.floor(Math.random() * 4)]
            if (i > 1) {
              if (i == 2 && bot) {
                if (masterState[i].element[bot] != masterState[i-1].element[0]) {
                  masterState[i].element[bot] = options[Math.floor(Math.random() * 4)]
                }
              } else {
                if (masterState[i].element[bot] != masterState[i-1].element[bot]) {
                  masterState[i].element[bot] = options[Math.floor(Math.random() * 4)]
                }
              }
            }
          }
        }
        masterState[i].weather[bot] = 'normal'


        D.find('#board' + (bot? 'B' : '') + i).style['background-image'] = `url('./images/land/${masterState[i].element[bot]}.jpg')`
      }
    }
  }
  //for lasting spells only?
  this.spells = []
  this.gameStart = function () {

  }

    this.damagePhysSpell = function(spell, defender1, owner, opts = {}) {
      let damage = opts.damage
      window._game = {}
      _game.miss = false;
      _game.injured = false;
      _game.dead = false;
      let attacker = spell;
      let defender = defender1[3];
      let attackerMod;
        eval(' attackerMod = ' + attacker.modifier)
      let defenderMod;
      eval(' defenderMod = ' + defender.modifier)
      let c = function (damage) {
        if (damage >= 0) {
          if (!attacker.music || !attacker.music.onStrike) {
            let audio = new Audio('audio/effects/impact.mp3')
            let n = damage/defender1[3].stats.HP
            if (n < 1) n = n**.5
            else n = 1
            audio.volume = n * .85
            audio.play()
          }
          display.injured(defender1, damage)
          defender.stats.HP = defender.stats.HP - damage;
        } else {
          if (spell.beyondMax) {
            defender.stats.HP = defender.stats.HP - damage;
          } else {
            if (defender.stats.HP > defender1[1].stats.HP){}
            else {
              if (damage < defender.stats.HP - defender1[1].stats.HP) damage = defender.stats.HP - defender1[1].stats.HP
              defender.stats.HP = defender.stats.HP - damage;
            }
          }
          display.effects.regen({id: defender1[2], change: -damage})
        }
        if (defender.stats.HP <= 0) {
          defenderMod(['onDeath', onDeath, defender1[2]])
          display.dying(defender1)
        }
      }
      let spAttack = [];

      //iffy.
      if (!damage) damage = attackerMod(['onCast', function(dmg) {return dmg}, attacker.stats.damage])
      spAttack[0] = defenderMod(['onStruck', function(dmg) {return dmg}, damage])
      if (spAttack[0]) {
        spAttack[1] =defenderMod(['onDamaged', function(dmg) {return dmg}, spAttack[0]])
      } else {
        display.miss(defender1)
      }
      if (spAttack[1]) c(spAttack[1])
    //  let endPulse = attackerMod(['onCasted', a, ['onStruck', b, ['onDamaged', c, (attacker.stats.damage)]], attacker.stats.damage])
        //alternative method of stuff endpulse();
      if (spell.recycle && opts.recycle !== false) {
        if (player1.name == owner) owner = player1
        else if (player2.name == owner) owner = player2
        else console.log('errorOwner');
        owner.graveyard.push(U.clone(spell))
      } else {}
    }

  let statusMod = function(a) {
    a[1](a[2]);
  }
  this.changeStatus = function(a) {
    statusMod = eval(a);
  }
  let onStart = function(attacker) {
    //update to allow for state effects on offTurn later
    let state_beta = masterState.slice(0);
    let direction = display.target.name;
    (direction == attacker ? direction = 1 : direction = -1)
    let startAction = function(attacker1, opts) {
      let attacker = attacker1[3];
      let oldHP = attacker1[3].stats.HP
      let attackerMod;
        eval(' attackerMod = ' + attacker.modifier)
      let endPulse = attackerMod(['onStart', function(){}, attacker1, {attacker: attacker1, x: opts.x, bot: opts.bot}])
      if (endPulse === 'regenerate') {
        display.effects.regen({id: attacker1[2], change: attacker.stats.HP - oldHP}, function(){})
      }
    }
    let temporaryFun = function(bot) {
      //end of turn actions from units
      for (let x = 0; x < state_beta.length; x++) {
        if (state_beta[x].units[bot].length == 0 || (masterState[x].ownership[bot] != attacker && masterState[x].ownership[bot] != 'contested')) {continue;}
        for (let i = 0; i < state_beta[x].units[bot].length; i++) {
          if (state_beta[x].units[bot][i][0] == attacker) {
              startAction(state_beta[x].units[bot][i], {x: x, bot: bot});
          }
        }
      }
    }
    temporaryFun(0)
    temporaryFun(1)
    $('#testStep').trigger('change')
  }
  let onEnd = function(attacker) {
    //update to allow for state effects on offTurn later
    let state_beta = masterState.slice(0);
    let direction = display.target.name;
    (direction == attacker ? direction = 1 : direction = -1)
    let endAction = function(attacker1) {
      let attacker = attacker1[3];
      let attackerMod;
        eval(' attackerMod = ' + attacker.modifier)
      let currentPlayer
      if (attacker1[0] == 'HumanPlayer') {currentPlayer = player1}
      else {currentPlayer = player2}
      let endPulse = attackerMod(['onEnd', function(){}, {unit: attacker1, player: currentPlayer, display: display}])
      if (!endPulse) {
        //add grapics delay
      }
    }
    let temporaryFun = function(bot) {
      //end of turn actions from units
      for (let x = 0; x < state_beta.length; x++) {
        if (state_beta[x].units[bot].length == 0 || (masterState[x].ownership[bot] != attacker && masterState[x].ownership[bot] != 'contested')) {continue;}
        for (let i = 0; i < state_beta[x].units[bot].length; i++) {
          if (state_beta[x].units[bot][i][0] == attacker) {
            endAction(state_beta[x].units[bot][i]);
            state_beta[x].units[bot][i][3].summonSickness = false;
          }
        }
      }
    }
    temporaryFun(0)
    temporaryFun(1)
    $('#testStep').trigger('change')
  }
  //the meat of iterate function
  let nuestroTable = this;
  let arr1 = [
  "checkOwnership()",
  "statusMod(['onMove', movement, [attacker, display]])",
  "checkOwnership()",
  `display.updateBoard()
  $('#testStep').trigger('change')`,
  "statusMod(['onAttack', allAttack, [attacker, display, nuestroTable]])",
  `display.updateBoard()
  $('#testStep').trigger('change')`,
  "statusMod(['onEnd', onEnd, attacker])",

  `
  if (attacker == player1.name) {
    var currPlayer = player1;
  } else {
    var currPlayer = player2;
  }
  currPlayer.income();
  if (masterState[5].ownership[0] == currPlayer.name) {
    currPlayer.energy += 1;
    display.topOwnership(currPlayer.name)
  }
  if (masterState[5].ownership[1] == currPlayer.name) {
    currPlayer.materia += 1;
    display.botOwnership(currPlayer.name)
  }
  display.endPlayerTurn(currPlayer.name);
  $('#testStep').trigger('change')`,
  `display.updateBoard()
  $('#testStep').trigger('change')`,
  "statusMod(['onStart', onStart, defender])",
]
//end iterate meat
  this.iterate = function(attacker, defender) {
      let j = 0;
    let nextMotion = function(input, output) {
      if (j < arr1.length) {
        setTimeout(function() {
        j++;
        eval(input)
      }, 50)
      } else {
        setTimeout(function() {
          $('#testNext').trigger('change');
        }, 50)
        }
    }
    $('#testStep').on('change', function() {
      nextMotion(arr1[j])
  })
    nextMotion(arr1[0])
  }

  this.addBoard = function(owner, card, square, bot) {
    if (!bot) bot = 0
    bot = +bot
    let newCard = []
    newCard.push(owner, U.clone(card), game.counter, U.clone(card));
    newCard[3].summonSickness = true;
    game.counter++;
    if (!game.list) game.list = {}
    game.list[game.counter - 1] = {bot: bot, x: square, i: masterState[square].units[bot].length}
    masterState[square].units[bot].push(newCard)

    game.lastSummoned = game.counter-1
    display.updateBoard();
    return game.counter - 1;
  }
  this.addSpell = function(owner, card, target) {
    let newSpell = [];
    newSpell.push(owner, U.clone(card), game.counter, U.clone(card))
    //unnecessary?
    game.counter++
  }
  this.addEnchant = function() {
  }
  this.removeBoard = function (id) {
    masterState.forEach(function(column, i) {
      let done = false;
      column.units.forEach(function(box) {
        box.forEach(function(ele, x) {
          if (ele[2] == id) {
            let exiting = (box.splice(x, 1))[0];
            let target = exiting[0];
            (target == player1.name ? target = player1 : target = player2)
            if (exiting[1].type.split(' ').includes('fortress')) {
              if (exiting[0] == display.target.name) {
                C.events.surrender(true);
              } else {
                C.events.win(game)
              }
            } else {
              if (exiting[0] == player1.name) {
                player2.souls += exiting[3].bounty.souls || 0
                player2.materia += exiting[3].bounty.materia || 0
                player2.energy += exiting[3].bounty.energy || 0
              } else {
                player1.souls += exiting[3].bounty.souls || 0
                player1.materia += exiting[3].bounty.materia || 0
                player1.energy += exiting[3].bounty.energy || 0
              }
            }
            target.graveyard.push(U.clone(exiting[1]))
            done = true;
            //break;
            return false;
          }
        })
      })
      if (done == false) return false;
    })
  //  display.updateBoard()

  }
  let onDeath = this.removeBoard;
}
