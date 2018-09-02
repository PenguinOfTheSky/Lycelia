render.lootbag = function(opts={}) {
  let item = D.make('img', {
    style: 'position:absolute;z-index:1;transition:.1s all linear;width:4vh;height:4vh;right:0;top:0; filter:drop-shadow(1px 1px 3px gold);',
  })
  let active = true;
  item.src='images/' + opts.src
  setTimeout(function(){
    item.onmouseenter = function() {
      active = false;
      item.style.opacity=0;
      Object.assign(pc, opts.bounty)
      setTimeout(function() {
        item.remove()
      },100)
    }
  },100)
  setTimeout(function() {
    if (active) {
      active = false;
      Object.assign(pc, opts.bounty)
      setTimeout(function() {
        item.remove()
      },100)
    }
  },3000)
  return item;
}
