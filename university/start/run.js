Uni.run = function() {
  Uni.topNav.init()
  marked.setOptions({
    breaks: true,
    sanitize: true
  })
  let start = function(back) {
    var urlParams = new URLSearchParams(window.location.search);
    Uni.data.id = urlParams.get('id')
    if (Uni.data.id == 'undefined') Uni.data.id = ''
    Uni.data.currClass = urlParams.get('parent')
    if (Uni.data.id) {
      Uni.render.base(Uni.data.id, 1)
    } else {
      Uni.home.splash(1);
    }
  }

  start();
  window.onpopstate = function(event) {
    start(1)
  };
  for (let x in Uni.modules) {
    Uni.index[Uni.modules[x].type][x] = true
  }
}
