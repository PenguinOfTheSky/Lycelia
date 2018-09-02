Uni.home.search = function(form) {
  let type = form.type.value,
//  subject = form.subject.value,
  title = form.title.value.split(' '),
  description = form.description.value,
  level = form.level.value
//  console.log(type, title, description, level)
  let match = []
  loop1: for (let ele in Uni.index[type]) {
    if (title) {
      for (let i = 0; i < title.length; i++) {
        let regex = RegExp( title[i] , 'i')
        if (!regex.test(Uni.modules[ele].title)) continue loop1;

      }
    }
    if (description) {
      for (let i = 0; i < description.length; i++) {
        let regex = RegExp(description[i], 'i')
        if (!regex.test(Uni.modules[ele].title)) continue loop1;
      }
    }

    match.push(Uni.modules[ele])
  }
  let ids = []

  let dl = D.make('dl', {
    style: 'list-style-type:decimal;padding-left:2%;',
    className: 'dlList'
  })
  match.forEach(ele => {
    ids.push(ele.id + ' : ' + ele.title)
    dl.append(
      D.make('dt', {
        innerText: ele.title,
        className: 'link',
        style: 'font-weight:700;display: list-item;list-style-position:inside;',
        onclick: function() {
          Uni.render.base(ele.id)
        }
      }),
      D.make('dd', {
        innerHTML: (ele.blurb || '')
      })
    )
  })
  D.find('#searchResults').innerHTML = `<hr>`
  if (match.length) D.find('#searchResults').append(dl)
  else D.find('#searchResults').innerHTML += "<b>No results found</b>"
}
