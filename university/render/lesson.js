Uni.render.lesson = function(id, item) {
  Uni.userData.currentModule = id
  let article = D.make('article')
  let questions = Uni.render.lessonQuestions(item)
  article.append(
    Uni.render.header(item),
    D.make('h1', {innerText: item.title}),
    D.make('div', {innerHTML: item.text}),
    questions
  )
  if (item.license) {
    article.append(D.make('p', {innerHTML: "<b>License info:</b> " + marked(item.license)}))
  }
  let nav = D.make('nav', {
    style: 'padding: .15rem; display:flex; justify-content:space-around;'
  })
  nav.append(
    D.make('button', {
      innerHTML: '<icon class="fa fa-arrow-left"></icon> prev lesson',
      className: 'btn',
      onclick: function() {
        let n;
        for (let i = 0; i < Uni.modules[Uni.data.currClass].modules.length; i++) {
          if (Uni.modules[Uni.data.currClass].modules[i] === id) {
            n = i;
            break;
          }
        }
        if (n > 0) {
          Uni.render.base(Uni.modules[Uni.data.currClass].modules[n-1])
        } else {
          Uni.render.base(Uni.data.currClass)
        }
      }
    }),
    D.make('button', {
      innerText: 'Map',
      className: 'btn',
      onclick: function() {
        Uni.render.base(Uni.data.currClass)
      }
    }),
    D.make('button', {
      innerHTML: 'Continue <icon class="fa fa-arrow-right"></icon>',
      id: 'continue',
      className: 'btn',
      onclick: function() {
        let n;
        for (let i = 0; i < Uni.modules[Uni.data.currClass].modules.length; i++) {
          if (Uni.modules[Uni.data.currClass].modules[i] === id) {
            n = i;
            break;
          }
        }
        if (Uni.modules[Uni.data.currClass].modules[n+1]) {
          Uni.render.base(Uni.modules[Uni.data.currClass].modules[n+1])
        } else {
          Uni.render.base(Uni.data.currClass)
        }
      }
    })
  )
  article.append(nav)
  D.find('#main').append(article)

}
