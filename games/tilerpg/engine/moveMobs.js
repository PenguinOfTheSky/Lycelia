engine.moveMobs = function(opts) {
  engine.removeDebuff(data.hero, opts.ap)
  let mobs = state.mobs
  let hero = data.hero
  let makeMove = function(ele) {
    let moved = false;
    if (!ele.ms || Math.random() > ele.ms) return;
    if (Math.abs((hero.x - ele.x) + (hero.y - ele.y)) > 6) return;
    let oldXY = [ele.x, ele.y]
    let xOff = (hero.x - ele.x)
    let yOff = (hero.y - ele.y)
    if (Math.abs(xOff) > Math.abs(yOff) && engine.checkTile(ele.x+Math.sign(xOff), ele.y)) {
      moved = true
      ele.x += Math.sign(xOff)
      Object.assign(ele.ref.style, {
        left: (ele.x * tileSize)+'vh',
        top: (ele.y * tileSize) + 'vh'
      })
    } else if ((Math.abs(xOff) < Math.abs(yOff) || !moved) && engine.checkTile(ele.x, ele.y+Math.sign(yOff))) {
      moved = true;
      ele.y += Math.sign(yOff)
      Object.assign(ele.ref.style, {
        left: (ele.x * tileSize)+'vh',
        top: (ele.y * tileSize) + 'vh'
      })
    } else {
      if (engine.checkTile(ele.x, ele.y+Math.sign(yOff))) {
        moved = true
        ele.y += Math.sign(yOff)
        Object.assign(ele.ref.style, {
          left: (ele.x * tileSize)+'vh',
          top: (ele.y * tileSize) + 'vh'
        })
      } else if (engine.checkTile(ele.x+Math.sign(xOff), ele.y)) {
        moved = true
        ele.x += Math.sign(xOff)
        Object.assign(ele.ref.style, {
          left: (ele.x * tileSize)+'vh',
          top: (ele.y * tileSize) + 'vh'
        })
      }
    }
    if (moved) {
      if (ele.closed !== false) state.tiles[ele.x][ele.y].closed = true;
      state.tiles[oldXY[0]][oldXY[1]].closed = false;
    }
  }
  mobs.forEach((ele,i) => {
    ele.ap += opts.ap
    let dist = Math.sqrt((hero.x - ele.x)**2 + (hero.y - ele.y)**2)
    if (ele.item == true) {
      let used = false;
      if (ele.consumable) {
        if (ele.onEnter && dist === 0) {
          if (ele.onEnter.heal) {
            let diff = data.hero.maxHp - data.hero.hp
            if (diff > 0) {
              data.hero.hp += ele.onEnter.heal
              if (data.hero.hp > data.hero.maxHp) {
                data.hero.hp = data.hero.maxHp
              }
              used = true;
            }
          }
          if (ele.onEnter.restoreMana) {
            let diff = data.hero.maxMp - data.hero.mp
            if (diff > 0) {
              data.hero.mp += ele.onEnter.restoreMana
              if (data.hero.mp > data.hero.maxMp) {
                data.hero.mp = data.hero.maxMp
              }
              used = true;
            }
          }
        }
      }

      if (used) {
        ele.ref.remove();
        delete state.mobs[i]
      }
      return;
    }
    if (ele.ap > 15) ele.ap = ele.ap = 15;
    let range = 0;
    let skill;
    if (ele.skills) {
      for (let x in ele.skills) {
        if (skills[x].create(ele.skills[x].lvl, ele).range > 0) {
          range = skills[x].create(ele.skills[x].lvl, ele).range
          skill = x
        }
      }
    }
    if (range >= dist && skill) {
      engine.useSkill({user: ele, target: data.hero, skill: skills[skill].create(ele.skills[skill].lvl, ele), skillName: skill})
    } else if (ele.ap >= 5) makeMove(ele)
    engine.removeDebuff(ele, opts.ap) //hope this works.
  })
  events.updateHero()
}
