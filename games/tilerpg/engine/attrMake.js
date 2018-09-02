engine.makeHp = function(unit) {
  return (unit.vit * 4) + (unit.lvl * 3) + unit.soul
}
engine.makeMp = function(unit) {
  return (unit.int * 4) + (unit.lvl * 3) + unit.soul
}
