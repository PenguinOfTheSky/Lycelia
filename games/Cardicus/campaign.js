  'use strict'
window.XstartCampaign = function (multiplayer) {
  if (multiplayer) {
    let badWords = new RegExp(/((pussy)|(fuck)|( tit)|(cunt)|(nigger)|(cock)|(negro))s*/, 'ig')
    C.socket.on('gameChat', function(data) {
      let div = U.make('div', {
        innerText: game.AI.name + ': ' + data.replace(badWords, '****')
      })
      D.find('#chatOutput').prepend(div)
      setTimeout(function() {
        div.remove();
      },22000)
    })
    D.body.onkeyup = function(e) {
      if (e.key === 'Enter') {
        if (!D.find('#chatInput').value) {
          D.find('#chatInput').focus()
        } else {
          let div = U.make('div', {
            innerText: C.keypass.user + ': ' + D.find('#chatInput').value
          })
          C.socket.emit('gameChat', D.find('#chatInput').value)
          D.find('#chatOutput').prepend(div)
          setTimeout(function() {
            div.remove();
          },22000)
          D.find('#chatInput').value = ''
        }
      }
    }
  } else {
    D.body.onkeyup = function(e) {}
    D.find('#chat').style.display = 'none'
  }

  game.multiplayer = multiplayer
  //Dependencies: imports._game, imports.player, imports._graphics, imports.Engine
    window.masterState = []
    let decks = account.decks.slice(0)
    let player0Deck;
    if (account.currentDeck == 'undefined') account.currentDeck = 'first'
    //fix this cards vs decks
    for (let p = 0; p < decks.length; p++) {
      if (decks[p].name === account.currentDeck) {
        player0Deck = JSON.parse(JSON.stringify(decks[p]))
        break;
      }
    }
    let player0 = new imports.player(_allCards, player0Deck, 'HumanPlayer');
    let player1
    if (!multiplayer) {  //for future dev?
      player1 = new imports.player(_allCards, game.AI.deck, game.AI.name)
    } else {
      player1 = new imports.player(_allCards, game.AI.deck, game.AI.name)
    }
    C.players = {
      "HumanPlayer": player0
    }
    C.players[game.AI.name] = player1
    C.players['right'] = player1
    C.players['left'] = player0
    C.activeGame = {
      players: C.players
    }
    let displayA = new imports._graphics[account.graphicsLevel](player0);
    C.display = displayA
    let table0 = new imports._game.Table(displayA, player0, player1);
    game.table = table0
    let AI;
    if (!multiplayer) {
      AI = new imports._AI[game.AI.difficulty](player1, table0);
    } else {
      AI = new imports.player1Multiplayer(player1, table0);
    }
    let command0 = new imports._game.Command(player0, displayA, table0);
    var engine = new imports.Engine(command0, AI, table0)
    player0.draw(3);
    player1.draw(3);

    let n = 0;
    let nextHint = function() {
      if (hints[n]) {
        if (n == 3) {
          document.querySelector('#endTurn').style.display = 'inline-block'
        }
        displayA.hint(...hints[n], n)
        n++
      }
    }
    let hints = C.introHints(nextHint);
    if (game.id === 'Intro') {
      game.random = Math.random
      engine.next()
      document.querySelector('#endTurn').style.display = 'none'
      nextHint()
    } else {
      if (!multiplayer) {
        game.random = Math.random
        if (!game.turn) {
          engine.next()
        } else if (game.turn == 'AI') {
          engine.next(1)
        }
      } else {
        displayA.update();
        C.socket.emit('multiplayer', 'game ready')
        C.socket.on('game start player0', function() {
          //displayA.update();
          engine.next()
        })
        C.socket.on('game start player1', function() {
          D.find('#endTurn').style.display = "none"
          engine.turn = 1
          engine.next(1)
        })
        C.socket.on('surrender', function(data) {
          C.events.successMsg('Your opponent has fled!')
          setTimeout(function() {
            C.events.win()
          }, 3000)
        })
      }
    }
    C.activeGame.events = {
      endTurn: function() {
        engine.endTurn();
      },
      next: function() {
        engine.next()
      }
    }
    $('#testChange').on('change', function() {
      engine.endTurn();
    })
    $('#testNext').on('change', function() {
      engine.next();
    })

}
