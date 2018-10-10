Uni.render.lessonQuestions = function(item) {
  let form = D.make('form', {
    style: 'padding: .2rem; box-shadow: 0px 0px .05rem .1rem #112;box-sizing:border-box;',
    autocomplete: 'off',
    innerHTML: `
    <style>
      input[type=radio] {
        cursor: pointer;
        width: .8rem;
        height:.8rem;
        vertical-align:middle;
        margin:.1rem;
      }
    </style>
    <h3>Questions:</h3>`,
    onsubmit: function(e) {
      e.preventDefault();
      let solved = 0;
      let q = 0;
      item.questions.forEach((ele,i) => {

        if (ele.type === 'TF' || ele.type === 'multiple') {
          q++
          if (form['q_'+i].value !== ele.answer.toString()) {
            form.querySelector('#q_'+ i).style.backgroundColor = '#F99'
          } else {
            solved++
            form.querySelector('#q_'+ i).style.backgroundColor = '#8FF'
          }
        } else if (ele.type == 'match') {
          let opts = form.querySelectorAll('#q_'+ i + ' input')
          opts.forEach((input, x) => {
            q++
            if (form.querySelector(`#q_${i}` + ' #m_' + ((input.value) * 2 - 1)) && ele.options[x*2 + 1] == form.querySelector(`#q_${i}` + ' #m_' + ((input.value) * 2 - 1)).innerHTML) {
              solved++
              input.style.backgroundColor = '#8FF'
            } else {
              input.style.backgroundColor = '#F99'
            }
          })
        } else if (ele.type =='fill') {
          q++
          if (form['q_'+i].value !== ele.answer.toString()) {
            form.querySelector('#q_'+ i).style.backgroundColor = '#F99'
          } else {
            solved++
            form.querySelector('#q_'+ i).style.backgroundColor = '#8FF'
          }
        }
      })
      D.find('#statusCorrect').innerHTML = solved + '/' + q + ' correct'
      if (solved === q) {
        Uni.userData.completed[item.id] = true
        D.find('#continue').style.transition = '2s all ease-out'
        D.find('#continue').classList += ' shine'
        Uni.update("completed", item.id, true)
        //    data: i
      }
    }
  })
  let qList = D.make('ol')
  form.append(qList)
  item.questions.forEach((ele,i) => {
    let block = D.make('li', {
      id: 'q_' + i,
      style: 'margin-bottom:.8rem;'
    })
    let question = D.make('div', {
      innerHTML: ele.text
    })
    block.append(question)
    if (ele.type === 'TF') {
      let opts = D.make('ul', {
        style: 'list-style:none;'
      })
      let li = [D.make('li'), D.make('li')]
      li[0].innerHTML = `<label><input name='q_${i}'type='radio' value='T'>True</label>`
      li[1].innerHTML = `<label><input name='q_${i}'type='radio' value='F'>False</label>`
      opts.append(...li)
      block.append(opts)
    } else if (ele.type === 'fill') {
      let hintCount = 0;
      let hintText = D.make('span', {
        style: `padding: .3rem; font-weight: 700;`
      })
      let hintBtn = D.make('button', {
        type: 'button',
        innerHTML: 'See Hint',
        onclick: function() {
          this.innerHTML = 'see more'
          if (ele.answer && hintCount < ele.answer.length) {
            let section = Math.floor(ele.answer.length/3)
            hintText.innerHTML += ele.answer.slice(hintCount, hintCount+section)
            hintCount += section
          }
        }
      })

      let input = D.make('input', {
        name: `q_${i}`,
        type: 'text',
        style: 'margin: .1rem;',
        placeholder: 'use x instead of accents'
      })
      block.append(input, hintBtn, hintText)
    } else if (ele.type ==='multiple') {
      let opts = D.make('ol', {
      //  style: 'list-style-type: lower-latin;'
        style: 'list-style-type: none;'
      })
      ele.options.forEach((item,x)=> {
        let li = D.make('li')
        let label = D.make('label', {
          className: 'btn',
          style: 'margin: .15rem; min-width: 10rem;'
        })
        let input = D.make('input', {
          type: 'radio',
          name: `q_${i}`,
          style: 'filter: contrast(150%) drop-shadow(0px 0px 1px black);',
          value: x
        })
        label.append(input)
        label.innerHTML += ' ' + item
        li.append(label)
        opts.append(li)
      })
      block.append(opts)
    } else if (ele.type == 'match') {
      let table = D.make('table')

      let left = D.make('td')
      let list1 = D.make('ol')
      left.append(list1)
      let right = D.make('td')
      let list2 = D.make('ol', {
        style: `list-style: none;`
      })
      right.append(list2)
      table.append(left, right)
      let randomizer = []
      for (let i = 0; i < ele.options.length; i++) {
        if (i % 2) {
          let li = D.make('li', {
            innerHTML: ele.options[i],
            id: `m_${i}`,
            style: 'margin: .2rem;'
          })
          randomizer.push(li)
        } else {
          let input = D.make('input', {
            type: 'text',
            maxLength: 1,
            style: 'width: 1rem;text-align:center;margin: .1rem;',
            id: `m_${i}`
          })
          input.setAttribute('data-option', i)
          let li = D.make('li', {
          })
          li.append(input)
          li.innerHTML += ' ' + ele.options[i]
          list2.append(li)
        }
      }
      let startLength = randomizer.length - 1
      while (randomizer.length > 0) {
        let x = Math.floor(Math.random() * randomizer.length)
        let item = randomizer.splice(x, 1)[0]

        list1.append(item)
        item.id = 'm_' + ((startLength-randomizer.length) * 2 + 1)
      }
      block.append(table)
    }
    if (ele.hint) {
      let hint = D.make('button', {
        innerHTML: 'see hint',
        className: 'btnInfo',
        onclick: function() {
          this.parentNode.replaceChild(D.make('div', {
            innerHTML: ele.hint
          }),this)
        }
      })
      block.append(hint)
    }
    qList.append(block)
  })
  let footer = D.make('div')
  footer.append(
    D.make('input', {
      className: 'btn btnSubmit',
      type: 'submit',
      value: 'Check My Answers'
    }),
    D.make('span', {
      className: '',
      id:'statusCorrect',
      value: '',
      style: 'margin-left:1rem;font-weight:600;'
    })
  )
  form.append(footer)
  return form
}
