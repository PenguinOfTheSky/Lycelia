'use strict'
//contains _game.Command
  window.imports._game.Command = function (player, display, board) {
    this.player = player;
    let fortID = board.addBoard(player.name, U.clone(player.fort), 1, 0);
    C.data.ownFort = '#_' + fortID + '_D'
    $('#endTurn').on('click', function() {
      D.find('#endTurn').style.display = "none"
      D.find('#surrender').style.display = "none" //test
      $('#testChange').trigger('change');
      if (game.multiplayer) {
        C.socket.emit('multiplayer', 'end turn player0')
      }
    });
    this.turnStart = function() {
      if (player.hand.length < 5) {
        player.draw(2)
      } else if (player.hand.length < 8) {
        player.draw()
      }
      display.update();
      let fixThis = function() {
        document.body.style.cursor = "initial"
      $('.Summon').on('click', function() {
        let choice = $(this).attr('id');
        choice = parseInt(choice);
        let cardInfo = player.cardCheck(choice)
        let price = player.priceCheck(choice, 'cost')
        if (price) {
          let toClear = []
          let locList = {}
          let clear = function() {
            if (toClear.length) {
              toClear.forEach(ele => {
                let id
                if (ele[0]) id='#boardB'+ele[1]
                else id='#board'+ele[1]

                D.find(id).removeEventListener('click', summon, 0)
                D.find(id).style["animation"] = "none";
              })
            } else {
              D.find('#board2').removeEventListener('click', summon, 0)
              D.find('#board2').style["animation"] = "none";
              D.find('#boardB2').removeEventListener('click', summonBot, 0)
              D.find('#boardB2').style["animation"] = "none";
              D.find('#uiContainer').removeEventListener('click', clear, 1)
            }
            document.body.style.cursor = "initial"

            D.find('#statusReadout').innerHTML = ''
            D.find('#view').removeEventListener('contextmenu', cancel)
          }
          let chosenCard = player.play(choice);
          let emit = function(loc, card) {
            if (game.multiplayer) C.socket.emit('summon', {loc: loc, card: card}) //loc is vertical, horizontal
          }
          let summon = function(e) {
            let loc = locList['#' + e.target.id]
            clear()
            if (loc) {
              board.addBoard(player.name, U.clone(chosenCard), loc[1], loc[0])
              fixThis();
              emit(loc, chosenCard.id)
            } else {
              board.addBoard(player.name, U.clone(chosenCard), 2)
              fixThis();
              emit([0,2], chosenCard.id)
            }
          }
          let summonBot = function() {
            clear()
            board.addBoard(player.name, U.clone(chosenCard), 2, true)
            fixThis();
            emit([1,2], chosenCard.id)
          }
          display.updateHand()
          let cancel = function(e) {
            if (e) e.preventDefault()
            player.refund(price)
            clear()
            player.hand.push(chosenCard)
            display.updateHand()
            fixThis()
          }
          document.body.style.cursor = "url('images/targetCursor.png')64 64, crosshair"
          if (this.getAttribute('data-text') === 'Summon on Allied Square') {
            for (let i = 2; i <=8; i++) {
              for (let bot = 0;bot <=1; bot++) {
                if (masterState[i].ownership[bot] == 'HumanPlayer') {
                  if (cardInfo.allowedSummon && !cardInfo.allowedSummon[masterState[i].element[bot]]) continue;
                  let id;
                  if (bot) id='#boardB'+i
                  else id='#board'+i
                  D.find(id).style.animation = "summonOption 4s linear  infinite alternate"
                  toClear.push([bot,i])
                  locList[id] = [bot, i]
                  D.find(id).addEventListener('click', summon, 0)
                }
              }
            }
            if (!toClear.length) {
              cancel()
              C.events.errorMsg('No Allied Squares')
            }
          } else {

            D.find('#board2').style.animation = "summonOption 4s linear infinite alternate"
            D.find('#boardB2').style.animation = "summonOption 4s linear  infinite alternate"
            D.find('#board2').addEventListener('click', summon, 0)
            D.find('#boardB2').addEventListener('click', summonBot, 0)
          }
          D.find('#view').addEventListener('contextmenu', cancel)
        } else {
          C.events.errorMsg('Insufficient Resources')
        }
      })
      $('.Build').on('click', function() {
        let choice = $(this).attr('id');
        choice = parseInt(choice);
        if (player.priceCheck(choice, 'cost')) {
          let choiceResult = player.play(choice)
          board.addBoard(player.name, U.clone(choiceResult), 0)
          if (game.multiplayer) {
            C.socket.emit('build', choiceResult.id)
          }
          display.updateHand()
          fixThis();
        } else {
          C.events.errorMsg('Insufficient Resources')
        }
      })
      $('.Evolve').on('click', function() {
        let choice = $(this).attr('id');
        choice = parseInt(choice);
        if (player.priceCheck(choice, 'evolveCost')) {
          let b = choice
          choice = player.handCardDescription(choice);
          let input = player.hand.splice(b, 1);
          let optionsNumber = $(this).attr('data-optionsNumber');
          for (let v = 0; v < choice[0].options.length; v++) {
            if (choice[0].options[v].match(/Evolve/) != null) {
            //  optionsNumber = v;
            }
          }
          let a = choice[0].options[optionsNumber].match(/(?:Evolve to )(.+)/);
          a = a[1]
          display.update()
          for (let p in  player.source) {
            if (player.source[p].name == a) {
              let output = U.clone(player.source[p]);
              player.hand.push(output);
              break;
            }
          }
          display.update()
          fixThis();
        }
      })
      $('.Cast').on('click', function() {
        let choice = $(this).attr('id');
        choice = parseInt(choice);
        let price = player.priceCheck(choice, 'cost')
        if (price) {
          let b = choice
          choice = player.handCardDescription(choice);
          let input = player.hand.splice(b, 1)[0];
          display.updateHand()
          let cancel = function(e, msg) {
            if (e) e.preventDefault()
            player.hand.push(input);
            player.refund(price)
            for (let i = 0; i <= 10; i++) {
              D.find('#board' + i).style.animation = ''
              D.find('#board' + i).onclick = null
              if (i <= 1 || i >= 9) continue;
              D.find('#boardB' + i).onclick = null
              D.find('#boardB' + i).style.animation = ''
            }
            display.updateHand()
            if (msg) C.events.errorMsg(msg)
            fixThis()
            D.find('#view').removeEventListener('contextmenu', cancel)
          }
          let foundTarget = imports.spellBoss(input, board, display, fixThis, {contextmenu: cancel})
          if (!foundTarget) {
            cancel(0, 'No Valid Targets!')
          } else {
            D.find('#view').addEventListener('contextmenu', cancel)
          }
        } else {
          C.events.errorMsg('Insufficient Resources!')
        }
      })

    }
    fixThis();
    }
  }
