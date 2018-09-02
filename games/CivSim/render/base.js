Object.assign(render, {
  base: function(type) {

  },
  shinies: function() {
      D.find('#shinies').innerText = render.trim(pc.shinies)//Math.floor(pc.shinies)
  },
  population: function() {
    D.find('#population').innerText = render.trim(pc.pop)+"/"+render.trim(pc.maxPop)
  },
  land: function() {
    D.find('#land').innerText =  render.trim(pc.usedLand) + '/' + render.trim(pc.usedLand + pc.land)
  },
  logs: function() {
    D.find('#logs').innerText = render.trim(pc.logs)
  },
  morale: function() {
    D.find('#morale').innerText = Math.round(pc.morale * 100)
  },
  gold: function() {
    D.find('#gold').innerText = render.trim(pc.gold)
  },
  clickCounter: function() {
    D.find('#clickCounter').style.background= `linear-gradient(0deg, #00FF0F ${pc.clicks*1.25 - 3}%, #FF002B ${pc.clicks*1.25 + 3}%)`
  },
  trim: function(num) {
    let short = num.toPrecision(3)
    if (num > 999) short = (short.slice(0,4) * 100).toPrecision(3)
    if (num > 999) short += String.fromCharCode(93 + Math.floor(num).toString().length)
    return short;
  },
  iconString: function(x) {
    let cost = ''
    switch(x) {
      case "pop":
        cost += "<img src='images/icons/pop.svg' class='icon_small' title='people'>"
        break;
      case "logs":
        cost += "<img src='images/icons/logs.svg' class='icon_small' title='logs'>"
        break;
      case "gold":
        cost += "<img src='images/icons/coins.svg' class='icon_small' title='gold'>"
        break;
      case "land":
        cost += "<img src='images/icons/land.svg' class='icon_small' title='land'>"
        break;
      case 'time':
        cost += "<img src='images/icons/time.svg' class='icon_small' title='time(beats)'>"
        break;
      case 'shinies':
        cost += "<img src='images/icons/shiny.svg' class='icon_small' title='shinies'>"
        break;
      default: cost += x
    }
    return cost;
  }
})
