engine.loadMap = function(id) {
  data.tileSize = tileSize;
  let json = maps[id](data.hero.lvl)
  window.state = json;
  if (!json.current) {
    //events.introductionMessage(json.introduction)
    events.say(json.introduction)
  }
  let map = D.make('div', {
  })
  state.map = map;
  let obstructions = {
    boulder: true
  }
  for (let x in json.tiles) {
    for (let y in json.tiles[x]) {
      let tile = D.make('div', {
        className: 'tile ' + json.tiles[x][y].class,
        id: x+'_'+y
      })
      if (obstructions[json.tiles[x][y].class])  json.tiles[x][y].closed = true;
      if (mobs[json.tiles[x][y].class]) {
        tile.style = mobs[json.tiles[x][y].class].style
      }
      Object.assign(tile.style, {
        left: (x * tileSize)+'vh',
        top: (y * tileSize) + 'vh'
      })
      map.append(tile)
    }
  }
  engine.renderUnit = function(unit) {
    let icon = D.make('div', {
      className: 'unit ' + (unit.name || ''),
    })
    Object.assign(icon.style, {
      left: (unit.x * tileSize)+'vh',
      top: (unit.y * tileSize) + 'vh',

    })
    let hpBar = D.make('div', {
      className: 'hpBar',
      style: `background:linear-gradient(90deg, green ${unit.hp/unit.maxHp * 100|| 100}%, red ${unit.hp/unit.maxHp * 100|| 100}%);height:10px;`
    })
    /*let titleBar = D.make('div', {
      className: 'titleBar',
      innerText: unit.title || 'unknown'
    })*/
    let lvlBar = D.make('div', {
      className: 'lvlBar',
      innerText: 'lvl ' + unit.lvl,
      style: 'bottom:0;position:absolute;z-index:1;color:white;text-shadow:1px 1px 2px black;left:0;right:0;pointer-events:none;text-align:center;'
    })
    if (unit.item) {
    //  icon.append( lvlBar)
    } else {
      icon.append(hpBar, lvlBar)
    }

    return icon
  }
  if (!json.current) {
    Object.assign(data.hero, {
      type: 'hero',
      x: json.start[0],
      y: json.start[1],
      hp: engine.makeHp(data.hero),
      maxHp: engine.makeHp(data.hero),
      mp: engine.makeMp(data.hero),
      maxMp: engine.makeMp(data.hero),
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
          if (json.tiles[this.x][this.y].onEnter.nextLevel) {
            engine.loadMap(json.tiles[this.x][this.y].onEnter.nextLevel)
          }
        }
        if (json.tiles[this.x][this.y].enterMsg && !json.tiles[this.x][this.y].first) {
          events.say(json.tiles[this.x][this.y].enterMsg)
          json.tiles[this.x][this.y].first = true
        }
        centerRadial()
      }
    })
    let hero = engine.renderUnit(data.hero)
    data.hero.ref = hero
    hero.id = 'hero'
    hero.style.backgroundImage = 'url(images/egg.svg)'

    events.updateHero()
    events.updateSkills()
    let centerRadial = function() {
      Object.assign(D.find('#tileArea').style, {
        transform: `translate(${50-((data.hero.x+.5) * tileSize)}%, ${ 50-((data.hero.y+.5) * tileSize)}%)`
        //left: -50 + (data.hero.x * tileSize) + 'vh',
        //top: -50 + (data.hero.y * tileSize) + 'vh'
      })

    }
    centerRadial()
    json.mobs.forEach(ele=> {
      engine.createMob(ele)

    })
    data.hero.ref = hero;
    map.append(hero)
  }
  D.find('#tileArea').innerHTML = ''
  D.find('#tileArea').append(map)
}
