Object.assign(mobs, {
  bramble: {
    ms: 0,
    hp: function(lvl) {return (lvl ** 1.05) +10}

  },
  slime: {
    ms: 0,
    hp: function(lvl) {return (lvl ** 1.05) +5}
  }
})
