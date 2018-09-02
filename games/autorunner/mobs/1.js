Object.assign(mobs, {
  "grunt": {

  },
  eagle: {
    create: function(lvl) {
      let obj = {
        title: 'Eagle',
        exp: lvl + 1,
        vit: (lvl < 3? .6 * lvl : (lvl * 1.1)**1.05),
        gc: 1.5 * lvl,
        width: 2,
        height: 2,
        impact: 1,
        ai: {
          walk: (lvl/50 + Math.random() + 1),
          hop: {
            max: 130,
            curr: 0,
            dir: .7 + Math.random()/5
          }
        },
        skills: {
          "Nudge": {
            lvl: lvl,
            exp: 0
          }
        }
      }
      if (obj.ai.walk < 0) {
        obj.reverseImg = true
      }
      return obj;
    },
    style: {
      'background-image': `url(images/mobs/eagle.svg)`,
      'background-size': "100% 100%"
    }
  },
  pidgeon: {
    create: function(lvl) {
      let obj = {
        title: 'Pidgeon',
        exp: lvl + 1,
        vit: (lvl < 3? .6 * lvl : (lvl * 1.1)**1.05),
        gc: 1.2 * lvl,
        width: 2,
        height: 2,
        impact: 1,
        ai: {
          walk: (-1 + Math.round(Math.random()) * 2) * (lvl/50 + Math.random()/2 + 1),
          hop: {
            max: 130,
            curr: 0,
            dir: .8
          }
        },
        skills: {
          "Nudge": {
            lvl: lvl,
            exp: 0
          }
        }
      }
      if (obj.ai.walk < 0) {
        obj.reverseImg = true
      }
      return obj;
    },
    styleReverse: {
      'background-image': `url(images/mobs/pidgeon_reverse.svg)`,
      'background-size': "100% 100%"
    },
    style: {
      'background-image': `url(images/mobs/pidgeon.svg)`,
      'background-size': "100% 100%"
    }
  },
  frog: {
    create: function(lvl) {
      let obj = {
        title: 'Common Slime',
        exp: lvl + 1,
        vit: (lvl < 3? .6 * lvl : (lvl * 1.1)**1.05),
        gc: 1.1 * lvl,
        width: 1.65,
        height: 1.55,
        impact: 1,
        ai: {
          walk: (-1 + Math.round(Math.random()) * 2) * (lvl/50 + Math.random()/2 + 1),
          hop: {
            max: 100,
            curr: 0,
            dir: 1
          }
        },
        skills: {
          "Nudge": {
            lvl: lvl,
            exp: 0
          }
        }
      }
      if (obj.ai.walk < 0) {
        obj.reverseImg = true
      }
      return obj;
    },
    styleReverse: {
      'background-image': `url(images/mobs/frog_reverse.svg)`,
      'background-size': "100% 100%"
    },
    style: {
      'background-image': `url(images/mobs/frog.svg)`,
      'background-size': "100% 100%"
    }
  },
  bat: {
    create: function(lvl) {
      let obj = {
        title: 'Common Slime',
        exp: lvl + 1,
        vit: (lvl < 3? .6 * lvl : (lvl * 1.1)**1.05),
        gc: 1.1 * lvl,
        width: 2.6,
        height: 1.9,
        impact: 1,
        ai: {
          hop: {
            max: 350,
            curr: 0,
            dir: 1.1 +Math.random() + lvl/25
          }
        },
      }
      return obj;
    },
    style: {
      'background-image': `url(images/mobs/bat.svg)`,
      'background-size': "100% 100%"
    }
  },
  slime: {
    create: function(lvl) {
      return {
        title: 'Common Slime',
        exp: lvl + 1,
        vit: (lvl < 3? .6 * lvl : (lvl * 1.1)**1.05),
        gc: lvl,
        width: 1.5,
        height: 1.45,
        impact: .5,
        ai: {
          walk: lvl/50 + Math.random()
        },
        skills: {
          "Nudge": {
            lvl: lvl,
            exp: 0
          }
        }
      }
    },
    style: {

      'background-image': `url(images/mobs/slime.svg)`,
      'background-size': "100% 100%"
    }
  },
  fatDino: {
    create: function(lvl) {
      return {
        title: 'Fat Dino',
        exp: lvl + 1,
        //ms: lvl/100 + .01,
        vit: (lvl < 3? .6 * lvl : (lvl * 1.1)**1.05),
        gc: lvl,
        width: 2.5,
        height: 2.5,
        impact: 1,
        ai: {
          walk: -lvl/50 - Math.random()
        },
        skills: {
          "Nudge": {
            lvl: lvl,
            exp: 0
          }
        }
      }
    },
    style: {
      'background-image': `url(images/mobs/fatDino.svg)`,
      'background-size': "100% 100%"
    }
  },
  troll: {
    create: function(lvl) {
      return {
        title: 'Troll',
        exp: lvl + 1,
        vit: (lvl < 3? .6 * lvl : (lvl * 1.1)**1.05),
        gc: lvl*1.6,
        bounceHp: 2,
        width: 3.5,
        height: 3.5*1.2,
        impact: 1,
        ai: {
          walk: lvl/50 + Math.random()
        },
        skills: {
          "Nudge": {
            lvl: lvl,
            exp: 0
          }
        }
      }
    },
    style: {

      'background-image': `url(images/mobs/troll.svg)`,
      'background-size': "100% 100%"
    }
  },
  platform1: {
    create: function(lvl) {
      return {
        title: 'platform1',
        exp: lvl + 1,
        vit: (lvl < 3? .6 * lvl : (lvl * 1.1)**1.05),
        indestructible: true,
        land: true,
        onlyAboveTouch: true,
        noWobble:true,
        width: 4,
        height: 1,
      }
    },
    style: {
      'background-image': `url(images/shrubs/platform1.svg)`,
      'background-size': "100%",
      "background-position": 'center top',
      "background-repeat": 'no-repeat'
    }
  },
  mushroom: {
    create: function(lvl) {
      return {
        title: 'mushroom',
        exp: lvl + 1,
        vit: (lvl < 3? .6 * lvl : (lvl * 1.1)**1.05),
        indestructible: true,
        land: true,
        noWobble:true,
        noHarm: true,
        width: 3,
        height: 3,
      }
    },
    style: {
      'background-image': `url(images/shrubs/mushroom.svg)`,
      'background-size': "100% 100%",
      "background-position": 'center top',
      "background-repeat": 'no-repeat'
    }
  },
  spikeBottomCube: {
    create: function(lvl) {
      return {
        title: 'spikeBottomCube',
        exp: lvl + 1,
        gc: lvl,
        className: ' mgTile',
        vit: (lvl < 3? .6 * lvl : (lvl * 1.1)**1.05),
        indestructibleTop: true,
        land: true,
        noWobble:true,
        width: 3,
        height: 3,
      }
    },
    style: {
      'background-image': `url(images/mobs/spikeBottomCube.svg)`,
      'background-size': "100% 100%"
    }
  },
  spikesWideRectangle: {
    create: function(lvl) {
      return {
        title: 'spikeBottomCube',
        exp: lvl + 1,
        gc: lvl,
        className: ' mgTile',
        spikeTop: true,
        vit: (lvl < 3? .6 * lvl : (lvl * 1.1)**1.05),
        noWobble:true,
        width: 3,
        height: 1.5,
      }
    },
    style: {
      'background-image': `url(images/mobs/spikesWideRectangle.svg)`,
      'background-size': "100% 100%",
    }
  },
  gem1: {
    create: function(lvl) {
      return {
        title: 'platform1',
        exp: lvl + 1,
        vit: (lvl < 3? .6 * lvl : (lvl * 1.1)**1.05),
        gc: lvl * 5,
        gemstone: true,
        noWobble:true,
        width: 1.5,
        height: 1.5,
      }
    },
    style: {
      'background-image': `url(images/shrubs/gem1.svg)`,
      'background-size': "100% 100%",
    }
  },
  gem2: {
    create: function(lvl) {
      return {
        title: 'platform1',
        exp: lvl + 1,
        vit: (lvl < 3? .6 * lvl : (lvl * 1.1)**1.05),
        gc: lvl * 10,
        gemstone: true,
        noWobble:true,
        width: 1.5,
        height: 1.5,
      }
    },
    style: {
      'background-image': `url(images/shrubs/gem2.svg)`,
      'background-size': "100% 100%",
    }
  },
  fireball: {
    create: function(lvl) {
      return {
        title: 'Fireball',
        exp: lvl + 1,
        vit: (lvl < 3? .6 * lvl : (lvl * 1.1)**1.05),
        gc: lvl,
        width: 1.5,
        spikeTop: true,
        height: 1.45,
        impact: .5,
        ai: {
          linear: [(-1 + Math.round(Math.random()) * 2) * Math.random()*1.5,Math.random()*1.5]
        },
        skills: {
          "Nudge": {
            lvl: lvl,
            exp: 0
          }
        }
      }
    },
    style: {

      'background-image': `url(images/mobs/fireball.svg)`,
      'background-size': "100% 100%"
    }
  },
  meteor: {
    create: function(lvl) {
      return {
        title: 'Meteor',
        exp: lvl + 1,
        vit: (lvl < 3? .6 * lvl : (lvl * 1.1)**1.05),
        gc: lvl/2,
        width: 1.5,
        spikeTop: true,
        height: 1.5,
        impact: .75,
        ai: {
          linear: [Math.random()*-1.5-1.5-(lvl/50),Math.random()*1.5+1.5+(lvl/50)]
        },
      }
    },
    style: {

      'background-image': `url(images/mobs/meteor.svg)`,
      'background-size': "100% 100%"
    }
  },
})
