{
  'use strict'
  S.js.start = function() {
    let style = document.createElement('style')
  //  style.innerHTML = S.css.base() +  S.css.light()
    document.head.append(style)

    D.find('#mainBody').innerHTML = "<div id='topNav'></div><div id='main'></div>"
    S.html.topNav()
    let listen = function receiveMessage(event) {
      try {
        let data = JSON.parse(event.data)
      //  S.events.listen[data.id](data)
      } catch (err) {
        console.log(err, event.data)
      }
    }
    window.addEventListener("message", listen, 0);
    let render = function() {
      var urlParams = new URLSearchParams(window.location.search);
      window.key = JSON.parse(urlParams.get('Lkey'))
      S.data.id = urlParams.get('id')
      if (location.pathname) {
        let arr = location.pathname.split('/')
        if (arr[1] === 's') {
          S.data.id = arr[2]
        }
      }
      S.data.author=urlParams.get('author')
      S.data.comments=urlParams.get('comments')
      S.data.chapter = urlParams.get('chapter')
      S.data.pageView = urlParams.get('view')
      if (S.data.pageView) {
        S.events.view(S.data.pageView)
      }
      else if (S.data.author) {
        S.js.loadAuthorPage(S.data.chapter)
      } else if (S.data.comments) {
        S.js.loadComments(S.data.comments)
      } else if (S.data.id) {
        S.js.loadIframe(S.data.id)
      } else {
        S.events.view('home')
      }
    }
    render()
    window.onpopstate = function(event) {
      render()
    };
  }
}
