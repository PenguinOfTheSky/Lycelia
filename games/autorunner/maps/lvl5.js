maps.lvl5 = function() {
  let obj = {
    title: "Level 5",
    width:23,
    height: 23,
    background: {
      main: {
        'background': 'linear-gradient(rgba(89, 40, 65, 0.94) 94.2%, rgb(77, 64, 25) 95.3%)'}
    },
    noCol: [/*{x: 3, y: 3, height:.5, width: .5, type: 'tallGrass'},
  */
  ],
    slowCol: [],
    hardCol: [{x: 50, y: 5, height:.5, width: .5, type: 'tallGrass'},],
    units: [
    ],
    nextMap: 'test',
    bounty: 100
  }
  for (let i = 0; i <16; i++) {
    obj.units.push({x:Math.random() * (9300) + 400, y: 3 + Math.random()*16, type: 'gem1', lvl: 4.5})
  }
  for (let i = 0; i < 6; i++) {
    obj.units.push({x:Math.random() * (9300) + 400, y: 3 + Math.random()*16, type: 'gem2', lvl: 4})
  }
  for (let i = 0; i <11; i++) {
    obj.units.push({x:Math.random() * (9600) + 400, y: 5 + Math.random()*14, type: 'platform1'})
  }

  for (let i = 0; i <2; i++) {
    obj.units.push({x:0, y: 17.6 + Math.random(), type: 'slime', lvl: 5})
    obj.units.push({x:0, y: 16.8 + Math.random()*.8, type: 'fatDino', lvl: 5})
    obj.units.push({x:Math.random() * (7000) + 1000, y: 1.5 + Math.random()*14, type: 'pidgeon', lvl: 5})
    obj.units.push({x:Math.random() * (8000) + 1500, y: 17.6 + Math.random(), type: 'frog', lvl: 5})
  }
  for (let i = 0; i <4; i++) {
    obj.units.push({x:Math.random() * 9800 + 600, y: 16.4 + Math.random()*.8, type: 'mushroom', lvl: 5})
  }
  for (let i = 0; i <11; i++) {
    obj.units.push({x:Math.random() * 9800 + 600, y: 11.4 + Math.random()*7, type: 'spikeBottomCube', lvl: 5})
    obj.units.push({x:Math.random() * (9500) + 500, y: -4.5 + Math.random() * 3, type: 'meteor', lvl: 5})
  }
  for (let i = 0; i <6; i++) {
    obj.units.push({x:Math.random() * (7000) + 3000, y: 1.5 + Math.random()*14, type: 'eagle', lvl: 5})
  }
  for (let i = 0; i <8; i++) {
    obj.units.push({x:Math.random() * (3000) + 500, y: 6.6 + Math.random()*7, type: 'bat', lvl: 5})
    obj.units.push({x:Math.random() * (8200) + 1700, y: 15.8 + Math.random()*.8, type: 'troll', lvl: 6})
    obj.units.push({x:Math.random() * 8800 + 600, y: 15.8 + Math.random()*3, type: 'spikesWideRectangle', lvl: 4})
    obj.units.push({x:Math.random() * (4000) + 500, y: 1.5, type: 'fireball', lvl: 5})
    obj.units.push({x:Math.random() * (4000) + 5500, y: 1.5, type: 'fireball', lvl: 5})
    obj.units.push({x:Math.random() * (4000) + 500, y: 1.5, type: 'meteor', lvl: 5})
  }
  for (let i = 0; i <19; i++) {
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
