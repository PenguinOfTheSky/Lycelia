//temp
let id = 'A1'
let tileSize = 11

D.find(':root').style.setProperty('--tileSize', tileSize+'vh')
let load = function(id) {
  data.tileSize = tileSize;
  let json = data.json[id]
  window.state = json;
  if (!json.current) {
    //events.introductionMessage(json.introduction)
    events.say(json.introduction)
  }
  let map = D.make('div', {

  })
  for (let x in json.tiles) {
    for (let y in json.tiles[x]) {
      let tile = D.make('div', {
        className: 'tile ' + json.tiles[x][y].class
      })
      Object.assign(tile.style, {
        left: (x * tileSize)+'vh',
        top: (y * tileSize) + 'vh'
      })
      map.append(tile)
    }
  }
  let renderUnit = function(unit) {
    let icon = D.make('div', {
      className: 'unit ' + (unit.name || ''),
    })
    Object.assign(icon.style, {
      left: (unit.x * tileSize)+'vh',
      top: (unit.y * tileSize) + 'vh'
    })
    return icon
  }
  if (!json.current) {
    data.hero = {
      type: 'hero',
      x: json.start[0],
      y: json.start[1],
      move: function(x, y) {
        state.tiles[this.x][this.y].closed = false;
        this.x += x
        this.y += y;
        state.tiles[this.x][this.y].closed = true;
        Object.assign(this.ref.style, {
          left: (this.x * tileSize)+'vh',
          top: (this.y * tileSize) + 'vh'
        })
        if (json.tiles[this.x][this.y].onEnter) {
          json.tiles[this.x][this.y].onEnter(data.hero)
        }
        if (json.tiles[this.x][this.y].enterMsg) {
          events.say(json.tiles[this.x][this.y].enterMsg)
          delete json.tiles[this.x][this.y].enterMsg
        }
      }
    }
    let hero = renderUnit(data.hero)
    hero.id = 'hero'
    json.mobs.forEach(ele=> {
      ele.ref = renderUnit(ele)
      if (mobs[ele.name].hp) ele.hp = mobs[ele.name].hp(ele.lvl)
      map.append(ele.ref)
      map.append(ele.ref)
    })
    data.hero.ref = hero;
    map.append(hero)
  }
  D.find('#tileArea').innerHTML = ''
  D.find('#tileArea').append(map)
}
load(id)
engine.checkTile = function(x, y) {
  if (state.tiles[x] && state.tiles[x][y] && !state.tiles[x][y].closed) return true;
}
engine.moveMobs = function(mobs) {
  let hero = data.hero
  mobs.forEach(ele => {
    if (!ele.ms || Math.random() > ele.ms) return;
    if (Math.abs((hero.x - ele.x) + (hero.y - ele.y)) > 6) return;

    let xOff = (hero.x - ele.x)
    let yOff = (hero.y - ele.y)
    if (Math.abs(xOff) > Math.abs(yOff)) {
      if (engine.checkTile(ele.x+Math.sign(xOff), ele.y)) {
        ele.x += Math.sign(xOff)
        Object.assign(ele.ref.style, {
          left: (ele.x * tileSize)+'vh',
          top: (ele.y * tileSize) + 'vh'
        })
      }
    } else if (Math.abs(xOff) < Math.abs(yOff)) {
      if (engine.checkTile(ele.x, ele.y+Math.sign(yOff))) {
        ele.y += Math.sign(yOff)
        Object.assign(ele.ref.style, {
          left: (ele.x * tileSize)+'vh',
          top: (ele.y * tileSize) + 'vh'
        })
      }
    } else {
      if (engine.checkTile(ele.x, ele.y+Math.sign(yOff))) {
        ele.y += Math.sign(yOff)
        Object.assign(ele.ref.style, {
          left: (ele.x * tileSize)+'vh',
          top: (ele.y * tileSize) + 'vh'
        })
      } else if (engine.checkTile(ele.x+Math.sign(xOff), ele.y)) {
        ele.x += Math.sign(xOff)
        Object.assign(ele.ref.style, {
          left: (ele.x * tileSize)+'vh',
          top: (ele.y * tileSize) + 'vh'
        })
      }
    }

  })
}
engine.attackMobs = function(mobs) {
  let hero = data.hero
  mobs.forEach(ele => {
    //if (!ele.ms || Math.random() > ele.ms) return;
    if ((hero.x != ele.x) || (hero.y != ele.y)) return;
    console.log('hits for 5 dmg')
  })
}
window.play = function(action) {
  let json = data.json[id]
  if (action == 'down') {
    if (json.tiles[data.hero.x] && json.tiles[data.hero.x][data.hero.y+1] && !json.tiles[data.hero.x][data.hero.y+1].closed) {
      data.hero.move(0,1)
    }
  } else if (action == 'up') {
    if (json.tiles[data.hero.x] && json.tiles[data.hero.x][data.hero.y-1] && !json.tiles[data.hero.x][data.hero.y-1].closed) {
      data.hero.move(0,-1)
    }
  } else if (action =='left') {
    if (json.tiles[data.hero.x-1] && json.tiles[data.hero.x-1][data.hero.y] && !json.tiles[data.hero.x-1][data.hero.y].closed) {
      data.hero.move(-1,0)
    }
  } else if (action =='right') {
    if (engine.checkTile(data.hero.x+1, data.hero.y)) {
      data.hero.move(1,0)
    }
  }
  engine.moveMobs(json.mobs);
  engine.attackMobs(json.mobs)
}
