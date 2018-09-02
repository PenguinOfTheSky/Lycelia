Object.assign(mobs, {
  fountain: {
    create: function(lvl) {
      return {
        exp: 1 + Math.floor(lvl/10),
        ms: 0,
        hp: (lvl ** 1.15) + lvl
      }
    },
    style: {
      'background-image': `url(images/bramble.png)`,
      'background-size': "100% 100%"
    }
  },
  healthDrop: {
    create: function(lvl) {
      return {
        title: 'Minor Heal',
        item: true,
        consumable: true,
        ms: 0,
        closed:false,
        onEnter: {
          heal: lvl*2
        }
      }
    },
    style: {
      'background-image': `url(images/dropletRed.svg)`,
      'background-size': "100% 100%",
    }
  },
  manaDrop: {
    create: function(lvl) {
      return {
        title: 'Minor Mana Restore',
        item: true,
        consumable: true,
        ms: 0,
        closed:false,
        onEnter: {
          restoreMana: lvl*1.5
        }
      }
    },
    style: {
      'background-image': `url(images/droplet.svg)`,
      'background-size': "100% 100%",
    }
  },
  boulder: {
    style: 'background-color: brown;background-image:url(images/boulder.svg);background-size:100% 100%;;'
  },
  levelWin: {
    style: 'background-color: #196;background-image:url(images/levelWinPortal.svg);background-size:100% 100%;animation-name: levelWinPortal; animation-duration: 12s; animation-iteration-count: infinite;'
  }
})
