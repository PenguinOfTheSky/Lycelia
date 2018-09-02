window.minigames = {}
minigames.menu = function(parent) {
  parent.innerHTML = `
    <style>
    #minigames.container{
      margin:0 auto;
      text-align:center;
      margin-top:.2rem;
      width:100%;
      max-width: 100%;
      min-width:300px; 
      border:.3rem outset #222;
      box-shadow: .05rem .05rem .2rem .1rem black;
      background-color: #FAFAFA;
    } 
    dl {
      padding: 1rem;
      text-align: left;
    }
    dl dt {
      color: blue;
      text-decoration: underline;
      cursor: pointer;
    }
    </style>
    <div id='minigames' class='container'>
    <div id='playMinigame'></div>
    <h1>Minigames</h1>
    <dl>
      <dt onclick='minigames.load("minigames/snake/index.html")'>Snake Game</dt>
      <dd>Classic snake game. Eat things, get larger, but don't eat yourself or crash.
      <a href="minigames/snake/LICENSE">License Info</a></dd>
      <dt onclick='minigames.load("minigames/dodge/index.html")'>Dodge Game</dt>
      <dd>Classic dodge game. Avoid the deathly blocks from the sky.
      <a class='link' href="minigames/dodge/LICENSE">License Info</a></dd>
    </dl>
    </div>
  `
}
minigames.load = function(url) {
  D.find('#playMinigame').innerHTML = `<iframe id='minigameIframe' style='width:96%; height: 90vh;margin: 0 auto;' src=${url} sandbox='allow-scripts allow-popups allow-popups-to-escape-sandbox'></iframe>`
  D.find('#minigameIframe').focus()
}
