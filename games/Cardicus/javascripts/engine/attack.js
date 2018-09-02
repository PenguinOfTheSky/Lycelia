  {
  'use strict'

  let anAttack = function(attacker1, defender1, display, onDeath, x, bot) {
    let attacker = attacker1[3], defender = defender1[3];
    let attackerHP = attacker.stats.HP
    let attackerMod, defenderMod;
      eval(' attackerMod = ' + attacker.modifier)
      eval(' defenderMod = ' + defender.modifier)
      let c = function (damage) {
        defender.stats.HP = defender.stats.HP - damage;
        display.updateBoard();
        if (damage > 0) {
          _game.injured = true;
          if (defender.stats.HP > 0) display.injured(defender1, damage)
        }
        if (attacker.stats.HP < attackerHP) {
          display.injured(attacker1, attackerHP - attacker.stats.HP)
        }
        if (defender.stats.HP <= 0) {
          _game.dead = true;
          display.dying(defender1)
          defenderMod(['onDeath', onDeath, defender1[2]])
        }
        if (attacker.stats.HP <= 0) {
          _game.dead = true;
          display.dying(attacker1)
          attackerMod(['onDeath', onDeath, attacker1[2]])
        }
      }
    window._game = {}
    _game.miss = false;
    _game.injured = false;
    _game.dead = false;
    let spAttack = [];
    let refs = {attacker: attacker, defender: defender, x: x, bot: bot}
    spAttack[0] = attackerMod(['onAttack', function(dmg){return dmg}, attacker.stats.attack, refs])
    if (spAttack[0]) {
      spAttack[1] = defenderMod(['onStruck', function(dmg) {return dmg}, spAttack[0], refs])
    }
    if (spAttack[1]) {
      spAttack[2] = defenderMod(['onDamaged', function(dmg) {return dmg}, spAttack[1], refs])
      if (!attacker.music || !attacker.music.onStrike) {
        let audio = new Audio('audio/effects/impact.mp3')
        let n = attacker.stats.attack/defender1[3].stats.HP
        if (n < 1) n = n**.5
        else n = 1
        audio.volume = n * .85
        audio.play()
      }
    } else {
      if (defender1[3].stats.special) {
        if (defender1[3].stats.special.Armor) {
          display.resist(defender1)
        } else if (defender1[3].stats.special.Evasion) {
          display.miss(defender1)
        } else {
          display.miss(defender1)
        }

      } else {
        display.miss(defender1)
      }
    }
    if (spAttack[2]) c(spAttack[2])
  }
  window.imports._game.allAttack = function(arr1) {
    let attacker = arr1[0], display = arr1[1]
  //  let state_beta = masterState.slice(0);
    let direction = display.target.name;
    (direction == attacker ? direction = 1 : direction = -1)
    let endSlow = function(x, bot, nextLane) {
      if (direction < 0) x++
      else x--
      if (x != 10 && x != -1) {
        doEachState(x, bot, nextLane)
      } else {
        if (bot ===1) {
         $('#testStep').trigger('change')
       } else if (bot ===0) {
         nextLane()
       }
      }
    }
    let doEachState = function(x, bot, nextLane) {
      let listAttackers = []
      if (masterState[x].units[bot].length == 0 || (masterState[x].ownership[bot] != attacker && masterState[x].ownership[bot] != 'contested')) {endSlow(x, bot, nextLane); return 0;}
      let doAttacksSlow = function(i, bot, x) {
        let hasAttacked = false;
        if (i == -1) {
          endSlow(x, bot, nextLane)
        } else {
          if (masterState[x].units[bot][i][0] == attacker && !(listAttackers.includes(masterState[x].units[bot][i][2]))) {
            if (masterState[x].units[bot][i][3].stats.attack === false)  {
              setTimeout(function() {doAttacksSlow(--i, bot, x)}, 4)
              return;
            }
              let range = masterState[x].units[bot][i][3].stats.range
              let Flying, Jump;
              if (masterState[x].units[bot][i][3].stats.special) {
                if (masterState[x].units[bot][i][3].stats.special.Flying) Flying = true
                if (masterState[x].units[bot][i][3].stats.special.Jump) Jump = true
              }
              for (let y = 0; y <= range; y++) {
                let testBot = bot;
                if (x + (y*direction) == 9 || x + (y*direction) == 1) testBot = 0
                if (masterState[x + (y*direction)].ownership[testBot] != attacker && masterState[x+(y*direction)].units[testBot].length > 0) {
                  let enemies = []
                  let makeAttack = function(z) {
                    if (masterState[x].units[bot][i].music && masterState[x].units[bot][i].music.attack) {
                      let audio = new Audio(masterState[x].units[bot][i].music.attack)
                      audio.volume = .8;
                      audio.play();
                    }
                    if (range > 0) {
                      display.rangedAttack(masterState[x].units[bot][i], masterState[x+(y*direction)].units[testBot][z])
                    }
                    else {display.meleeAttack(masterState[x].units[bot][i], masterState[x+(y*direction)].units[testBot][z])}
                    listAttackers.push(masterState[x].units[bot][i][2])

                    //fix this later to allow for auto-rezzing redonculousness ?
                    hasAttacked = function() {
                      anAttack(masterState[x].units[bot][i], masterState[x+(y*direction)].units[testBot][z], display, arr1[2].removeBoard, x, bot)
                    }
                  }
                  for (let z = masterState[x + (y*direction)].units[testBot].length - 1; z >= 0 ; z--) {
                    let unit = masterState[x+(y*direction)].units[testBot][z]
                    if ( unit[0] != attacker) {
                      if (unit[3].stats.special && unit[3].stats.special.Flying && (range == 0 && (!Flying && !Jump))) {
                        continue;
                      }
                      enemies.push(z)
                    }
                  }
                  if (enemies.length > 0) {
                    enemies = enemies.sort(function(a, b){
                      let box = masterState[x+(y*direction)].units[testBot]
                      return (((box[b][3].stats.priority || 0) - box[b][3].stats.HP/box[b][1].stats.HP + Math.random()) - ((box[a][3].stats.priority || 0) - box[a][3].stats.HP/box[a][1].stats.HP + Math.random()))
                    });
                    makeAttack(enemies[0])
                  }
                }
                if (hasAttacked) {break;}
                if (masterState[x].units[bot][i][3].type.split(' ').includes('fortress')) {
                  if (masterState[x + (y*direction)].ownership[1] != attacker && masterState[x+(y*direction)].units[1].length > 0) {
                    for (let z = masterState[x + (y*direction)].units[1].length - 1; z >= 0 ; z--) {
                      if ( masterState[x+(y*direction)].units[1][z][0] != attacker) {
                        if (range > 0) {display.rangedAttack(masterState[x].units[bot][i], masterState[x+(y*direction)].units[1][z])}
                        else {display.meleeAttack(masterState[x].units[bot][i], masterState[x+(y*direction)].units[1][z])}
                        listAttackers.push(masterState[x].units[bot][i][2])

                        hasAttacked = function() {
                          anAttack(masterState[x].units[bot][i], masterState[x+(y*direction)].units[1][z], display, arr1[2].removeBoard, x, bot)
                        }
                        break;
                      }
                    }
                  }
                }
                if (hasAttacked) break;
              }
          }
          if (hasAttacked) {
            setTimeout(function() {
              hasAttacked();
            }, 300)
            setTimeout(function() {
              display.updateBoard();
              doAttacksSlow(--i, bot, x)
            }, 600)
          } else {
            setTimeout(function() {
              doAttacksSlow(--i, bot, x)
            }, 5)
          }
        }
      }
      doAttacksSlow(masterState[x].units[bot].length - 1, bot, x)
    }
    if (direction < 0) {
      doEachState(0, 0, function() {
        doEachState(0, 1)
      })
    } else {
      doEachState(masterState.length-1, 0, function() {
        doEachState(masterState.length-1, 1)
      });
    }
  }
}
