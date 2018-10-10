{
  'use strict'
  S.js.topNav = function(e) {
    let ref = e.target.getAttribute('ref')
    S.data.last.push(ref)
    switch(ref) {
      case undefined:
        break;
      case 'home':
        S.events.view('home', '', `?view=home`)
        break;
      case 'mail': {
        if (S.DB.user) {
          S.events.view('mail', '', '?view=mail')
        } else {
          S.events.view('login','', '?view=login')
        }
        break;
      }
      case 'info':
        S.events.view('info', '', `?view=info`)
        break;
      case 'account':
        if (S.DB.user) {
          S.events.view('account', '', '?view=account')
        } else {
          S.events.view('login','', '?view=login')
        }
        break;
    }
  }
}
