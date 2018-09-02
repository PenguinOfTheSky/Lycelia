
C.templates.campaign_Template = function() {
  D.find('#main_game').innerHTML =  `
  <div id = 'campaignChooser'>

  </div>
  <style>

    #campaignChooser {
      border: 5px solid black;
      background-color: rgb(10,10,10)
    }
    #campaignChooser .campaignSection div {
      background-color: rgba(20,255,255,.4);
      width:70%;
      display: inline-block;
      min-width:300px;
      box-shadow: 0px 0px 1px 3px rgba(50, 220, 220, .3);
      border-radius:5%;
      margin: 1px;
      position:relative;
      transition: background-color .5s;
    }

    #campaignChooser .campaignSection {
      border: 2px solid silver;
      background-color: rgb(255, 255, 200);
      font-size: 1.1rem;
      width:80%;
      margin: 0 auto;
      text-align:center;
    }
    #campaignChooser .campaignSection div:hover {
      background-color: blue;
    }
    #campaignChooser .campaignChoice {
      cursor: pointer;
    }
  </style>
  `
  let box = D.find('#campaignChooser')
  let output = ``;
  let keys = Object.keys(json.gameData.Campaign)
  keys.sort(function(a,b) {
    return json.gameData.Campaign[a].id - json.gameData.Campaign[b].id
  })
  keys.forEach(function(section) {
    output += `<div class = 'campaignSection'>
    <span><b style='text-shadow: 1px 1px black;font-size: 1.2rem;'>
    ${section} </b>: ${json.gameData.Campaign[section].info.title}</span><br>`
    Object.keys(json.gameData.Campaign[section]).forEach(function(item) {
      if (item == 'id') return;
      if (item !== 'info') {
        output += `<div class = 'campaignChoice' data-section = '${section}' data-item = '${item}'>
        ${json.gameData.Campaign[section][item].title}`
        if (account.campaigns != undefined) {
          account.campaigns.forEach(function(ele) {
            if (ele == item) {
              output +=  `<img style='height:1rem; width:1rem;right:0;left:auto;position:absolute' src='images/checkmark.png'>`
              return 0
            }
          })
        }
        output += `</div>`
      }
    })
    output += '</div>'
  })
  box.innerHTML += output;
  box.querySelectorAll('.campaignChoice').forEach(ele => {
    ele.onclick = function(event) {
      window.game = json.gameData["Campaign"][this.dataset.section][this.dataset.item];
      game.id = this.dataset.item
      C.events.startCampaignGame();
    }
  })

}
