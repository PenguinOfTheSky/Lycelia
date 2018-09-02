maps.test = function() {
  let obj = {
    title: "Level 1",
    width:23,
    height: 23,
    background: {
      main: {
        'background': 'linear-gradient(rgba(124,208,255,1) 94.2%, yellow 95.3%)'}
    },
    noCol: [/*{x: 3, y: 3, height:.5, width: .5, type: 'tallGrass'},
  {x: 3, y: 3, height:.5, width: .5, type: 'tallGrass'},*/
  ],
    slowCol: [],
    hardCol: [],
    units: [
    ],
    nextMap: 'lvl2',
    bounty: 25
  }
  for (let i = 0; i <15; i++) {

    obj.units.push({x:Math.random() * (8400) + 1200, y: 16.8 + Math.random()*.8, type: 'fatDino'})
    obj.units.push({x:Math.random() * (7200) + 2700, y: 15.8 + Math.random()*.8, type: 'troll'})
  }
  obj.units.push({x:Math.random() * (200) + 400, y: 17.6 + Math.random(), type: 'slime'})
  for (let i = 0; i <12; i++) {
    obj.units.push({x:Math.random() * (5500) + 500, y: 17.6 + Math.random(), type: 'slime'})
    obj.units.push({x:Math.random() * (7300) + 2400, y: 17.6 + Math.random(), type: 'frog'})
  }
  for (let i = 0; i <14; i++) {
    obj.units.push({x:Math.random() * (6600) + 3300, y: 5 + Math.random()*14, type: 'platform1'})
    obj.units.push({x:Math.random() * 9400 + 600, y: 16.4 + Math.random()*.8, type: 'mushroom'})
  }
  for (let i = 0; i <20; i++) {
    obj.units.push({x:Math.random() * (9500) + 400, y: 6.7 + Math.random()*12.5, type: 'gem1'})
  }
  for (let i = 0; i <11; i++) {
    obj.units.push({x:Math.random() * (6000) + 3900, y: 1.5 + Math.random()*14, type: 'pidgeon'})
  }
  for (let i = 0; i <30; i++) {
    obj.noCol.push({x:0, y: Math.random()*15, type: 'cloud1', width: 2.5 + Math.random(), height: 3})
    obj.noCol.push({x:Math.random()*10000, y: Math.random()*7, type: 'cloud2', width: 3 + Math.random()*2, height: 2.3 + Math.random()})
    //obj.units.push({x:0, y: 16.8 + Math.random()*.8, type: 'fatDino'})
  }
  obj.units.forEach(ele=> {
    if (!ele.x) ele.x = Math.random() * 9450 + 500
    ele.y*=board.size;
    ele.height *=board.size;
    ele.width *=board.size;
  })
  obj.noCol.forEach(ele=> {
    if (!ele.x) ele.x = Math.random()*9000 + 500
    /*ele.x*=board.size;
    ele.y*=board.size;
    ele.height *=board.size;
    ele.width *=board.size;*/
  })
  return obj;
}
