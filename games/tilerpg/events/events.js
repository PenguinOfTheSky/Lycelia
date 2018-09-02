Object.assign(events, {
  say: function(msg) {
    let text = D.make('div', {
      innerHTML: msg + '<br>',
      style: 'transition: 8s ease-in all;'
    })
    setTimeout(function() {
      text.style.opacity = 0;
    },10000)
    setTimeout(function() {
      text.remove()
    },18000)
    D.find('#textOutput').prepend(text)
  },
  introductionMessage: function(msg) {
    let item = D.make('div', {
      innerHTML: msg,
      style: `z-index:11;position: absolute;text-align:center;top:25%; max-width:37rem;left:0;right:0;margin: 0 auto; background-color: rgba(245,255,248,.9); padding: 1rem 1.4rem; border-radius:1rem;`
    })
    let dismiss = D.make('button', {
      innerHTML: '-->',
      onclick: function() {
        item.remove()
      },
      className: "btn btnSubmit"
    })
    item.append(D.make('br'), dismiss)
    D.find('#main').append(item)
  }
})
