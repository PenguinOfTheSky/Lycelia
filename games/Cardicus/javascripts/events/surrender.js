{
  'use strict'
  C.events.surrender = function(confirmed) {
    let quit
    if (confirmed) {
      quit = true
    } else {
      quit = confirm('Are you sure you want to surrender?')
    }
    if (quit) {
      if (C.audio.ambient) {
        C.audio.ambient.pause()
        C.audio.ambient.remove()
        delete C.audio.ambient
      }
      C.socket.emit('surrender')
      D.find('#nav').classList.remove('hidden')
      let surrenderMsg = U.createNode('div', {
        id: "surrenderMsg",
        style: 'text-align:center; padding: 1rem; z-index:1;border-radius:50;',
        innerHTML: "<screenplay>" + ((game.dialogue && game.dialogue.loseMessage )|| '};') + `
        <br><button class='btn' onclick='D.find("#Campaign").click();'>Continue</button>
        </screenplay>
        `
      })
      D.find('#main_game').innerHTML = ''
      D.find('#main_game').append(surrenderMsg)
    }
  }
}
