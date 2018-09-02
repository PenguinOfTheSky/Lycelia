S.html.search = function() {
  D.find('#crawler').innerHTML = ''
  let render = function(arr, start) {
    D.find('#main').innerHTML = `
      <style>
        .searchDiv {
          box-shadow: .1rem .05rem .05rem .1rem rgba(0,0,0,.7);
          max-width: 95%;
          margin: 0 auto;
          cursor: pointer;
          margin-top:.45rem;
          padding: 1vh;
        }
        .searchTitle {
          display: flex;
          flex-wrap:wrap;
          justify-content:space-between;
        }
        .fa-thumbs-up {
          color: rgb(0,205,0);
        }
        .fa-thumbs-down {
          color: rgb(245,0,0);
        }
        .terms span {
          border-radius:.25rem;
          padding:.1rem;
        }
      </style>
      <div>
      Show R content?<input id='showR' type='checkbox'>
      Show X content?<input id='showX' type='checkbox'>
      </div>
    `
    Object.assign(D.find('#showR'), {
      checked: S.DB.preferences.showR,
      onchange: function() {
        S.DB.preferences.showR = this.checked
        S.events.save()
      }
    })
    Object.assign(D.find('#showX'), {
      checked: S.DB.preferences.showX,
      onchange: function() {
        S.DB.preferences.showX = this.checked
        S.events.save()
      }
    })
    start = start || 0;
    let frag = document.createDocumentFragment()
    for (let x = start; x<arr.length && x < start + 25; x++) {
      if ((S.search[arr[x]].rating =='18' && !S.DB.preferences.showR) ||(S.search[arr[x]].rating=='21' && !S.DB.preferences.showX)) {
        continue;
      }
      let div = D.make('div', {
        className: 'searchDiv',
        onclick: function() {
          S.events.load({id: arr[x]})
          //location.href = '?id='+ arr[x]
        }
      })
      let title = D.make('div', {
        className: 'searchTitle'
      })
      let rating = S.html.rating_span(S.search[arr[x]].rating)
      let author = D.make('div')
      author.append(D.make('span', {
        innerText: S.search[arr[x]].title,
        style: 'font-size:1.3rem;font-weight:600'
      }), D.make('span', {
        innerText: ` by ${S.search[arr[x]].author}`
      }))
      let lastMod = D.make('span', {
        innerText: `Updated ${(new Date(S.search[arr[x]].modified)).toLocaleDateString()}  \ `,
        style: 'margin-right:.25rem;'
      })
      let upDown = D.make('span', {
        innerHTML: `<icon class='fa fa-thumbs-up'>${Math.trunc(S.search[arr[x]].upvotes)}</icon> <icon class='fa fa-thumbs-down'>${Math.trunc(S.search[arr[x]].downvotes)}</icon> `
      })
      let right = D.make('div')
      right.append(upDown, lastMod, rating)
      title.append(author, right)
      let terms = D.make('div', {
        className: 'terms'
      })
      let cat1 = D.make('span', {
        style: `border:3px outset #555`,
        innerText: S.search[arr[x]].type
      })
      if (S.search[arr[x]].type == 'text') cat1.innerText = `content`

    //  let cat2 = D.make('div')
      innerText: S.search[arr[x]].subtypes.forEach(ele=> {
        let span = D.make('span', {
          innerText: ele,
          style: `margin-left:.1rem;`
        })
        if (ele == 'fanfiction' || ele == 'fanfic') {
          span.style.fontWeight = 700
          //span.style.backgroundColor = '#DDF'
        } else if (ele =='Game' || ele == 'game') {
          span.style.fontWeight = 700
        }
        terms.append(span)
      })

      let keywords = D.make('div')

      if (S.search[arr[x]].keywords.length && (S.search[arr[x]].keywords[0] || S.search[arr[x]].keywords.length >1)){
        S.search[arr[x]].keywords.forEach(ele=> {
          let span = D.make('span', {
            innerText: ele,
            style: `margin-left:.1rem;`
          })
          keywords.append(span)
        })
        terms.append( keywords)
      }
      terms.prepend(cat1)
      let description = D.make('div', {
        innerText: `${S.search[arr[x]].description}`,
        className: 'searchDescription'
      })
      div.append(title, terms, description)
      frag.append(div)
    }
    frag.append(D.make('br'))
    D.find('#main').appendChild(frag)
  }
  let search = function(opts) {
    let words = opts.main.split(' ')
    let results = []
    loop1:
    for (let x in S.search) {
      let ele = JSON.stringify(S.search[x])
      for (let i = 0; i < words.length; i++) {
        if (!ele.match(new RegExp(words[i], 'i'))) continue loop1;

        //avoid false positives on incomplete words in future?
      }
      results.push(x)
    }
    if (results.length) {
      render(results, start)
    } else {
      D.find('#main').innerHTML = `
      <article>
        <h2>No Results Found for <i>${opts.main}</i></h2>
      </article>
      `
    }

  }
  let urlParams = new URLSearchParams(window.location.search);
  let q = urlParams.get('q')
  let start = urlParams.get('offset')
  if (S.search && S.searchUpdated > (new Date).valueOf() - 86400000) {
    search({main: q})
  } else {
    post("/store/search", '', function(data) {
      S.search = JSON.parse(data)
      S.searchUpdated = (new Date).valueOf()
      search({main: q})
    })
  }
}
