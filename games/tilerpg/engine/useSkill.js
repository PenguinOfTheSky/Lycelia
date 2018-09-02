engine.useSkill = function(opts) {
  let {skill, target, user, callback, i, skillName} = opts //do i need i?
  if (skill.cost.mp) {
    user.mp -= skill.cost.mp
  }
  if (skill.cost.hp) {
    user.hp -= skill.cost.hp
  }
  let critRoll = Math.random()
  if (critRoll < .5) critRoll += .5
  let accRoll = Math.random()
  let dmg = false;
  let selfDmg = false;
  if (skill.type.attack) {
    if (skill.type.simpleDamage) {
      let modDmg = skill.damage - (target.armor - user.lvl**1.15)

      modDmg *= critRoll**2
      console.log(skill.damage, modDmg)
      target.hp -= modDmg
      window.globalCD = false;

      dmg = true;
      if (target.onStruck) {
        if (target.onStruck.barbed && skill.type.melee) {
          selfDmg = true;
          user.hp -= target.onStruck.barbed
        }
      }
    }
  }
  if (skill.type.spell) {
    if (skill.type.simpleDebuff) {
      window.globalCD = false;
      for (let stat in skill.debuff) {
        target[stat] -= skill.debuff[stat]
      }
      if (!target.activeDebuffs) target.activeDebuffs = []
      target.activeDebuffs.push({length: skill.length, stats: JSON.parse(JSON.stringify(skill.debuff))})
    }
  }

  if (dmg) {
    target.ref.querySelector('.hpBar').style.background = `linear-gradient(90deg, green ${target.hp/target.maxHp*100}%, red ${target.hp/target.maxHp*100}%)`
    if (target.hp <= 0) {
      target.ref.style.opacity = 0;
      setTimeout(function() {
        target.ref.remove()
      },250)

      state.tiles[target.x][target.y].closed = false;
      if (target.onDeath) {
        if (target.onDeath.drop) {
          let rnd = Math.random()
          if (rnd > target.onDeath.drop[2]) {

          } else if (rnd > target.onDeath.drop[1]) {

          } else if (rnd > target.onDeath.drop[0]) {
            if (target.onDeath.dropCommon) {
              let n = Math.floor(Math.random() * target.onDeath.dropCommon.length);
              engine.createMob({name: target.onDeath.dropCommon[n], lvl: target.lvl, x: target.x, y: target.y, newMob: true})
            }
          }
        }
      }
      //ess add
      if (user.isHero) {
        let expGain = target.exp
        expGain *= target.lvl/user.lvl
        user.exp += expGain
        if (user.expMod(user.lvl) <= user.exp) {
          user.exp -= user.expMod(user.lvl)
          user.lvl += 1;
          events.say(`Hero has increased to level ${user.lvl}!`)
          user.ref.querySelector('.lvlBar').innerText = "lvl " + user.lvl
          data.hero.freeStatPoints += Math.floor(user.lvl/5) + 2
          data.hero.freeSkillPoints += Math.floor(user.lvl/5) + 1
          let percent = (user.hp/user.maxHp)
          if (percent < 1) percent = (5 + percent)/6
          data.hero.maxHp = data.hero.hpMake()
          data.hero.hp = data.hero.hpMake() * percent
          events.updateHero()
        }
      }
      if (state.mobs[i]) delete state.mobs[i] //add death anim
    }
  }
  if (selfDmg) {
    user.ref.querySelector('.hpBar').style.background = `linear-gradient(90deg, green ${user.hp/user.maxHp*100}%, red ${user.hp/user.maxHp*100}%)`
  }
  if (user.isHero) {
    user.skills[skillName].exp += 1
    if (user.skills[skillName].exp >= skills[skillName].expMod(user.skills[skillName].lvl)) {
      user.skills[skillName].exp -= skills[skillName].expMod(user.skills[skillName].lvl);
      user.skills[skillName].lvl++
      events.say(`${skillName} skill has increased to lvl ${user.skills[skillName].lvl}.`)

    }
  }
  if (skills[skillName].anim) {
    if (skills[skillName].anim.cast) {
      skills[skillName].anim.cast(opts)
    }
  }
  if (callback) {
    setTimeout(function() {
      callback()
    },125)
  }
}
