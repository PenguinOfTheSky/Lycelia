S.html.topNav = function() {
  'use strict'
  D.find('#topNav').innerHTML =  `
  <style>
    #topNav #navSearch  {
      display: flex;
    }
  </style>
  <div file='html/topNav.html' class='bgNav' style='position: sticky; font-size:1.5rem;top:0;box-sizing:border-box;padding:.1rem;' onclick = "S.js.topNav(event);">
    <nav style='display: flex; justify-content: space-between;'>
      <div>
        <button title='home' ref='home' class='icon fa fa-home'></button>
      </div>
      <div>
        Lycelia
      </div>
      <form id ='navSearch'>
        <input type='text' name='search' placeholder='search' style='margin-right:.1rem;'>
        <button type='submit' class='btn btnSubmit'><icon class='fa fa-search'></icon></button>
      </form>
      <div>
        <button ref ='account' title ='account / sign in / create account' class='icon fa fa-user'></button>
        <button ref ='info' title='info' class='icon fa fa-info'></button>
        <button class='icon fa fa-bars' style='display:none;'></button>
      </div>
    </nav>
  </div>
  `
  D.find('#topNav #navSearch').onsubmit = function(e) {
    e.preventDefault()
    let val = this.search.value
    this.search.blur()
    S.events.view('search', '', `?q=${val}&offset=0&view=search`)
  }
}
