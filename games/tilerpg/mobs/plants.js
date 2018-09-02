Object.assign(mobs, {
  bramble: {
    create: function(lvl) {
      return {
        title: 'Bramble',
        exp: 1 + Math.floor(lvl/5),
        ms: 0,
        str: lvl,
        vit: (lvl === 1? .5 : lvl + (lvl-2) *.8),
        int: lvl,
        agi: lvl,
        soul: lvl/2,
        cha: lvl/2,
        armor: Math.floor(lvl/5),
        onStruck: {
          barbed: lvl
        },
        onDeath: {
          drop: [.75,1,1],
          dropCommon: ['healthDrop','healthDrop', 'manaDrop']
        }
      }
    },
    ms: 0,
    style: {
      'background-image': `url(images/bramble.png)`,
      'background-size': "100% 100%"
    }
  },
  slime: {
    create: function(lvl) {
      return {
        title: 'Common Slime',
        exp: lvl + 1,
        ms: 1,
        str: lvl,
        vit: (lvl < 3? .6 * lvl : (lvl * 1.1)**1.05),
        int: lvl,
        agi: lvl,
        soul: lvl,
        cha: lvl/2,
        armor: Math.floor(lvl/10),
        skills: {
          "Nudge": {
            lvl: lvl,
            exp: 0
          }
        }
      }
    },
    style: {
      'background-image': `url(images/slime.svg)`,
      'background-size': "100% 100%"
    }
  }
})
