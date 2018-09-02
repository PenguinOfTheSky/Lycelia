maps.lvl2 = function() {
  let obj = {
    title: "Level 2",
    width:23,
    height: 23,
    background: {
      main: {
        'background': 'linear-gradient(rgba(235, 116, 58,.46) 94.2%, rgb(10, 151, 21) 95.3%)'}
    },
    noCol: [/*{x: 3, y: 3, height:.5, width: .5, type: 'tallGrass'},
  */
  ],
    slowCol: [],
    hardCol: [],
    units: [
    ],
    nextMap: 'lvl3',
    bounty: 50
  }
  for (let i = 0; i <20; i++) {
    obj.units.push({x:Math.random() *9500 + 400, y: 5 + Math.random()*14, type: 'gem1', lvl: 1.5})
  }
  for (let i = 0; i <25; i++) {
    obj.units.push({x:Math.random() * 9600 + 400, y: 5.5 + Math.random()*13, type: 'platform1'})
  }

  for (let i = 0; i <10; i++) {
    obj.units.push({x:0, y: 17.6 + Math.random(), type: 'slime', lvl: 2})
    obj.units.push({x:0, y: 16.8 + Math.random()*.8, type: 'fatDino', lvl: 2})
  }
  for (let i = 0; i <10; i++) {
    obj.units.push({x:Math.random()*8000 + 1500, y: 17.6 + Math.random(), type: 'frog', lvl: 2})
  }
  for (let i = 0; i <14; i++) {
    obj.units.push({x:Math.random() *7000 + 1000, y: 1.5 + Math.random()*14, type: 'pidgeon', lvl: 2})
    obj.units.push({x:Math.random() * 9000 + 600, y: 16.4 + Math.random()*.8, type: 'mushroom', lvl: 2})
  }
  for (let i = 0; i <15; i++) {
    obj.units.push({x:Math.random() * (6900) + 3000, y: 1.5 + Math.random()*14, type: 'eagle', lvl: 2})
  }
  for (let i = 0; i <30; i++) {
    obj.noCol.push({x:0, y: Math.random()*15, type: 'cloud1', width: 2.5 + Math.random(), height: 3})
    obj.noCol.push({x:0, y: Math.random()*7, type: 'cloud2', width: 3 + Math.random()*2, height: 2.3 + Math.random()})
    //obj.units.push({x:0, y: 16.8 + Math.random()*.8, type: 'fatDino'})
  }
  obj.units.forEach(ele=> {
    if (!ele.x) ele.x = Math.random() * (9450) + 500
    ele.y*=board.size;
    ele.height *=board.size;
    ele.width *=board.size;
  })
  obj.noCol.forEach(ele=> {
    if (!ele.x) ele.x = Math.random() * 9500 + 500
    /*ele.x*=board.size;
    ele.y*=board.size;
    ele.height *=board.size;
    ele.width *=board.size;*/
  })
  return obj;
}
