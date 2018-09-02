Uni.render.path = function(id, item) {
  Uni.userData.currentPath = id
  let table = D.make('table', {
    className: 'moduleMap'
  })
  let row1 = D.make('tr'), row2 = D.make('tr');
  table.append(row1,row2)
  let article = D.make('article')
  item.modules.forEach(ele => {
    if (!Uni.modules[ele]) return;
    let td = D.make('td', {
      className: 'btn'
    })
    row2.appendChild(td)
    if (typeof(ele) === 'string') {
      td.innerText = Uni.modules[ele].title
      td.onclick = function() {
        Uni.render.base(ele)
      }
      if (!Uni.userData.completed[ele]) {
        td.classList.add('incomplete')
      }
    }
  })
  article.append(
    Uni.render.header(item),
    D.make('h1', {innerText: item.title}),
    D.make('p', {innerText: 'Suggested pre-reqs: ' + (item.prereqs && item.prereqs.length ? item.prereqs.join(', ') : 'none')}),
    D.make('div', {innerHTML: marked(item.text)}),
    D.make('div', {
      innerHTML : `The following are the classes/paths that make up this path. It is recommended that you complete them in order from left to right.`
    }),
    table
  )
  D.find('#main').append(article)
}
