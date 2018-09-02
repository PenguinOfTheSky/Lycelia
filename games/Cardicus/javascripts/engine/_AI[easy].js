'use strict'
if (window.imports._AI == undefined) window.imports._AI = {}
window.imports._AI.easy = function (player, board) {
    this.player = player;
    this.count = 0;
    this.mood = false;
    let fortID = board.addBoard(player.name, U.clone(player.fort), 9, 0);
    C.data.enemyFort = '#_' + fortID + '_D'
    if (game.AI.deck.income != undefined) {
      this.player.miners *= game.AI.deck.income;
      this.player.plants *= game.AI.deck.income;
      this.player.soulProduction *= game.AI.deck.income;
    }
    if (game.AI.deck.baseSouls) this.player.souls += game.AI.deck.baseSouls
    if (game.AI.deck.baseMateria) this.player.materia += game.AI.deck.baseMateria
    if (game.AI.deck.baseEnergy) this.player.energy += game.AI.deck.baseEnergy
    this.turnStart = function() {
      if (player.hand.length < 5) {
        player.draw(2)
      } else if (player.hand.length < 8) {
        player.draw()
      }
      if (player.materia + player.energy + player.souls > 12) {
        outerLoop:
        for (var h = 0; h < player.hand.length; h++) {
          for (let v = 0; v < player.hand[h].options.length; v++) {
            let type = player.hand[h].options[v].split(' ')[0]
            if (type == 'Evolve') {
              if (player.priceCheck(h, 'evolveCost')) {
                let a = player.hand[h].options[v].match(/(?:Evolve to )(.+)/);
                a = a[1]
                player.hand.splice(h, 1);
                for (let p in  player.source) {
                  if (player.source[p].name == a) {
                    let output = U.clone(player.source[p]);
                    player.hand.push(output);
                    break outerLoop;
                  }
                }
              }
            }
          }
        }
      }

      if (Math.random() > .2 || this.count <= 3) {
        let playCards = function(h) {
          if (h < 0) {
            $('#testChange').trigger('change');
            return;
          }
          let playedACard = false;
          //check for upgrade&spell issues later
            if (player.hand[h].options[0] == 'Summon') {
              if (player.priceCheck(h, 'cost')) {
                playedACard = true;
                let bot = Math.round(Math.random())
                let choiceResult = player.play(h)
                board.addBoard(player.name, U.clone(choiceResult), 8, bot)
              }
            } else if (player.hand[h].options[0] == 'Summon on Allied Square') {
              if (player.priceCheck(h, 'cost')) {
                let bot = Math.round(Math.random())
                let squares = []
                for (let i = 2; i <9; i++) {
                  if (player.hand[h].allowedSummon && !player.hand[h].allowedSummon[masterState[i].element[bot]]) continue;
                  if (masterState[i].ownership[bot] == game.AI.name) squares.push(i)
                }
                if (squares.length) {
                  playedACard = true;
                  let choiceResult = player.play(h)
                  board.addBoard(player.name, U.clone(choiceResult), squares[0], bot)
                }

              }
            } else if (player.hand[h].options[0] == 'Build') {
              if (player.priceCheck(h, 'cost')) {
                playedACard = true;
                let choiceResult = player.play(h)
                board.addBoard(player.name, U.clone(choiceResult), 10)
              }
            } else if (player.hand[h].options[0] == 'Cast') {
              if (player.priceCheck(h, 'cost')) {
                if (imports.spellAI({card: player.hand[h], player: player, board: board})) {
                  playedACard = true;
                  player.play(h)
                }
              }
            }
          if (playedACard) {
            setTimeout(function() {
              playCards(--h)
            }, 1000)
          } else {
            setTimeout(function() {
              playCards(--h)
            }, 10)
          }
        }
        playCards(player.hand.length -1)

      } else {
        $('#testChange').trigger('change');
      }
      this.count += 1;
    }
    this.turnEnd = function() {
      player.income();
    }
  }
