events.renderMap = function(name) {
  let lvl1 = maps[name]()
  let size = 50;
  board.size = 50;
  let frag = document.createDocumentFragment()
  Object.assign(D.find('body').style, {height: lvl1.height*size+ 'px', width: lvl1.width*size + 'px'})
  Object.assign(D.find('html').style, {height: lvl1.height*size+ 'px', width: lvl1.width*size + 'px'})
  Object.assign(D.find('#hero').style, {height: size*1.5+ 'px', width: size*1.5 + 'px'})
  data.hero.width = size * 1.5
  data.hero.height = size * 1.5
  lvl1.noCol.forEach(ele => {
    frag.appendChild(D.make('div', {
      className: 'tile ' + ele.type,
      style: `position:absolute; left: ${ele.x * size}px; top: ${ele.y * size}px; width: ${ele.width * size}px; height: ${ele.height * size}px;`
    }))
  })
  data.grid = []
  //wall collision
  data.collision.push({x:0, y: -size, width: lvl1.width*size, height: size},{x:-size, y: 0, width: size, height: lvl1.height * size},{x:(lvl1.width * size), y: size, width: size, height:lvl1.height * size},{x:0, y: lvl1.height*size, width: lvl1.width * size, height: size})

  D.find('body').appendChild(frag)

}
