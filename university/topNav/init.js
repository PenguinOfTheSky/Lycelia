Uni.topNav.init = function() {
  D.find('#topNav').innerHTML += `
  <nav style='display: flex; justify-content: space-between;'>
    <div>
      <button title='back' id='back' class='icon fa fa-arrow-left'></button>
      <button onclick='Uni.data.last.push("home");Uni.home.splash()' title='home' ref='home' class='icon fa fa-home'></button>
    </div>
    <div>
      <a style='text-align:left;color:#00C;font-size:1.2rem;font-style:italic;' href='/'>Lycelia</a>
    </div>
    <div>
      <button id='account' title ='account / sign in / create account' class='icon fa fa-user'></button>
      <button id ='info' title='info' class='icon fa fa-info'></button>
      <button class='icon fa fa-bars'></button>
    </div>
  </nav>
  `
  D.find('#topNav #back').onclick = function() {
    let last = Uni.data.last.pop();
    last = Uni.data.last.pop();
    if (last === 'home' || last === undefined) {
      Uni.home.splash()
    } else if (last ==='info') {
      Uni.home.info()
    } else if (last ==='account') {
      Uni.home.account()
    } else {
      Uni.render.base(last)
    }
  }
  D.find('#topNav #info').onclick = function() {
    Uni.home.info()
  }
  D.find('#topNav #account').onclick = function() {
    Uni.home.account()
  }
}
