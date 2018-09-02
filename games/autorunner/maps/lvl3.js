maps.lvl3 = function() {
  let obj = {
    title: "Level 3",
    width:23,
    height: 23,
    background: {
      main: {
        'background': 'linear-gradient(rgba(235, 116, 58,.64) 94.2%, rgb(151, 117, 10) 95.3%)'}
    },
    noCol: [/*{x: 3, y: 3, height:.5, width: .5, type: 'tallGrass'},
  */
  ],
    slowCol: [],
    hardCol: [{x: 50, y: 5, height:.5, width: .5, type: 'tallGrass'},],
    units: [
    ],
    nextMap: 'lvl4',
    bounty: 100
  }
  for (let i = 0; i <16; i++) {
    obj.units.push({x:Math.random() * (10000) + 400, y: 3 + Math.random()*16, type: 'gem1', lvl: 2.5})
  }
  for (let i = 0; i < 5; i++) {
    obj.units.push({x:Math.random() * (10000) + 400, y: 3 + Math.random()*16, type: 'gem2', lvl: 2})
  }
  for (let i = 0; i <21; i++) {
    obj.units.push({x:Math.random() * (10000) + 400, y: 5 + Math.random()*14, type: 'platform1'})
  }

  for (let i = 0; i <5; i++) {
    obj.units.push({x:0, y: 17.6 + Math.random(), type: 'slime', lvl: 3})
    obj.units.push({x:0, y: 16.8 + Math.random()*.8, type: 'fatDino', lvl: 3})
  }
  for (let i = 0; i <5; i++) {
    obj.units.push({x:Math.random() * (8000) + 1500, y: 17.6 + Math.random(), type: 'frog', lvl: 3})
  }
  for (let i = 0; i <10; i++) {
    obj.units.push({x:Math.random() * (7000) + 1000, y: 1.5 + Math.random()*14, type: 'pidgeon', lvl: 3})
    obj.units.push({x:Math.random() * 9800 + 600, y: 16.4 + Math.random()*.8, type: 'mushroom', lvl: 3})
    obj.units.push({x:Math.random() * 9800 + 600, y: 11.4 + Math.random()*7, type: 'spikeBottomCube', lvl: 3})
  }
  for (let i = 0; i <10; i++) {
    obj.units.push({x:Math.random() * (6000) + 3500, y: 1.5 + Math.random()*14, type: 'eagle', lvl: 3})
  }
  for (let i = 0; i <14; i++) {
    obj.units.push({x:Math.random() * (6000) + 500, y: 1.5, type: 'fireball', lvl: 3})
  }
  for (let i = 0; i <20; i++) {
    obj.noCol.push({x:0, y: Math.random()*15, type: 'cloud1', width: 2.5 + Math.random(), height: 3})
    obj.noCol.push({x:Math.random()*10000, y: Math.random()*7, type: 'cloud2', width: 3 + Math.random()*2, height: 2.3 + Math.random()})
    //obj.units.push({x:0, y: 16.8 + Math.random()*.8, type: 'fatDino'})
  }
  obj.units.forEach(ele=> {
    if (!ele.x) ele.x = Math.random() * (9350) + 600
    ele.y*=board.size;
    ele.height *=board.size;
    ele.width *=board.size;
  })
  obj.noCol.forEach(ele=> {
    if (!ele.x) ele.x = Math.random() * (10000)
    /*ele.x*=board.size;
    ele.y*=board.size;
    ele.height *=board.size;
    ele.width *=board.size;*/
  })
  return obj;
}
