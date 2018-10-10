Uni.render.base = function(id, back) {
  let item = Uni.modules[id]
  Uni.data.last.push(id)
  D.find('#main').innerHTML = ''
  if (item) {
    if (!back) {
      if (item.type != 'lesson') {
        history.pushState({}, "", '?id='+id);
      } else {
        history.pushState({}, "", `?id=${id}&parent=${Uni.data.currClass}`);
      }
    }
    if (Uni.render.hasOwnProperty(item.type)) {
      Uni.render[item.type](id, item)
      var links = document.links;
      for (var i = 0; i < links.length; i++) {
           links[i].target = "_blank";
      }
    }

    else console.log('bad type')
  } else {
    console.log('bad')
  }
  if (MathJax) MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}
