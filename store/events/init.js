window.S = {
  js: {

  },
  DB: {},
  html: {

  },
  lib: {
    ajax: {}
  },
  css: {},
  data: {
    local: {},
    last: []
  },
  pages: {},
  events: {}
}
let x = 0;
let loaded = function() {
  if (x == scripts.length)
  S.js.start();
}
let scripts = [
  'store/js/start.js',
  'lib/ajax.js',
/*  'css/base.css',
  'css/light.css', */
  'store/html/topNav.js',
  'store/js/topNav.js',
  'store/html/home.js',
  'store/html/info.js',
  'store/html/login.js',
  'store/html/signup.js',
  'store/html/account.js',
  'store/html/search.js',
  'store/html/awards.js',
  'store/html/rating_span.js',
  'store/html/mail.js',
  'store/js/info.js',
  'store/js/loadIframe.js',
  'store/js/loadAuthorPage.js',
  'store/js/loadComments.js',
  'store/events/view.js',
  'store/events/load.js',
  'store/events/msg.js',
  'store/events/listen.js',
  'store/events/grab.js',
  'store/events/save.js',
  'store/pages/createPage.js',
  'store/pages/listPages.js',
  'store/pages/profile.js',
  'store/pages/none_Template.js',
  'store/pages/book_Template.js'
]
let holder = document.createDocumentFragment()
scripts.forEach(ele=> {
  let script = Object.assign(document.createElement('script'), {
    src: "/" + ele,
    onload: function() {loaded(++x)}
  })
  holder.appendChild(script)
})
document.head.append(holder)
