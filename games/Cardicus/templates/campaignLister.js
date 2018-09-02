
C.templates.campaign_Template = function() {
  D.find('#main_game').innerHTML =  `
  <div id = 'campaignChooser'>

  </div>
  <style>

    #campaignChooser {
      border: 5px solid black;
      background-color: rgb(10,10,10);
      display: flex;
      flex-flow:column;
      height:100%;
      text-shadow: 1px 1px 8px white;
      font-weight: 700
    }
    #campaignChooser .campaignSection div {
      background-color: rgba(40,255,255,.7);
      width:70%;
      display: inline-block;
      min-width:300px;
      box-shadow: 0px 0px 1px 3px rgba(50, 220, 220, .3);
      border-radius:.5rem;
      margin: 1px;
      position:relative;
      transition: background-color .5s;
    }

    #campaignChooser .campaignSection {
      border: 2px solid #111;
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
    #campaignChooser .unlocked {
      cursor: pointer;
      background-color: #4ef14d;
      font-size: 1.2rem;
    }
  </style>
  `
  let box = D.find('#campaignChooser')
  let output = ``;
  let keys = Object.keys(json.gameData.Campaign)
  keys.sort(function(a,b) {
    return json.gameData.Campaign[a].id - json.gameData.Campaign[b].id
  })
  let creds
  if (!account.campaigns) creds = 0
  else creds = account.campaigns.length
  if (account.username == 'cow') creds = 200;
  keys.forEach(function(section) {
    let req = json.gameData.Campaign[section].info.required || 0
    if (creds >= req) {

      output += `<div class = 'campaignSection unlocked' data-name="${section}">
      <span><b style='text-shadow: 1px 1px black;font-size: 1.2rem;'>
      ${section} </b>`
    } else if (req > creds+5){
      output +=  `<div class = 'campaignSection'>
      <span><b style='text-shadow: 1px 1px black;font-size: 1.2rem;'>
      ??? </b>
      <img style='height:1rem; width:1rem;' src='images/icons/lock.svg'> ${creds}/${req}`
    } else {
      output +=  `<div class = 'campaignSection'>
      <span><b style='text-shadow: 1px 1px black;font-size: 1.2rem;'>
      ${section} </b>
      <img style='height:1rem; width:1rem;' src='images/icons/lock.svg'> ${creds}/${req}`
    }
    output += '</div>'
  })
  box.innerHTML += output;
  box.querySelectorAll('#campaignChooser .unlocked').forEach(ele => {
    ele.onclick = function(event) {
      let area = json.gameData.Campaign[this.dataset.name]
      if (area.info.music) {
        let playMusic = function(item, mod, ambient) {
          let audio
          if (!ambient) {
            audio = D.make('audio', {
              src: item,
              style: 'display:none;'
            })
            D.find('#main_game').append(audio)
          } else {
            audio = new Audio(item)
            C.audio.ambient = audio
          }


          if (mod) {
            mod(audio)
          } else {
            let dampen = function() {
              if (audio && !audio.ended && !audio.paused) {
                setTimeout(function() {
                  audio.volume *= .99
                  dampen()
                }, 600)
              }
            }
            setTimeout(function() {
              dampen()
            }, 600)
          }
          audio.play()
        }
        let checkMusic = function(item) {
          if (typeof(item) == 'string') {
            playMusic (item)
          }
        }
        if (area.id == 2) {
          playMusic(area.info.music[0], function(audio) {
            audio.volume = .18
            let dampen = function(time) {
              if (audio && !audio.ended && (audio.currentTime == 0 || !audio.paused)) {
                setTimeout(function() {
                  audio.volume *= 1.01
                  dampen(audio.currentTime)
                }, 600)
              }
            }
            dampen()
          })
          setTimeout(function() {
            //fix this potential error later.
            if (D.find('.campaignSection')) playMusic(area.info.music[1])
          },23000)
        } else if (area.id == 3) {
          playMusic(area.info.music[0], function(audio) {
            audio.volume = .60
            let dampen = function(time) {
              if (audio && !audio.ended && (audio.currentTime == 0 || !audio.paused)) {
                setTimeout(function() {
                  audio.volume *= .99
                  dampen(audio.currentTime)
                }, 250)
              }
            }
            dampen()
          })
          setTimeout(function() {
            //fix this potential error later.
            //if (D.find('.campaignSection')) playMusic(area.info.music[1])
          },13000)
        } else if (area.id == 0){
          let tune = Math.round(Math.random())
          let ambient = function() {
            let ambient = Math.floor(Math.random() * 4)
            switch (ambient){
              case 0: ambient = area.info.music[1]; break;
              case 1: ambient = area.info.music[3]; break;
              case 2: ambient = "audio/campaign/ambientBirds2.mp3"; break;
              case 3: ambient = "audio/campaign/ambientBirds3.mp3"; break;
              default: ambient = area.info.music[3]
            }
            return ambient
          }

          ambientTime = Math.round(Math.random() * 20) * Math.random()
          playMusic(area.info.music[(tune ? 0 : 2)], function(audio) {
            audio.volume = .30
            let dampen = function() {
              if (!audio.ended) {
                setTimeout(function() {
                  audio.volume *= .995
                  if (audio.currentTime > 15) {
                    audio.volume *=.993
                  }
                  if (audio.currentTime > 54) {
                    audio.volume *=.96
                  }
                  dampen()
                }, 250)
              }
            }
            dampen()
          })
          playMusic(ambient(), function(audio) {
            C.audio.ambient = audio;
            let adjustTime = function(hasEnded) {
              audio.currentTime = Math.floor(Math.random() * audio.duration)
              audio.removeEventListener('canplaythrough', adjustTime, 0)
              if (hasEnded) audio.play()
            }
            audio.addEventListener('canplaythrough', adjustTime, false);
            audio.onended = function() {
              if (!audio) return;
              audio.src = ambient()
              audio.load()
              audio.addEventListener('canplaythrough', adjustTime, false);
            }

          }, true)
        } else {
          checkMusic(area.info.music)
        }
      }
      let output = D.make('div', {
        innerHTML: `<h1 style='text-shadow:0.1rem 0.1rem 0.3rem white;'>${this.dataset.name}</h1>
        <p style='background-color:rgba(255,255,255,.7);border-radius:1rem;padding:.5rem;margin:.85rem;'>
          <i>${area.info.title}</i>
        </p>`,
        className: 'campaignSection',
        style: `height:100%;width:100%;background-size:cover;`
      })
      let str = ``
      let section = this.dataset.name
      Object.keys(json.gameData.Campaign[section]).forEach(function(item) {
        if (item == 'id') return;
        if (item !== 'info') {
          str += `<div class = 'campaignChoice' data-section = '${section}' data-item = '${item}'>
          ${json.gameData.Campaign[section][item].title}`
          if (account.campaigns != undefined) {
            account.campaigns.forEach(function(ele) {
              if (ele == item) {
                str +=  `<img style='height:1rem; width:1rem;right:0;left:auto;position:absolute' src='images/checkmark.png'>`
                return 0
              }
            })
          }
          str += `</div>`
        }
      })
      output.innerHTML += str;

      if (area.info.backgroundImage) output.style['background-image'] = 'url("' + area.info.backgroundImage + '")'
      D.find('#campaignChooser').innerHTML = ''
      D.find('#campaignChooser').append(output)
      box.querySelectorAll('.campaignChoice').forEach(ele => {
        ele.onclick = function(event) {
          window.game = json.gameData["Campaign"][this.dataset.section][this.dataset.item];
          game.id = this.dataset.item
          C.events.startCampaignGame();
        }
      })
    }
  })


}
