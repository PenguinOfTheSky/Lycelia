Object.assign(U, {
  "longCardFormat" : function (card, aClass, long) {
    let aStyle = `
      margin: 1px;
      padding:.07rem;
      min-width: 10rem;
      width: 14vw;
      border-radius: 3%;
      height: 13rem;
      display: inline-block;
      word-wrap: break-word;
      overflow-y: auto;
      text-align: center;
      font-size: .8rem;
      background: linear-gradient( 180deg, rgb(122,122,125) 0%,rgba(0,0,0,0) 2%, rgba(0,0,0,0) 98%, rgb(122,122,125) 100%),
      linear-gradient( 90deg, rgb(92,82,75) 0%, #F4E9E4 3%, #F4E9E4 97%, rgb(92,82,75) 100%);`
    let titleBG = '#F6F'
    if (card.type.includes('spell')) {
      titleBG = '#7a92ff'
    } else if (card.function && card.function.includes('Build')) {
      titleBG = '#f3fd4b'
    } else if (card.function && card.function.includes('Fortress')) {
      titleBG = '#54ff75'
    }
    let unit = `<div style = "${aStyle}" class = "${aClass || ''}">
    <b class='cardTitle' style='text-shadow: 1px 1px rgba(255,255,255,.5); font-size: 1.16rem;font-weight:600; display:block;text-align:center;background-color: ${titleBG}; margin:.2rem;border-radius:.5rem;color: #000; border: .2rem outset #666;'>${card.name}</b>` + (card.graphics.handCard ? `<img style='min-width:48px; min-height:48px;height:5rem;width:7rem;background-color:black;border-radius:.5rem; max-width:100%;' src = '${card.graphics.handCard}' style='border-radius:5%;'><br>` : '') +
    `
    <div style='background-color:#F8F8F8; border-radius:.5rem; margin: .1rem;'>
      <i>${card.blurb}</i><br>
    `
    let stats = ``
    let count = 0;
    for (let ele in card.stats) {
      if (card.stats[ele] !== false) {
        if (typeof(card.stats[ele]) != 'object') {
          stats += `<span style='padding: 0px .2rem;display:inline-block;' title='${ele}'>`
            if (ele == 'attack' ) {
              stats += `<img src="${(card.stats.range > 0) ? 'images/icons/bow&arrow.svg': 'images/icons/melee.png'}" style='height:.8rem;width:.8rem;vertical-align:middle;padding:.05rem;background-color:red; border-radius:25%;'>`
              stats += `${card.stats[ele]}</span>`
            } else if (ele == 'HP') {
              stats += `<img src="images/icons/HP.svg" style='height:.8rem;width:.8rem;vertical-align:middle;padding:.05rem; border-radius:25%;'>`
              stats += `${card.stats[ele]}</span>`
            } else if (ele == 'MS') {
              stats += `<img src="images/icons/MS.svg" style='height:.8rem;width:.8rem;vertical-align:middle;padding:.05rem; border-radius:25%;'>`
              stats += `${card.stats[ele]}</span>`
            } else {
              stats += ele
              stats += `: ${card.stats[ele]}</span>`
            }

            count++
        } else {
          for (let item in card.stats[ele]) {
            stats += `<br><span style=''><b>${item}</b>: ${card.stats[ele][item]}</span>`
          }
        }
      }
    }
    let extra = ``
    let bountyColors = ['rgba(50, 230, 150, 1)', 'rgba(220, 220, 20, 1)', 'rgb(255, 80, 235)']
    let bounty = ` | bounty:[<span style='background-color: ${bountyColors[0]}'>${card.bounty.materia || 0}</span>
    <span style='background-color: ${bountyColors[1]}'>${card.bounty.energy || 0}</span>
    <span style='background-color: ${bountyColors[2]}'>${card.bounty.souls || 0}</span>]`
    unit += stats + `<br>`
    extra += `<hr>
    type : ${card.type}<br>
    subtypes : ${card.subtype}<br>`
    if (!card.type.includes('spell')) extra += bounty
    if (long == true && card.flavor) {
      extra += `<div ><i>"${card.flavor}"</i></div>`
    }
    let rnd = (Math.random()).toString().slice(4)
  /*  unit +=  `<div><button class='btnInfo' onclick='D.find("#moreInfo${rnd}").style.display="block"; this.style.display="none"'>more info</button></div>
    <div style='display:none;' id='moreInfo${rnd}'>${extra}</div>
    </div></div>`*/
    unit += extra
    unit += '</div></div>'
    return unit;
  }
})
