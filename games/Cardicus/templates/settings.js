C.templates.settings = function(ele) {
  ele.innerHTML = `
    <style>
      #settings_container {
        text-align:center;
      }
    </style>
    <div class='row' id = 'settings_container'> (not currently functional)
      <flex style='flex-direction: column;'>
      <label> Overall Volume: 0<input id='overall_Volume' type=range max=1 step=.01 min=0 value=${volume.overall}>100%</label>
      <label> Music Volume: 0<input id='music_Volume' type=range max=1 step=.01 min=0 value=${volume.music}>100%</label>
      <label> Ambient Volume: 0<input id='ambient_Volume' type=range max=1 step=.01 min=0 value=${volume.ambient}>100%</label>
      <label> Sound Effects Volume: 0<input id='sfx_Volume' type=range max=1 step=.01 min=0 value=${volume.sfx}>100%</label>
      </flex>
    </div>
  `
  D.find('#overall_Volume').onchange = function() {
    Card.settings.volume.overall = +this.value
    Card.events.save()
  }
  D.find('#music_Volume').onchange = function() {
    Card.settings.volume.music = +this.value
    Card.events.save()
  }
  D.find('#ambient_Volume').onchange = function() {
    Card.settings.volume.ambient = +this.value
    Card.events.save()
  }
  D.find('#sfx_Volume').onchange = function() {
    Card.settings.volume.sfx = +this.value
    Card.events.save()
  }
}
