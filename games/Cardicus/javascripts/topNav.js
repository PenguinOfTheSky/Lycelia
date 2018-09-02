window.imports.topNav = function() {
  /*var socket = io(window.location.href.split('/').slice(0, 3).join('/'));
  C.socket = socket
  socket.on('error', function (reason){
      console.error('Unable to connect Socket.IO', reason);
  });
  socket.on('connect', function (){
    socket.emit('login', C.keypass)
  });
  socket.on("event", function (data){
      let n = 0
      if (typeof(data) == 'object' && data.run == 'open multiplayer game') {
        D.find('#main_game').innerHTML = ''  // create state-saving function to return to where was?
        window.game = {
          random: function() {
            if (n > 24) {n = 0}
            return data.rng[n++]
          },
          AI: {
            "name": data.name,
            "deck": {
              "base": data.fort,
              "deck": [
                7,7,7
              ]
            }
          },
          elements: data.elements
        }
        C.multiplayer.openGame()
      }
  });
  */
  $('#goldDisplay').text(account.gold)
  $('#main_game').html(C.html.lobby_HTML())
  document.querySelector('#main_game').innerHTML += C.html.log()
  imports.log(D.find('#view'))
  var gold = function (adjustment) {
  $.post( "/gold", { user: username, pass : password, gold:  adjustment}, function( data ) {
    $('#goldDisplay').text(data.gold)
  }, 'json');
  }
  $('.navButton').on('click', function() {
    if (C.audio.ambient) {
      C.audio.ambient.pause()
      C.audio.ambient.remove()
      delete C.audio.ambient
    }
    scrollTo(0,0)
    var id = $(this).attr('id');
    var a = id[0].toLowerCase();
    id = a + id.slice(1);
    if (id == 'campaign') {
      let a = account
      a.user = account.username
      if (!json.gameData) {
        if (!json.gameData) json.gameData = {} //backwards compat. cleanup later.
        json.gameData.Campaign = C.data.campaignList
        let format = function(obj, parent, ele) {
          if (typeof(obj) == 'string') {
            parent[ele] = obj.replace(/\{\{user\}\}/g, account.username)
          } else if (typeof(obj) == 'object') {
            for (let x in obj) {
              format(obj[x], obj, x)
            }
          }
        }
        format(json.gameData)
      }
      C.templates.campaign_Template()
    } else if (id == 'logout') {
      delete Card.user.username
      delete Card.user.password
      Card.events.save()
      location.reload();
    } else if (id=='lobby') {
      $('#main_game').html(C.html.lobby_HTML() + C.html.log())
      imports.log(D.find('#view'))
    } else if (id=='multiplayer') {
      C.multiplayer.lobby()
    } else if (id=='store') {
      C.templates.store()
    } else if (id=='forum') {
      C.forum.base()
    } else if (id=='settings') {
      C.templates.settings(D.find('#main_game'))
    } else if (id=='minigames') {
      minigames.menu(D.find('#main_game'))
    } else if (id=='library') {
      /*D.find('#main_game').innerHTML = C.templates.library()
      imports.library()
      //library unnecessary?
      */
      D.find('#main_game').innerHTML = C.templates.deckEditor_Template()
      imports.deckEditor();
      $('#library_Deck').html($('#library_decks_template').html())
    } else $('#main_game').html($('#' + id).html())
  });
}
