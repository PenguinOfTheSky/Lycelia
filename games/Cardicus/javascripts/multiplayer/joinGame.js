C.multiplayer.joinGame = function(str) {
  'use strict'
  if (str != account.login.username) {
    
    U.post('/Cardicus/multiplayer/joinGame', {user: account.login.username, pass: account.login.password, gameHoster: str}, function(data) {
      console.log(data)
    })
  }
}
