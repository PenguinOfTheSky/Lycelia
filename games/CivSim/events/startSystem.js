{
  'use strict'
  let bgImages = [
    "images/dirt.jpg"
  ]
  let gridBG =
  [0,0,0,0,0,
   0,0,0,0,0,
   0,0,0,0,0,
   0,0,0,0,0,
   0,0,0,0,0,]
  let grid = []
  events.startSystem = function() {

    for (let i =0; i < 25; i++) {
      grid.push(null)
    }
    let gridLength = 5
    let gridHeight = 5

    data.gridlength = 5;
    data.gridHeight = 5
    let loc = function(x, y) {
      return (y * gridLength) + x
    }
    grid[loc(2,2)] = json.shiny
    //grid[loc(3,1)] = json.trees
    grid[loc(1,3)] = json.wanderShiny
    let trees = [json.trees2(),json.trees2(),json.trees2()]
    let mobs = [json.mobs(), json.mobs(), json.mobs()]
    grid[loc(1,1)] = trees[0]
    grid[loc(0,4)] = trees[1]
    grid[loc(4,0)] = trees[2]
    grid[loc(0,0)] = mobs[0]
    grid[loc(0,2)] = mobs[1]
    grid[loc(4,4)] = mobs[2]
    console.log(grid)
    render(grid)
  }
  let render = function(grid) {
    let frag = document.createDocumentFragment();
    grid.forEach((ele, i)=> {

      let box = D.make('div', {
        style: `height:20%;width:20%;max-height:20%;max-width:20%;box-sizing:border-box; display: inline-flex;box-shadow:0px 0px 2vh 1vh brown inset; margin:0px;padding:0px; box-sizing:border-box;`
        //background-image: url(${bgImages[gridBG[i]]}); background-size:contain;
      })
      if (ele) {
        window.i = box
        if (!ele.currentImage) ele.currentImage = ele.images[Math.floor(Math.random() * ele.images.length)]
        let img = D.make('img', {
          src: ele.currentImage,
          style: 'height:100%;width:100%; transition: transform .5s linear;',
          draggable: false
        })
        ele.ref = img
        box.onclick = ele.onclick;
        ele.render()
        box.append(img)
      }
      frag.append(box)
    })
    D.find('#grid').append(frag)
    json.build = json.build()
    json.empire = json.empire()
    json.research = json.research()
    json.train = json.train()
    json.quests = json.quests()
    json.build.init();
  }
  let refreshResources = function() {


    pc.pop += pc.birthrate
    if (pc.pop >= pc.maxPop) pc.pop = pc.maxPop
    pc.gold += pc.pop * pc.morale
    if (pc.clicks < 79.9) pc.clicks += ((80-pc.clicks)**1.21)/100 +.001
    window.render.shinies()
    window.render.logs()
    window.render.gold()
    window.render.population()
    window.render.land()
    window.render.morale()
    window.render.clickCounter()
    //if (json.shiny.mined > json.shiny.rate) json.shiny.mined -= json.shiny.rate/5;
  }
  setInterval(function(){
    refreshResources()
    json.shiny.render()
    pc.morale *= .99996
    pc.scienceSpeed *= .9999
    let mobs = []
    let trees = []
    let shinies = []
    for (let i in grid) {
      if (grid[i]) {
        if (grid[i].name =='mob' && grid[i].active) {
          mobs.push(i)
        } else if (grid[i].name == 'tree') {
          trees.push(i)
        } else shinies.push(i)
      }

    }
    for (let x in pc.harvest) {
      if (pc.harvest[x]) {
        if (x == 'mobs') {
          mobs.forEach(ele => {
            grid[ele].onclick(pc.harvest[x]/mobs.length, 1)
          })

        } else if (x =='logs') {
          trees.forEach(ele => {
            grid[ele].onclick(pc.harvest[x]/trees.length, 1)
          })
        } else if (x =='shinies') {
          shinies.forEach(ele => {
            grid[ele].onclick(pc.harvest[x]/shinies.length, 1)
          })
        } else {
          pc[x] += pc.harvest[x]
        }
      }

    }
  },1399)
}
