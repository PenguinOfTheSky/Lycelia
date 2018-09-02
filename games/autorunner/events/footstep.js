events.footstep = function() {
  let loc = D.find('#hero').getBoundingClientRect()
  loc.top2 = window.pageYOffset + loc.top
  loc.left2 = loc.left + window.pageXOffset
  let foot = D.make('div', {
    className: 'footprints',
  })
  foot.style.left = loc.left2 + board.size/2 +'px'
  foot.style.top = loc.top2 + board.size/2 + 'px'
  foot.style.transform = `rotate(${Math.atan( data.hero.dir[1]/data.hero.dir[0])+1.7}rad)`

  setTimeout(function() {
    foot.remove()
  }, 1100)
  D.find('body').append(foot)
  setTimeout(function() {
    foot.style.opacity = 0;
  }, 70)

}
