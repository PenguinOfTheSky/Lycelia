if (window.imports._graphics == undefined) window.imports._graphics = {}
window.imports._graphics.hint = function(hintText, b, callback, n) {
  if (typeof(b) == "string") b = eval(b)
  let oldShadow
  if (b) oldShadow = b.style['box-shadow'];
  if (oldShadow === undefined) oldShadow = '';
  b.style.animation = "hintOption 4s linear infinite alternate"
  let loc = U.getXY(b)
  let full = b.getBoundingClientRect();
  if (loc[0] > screen.width/2) loc[0] -= 270
  else loc[0] += full.width;
  if (loc[1] > screen.height/2) loc[1] -= 90
  else loc[1] += 5;
//	b.style['box-shadow'] = '0px 0px 2px 3px gold';
  let bullet = U.createNode('span', {
    "style": "cursor: pointer; box-shadow: .5vh .5vh 1.5vh .75vh black; border-radius: .5rem; border: .2rem solid white; background-color: rgba(0,0,10,1);color:rgb(255,255,245); position: absolute;max-width:40vw; z-index: 600; left: "+loc[0] + "px;top: "+loc[1]+"px;",
    "innerHTML": `<span style='float:right;background-color:blue;'>${n+1}/5</span>${hintText}`
  })
  D.find('#main_game').appendChild(bullet)
  bullet.onclick = function() {
    b.style.animation = ""
    b.style['box-shadow'] = oldShadow
    this.remove()
    callback()
  }
}
