Uni.render.browse = function(id, item) {
  let article = D.make('article')
  let type = D.make('button', {
    className: 'btn btnInfo',
    style: 'float: left;',
    innerText: item.type
  })
  article.append(
    type,
    D.make('h1', {innerText: item.title}), 
    D.make('div', {innerHTML: marked(item.text || '')}),
    Uni.render.dlList(item)
  )
  D.find('#main').append(article)
}
