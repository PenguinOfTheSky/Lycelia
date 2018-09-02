'use strict'

window.imports._game.Ownership =  {
  checkAllOwnership : function() {
    //checks/changes all
    masterState.forEach(function(column) {
      column.units.forEach(function(box, y){
        let both = false;
        if(box.length == 0) return 0;
        box.forEach(function(unit) {
          if (!both) {
            both = unit[0]
          } else if (both === unit[0]) {
              return true;
            }
            else if (both != unit[0]){
                both = true;
                return false;
          }
        })
        if (both === true) {
          column.ownership[y] = 'contested'
        }  else {
          column.ownership[y] = both
        }
      })
    })
  $('#testStep').trigger('change')
},
checkOneOwnership : function (i, bot) {
  //checks/changes cell
  if (masterState[i].ownership[bot].length == 0) {return 0}
  else {
    let both = false;
    for (let x = 0; x < masterState[i].units[bot].length; x++) {
      if (both === false) {
        both = masterState[i].units[bot][x][0]
      } else if (both === masterState[i].units[bot][x][0]) {
          continue;
        }
        else if (both != masterState[i].units[bot][x][0]){
            both = true;
            break;
      }
    }
    if (both === true) {
      masterState[i].ownership[bot] = 'contested'
    } else {
      if (both) masterState[i].ownership[bot] = both
      else masterState[i].ownership[bot] = 'neutral'
    }
  }
}
}
