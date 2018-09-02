S.events.load = function(opts) {
  let {id, chapter, author, comments} = opts
  let address = '?'
  if (id) address += 'id='+id
  if (chapter) address += '&chapter=' + chapter
  if (author) address += `author=${author}`
  if (comments) address += `comments=${comments}`
  let title = ''
  if (id && S.search && S.search[id]) title = "Lycelia | " + S.search[id].title
  history.pushState({}, title, address);
  if (title) document.title = title
  S.data.id = id
  S.data.chapter = chapter
  S.data.author = author
  S.data.comments = comments
  if (id) S.js.loadIframe(id)
  else if (author) S.js.loadAuthorPage(author)
  else if (comments) S.js.loadComments(comments)
}
