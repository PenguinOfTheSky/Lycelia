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
  if (item.studyHtml) {
    let app = D.make('div', {
      style: 'display: flex;flex-wrap:wrap; margin:.3rem;box-shadow:1px 1px 5px 1px black;'
    })
    let h3 = D.make('h3', "live html exercise")
    let iframe = D.make('iframe', {
      style: 'flex-grow:1;height:10rem;'
    })
    let text = D.make('textarea', {
      style: 'flex-grow:1;height:10rem;',
      placeholder: item.studyHtml.placeholder || 'Type here',
      oninput: function() {
        if (Uni.events.studyHtml) clearTimeout(Uni.events.studyHtml)
        Uni.events.studyHtml = setTimeout(function() {
          iframe.contentDocument.body.innerHTML = text.value
        },700)
      }
    })
    app.append(h3, text, iframe)
    if (item.studyHtml.hint) {
      app.append(D.make('button', {
        innerText: 'Show hint',
        className: 'btn btnInfo',
        style: 'width:100%;',
        onclick: function() {
          app.replaceChild(D.make('div', {
            innerHTML: "Hint: " + item.studyHtml.hint,
            style: ''
          }),this)
        }
      }))
    }
    if (item.studyHtml.answer) {
      app.append(D.make('button', {
        innerText: 'Show answer',
        className: 'btn btnInfo',
        style: 'width:100%;',
        onclick: function() {
          app.replaceChild(D.make('div', {
            innerHTML: "Answer: " + item.studyHtml.answer,
            style: ''
          }),this)
        }
      }))
    }
    article.append(app)
  }
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
