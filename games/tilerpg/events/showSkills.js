events.showSkills = function() {
  let hero = data.hero;
  if (data.heroInfoModal) data.heroInfoModal.remove()
  D.find('#heroInfoDisplay').innerHTML = ``

  let modal = D.make('div', {
    style: `width: 90vw; position: fixed; left: 0; right: 0; top: 0; bottom: 0; height: 98vh; background-color: rgba(255,255,255,.97); border-radius: 1rem; z-index: 9000; margin: 1vh auto;padding:5vh;box-sizing:border-box; scroll: auto; max-height:98vh;`
  })
  data.heroInfoModal = modal

  let exit = D.make("button", {
    onclick: function() {
      modal.remove();
      data.isOpen = 'none';
      delete data.heroInfoModal
    },
    innerHTML: 'X',
    style: 'float: right; font-weight; 1000;',
    className: 'btn btnWarn'
  })
  let skillsMatched = []
  let list = skills.heroSkillReq
  for (let x in list) {
    if (list[x].lvl < data.hero.lvl +5) {
      if (!list[x].req) {
        skillsMatched.push(x)
      }
    }
  }

  modal.append(exit, D.make('h2', {
    innerText: "Skills"
  }), D.make('h3', {
    innerText: data.hero.freeSkillPoints + ' skill points remaining'
  }))
  skillsMatched = skillsMatched.sort(function(a, b) {
    return skills.heroSkillReq[a].lvl - skills.heroSkillReq[b].lvl
  })
  skillsMatched.forEach(ele => {
    let item = D.make('div', {
      innerHTML: `<b>${ele}</b> `,
      style: 'padding: .1rem;'
    })
    if (data.hero.skills[ele]) {
      item.append(D.make('span', {
        innerHTML: '-- Already Learned -- lvl ' + data.hero.skills[ele].lvl
      }))
      if (data.hero.equipped.skills[ele]) {
        item.append(D.make('button', {
          innerText: 'unequip',
          style: 'margin-left:1rem;',
          onclick: function() {
            delete data.hero.equipped.skills[ele]
            events.updateSkills()
            events.updateHero()
          }
        }))
      } else {
        item.append(D.make('button', {
          innerText: 'equip',
          style: 'margin-left:1rem;',
          onclick: function() {
            data.hero.equipped.skills[ele] = true
            events.updateSkills()
            events.updateHero()
          }
        }))
      }
    } else if (data.hero.lvl < skills.heroSkillReq[ele].lvl) {
      item.append(D.make('span', {
        innerHTML: ` -- Level ${skills.heroSkillReq[ele].lvl} required to learn this skill.`,
        style: 'color:#400;'
      }))
    } else if (data.hero.freeSkillPoints > 0){
      item.append(D.make('button', {
        innerText: 'Learn',
        className: 'add_skill btn',
        onclick: function () {
          data.hero.freeSkillPoints -= 1;
          data.hero.skills[ele] = {lvl: 1, exp: 0}
          events.updateHero()
        }
      }))
    }
    item.append(D.make('p', {
      innerHTML: skills[ele].tip
    }))
    item.append(D.make('hr'))
    modal.append(item)
  })
  D.find('#main').append(modal)
}
