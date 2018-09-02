events.updateSkills = function() {
  for (let n = 1; n < 7; n++) {
    D.find('#skill'+n).innerHTML = ''
  }
  let i=0
  for (let x in data.hero.equipped.skills) {
    i++
    let icon = D.make('div', {
      className: 'btn',
      style: 'background-color:blue;height:100%;width:100%;',
      innerText: i + '. ' + x,
      onclick: function() {
        if (window.globalCD) return;
        let skill = skills[x].create(data.hero.skills[x].lvl, data.hero)
        if (skill.target.unit) {
          let hero = data.hero
          let found = []
          state.mobs.forEach((ele, i) => {
            if (Math.sqrt((hero.x - ele.x)**2 + (hero.y - ele.y)**2) <= skill.range && !ele.consumable) {
              found.push(ele);
              window.globalCD = true;
              Object.assign(ele.ref.style, {
                "animation-name": "targetingSkill", "animation-duration": "4s", "animation-iteration-count": "infinite",
                "cursor": 'pointer'
              })
              ele.ref.onclick = function() {
                engine.useSkill({skill: skill, target: ele, user: hero, i: i, skillName: x, callback: function() {
                  found.forEach(ele=> {
                    Object.assign(ele.ref.style, {
                      "animation-name": "",
                      "animation-duration": "", "animation-iteration-count": "",
                      "cursor": 'auto'
                    })
                    ele.ref.onclick = undefined
                  })
                  engine.moveMobs({ap: skill.cost.ap})
                }})
              }
            }
          })
          if (!found.length) {
            events.say('No enemies in range of spell!')
          }
        }
      }
    })
    D.find('#skill'+i).append(icon)
  }
}
