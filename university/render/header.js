Uni.render.header = function(item) {
  let frag = document.createDocumentFragment()
  let type = D.make('span', {
    className: '',
    style: 'float: left;',
    innerText: "type: " + item.type
  })
  let id = D.make('span', {
    className: '',
    style: 'float: right;',
    innerText: "ID: " + item.id
  })
  frag.append(type, id)
  return frag;
}
