Uni.render.subject = function(id, item) {
  Uni.userData.currentPath = id
  let article = D.make('article')
  article.append(
    Uni.render.header(item),
    D.make('h1', {innerText: item.title}), 
    D.make('div', {innerHTML: marked(item.text)}),
    Uni.render.dlList(item)
  )
  
  D.find('#main').append(article)
}
