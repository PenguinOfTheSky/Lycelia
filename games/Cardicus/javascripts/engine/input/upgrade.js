C.engine.input.upgrade = function(opts) {
  let {ele, i, unit, player} = opts
  if (unit[0] != 'HumanPlayer') { //suspicious that this is bad
    loop1:
    for (let i = 0; i < masterState.length; i++) {
      for (let bot = 0; bot <=1; bot++) {
        let box = masterState[i].units[bot]
        for (let x = 0; x < box.length; x++) {
          if (box[x][2] == unit[2]) {
            unit = box[x]
            break loop1;
          }
        }
      }
    }
  }
  console.log(unit, ele)
  let priceCheck = function(cost) {
    let canHaz = true;
    if (cost.souls && player.souls < cost.souls) canHaz = false
    if (cost.materia && player.materia < cost.materia) canHaz = false
    if (cost.energy && player.energy < cost.energy) canHaz = false
    if (canHaz) {
      player.energy -= (cost.energy || 0)
      player.materia -= (cost.materia || 0)
      player.souls -= (cost.souls || 0)
    }
    C.display.updateResources()
    return canHaz
  }
  if (!priceCheck(ele.cost)) return 0
  if (ele.type == 'Upgrade Card') {
    let percent = false;
    let hp;
    if (unit[3].stats.HP > unit[1].stats.HP) {
      hp = unit[3].stats.HP - unit[1].stats.HP
    } else {
      hp = unit[3].stats.HP/unit[1].stats.HP
      percent = true;
    }
    unit[3] = U.clone(_allCards[ele.id])
    unit[1] = U.clone(_allCards[ele.id])
    if (percent) {
      unit[3].stats.HP = Math.ceil(unit[3].stats.HP * hp)
    } else {
      unit[3].stats.HP += hp
    }
    C.display.updateBoard();
    if (unit[0] == 'HumanPlayer') C.socket.emit('upgrade', opts)
  }
}
