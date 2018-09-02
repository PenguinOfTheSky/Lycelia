events.showStats = function() {
  let hero = data.hero;
  if (data.heroInfoModal) data.heroInfoModal.remove()
  D.find('#heroInfoDisplay').innerHTML = ``
  let div = D.make('div', {
    id: 'statContainer'
  })
  div.innerHTML = `
  <div title='strength'>Str: ${hero.str.toFixed(1)} <button id='add_str' class='add_stat'>+</button></div>
  <div title='agility'>Agi: ${hero.agi.toFixed(1)} <button id='add_agi' class='add_stat'>+</button></div>
  <div title='vitality'>Vit: ${hero.vit.toFixed(1)} <button id='add_vit' class='add_stat'>+</button></div>
  <div title='Intelligence'>Int: ${hero.int.toFixed(1)} <button id='add_int' class='add_stat'>+</button></div>
  <div title='Charisma'>Cha: ${hero.cha.toFixed(1)} <button id='add_cha' class='add_stat'>+</button></div>
  <div title='soul'>Soul: ${hero.soul.toFixed(1)} <button id='add_soul' class='add_stat'>+</button></div>
  `
  D.find('#heroInfoDisplay').appendChild(div)


  let statList = ['agi', 'str', 'int', 'vit', 'soul', 'cha']
  statList.forEach(ele=> {
    //D.find('#_'+ele).innerHTML = data.hero[ele]
    D.find('#add_'+ele).onclick = function() {
      data.hero[ele] += 1
      data.hero.freeStatPoints -= 1
      events.updateHero()
    }
  })
}
