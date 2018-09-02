'use strict'
window.imports.player1Multiplayer = function (player, board) {
  this.player = player;
  let n= 0;
  let fortID = board.addBoard(player.name, U.clone(player.fort), 9, 0);
  C.data.enemyFort = '#_' + fortID + '_D'
  C.socket.on('end turn player1', function() {
    $('#testChange').trigger('change');
  })
  C.socket.on('summon', function(opts) {
    board.addBoard(player.name, U.clone(_allCards[opts.card]), 10-opts.loc[1], Number(opts.loc[0]))
  })
  C.socket.on('upgrade', function(opts) {
    opts.unit[0] = game.AI.name
    C.engine.input.upgrade(opts)
  })
  C.socket.on('build', function(card) {
    board.addBoard(player.name, U.clone(_allCards[+card]), 10, 0)
  })
  C.socket.on('cast', function(opts) {
    let targ;
    //todo fix square-target spells
    if (opts.target) {
      if (opts.target === 1) opts.target = 2
      else if (opts.target ===2) opts.target = 1
      masterState.forEach(function(column) {
        column.units.forEach(function(box) {
          box.forEach(function(unit) {
            if (unit[2] === opts.target) {
              targ = unit
            }//allow multiple targets? allow array? target by box?
          })
        })
      })
      imports._spells[opts.card](board, _allCards[opts.card], targ, C.display, game.AI.name, function(){})
    } else if (opts.square) {
      opts.square.i = 10 - opts.square.i
      imports._spells[opts.card](board, _allCards[opts.card], opts.square, C.display, game.AI.name, function(){})
    } else {
      imports._spells[opts.card](board, _allCards[opts.card], opts.square, C.display, game.AI.name, function(){})
    }

  })
  this.turnStart = function() {
    n++
  }
  this.turnEnd = function() {
    //player.income();
  }
}
