engine.removeDebuff = function(unit, ap) {
  if (unit.activeDebuffs) {
    for (let x in unit.activeDebuffs) {
      unit.activeDebuffs[x].length -= ap;
      if (unit.activeDebuffs[x].length <=0) {
        for (let i in unit.activeDebuffs[x].stats) {
          unit[i] += unit.activeDebuffs[x].stats[i]
          delete unit.activeDebuffs[x]
        }
      }
    }
  }
}
