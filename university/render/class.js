Uni.render.class = function(id, item) {
  Uni.userData.currentClass = id
  let article = D.make('article')
  let table = D.make('div', {
    className: 'moduleMap'
  })
  let row1 = D.make('ol'), row2 = D.make('ol');
  table.append(row1,row2)
  item.modules.forEach(ele => {
    if (!Uni.modules[ele]) return;
    let td = D.make('li', {
      className: 'btn',
      style: 'display: list-item;margin:.1rem;'
    })
    row2.appendChild(td)
    if (typeof(ele) === 'string') {
      td.innerText = Uni.modules[ele].title
      td.onclick = function() {
        Uni.data.currClass = id
        Uni.render.base(ele)
      }
      if (!Uni.userData.completed[ele]) {
        //td.classList.add('incomplete')
      } else {
        td.classList.add('complete')
        td.innerHTML += '<icon class="fa fa-check"></icon>'
      }
    }
  })
  article.append(
    Uni.render.header(item),
    D.make('h1', {innerText: item.title}),
    D.make('span', {innerText: 'Suggested pre-reqs: ' + (item.prereqs && item.prereqs.length ? item.prereqs.join(', ') : 'none') + `\n Credits: ${item.credits || 0}`}),
    D.make('div', {innerHTML: item.text}),
    D.make('div', {
      innerHTML : `The following are the lessons/homework/tests/projects that make up the course. It is recommended that you complete them in order from left to right. Lessons and homework portions may be skipped and still receive credit if you're already familiar with some of the material.
      Starred items cannot be skipped and still receive credit.`
    }),
    table
  )
  D.find('#main').append(article)
}
