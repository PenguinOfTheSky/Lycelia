window.imports.spellAI = function(opts) {
  'use strict'
  let {card, player, board} = opts
  let display = C.display
  let checkUnits = function(spell, check, check2) {
    let found = [];
    masterState.forEach(function(column, i) {
      column.units.forEach(function(box, b) {
        if (check2 && check2.element)  {
          if (masterState[i].element[b] != check2.element) return;
        }
        box.forEach(function(unit) {
          let x = check(unit)
          if (x) {
            found.push(x);
          }
        })
      })
    })
    if (found.length == 0) found = false;
    U.shuffle(found)
    return found
  }
  let checkSquares = function(check, checkBox) {
    let found = [];
    masterState.forEach(function(column, x) {
      found.push([])
      column.units.forEach(function(box, b) {
        found[x].push([])
        if (checkBox.element) {
          if (column.element[b] != checkBox.element) return;
        }
        if (checkBox.range) {
          if (x < checkBox.range[0] || x > checkBox.range[1]) return;
        }
        box.forEach(function(unit) {
          let u = check(unit)
          if (u) {
            found[x][b].push(u);
          }
        })
      })
    })
    if (found.length == 0) found = false;
    return found
  }
  switch(card.id) { //18, 46, 47, 43, 17, 59,60, 10, 61
    case 10:
      let found = checkUnits(10, function(unit) {
        if (unit[0] == 'HumanPlayer' && unit[3].type.split(' ').includes('fortress')) {
          return unit
        }
      });
      imports._spells[10](board, card, found[0],display, player.name, function(){}/*callback*/)
      return true;
    case 17: {
      let cast = false;
      let found = checkUnits(17, function(unit) {
        if (unit[0] != 'HumanPlayer' && unit[3].type.split(' ').includes('creature')) {
          return unit
        }
      });
      for (let x = 0; x < found.length; x++) {
        if (found[x][1].stats.HP - found[x][3].stats.HP >= 20 && !found[x][3].type.includes('building')) {
          imports._spells[17](board, card, found[x],display, player.name, function(){}/*callback*/)
          cast = true;
          break;
        }
      }
      return cast
    }
    case 18: {
      let cast = false;
      let found = checkUnits(18, function(unit) {
        if (unit[0] == 'HumanPlayer') {
          return unit
        }
      });
      for (let x = 0; x < found.length; x++) {
        if (found[x][3].stats.HP <= 20 && !found[x][3].type.includes('building')) {
          imports._spells[18](board, card, found[x],display, player.name, function(){}/*callback*/)
          cast = true
          break;
        }
      }
      return cast
    }
    break;
    case 19:
      imports._spells[19](board, card ,display, 'HumanPlayer', callback)
      emit({card:19})
      return true;
    case 23:  {
      let found = checkUnits(23, function(unit) {
        if (unit[0] == 'HumanPlayer') {
          return unit
        }
      });
      return found;
    }
    case 43:  {
      let cast = false;
      let found = checkUnits(43, function(unit) {
        if (!unit[3].stats.attack && unit[3].function == 'Build') {
        } else {
          if (unit[0] != 'HumanPlayer' && unit[3].type.split(' ').includes('creature')) {
            return unit
          }
        }
      });
      if (found.length) {
        found.sort(function(a, b) {
          return (a[3].stats.MS - b[3].stats.MS)
        })
        imports._spells[43](board, card, found[0],display, player.name, function(){}/*callback*/)
        cast = true
      }
      return cast
    }
    case 45:  {
      let found = checkUnits(45, function(unit) {
        if (unit[0] != 'HumanPlayer' && unit[3].type.split(' ').includes('creature')) {
          return unit
        }
      });
      return found;
    }
    case 46: {
      let cast = false;
      let found = checkUnits(46, function(unit) {
        if (unit[0] == 'HumanPlayer' && unit[3].type.split(' ').includes('creature')) {
          return unit
        }
      });
      for (let x = 0; x < found.length; x++) {
        if (found[x][3].stats.HP >= 50) {
          imports._spells[46](board, card, found[x],display, player.name, function(){}/*callback*/)
          cast = true
          break;
        }
      }
      return cast
    }
    break;
    case 47:  {
      let cast = false;
      let found = checkUnits(18, function(unit) {
        if (unit[0] == 'HumanPlayer') {
          return unit
        }
      });
      for (let x = 0; x < found.length; x++) {
        if (found[x][3].stats.HP <= 35 && found[x][3].stats.HP >= 15 || found[x][3].stats.HP > 100) {
          imports._spells[47](board, card, found[x],display, player.name, function(){}/*callback*/)
          cast = true
          break;
        }
      }
      return cast;
    }
    break;
    case 48:  {
      highlightSquares(48)
      return 1;
    }
    case 59:  {
      let cast = false;
      let found = checkSquares(function(unit) {
        if (!unit[3].stats.attack && unit[3].function == 'Build') {
        } else {
          if (unit[0] == 'HumanPlayer') {
            return unit
          }
        }
      }, {range: [2,8]});
      let sortGrid = []
      found.forEach(function(ele, x) {
        ele.forEach(function(box, b) {
          if (box.length) {
            sortGrid.push([x,b, box.length - (masterState[x].units[b].length - box.length)])
          }
        })
      })
      sortGrid.sort(function(a,b) {
        return b[2] - a[2]
      })
      if (sortGrid.length && sortGrid[0][2] >= 1) {
        imports._spells[59](board, card, {i: sortGrid[0][0], bot: sortGrid[0][1]},display, player.name, function(){})
        cast = true
      }
      return cast
    }
    case 60:  {
      let cast = false;
      let found = checkSquares(function(unit) {
        if (!unit[3].stats.attack && unit[3].function == 'Build') {
        } else {
          if (unit[0] == 'HumanPlayer') {
            return unit
          }
        }
      }, {range: [2,8], element: 'water'});
      let sortGrid = []
      found.forEach(function(ele, x) {
        ele.forEach(function(box, b) {
          if (box.length) {
            sortGrid.push([x,b, box.length - (masterState[x].units[b].length - box.length)])
          }
        })
      })
      sortGrid.sort(function(a,b) {
        return b[2] - a[2]
      })
      if (sortGrid.length && sortGrid[0][2] >= 2) {
        imports._spells[60](board, card, {i: sortGrid[0][0], bot: sortGrid[0][1]},display, player.name, function(){})
        cast = true
      }
      return cast
    }
    case 61: {
      let cast = false;
      let found = checkUnits(46, function(unit) {
        if (unit[0] == 'HumanPlayer' && unit[3].type.split(' ').includes('creature')) {
          return unit
        }
      }, {element: 'water'});
      if (found.length) {
        found.sort(function(a, b) {
          return b[3].stats.attack - a[3].stats.attack
        })
      }
      if (found[0] && found[0][3].stats.attack >= 10) {
        imports._spells[61](board, card, found[0],display, player.name, function(){}/*callback*/)
        cast = true
      }
      return cast
    }
    break;
  }
}
