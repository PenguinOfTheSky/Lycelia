  'use strict'

window.imports._game.movement =  function(arr1) {
  let setOwnership = function(i, owner,bot) {
            masterState[i].ownership[bot] = owner
  }
  let changeOwnership = window.imports._game.Ownership.checkOneOwnership
  let attacker = arr1[0], display = arr1[1]
  //fix this later to allow for ranged units with 3 ms, and range > 1;

  let direction = display.target.name;
  (direction == attacker ? direction = 1 : direction = -1)
  let run = function(b) {
    if (b > game.counter) {
      $('#testStep').trigger('change')
      return;
    }
    if (!game.list[b]) run(b+1)
    else {
      let pointer = game.list[b]
      let square =  masterState[pointer.x].units[pointer.bot]
      for (let i = 0; i < square.length; i++) {
        if (square[i][2] == b) {
          pointer.i = i;
          break;
        }
        if (i == square.length -1) {
          console.log(b)
          delete game.list[b]
          run (b+1)
          return;
        }
      }
      let unit = masterState[pointer.x].units[pointer.bot][pointer.i]
    /*  console.log(unit)
      if (!unit) {
        delete game.list[b]
        run (b+1)
        return;
      } */
      if (unit[0] != attacker) {
        run(b+1)
        return;
      }
      let MS = unit[3].stats.MS
      let range = unit[3].stats.range
      let hasAttacked = false;
      let target;
      let search = function(hasMoved) {
        let found = -1;
        let moveY = pointer.bot;
        if (pointer.x+(hasMoved)*direction == 9 || pointer.x+(hasMoved)*direction == 1) {
          moveY = 0
        }
        let rangeY = pointer.bot;
        for (let finder = 0; finder <= range; finder++) {
          if (pointer.x+(hasMoved + finder)*direction == 9 || pointer.x+(hasMoved + finder)*direction == 1) {
            rangeY = 0
          }
          if ((masterState[pointer.x+(hasMoved + finder)*direction].ownership[rangeY] != attacker && masterState[pointer.x+(hasMoved + finder)*direction].ownership[rangeY] != 'neutral') && masterState[pointer.x+(hasMoved + finder)*direction].units[rangeY].length != 0) {
            found = finder;
            break;
          }
        }
        if (hasMoved > 0) {
          if (masterState[pointer.x + hasMoved*direction].units[moveY].length == 0) {
            masterState[pointer.x + hasMoved*direction].ownership[moveY] = attacker
          } else if (masterState[pointer.x + hasMoved*direction].ownership[moveY] != attacker){
            masterState[pointer.x + hasMoved*direction].ownership[moveY]  = 'contested'
          }

        }
        let hasAttacked = false;
        if (found < 0 && hasMoved < MS) search(hasMoved + 1)
        else {
          if (hasMoved || found >= 0) {
            if (hasMoved) {
              let orig = D.find(`#_${unit[2]}_D`)
              let clone = orig.cloneNode(1)
              clone.style.visibility = 'hidden'
              let str = '#board'
              if (moveY) str += 'B'
              D.find(str + (pointer.x + (direction * hasMoved))).append(clone)
              let origXY = U.getXY(orig)
              let cloneXY = U.getXY(clone)

              let temp = masterState[pointer.x].units[pointer.bot].splice(pointer.i, 1)[0]
              masterState[pointer.x + hasMoved * direction].units[moveY].push(temp)
              pointer.x += hasMoved * direction
              game.list[b].bot = moveY
              display.moveAnim({
                unit: orig,
                diff: {x: cloneXY[0] - origXY[0], y: cloneXY[1] - origXY[1]}
              });
            }
            setTimeout(function() {
              if (found < 0) {
                run(b + 1)
              }
              else {
                display.updateBoard()
                let square0 = masterState[pointer.x].units[moveY]
                for (let i = 0; i < square0.length; i++) {
                  if (square0[i][2] == b) {
                    pointer.i = i;
                    break;
                  }
                }
                let square = masterState[pointer.x + (found)*direction].units[rangeY] //range needed
                let targetI
                for (let i = 0; i < square.length; i++) {
                  if (square[i][0] != attacker) {
                    targetI = i
                    break;
                  }
                }
                if (range > 0) {display.rangedAttack(masterState[pointer.x].units[moveY][pointer.i], masterState[pointer.x + (found)*direction].units[rangeY][targetI])}
                else {
                  display.meleeAttack(masterState[pointer.x].units[moveY][pointer.i], masterState[pointer.x ].units[moveY][targetI])
                }
                setTimeout(function() {
                  anAttack(masterState[pointer.x].units[moveY][pointer.i], masterState[pointer.x + (found)*direction].units[rangeY][targetI],display,game.table.removeBoard,pointer.x, pointer.bot)
                }, 300)

                setTimeout(function() {
                  pointer.bot = moveY
                  run(b + 1)
                }, 650)
              }
            }, 700)
          } else {
            setTimeout(function() {
              pointer.bot = moveY
              run(b + 1)
            }, 20)
          }
        }
      }
      search(0)
    }
  }
  run(0)
}
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
  //  let attackA = function(attacker) {window.Damage = attacker.stats.attack};
  //  let attackPulse =   attackerMod(['onAttack', attackA, attacker ])
  //  let defendPulse =  defenderMod(['onAttacked', a, ['onStruck', b, ['onDamaged', c, (window.Damage)]]])

  let spAttack = [];
  let refs = {attacker: attacker, defender: defender, x: x, bot: bot}
  spAttack[0] = attackerMod(['onAttack', function(dmg){return dmg}, attacker.stats.attack, refs])
  if (spAttack[0]) {
    spAttack[1] = defenderMod(['onStruck', function(dmg) {return dmg}, spAttack[0], refs])
  }
  if (spAttack[1]) {
    spAttack[2] = defenderMod(['onDamaged', function(dmg) {return dmg}, spAttack[1], refs])
  } else {
    display.miss(defender1)
  }
  if (spAttack[2]) c(spAttack[2])
}
