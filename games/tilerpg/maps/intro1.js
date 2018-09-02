Object.assign(maps, {
  'A1': function(lvl) {
    return {
      title: 'intro1',
      introduction: `One day an egg senses a portal across the way and simply has to get to the other side.`,
      start: [0,1],
      tiles: {
        0: {
          1: {class: 'earth'}
        },
        1: {
          1: {class: 'earth_stone', enterMsg: `The shortest path lies through a patch of thorny brambles.`},
          2: {class: 'earth_stone', enterMsg: `The scent of something foul wafts from the south.`},
          3: {class: 'earth_stone'},
          4: {class: 'earth_stone'},
        },
        2: {
          1: {class: 'earth'},
          2: {class: 'earth', enterMsg: `You catch the scent of something foul.`},
          4: {class: 'earth_stone'}
        },
        3: {
          1: {class: 'earth'},
          2: {class: 'earth'},
          4: {class:'earth_stone'},
          5: {class:'earth_stone'}
        },
        4: {
          1: {
            class: 'levelWin',
            onEnter: {
              nextLevel: 'A2'
            },
          },
          2: {class: 'earth_stone'},
          3: {class: 'earth_stone'},
          4: {class: 'earth_stone'},
          5: {class: 'earth_stone'},
          6: {class: 'earth'},
        }
      },
      mobs: [
        {name: "bramble", x: 2, y: 1, lvl: 1},
        {name: "bramble", x: 2, y: 2, lvl: 1},
        {name: "bramble", x: 3, y: 1, lvl: 1},
        {name: "bramble", x: 3, y: 2, lvl: lvl+1},
        {name: "slime", x: 4, y: 6, lvl: lvl, ms: 1},
        {name: "healthDrop", x: 4, y: 4, lvl: lvl},
      ]
    }
  },
  'A2': function(lvl) {
    return {
      title: 'intro1',
      introduction: `Another portal lies near and curiosity beckons.`,
      start: [0,1],
      tiles: {
        0: {
          1: {class: 'earth'},
          3: {class:'earth_stone'}
        },
        1: {
          0: {class: 'earth'},
          1: {class: 'earth_stone', enterMsg: `Health droplets may provide some relief to adventuring eggs.`},
          2: {class: 'earth_stone', },
          3: {class: 'earth_stone'},
          4: {class: 'earth_stone'},
        },
        2: {
          0: {class: 'earth'},
          1: {class: 'earth', },
          2: {class: 'earth'},
          4: {class: 'earth_stone'}
        },
        3: {
          0: {class: 'earth'},
          1: {class: 'earth'},
          2: {class: 'earth', },
          4: {class:'earth_stone'},
          5: {class:'earth_stone'}
        },
        4: {
          0: {class: 'earth'},
          1: {class: 'earth_stone'},

          2: {class: 'earth_stone'},
          3: {class: 'earth_stone'},
          4: {class: 'earth_stone'},
          5: {class: 'earth_stone'},
          6: {class: 'earth'},
        },
        5: {
          1: {
            class: 'levelWin',
            onEnter: {
              nextLevel: 'A1'
            },
          },
          3: {class: 'earth'}
        }
      },
      mobs: [
        {name: "bramble", x: 2, y: 1, lvl: (lvl-1||1)},
        {name: "bramble", x: 2, y: 2, lvl: (lvl-1||1)},
        {name: "bramble", x: 3, y: 1, lvl: (lvl-1||1)},
        {name: "bramble", x: 3, y: 2, lvl: lvl+1},
        {name: "slime", x: 4, y: 6, lvl: lvl+1},
        {name: "slime", x: 4, y: 0, lvl: lvl},
        {name: "healthDrop", x: 3, y: 4, lvl: lvl},
        {name: "healthDrop", x: 2, y: 2, lvl: lvl},
        {name: "healthDrop", x: 4, y: 0, lvl: lvl},
        {name: "healthDrop", x: 5, y: 3, lvl: lvl},
      //  {name: 'fountain', x:0, y:3, lvl: lvl, allied: true}
      ]
    }
  },

})
