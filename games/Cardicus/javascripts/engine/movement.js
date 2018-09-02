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
      for (let i = 0; i <= square.length; i++) {
        if (i == square.length) {
          delete game.list[b]
          run (b+1)
          return;
        }
        if (square[i][2] == b) {
          pointer.i = i;
          break;
        }
      }
      let unit = masterState[pointer.x].units[pointer.bot][pointer.i]
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
          if (hasMoved) {
            let orig = D.find(`#_${unit[2]}_D`)
            orig.style.animation = ''
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
            setTimeout(function() {
              if (!hasAttacked) {
                run(b + 1)
              }
              else {
                let square = masterState[pointer.x + (hasMoved)*direction].units[moveY] //range needed
                let target
                for (let i = 0; i < square.length; i++) {
                  if (square[i][0] != attacker) {
                    target = square[i]
                    break;
                  }
                }
                setTimeout(function() {
                  display.updateBoard()
                  run(b + 1)
                }, 10)
              }
            }, 600)
          } else {
            setTimeout(function() {
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
