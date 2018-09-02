Object.assign(skills, {
  "Nudge": {
    tip: `A gentle but enthusiastic nudge that deals minimal damage.`,
    expMod: function(lvl){
      if (lvl > 20) return 10
      if (lvl > 5) return 5
      else return lvl
    },
    anim: {
      "cast": function(opts) {
        let loc = [opts.user.ref.getBoundingClientRect(), opts.target.ref.getBoundingClientRect()]
        let diff = [(loc[1].x - loc[0].x)*.3, (loc[1].y - loc[0].y)*.3]
        opts.user.ref.style.transform = `translate(${diff[0]}px, ${diff[1]}px)`
        setTimeout(function() {
          opts.user.ref.style.transform = ''
        },250)
      }
    },
    create: function(lvl, user) {
      return {
        cost: {
          ap: 3 * (.99 ** (lvl-1))
        },
        target: {
          unit: true
        },
        type: {
          physical: true,
          melee: true,
          attack: true,
          simpleDamage: true
        },
        range: 1,
        damage: (lvl/5) + 1 + (user.str/2) + (user.soul/10),
        accuracy: .85 + (lvl/150)
      }
    }
  },
  "Tackle": {
    tip: `A hearty but unskilled attack that deals minor damage.`,
    expMod: function(lvl){
      if (lvl > 20) return 10
      if (lvl > 5) return 5
      else return lvl
    },
    anim: {
      "cast": function(opts) {
        let loc = [opts.user.ref.getBoundingClientRect(), opts.target.ref.getBoundingClientRect()]
        let diff = [(loc[1].x - loc[0].x)*.75, (loc[1].y - loc[0].y)*.75]
        opts.user.ref.style.transform = `translate(${diff[0]}px, ${diff[1]}px)`
        setTimeout(function() {
          opts.user.ref.style.transform = ''
        },250)
      }
    },
    create: function(lvl, user) {
      return {
        cost: {
          ap: 5 * (.99 ** (lvl-1))
        },
        target: {
          unit: true
        },
        type: {
          physical: true,
          melee: true,
          attack: true,
          simpleDamage: true
        },
        range: 1.5,
        damage: (lvl/4) + 1 + (user.str/2) + (user.soul/10),
        accuracy: .85 + (lvl/150)
      }
    }
  },
  "Shine": {
    tip: `Slightly throw off opponent, minimally lowering their agility until 10ap passes.`,
    expMod: function(lvl){
      if (lvl > 20) return 10
      if (lvl > 5) return 5
      else return lvl
    },
    create: function(lvl, user) {
      return {
        cost: {
          ap: 2 * (.99 ** (lvl-1)),
          mp: 1
        },
        target: {
          unit: true
        },
        type: {
          spell: true,
          simpleDebuff: true
        },
        range: 1.5,
        debuff: {
          agi: (lvl/5) + (user.cha/2) + (user.int/10),
        },
        length: 10,
        accuracy: .85 + (lvl/150)
      }
    }
  },
  "Faerie Fire": {
    tip: `Slightly confuse opponent, minimally lowering their intelligence until 10ap passes.`,
    expMod: function(lvl){
      if (lvl > 20) return 10
      if (lvl > 5) return 5
      else return lvl
    },
    create: function(lvl, user) {
      return {
        cost: {
          ap: 2 * (.99 ** (lvl-1)),
          mp: 1
        },
        target: {
          unit: true
        },
        type: {
          spell: true,
          simpleDebuff: true
        },
        range: 2,
        debuff: {
          int: (lvl/5) + (user.cha/2) + (user.int/10),
        },
        length: 10,
        accuracy: .85 + (lvl/150)
      }
    }
  },
  "Harden": {
    tip: `Slightly increases user's armor until 20ap passes.`,
    expMod: function(lvl){
      if (lvl > 20) return 10
      if (lvl > 5) return 5
      else return lvl
    },
    create: function(lvl, user) {
      return {
        cost: {
          ap: 2 * (.99 ** (lvl-1)),
          mp: 1
        },
        target: {
          self: true
        },
        type: {
          spell: true,
          simpleDebuff: true
        },
        range: 2,
        debuff: {
          armor: (lvl/5) + (user.cha/2) + (user.int/10),
        },
        length: 20,
        accuracy: 1
      }
    }
  }
})
