{
  'use strict'
  C.events.win = function() {
    if (game.multiplayer) game.bounty = 25;
    let cardBounty;
    if (!account.campaigns) account.campaigns = []
    if (!account.campaigns.includes(game.id) && game.cardBounty) {
      cardBounty = true;
    } else {
      $.post( "/hasBeatenAI", { user: account.login.username, pass : account.login.password, gold:  game.bounty, campaign: game.id}, function( data ) {
        $('#goldDisplay').text(data.response)
        account.campaigns = data.campaigns
      }, 'json');
    }
    let msg = `
    <style>
      .winSelectionCards {
        display: inline-block;
        margin: .25rem;
        transition: all .45s ease-out;
      }
      .winSelectionCards:hover {
        box-shadow: 0px 1px .1rem .25rem gold;
      }
    </style>
    <screenplay><h1>${account.username} is Victorious!</h1>`
    if (game.dialogue && game.dialogue.winMessage) {
      msg += `` + game.dialogue.winMessage + "<hr>"
    }
    msg += `<div id='winBounty'><h2>You have won ${game.bounty} gold pieces</h2>`
    if (cardBounty) {
      msg +=`<h2>Choose your reward:</h2>`
      game.cardBounty.forEach(ele => {
        msg += `<div class='winSelectionCards' data-id="${ele}">${U.longCardFormat(_allCards[ele], '', 1)}</div>`
      })
    }
    msg += `</div><br><button class='btn' onclick='C.events.win.continue();'>Continue</button></screenplay>`
    D.find('#main_game').innerHTML = `<div style= 'text-align:center'> ${msg} </div>`
    D.findAll('.winSelectionCards').forEach(ele=> {
      let card = ele.getAttribute('data-id')
      ele.onclick = function() {
        ele.style['box-shadow'] = '0px 1px .25rem .35rem darkblue'
        ele.style.transform = "scale(1.1, 1.1) rotate(90deg)"
        setTimeout(function() {
          $.post( "/hasBeatenAI", { user: account.login.username, pass : account.login.password, gold:  game.bounty, campaign: game.id, card: card}, function( data ) {
            $('#goldDisplay').text(data.response)
            account.campaigns = data.campaigns
          }, 'json');
          account.cards.push(card)
          D.find('#winBounty').innerHTML = `Card has been added to your library. Check the library tab to see what cards you have and add them to your deck or create a new one.`
        },450)
      }
    })
  }
  C.events.win.continue = function() {
    D.find('#nav').classList.remove('hidden')
    D.find('#nav #Campaign').click();
  }
}
