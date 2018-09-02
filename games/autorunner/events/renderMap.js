events.renderMap = function(name) {
  let size = data.scrHeight *.05;
  board.size =data.scrHeight *.05;
  data.hero.hp = data.hero.maxHp
  let hintKeys = D.make('div', {
    innerText: 'w-a-s-d to move, spacebar to pause/upgrade hero',
    style: 'position: fixed; top: 40%; font-size: 1.5rem; z-index:99999; transition: 1.5s ease-in all; text-align:center; width:100vw;pointer-events:None;'
  })
  D.find('body').append(hintKeys)
  setTimeout(function() {
    hintKeys.style.opacity = .1
  },3500)
  setTimeout(function() {
    hintKeys.remove();
  },5000)
  if (!maps[name]) {return 1;}
  window.state = maps[name]()

  Object.assign(D.find('#main').style, state.background.main)
  if (data.hero.hearts) data.hero.hearts.remove()
  data.hero.hearts = D.make('div', {
    id: 'hearts',
    style: 'position: fixed;z-index:555; right:4vw; top: 3vh; color:black;font-size:1.5rem;display:flex;line-height:1.5rem;'
  })
  data.hero.heartsUpdate = function() {
    data.hero.hearts.innerHTML = ''
    for (let i = 0; i<= data.hero.hp -1; i++) {
      data.hero.hearts.append(D.make('img', {
        src: `images/icons/heart.svg`,
        style: 'width: 1.45rem; height: 1.45rem;'
      }))
    }
    if (data.hero.hp % 1) {
      data.hero.hearts.append(D.make('img', {
        src: `images/icons/heart.svg`,
        style: `width: ${1.45 * (data.hero.hp %1)**.45}rem; height: 1.45rem;background-size:cover;`
      }))
    }
    let gc = D.make('span', {
      innerHTML: Math.floor(data.hero.gc) + '<img style="width:1.45rem;height:1.45rem;vertical-align:middle;" src="https://lycelia.com/iconLib/coins.svg"> &nbsp',
      style: 'text-shadow:0px 0px 2px white;'
    })
    data.hero.hearts.prepend(gc)
    let upgrades = D.make('button', {
      innerText: 'Upgrades!',
      className: 'btn',
      style:'background-color:gold; align-self:center;margin-left:1rem;',
      onclick: function() {
        events.upgrades()
        data.isPaused = !data.isPaused
      }
    })
    data.hero.hearts.append(upgrades)
    if (data.hero.hp <= 0) {
      events.renderMap(name)
    }
  }
  data.hero.heartsUpdate()
  if (data.distanceDisplay) data.distanceDisplay.remove()
  data.distanceDisplay = D.make('div', {
    style: 'position: fixed;z-index:555; left:3vw; top: 4vh; color:black;font-size:1.5rem;'
  })
  data.showDistance = function() {
    data.distanceDisplay.innerHTML = `<b style='margin-right:.5rem;'>${state.title}</b>` + Math.floor(data.hero.pos[0]) + 'm'
  }

  D.find('body').append(data.hero.hearts, data.distanceDisplay)

  Object.assign(data.hero, {
    dir: [0,0, 0],
    pos: [25, 425,0]
  })
  if (window.state.ref) {
    window.state.ref.remove()}
  window.scrollTo(0,0)

  let frag = D.make('div')
  data.hero.ref = D.find('#hero')
  Object.assign(D.find('#hero').style, {height: size*1.5+ 'px', width: size*1.5 + 'px'})
  data.hero.width = size * 1.5
  data.hero.height = size * 1.5
  state.noCol.forEach(ele => {
    ele.ref = D.make('div', {
      className: 'tile ' + ele.type,
      style: `position:absolute; left: ${ele.x}px; top: ${ele.y * size}px; width: ${ele.width * size}px; height: ${ele.height * size}px;`
    })
    frag.appendChild(ele.ref)
  })
  state.units.forEach((ele,i) => {
    let mob = mobs[ele.type].create(ele.lvl || 1)
    if (!ele.width) {
      ele.width =( mob.width || 1.25)*board.size
      mob.width = ele.width
    }
    if (!ele.height) {
      ele.height =( mob.height || 1.25)*board.size
      mob.height = ele.height
    }
    let ref = D.make('div', {
      className: 'tile ',
      style: `position:absolute;transform: translate(${ele.x}px,${ele.y}px);left:0;top:0;  width: ${ele.width}px; height: ${ele.height}px;transition:.15s linear all;display:none;`
    })
    if (mob.className) ref.className += mob.className
    ref.append(D.make('div', {
      className: ele.type
    }))

    Object.assign(ele, mob)
    if (mob.reverseImg) {
      Object.assign(ref.style, mobs[ele.type].styleReverse)
    } else {
      Object.assign(ref.style, mobs[ele.type].style)
    }

    ele.ref = ref;
    ele.offscreen = true;
    if (!ele.noWobble) {
      ele.rotate = true;
      ele.rotateDeg = 0;
    }
    ele.updatePosition = function() {
      if (ele.rotate) {
        ele.rotateDeg++
        ele.ref.style.transform = ` translate(${ele.x}px,${ele.y}px) rotate(${ele.rotateDeg}deg)`
        if (ele.rotateDeg == 10) ele.rotate = false;
      } else {
        ele.rotateDeg--
        ele.ref.style.transform = ` translate(${ele.x}px,${ele.y}px) rotate(${ele.rotateDeg}deg)`
        if (ele.rotateDeg == -10) ele.rotate = true;
      }
    }
    frag.appendChild(ref)
  })
  data.grid = []
  //wall collision
  /*data.collision.push({x:0, y: -size, width: state.width*size, height: size},{x:-size, y: 0, width: size, height: state.height * size},{x:(state.width * size), y: size, width: size, height:state.height * size},{x:0, y: state.height*size, width: state.width * size, height: size})
*/
  state.ref = frag
  D.find('body').appendChild(frag)
  window.onresize = function(e) {
    data.scrHeight = window.innerHeight;
    let oldSize = size;
    size = data.scrHeight *.05;
    board.size =data.scrHeight *.05;
    data.hero.y *=size/oldSize
    data.hero.height *= size/oldSize
    data.hero.width *= size/oldSize
    data.hero.ref.style.height = data.hero.height+ 'px'
    data.hero.ref.style.width = data.hero.width + 'px'
    state.units.forEach(ele => {
      ele.y = ele.y/oldSize * size
      ele.height *= size/oldSize
      ele.width *= size/oldSize
      ele.ref.style.transform = ` translate(${ele.x}px,${ele.y}px) rotate(${ele.rotateDeg||0}deg)`
      ele.ref.style.width = ele.width+ 'px'
      ele.ref.style.height = ele.height+ 'px'
    })
    state.noCol.forEach(ele => {
      ele.y = ele.y/oldSize * size
      Object.assign(ele.ref.style, {
        //left: ele.x * size + "px",
        top: ele.y * size + "px",
      //  width:
      })
      //ele.ref.style.transform = ` translate(${ele.x}px,${ele.y}px) rotate(${ele.rotateDeg||0}deg)`
    })
    data.resized = true;
  }
}
