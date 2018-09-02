C.multiplayer.lobby = function() {
  D.find('#main_game').innerHTML = `
    <style>
      #multiplayer{
        margin:0 auto;
        text-align:center;
        margin-top:.2rem;
        width:90%;
        min-width:300px;
        border:.3rem outset #222;
        box-shadow: .05rem .05rem .2rem .1rem black;
        background-color: #FAFAFA;
      }
      #lobby {
        width: 100%;
        margin:.3rem;
      }
      #lobby, #lobby tr, #lobby td, #lobby th {
        border: 1px solid black;
        border-collapse: collapse;
        word-break:break-all;
      }
      #chatContainer {
        min-height:3rem;
        box-shadow: 0px 1px .05rem .1rem black;
        background-color: #FAFAFA;
        margin: .4rem;
        padding: .3rem;
        max-height: 8rem;
        overflow-y: auto;
      }
    </style>
    <div id='multiplayer'>
      <h1>Multiplayer Lobby</h1>
      <div>
        <h2 id ='userCount'></h2>
        <p>If you host a game, game will load automatically when someone joins. Feel free to play minigames as you wait.</p>
        <button id='refreshLobby' style='transition: all 1.5s ease-out;' class='btn'>Refresh Lobby</button>
        <table id ='lobby'>
          <thead>
            <tr>
              <th>Game Name</th>
              <th>Creator</th>
              <th style='width:10%;min-width:4rem;'>Created</th>
              <th style='width:8%;min-width:3rem;'>Join</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
        <div id='lobbyOptions'>
          <button class='btn' onclick='C.multiplayer.hostGame();'>Host a game</button>
        </div>
      </div>
      <hr style='height:.4rem; background-color: rebeccapurple;'>
      <div id='chatContainer'>
        <b style='text-align:center;'>All Chat</b>
        <div id='chatDisplay'></div>
      </div>
      <form id='chatInput'>
        <input type='text' name='text' style='width:12rem;max-width:90vw'>
        <input type='submit' value='send' class='btn'>
      </form>
    </div>
  `
  D.find('#refreshLobby').onclick = function() {
    this.style.filter = "invert(100%)"
    this.style.transform = "rotate(360deg)"
    setTimeout(function() {
      C.multiplayer.lobby();
    },1500)
  }
  D.find('#chatInput').onsubmit = function(e) {
    e.preventDefault()
    let text = this.text.value
    this.text.value = ''
    C.socket.emit('allChat', {keypass: C.keypass,text: text})
  }
  let badWords = new RegExp(/((fuck)|( tit)|(cunt)|(nigger)|(cock)|(negro))s*/, 'ig')
  C.socket.off('allChat')
  C.socket.on('allChat', function(msg) {
    let div = U.make('div')
    let user = U.make('span', {
      innerText: msg.user + ': ',
      style: 'color: blue;'
    })
    let text = U.make('span', {
      innerText: msg.text.replace(badWords, "****")
    })
    div.append(user, text)
    D.find('#chatDisplay').prepend(div)
  })
  U.post('/Cardicus/multiplayer/getLobby', C.keypass.user, function(res) {
    res = JSON.parse(res)
    let data = res.waitingGames
    D.find('#userCount').innerText = res.userCount + ' players online'
    let frag = document.createDocumentFragment()
    for (let i in data) {
      let row = U.make('tr')
      row.innerHTML = `
        <td>${data[i].gameName}</td>
        <td>${data[i].user}</td>
        <td>${(new Date(data[i].created)).toLocaleTimeString()}</td>
        <td>
          <button class='btn' onclick="C.multiplayer.joinGame('${data[i].user}');">Join</button>
        </td>
      `
      frag.appendChild(row)
    }
    D.find('#multiplayer #lobby tbody').appendChild(frag)
    let text = res.allChat.reverse()
    let textFrag = document.createDocumentFragment()
    text.forEach(ele => {
      let div = U.make('div')
      let user = U.make('span', {
        innerText: ele.user + ': ',
        style: 'color: blue;'
      })
      let text = U.make('span', {
        innerText: ele.text.replace(badWords, "****")
      })
      div.append(user, text)
      textFrag.append(div)
    })
    D.find('#chatDisplay').append(textFrag)
  })
}
