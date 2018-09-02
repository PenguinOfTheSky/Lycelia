{
  'use strict'
  let audio;
  C.events.startCampaignGame = function() {
    let height = D.find('.campaignSection').clientHeight
    let msg = `<screenplay style='overflow-y:scroll; max-height: ${height-50}px;'>
    <h1>${game.title}</h1>`
    if (game.dialogue && game.dialogue.introduction) {
      if (game.music && game.music.introduction) {
        if (typeof(game.music.introduction) == 'string') {
          audio = new Audio(game.music.introduction)
        } else {
          let obj = game.music.introduction
          audio = new Audio(obj.src)
          if (obj.volume) audio.volume = +obj.volume
          if (obj.currentTime) audio.currentTime = +obj.currentTime
        }
        audio.play()
        window.campaignMusicInterval = setInterval(function() {
          if (!D.find('screenplay') || !audio || audio.ended) {
            if (audio) {
              audio.pause()
              delete audio;
            }
            delete campaignMusicInterval
          } else {
            if (audio) audio.volume *=.94
          }
        }, 1000)
      }
      msg += `
      ${game.dialogue.introduction}
      `
    } else {
      msg += `
      <p> Prepare yourself! </p>`
    }
    msg += `<br><button class='btn' onclick='C.events.startCampaignGame.continue();'>Fight!</button>
    </screenplay>`
    D.find('#main_game .campaignSection').innerHTML = `<div style= 'text-align:center;background-color: transparent;box-shadow:none;'> ${msg} </div>`
  }
  C.events.startCampaignGame.continue = function() {
    if (audio) audio.pause()
    delete audio;
    $('#main_game').html($('#campaignStart').html())
    D.find('#UIarea').innerHTML = C.templates.UI()
    scrollTo(0,0);
    U.post( "/login", account.login, function( data ) {
      data = JSON.parse(data)
      login = account.login
      account = data
      account.login = login;
      XstartCampaign();
    })
    D.find('#nav').classList.add('hidden')
  }
}
