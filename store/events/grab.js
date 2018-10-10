{
  'use strict'
  try {
    S.DB = JSON.parse(localStorage.LyceliaStore)
  } catch(err) {
    S.data.firstVisitToLyceliaOS = true;
    S.DB = {
      preferences: {
        css: 'light'
      }
    };
  }
  document.head.appendChild(
    Object.assign(document.createElement('link'), {
      id: 'cssPref',
      href: `/css/${S.DB.preferences.css || "light"}.css`,
      rel: 'stylesheet',
      type: 'text/css'
    })
  )
  S.events.grab = function(target) {
    //todo: add target functionality, indexedDB, server-side backup;
    try {
      return JSON.parse(localStorage.LyceliaOS)
    } catch(err) {
      return ''
    }
  }
}
