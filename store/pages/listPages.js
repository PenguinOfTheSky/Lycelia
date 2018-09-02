S.pages.listPages = function(opts = {}) {
  let totalFileSize = 0
  for (let x in S.DB.account.pages) {
    totalFileSize += S.DB.account.pages[x]
  }
D.find('#main').innerHTML = `
  <style>
    #main li {
      cursor: pointer;
      margin: 1vh;
      box-shadow: .04rem .05rem .5rem .05rem black;
      padding: .15rem;
      border-radius: .15rem;
      list-style:none;
    }
    #main li:hover {
      box-shadow: .04rem .05rem 1rem .15rem blue;
    }
  </style>
  <article>
  <p>Increase your account level to unlock more storage space.<br> Current account level: ${S.DB.account.lvl.toFixed(2)} <br> Max Storage space: ${S.DB.account.lvl.toFixed(2)}MB <br>
  Used: ${totalFileSize/1000000}MB (${(totalFileSize/1000000/S.DB.account.lvl * 100).toFixed(2)}%)</p>
    <h1>Current Pages:</h1>
    <ul id='currPages'></ul>
    <button id='createNew'>Create New</button>
  </article>
`
  D.find('#main #createNew').onclick = function() {
    S.pages.createPage()
  }
  let addList = function() {
    let list = document.createDocumentFragment()
    let pages = S.data.account.pages
    let space = 0
    for (let i in S.search) {
      if (S.search[i].author !== S.DB.user.name) continue
      else {
        space += +(S.search[i].size || 0);
        let li = D.make('li', {
          innerHTML: `title: <b>${S.search[i].title}</b> <br> id: ${i} &nbsp;&nbsp;&nbsp; filesize: ${S.search[i].size/1000} kb`,
          onclick: function() {
            S.events.load({id:i})
          }
        })
        let edit = D.make('button', {
          innerText: 'Edit',
          className: 'btn btnSubmit',
          onclick: function(e) {
            e.stopPropagation()
            e.preventDefault()
            S.pages.createPage(i)
          },
          style: "float: right;"
        })
        li.prepend(edit)
        list.append(li)
      }
    }
    D.find('#main #currPages').append(list)
  }
  if (S.search && !opts.refresh) {
    addList()
  } else {
    post("/store/search", '', function(data) {
      S.search = JSON.parse(data)
      addList()
    })
  }
}
