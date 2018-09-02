
window.imports.spellBoss = function(card, board, display, callback, opts) {
  'use strict'
  let emit = function(opts) {
    if (game.multiplayer) C.socket.emit('cast', opts)
  }

  let checkUnits = function(spell, check, check2) {
    document.body.style.cursor = "url('images/targetCursor.png')64 64,crosshair"
    let found = [];
    masterState.forEach(function(column, i) {
      column.units.forEach(function(box, b) {
        if (check2 && check2.element)  {
          if (masterState[i].element[b] != check2.element) return;
        }
        box.forEach(function(unit) {
          let x = check(unit)
          if (x) {
            display.highlight(document.querySelector('#_' + unit[2]+ '_D'))
            document.querySelector('#_' + unit[2]+ '_D').onclick = function () {
              D.find('#view').removeEventListener('contextmenu', opts.contextmenu)
              document.body.style.cursor = ''
              emit({card: spell, target: unit[2]})
              display.update()
              imports._spells[spell](board, card, unit,display, 'HumanPlayer', callback)
            }
            found.push(x);
          }
        })
      })
    })
    if (found.length == 0) found = false;
    return found
  }
  let highlightSquares = function(spell, opts = {}) {
    document.body.style.cursor = "url('images/targetCursor.png')64 64,crosshair"
    //if (!opts) opts = {}
    let min = 2, max = 8
    if (opts.includeBases) {
      min = 1; max = 9;
    }
    let cancel = function() {

      D.find('#view').removeEventListener('contextmenu', opts.contextmenu)
      for (let i = 0; i <= max; i++) {
        D.find('#board' + i).style.animation = ''
        D.find('#board' + i).onclick = null
        if (i <= 1 || i >= 9) continue;
        D.find('#boardB' + i).onclick = null
        D.find('#boardB' + i).style.animation = ''
      }
    }
    let matched = 0;
    for (let i = min; i <= max; i++) {
      let match1 = true, match2 = true;
      if (opts.type) {
        match1 = false;
        match2 = false;
        opts.type.forEach(ele => {
          if (ele == masterState[i].element[0]) match1 = true
          if (ele == masterState[i].element[1]) match2 = true
        })
      }
      if (opts.notEmpty) {
        if (!masterState[i].units[0].length) match1 = false;
        if (!masterState[i].units[1].length) match2 = false
      }
      let select = function(square) {
        document.body.style.cursor = ''
        emit({card: spell, square: square})
        display.update()
        imports._spells[spell](board, card, square,display, 'HumanPlayer', callback)
      }
      if (match1) {
        matched++
        display.highlight(D.find('#board' + i))
        D.find('#board' + i).onclick = function() {
          cancel()
          select({bot: 0, i: i})
        }
      }
      if (match2) {
        matched++
        display.highlight(D.find('#boardB' + i))
        D.find('#boardB' + i).onclick = function() {
          select({bot: 1, i: i})
          cancel()
        }
      }
    }
    return matched;
  }
  switch(card.id) {
    case 10:
      //imports._spells[10](board, card, masterState[9].units[0][0],display,'HumanPlayer', callback )
      let found = checkUnits(10, function(unit) {
        if (unit[0] != 'HumanPlayer' && unit[3].type.split(' ').includes('fortress')) {
          return unit
        }
      });
      return true;
    case 17: {
      let found = checkUnits(17, function(unit) {
        if (unit[0] == 'HumanPlayer' && unit[3].type.split(' ').includes('creature')) {
          return unit
        }
      });
      return found;
    }
    case 18:
      checkUnits(18, (unit => unit)) //returns every unit
      return true;
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
      let found = checkUnits(43, function(unit) {
        if (unit[0] == 'HumanPlayer' && unit[3].type.split(' ').includes('creature')) {
          return unit
        }
      });
      return found;
    }
    case 45:  {
      let found = checkUnits(45, function(unit) {
        if (unit[0] != 'HumanPlayer' && unit[3].type.split(' ').includes('creature')) {
          return unit
        }
      });
      return found;
    }
    case 46:  {
      let found = checkUnits(46, function(unit) {
        if (unit[0] != 'HumanPlayer' && unit[3].type.split(' ').includes('creature')) {
          return unit
        }
      });
      return found;
    }
    case 47:  {
      let found = checkUnits(47, function(unit) {
        if (unit[0] != 'HumanPlayer') {
          return unit
        }
      });
      return found;
    }
    case 48:  {
      return highlightSquares(48, {notEmpty: true})
    }
    case 59:  {
      highlightSquares(59, /*{includeBases: true}*/)
      return 1;
    }
    case 60:  {
      highlightSquares(60, {type: ['water']})
      return 1;
    }
    case 61:  {
      let found = checkUnits(61, function(unit) {
        if (unit[0] != 'HumanPlayer' && unit[3].type.split(' ').includes('creature')) {
          return unit
        }
      }, {element: 'water'});
      return found;
    }
    case 75:
      imports._spells[75](board, card ,display, 'HumanPlayer', callback)
      emit({card:75})
      return true;
    case 76:
      imports._spells[76](board, card ,display, 'HumanPlayer', callback)
      emit({card:76})
      return true;
    case 77:
      imports._spells[77](board, card ,display, 'HumanPlayer', callback)
      emit({card:77})
      return true;
  }
}
