C.multiplayer.hostGame = function() {
  let msg = U.make('div', {
    style: 'text-align:center; position:absolute;z-index:9999;box-shadow:.1rem .2rem .2rem .1rem #002;padding:1rem;margin:auto;left:0;top:0;bottom:0;right:0; width:60%; height:40%;min-width:14rem;min-height:8rem; background-color:white;border-radius:1rem;',
    onclick: function(e) {
      e.preventDefault();
      e.stopPropagation();
    }
  })
  msg.innerHTML = `
    <label>Game Name: <input type='text' id='gameListingName'></label><br>
    <button id='createGameListing'>Submit</button>
  `
  msg.querySelector('#createGameListing').onclick = function() {
    let name = msg.querySelector('#gameListingName').value;
    U.post('/Cardicus/multiplayer/hostGame', {user: account.login.username, pass: account.login.password, gameName: name}, function(data) {
      if (data == 'success') {
        C.events.successMsg('Game created')
        C.multiplayer.lobby();
      }
    })
    msg.remove();
  }
  D.find('#main_game').append(msg)
  setTimeout(function() {
    D.body.onclick = function() {
      msg.remove();
    }
  }, 10)
}
