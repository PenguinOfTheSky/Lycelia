events.updateHero = function() {
  {
    let percent = (data.hero.hp/data.hero.maxHp)
    data.hero.maxHp = engine.makeHp(data.hero)
    data.hero.hp = engine.makeHp(data.hero) * percent
  }
  {
    let percent = (data.hero.mp/data.hero.maxMp)
    data.hero.maxMp = engine.makeMp(data.hero)
    data.hero.mp = engine.makeMp(data.hero) * percent
  }
  let status = D.make('div')
  let hpBar = D.make('div', {
    innerText: `Health ${Math.round(data.hero.hp)}/${Math.round(data.hero.maxHp)}`
  })
  hpBar.append(D.make('div', {
    className: 'hpBarStatus',
    style: `background:linear-gradient(90deg, green ${data.hero.hp/data.hero.maxHp * 100|| 100}%, red ${data.hero.hp/data.hero.maxHp * 100|| 100}%);height:10px;`
  }))
  let mpBar = D.make('div', {
    innerText: `Mana ${Math.round(data.hero.mp)}/${Math.round(data.hero.maxMp)}`
  })
  mpBar.append(D.make('div', {
    className: 'mpBarStatus',
    style: `background:linear-gradient(90deg, blue ${data.hero.mp/data.hero.maxMp * 100|| 100}%, red ${data.hero.mp/data.hero.maxMp * 100|| 100}%);height:10px;`
  }))
  let lvl = D.make('div', {
    innerHTML: 'Lvl: ' + data.hero.lvl +', ',
    style: 'padding: .1vh; border-radius: .2vh;'
  })
  let armor = D.make('div', {
    innerHTML: 'Armor: ' + data.hero.armor,
    style: 'padding: .1vh; border-radius: .2vh;margin-left:.5vw;'
  })
  let heroStuff = D.make('div', {
    style: 'display:flex;flex-wrap:wrap;'
  })
  heroStuff.append(lvl, armor)
  status.append(heroStuff, hpBar, mpBar)
  D.find('#readout').innerHTML = ''
  D.find('#readout').append(status)
  D.find('#freeStatPoints').innerHTML = data.hero.freeStatPoints
  D.find('#freeSkillPoints').innerHTML = data.hero.freeSkillPoints
  if (data.isOpen == 'stats') events.showStats()
  else if (data.isOpen =='skills') events.showSkills()
  else if (data.isOpen == 'none') {
    D.find('#heroInfoDisplay').innerHTML = ''
    if (data.heroInfoModal) data.heroInfoModal.remove()
    delete data.heroInfoModal
  }
  data.hero.ref.querySelector('.hpBar').style.background = `linear-gradient(90deg, green ${data.hero.hp/data.hero.maxHp*100}%, red ${data.hero.hp/data.hero.maxHp*100}%)`
  if (data.hero.freeStatPoints == 0) {
    D.findAll('.add_stat').forEach(ele=> {
      ele.style.visibility = 'hidden'
    })
    Object.assign(D.find('#freeStatPoints').parentNode.style, {
      "font-weight":400,
      "text-decoration": ''
    })
    Object.assign(D.find('#freeStatPoints').style, {
      "font-weight":400
    })
  } else {
    D.findAll('.add_stat').forEach(ele=> {
      ele.style.visibility = 'visible'
    })
    Object.assign(D.find('#freeStatPoints').style, {
      "font-weight":1000
    })
    Object.assign(D.find('#freeStatPoints').parentNode.style, {
      "font-weight":700,
      "text-decoration": 'underline'
    })
  }
  if (data.hero.freeSkillPoints == 0) {
  /*  D.findAll('.add_stat').forEach(ele=> {
      ele.style.visibility = 'hidden'
    })*/
    Object.assign(D.find('#freeSkillPoints').parentNode.style, {
      "font-weight":400,
      "text-decoration": ''
    })
    Object.assign(D.find('#freeSkillPoints').style, {
      "font-weight":400
    })
  } else {
  /*  D.findAll('.add_stat').forEach(ele=> {
      ele.style.visibility = 'visible'
    })*/
    Object.assign(D.find('#freeSkillPoints').style, {
      "font-weight":1000
    })
    Object.assign(D.find('#freeSkillPoints').parentNode.style, {
      "font-weight":700,
      "text-decoration": 'underline'
    })
  }
}
