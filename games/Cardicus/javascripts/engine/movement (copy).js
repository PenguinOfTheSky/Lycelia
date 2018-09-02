  'use strict'

window.imports._game.movement =  function(arr1) {
  let setOwnership = function(i, owner,bot) {
            masterState[i].ownership[bot] = owner
  }
  let changeOwnership = window.imports._game.Ownership.checkOneOwnership
  let attacker = arr1[0], display = arr1[1]
  //fix this later to allow for ranged units with 3 ms, and range > 1;
  let state_beta = masterState.slice(0);
  let direction = display.target.name;
  (direction == attacker ? direction = 1 : direction = -1)
  let doEachState = function(x) {
    let something_moved = false;
    if (masterState[x].ownership[0] != attacker && masterState[x].ownership[1] != attacker) {
      if (direction < 0) {v++} else {v--}
      $('#testMovement').trigger('change')
      return 0;
    }
    let slowTopMove = function(i) {
      let unitID;
      if (i == 0) {
        setTimeout(function(){eachAttackSlow(state_beta[x].units[1].length)}, 50)
      } else {
        i--
        let hasMoved = 0;
        if (state_beta[x].units[0][i][0] == attacker) {
          let ms = parseInt(state_beta[x].units[0][i][3].stats.MS)
          if (ms < 0) {ms = 0}
          let range = parseInt(state_beta[x].units[0][i][3].stats.range)
          let clear = true;
          for (let n = 0; n <= ms; n++) {
            for (let u = 0; u <= range; u++) {
              if (masterState[x+ direction * n + direction * u].ownership[0] != attacker && masterState[x + (direction * n) + (direction * u)].units[0].length > 0) {
                clear = false;
                break;
              }
            }
            hasMoved = n;
            if (clear == false) {break;}
          }
               if (hasMoved > 0) {
                masterState[x + (direction * hasMoved)].units[0].push((masterState[x].units[0].slice(i, i+1))[0])
                for (let u = 1; u <= hasMoved; u++) {
                  changeOwnership(x+(direction * u), 0)
                  if (u < hasMoved) {
                    setOwnership(x + (direction * u), attacker, 0)
                  }
                }
                let oldSpot = masterState[x].units[0].splice(i, 1)[0]
                unitID = oldSpot[2]
                let orig = D.find(`#_${oldSpot[2]}_D`)
                let clone = orig.cloneNode(1)
                clone.style.visibility = 'hidden'
                D.find('#board'+ (x + (direction * hasMoved))).append(clone)
                let origXY = U.getXY(orig)
                let cloneXY = U.getXY(clone)
                display.moveAnim({
                  unit: orig,
                  diff: {x: cloneXY[0] - origXY[0], y: cloneXY[1] - origXY[1]}
                });
                clone.remove()
                something_moved = true;
               }
        }
        if (hasMoved) {
          let disUnit
          let box = masterState[direction * hasMoved + x].units[0]
          for (let v = 0; v < box.length; v++) {
            if (box[v][2] == unitID) {
              disUnit = box[v]
            }
          }
          setTimeout(function() {slowTopMove(i)}, 400)
        } else {
          slowTopMove(i)
        }
      }
    }
    let eachAttackSlow = function(i) {
      if (i == 0) {
        setTimeout(function(){
          endThis()
        }, 4)
      } else {
        i--;
        let hasMoved = 0;
        if (state_beta[x].units[1][i][0] == attacker) {
          let ms = parseInt(state_beta[x].units[1][i][3].stats.MS)
          let range = parseInt(state_beta[x].units[1][i][3].stats.range)

          let clear = true;
          for (let n = 0; n <= ms; n++) {
            for (let u = 0; u <= range; u++) {
              let botClear = 1;
              if (x+ direction * n + direction * u == 9 || x+ direction * n + direction * u == 1) {
                botClear = 0
                clear = false;
              }
              if (masterState[x+ direction * n + direction * u].ownership[botClear] !== attacker && masterState[x + (direction * n) + (direction * u)].units[botClear].length > 0) {
                clear = false;
                break;
              }
            }
            hasMoved = n;
            if (clear == false) {break;}
          }
               if (hasMoved > 0) {
                 let movedBot = 1;
                 if (x + (direction * hasMoved)== 9 || x + (direction * hasMoved)== 1) movedBot = 0
                masterState[x + (direction * hasMoved)].units[movedBot].push((masterState[x].units[1].slice(i, i+1))[0])
                for (let u = 1; u <= hasMoved; u++) {
                  if (u <9 && u > 1) changeOwnership(x+(direction * u), 1)
                  if (u < hasMoved) {
                    setOwnership(x + (direction * u), attacker, movedBot)
                  }
                }
                let oldSpot = masterState[x].units[1].splice(i, 1)[0]
                let orig = D.find(`#_${oldSpot[2]}_D`)
                let clone = orig.cloneNode(1)
                clone.style.visibility = 'hidden'
                D.find('#board'+ (movedBot ? 'B' : '') + (x + (direction * hasMoved))).append(clone)
                let origXY = U.getXY(orig)
                let cloneXY = U.getXY(clone)
                display.moveAnim({
                  unit: orig,
                  diff: {x: cloneXY[0] - origXY[0], y: cloneXY[1] - origXY[1]}
                });
                clone.remove()
                something_moved = true;
               }
        }
        if (hasMoved) {
          setTimeout(function(){eachAttackSlow(i)}, 400)
        } else {
          eachAttackSlow(i)
        }
      }
    }
    let endThis = function() {
      if (direction < 0) {v++} else {v--}
      if (something_moved == false) {
        $('#testMovement').trigger('change')
      } else {
        display.update();
        setTimeout(function() {
        $('#testMovement').trigger('change')}, 50)
      }
    }
    slowTopMove(state_beta[x].units[0].length)
    }
    let v;
    if (direction < 0) {v = 0} else {v = 10}
    let eachState = function (v) {
      if (v <=10 && v >= 0) {
        doEachState(v)
      } else {
        setTimeout(function() {$('#testStep').trigger('change')
        $('#testMovement').off();
        }, 15)
      }
    }
  $('#testMovement').on('change', function() {
    eachState(v);
  });
      eachState(v)
}
