{
  'use strict'
  let cd = false;
  let checkCD = function() {
    if (cd) return true;
    cd = true
    setTimeout(function(){
      cd = false
    },1000)
  }
events.hotkey = function(key) {
  console.log(key)
  if (checkCD()) return;
  if (key === 1) {
    D.find('#innerHero').style["border-right"] = `${board.size/2}px solid black`
    D.find('#innerHero').style.transform = "rotate(30deg)"
    setTimeout(function() {
      D.find('#innerHero').style["border-right"] = 'none'
      D.find('#innerHero').style.transform = "rotate(0deg)"
    },200)
  } else if (key === 2) {
    let sword = D.make("div", {
      style: `background-image: url('images/weapons/sword1.png'); width: 50px; height: 75px; background-size: 100% 100%; position: absolute; z-index: 1; top: -70%;transition: all .1s linear; transform: rotate(-30deg);`
    })
    D.find('#innerHero').style.transition= ''
    D.find('#innerHero').style.transform = 'rotate(-25deg)';

    D.find('#innerHero').append(sword)
    requestAnimationFrame(function(){
      D.find('#innerHero').style.transition= 'transform .25s linear'
      sword.style.transform = 'rotate(0deg)'
      D.find('#innerHero').style.transform = 'rotate(65deg)';
      setTimeout(function(){
        sword.remove()
        D.find('#innerHero').style.transition= ''
        D.find('#innerHero').style.transform = ''
      },250)
    })

  }
}
}
