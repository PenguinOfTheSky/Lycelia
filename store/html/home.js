S.html.home = function() {
  'use strict'
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
  <article file='html/splash.html' style="">
    <!--<h2 style='text-align:center;'>Featured Pages</h2>
    <h2 style='text-align:center;'>Most Popular</h2>
    <h2 style='text-align:center;'>Lycelia Apps</h2>-->
    <h1>Lycelia <span style='font-size:.9em'>(beta)</span></h1>
    Find stories, news, games, and more, or sign up and add your own.<br>
    Apps by Lycelia can be found <a href='https://lycelia.com/?id=d4x'>here.</a>
    <p style='font-size:1.05rem'>Check out our new contests <a href='https://lycelia.com/?id=23'>here</a> and enter to win prizes.</p>
  </article>
  `
  if (LyceliaFeaturedPages) {
    let pages = LyceliaFeaturedPages
      let popular = D.make('div', {
        innerHTML: `<h3  style='text-align:center;'>Popular</h3>`,
      })
      let recent = D.make('div', {
        innerHTML: `<h3 style='text-align:center;'>Recently Updated</h3>`
      })
      let shuffle = function(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
      }
      let render = function(arr, start) {
        start = start || 0;
        let frag = document.createDocumentFragment()
        arr = shuffle(arr)
        for (let x = start; x<arr.length && x < start + 4; x++) {
          if ((arr[x].rating =='18' && !S.DB.preferences.showR) ||(arr[x].rating=='21' && !S.DB.preferences.showX)) {
            continue;
          }
          let div = D.make('div', {
            className: 'searchDiv',
            onclick: function() {
              S.events.load({id: arr[x].id})
              //location.href = '?id='+ x
            }
          })
          let title = D.make('div', {
            className: 'searchTitle'
          })
          let rating = S.html.rating_span(arr[x].rating)
          let author = D.make('div')
          author.append(D.make('span', {
            innerText: arr[x].title,
            style: 'font-size:1.3rem;font-weight:600'
          }), D.make('a', {
            innerText: `by ${arr[x].author}`,
            style: 'margin-left: .5rem;',
            onclick: function(e) {
              e.stopPropagation()
            },
            href: '?author='+arr[x].author
          }))
          let comments = D.make('span', {
            innerText: `${arr[x].comments || 0} Comments`,
            style: 'margin-right:.25rem;',
            className: 'link',
            onclick: function(e) {
              e.stopPropagation()
              S.events.load({comments: arr[x].id})
            }
          })
          let lastMod = D.make('span', {
            innerText: `Updated ${(new Date(arr[x].modified)).toLocaleDateString()}  \ `,
            style: 'margin-right:.25rem;'
          })
          let upDown = D.make('span', {
            innerHTML: `<icon class='fa fa-thumbs-up'>${Math.trunc(arr[x].upvotes)}</icon> <icon class='fa fa-thumbs-down'>${Math.trunc(arr[x].downvotes)}</icon> `
          })
          let size = D.make('span', {
            innerText: ` ${(Math.round(arr[x].size/700))}kb `,
            style: 'margin-right:.25rem;',
            title: 'filesize'
          })
          let right = D.make('div')
          right.append(comments, size, upDown, lastMod, rating)
          title.append(author, right)
          let terms = D.make('div', {
            className: 'terms'
          })
          let cat1 = D.make('span', {
            style: `border:3px outset #555`,
            innerText: arr[x].type
          })
          if (arr[x].type == 'text') cat1.innerText = `content`

        //  let cat2 = D.make('div')
          innerText: arr[x].subtypes.forEach(ele=> {
            let span = D.make('span', {
              innerText: ele,
              style: `margin-left:.1rem;`
            })
            ele = ele.toLowerCase().trim()
            if (ele == 'fanfiction' || ele == 'fanfic') {
              span.style.fontWeight = 700
              span.append(D.make('img', {
                src: '/iconLib/bookPenguin.svg',
                className: 'textImg'
              }))
            } else if (ele == 'game' || ele == 'games') {
              span.style.fontWeight = 700
              span.append(D.make('img', {
                src: '/iconLib/gameController.svg',
                className: 'textImg'
              }))
            }
            terms.append(span)
          })

          let keywords = D.make('div')

          if (arr[x].keywords.length && (arr[x].keywords[0] || arr[x].keywords.length >1)){
            arr[x].keywords.forEach(ele=> {
              let span = D.make('span', {
                innerText: ele,
                style: `margin-left:.1rem;`
              })
              ele = ele.toLowerCase().trim()
              if (ele == 'comedy' || ele == 'humor') {
                span.style.fontWeight = 700
                span.append(D.make('img', {
                  src: '/iconLib/smile.svg',
                  className: 'textImg'
                }))
              } else if (ele == 'tragedy') {
                span.style.fontWeight = 700
                span.append(D.make('img', {
                  src: '/iconLib/sad.svg',
                  className: 'textImg'
                }))
              } else if (ele == 'thriller' || ele == 'suspense') {
                span.style.fontWeight = 700
                span.append(D.make('img', {
                  src: '/iconLib/surprised.svg',
                  className: 'textImg'
                }))
              } else if (ele == 'romance') {
                span.style.fontWeight = 700
                span.append(D.make('img', {
                  src: '/iconLib/heart.svg',
                  className: 'textImg'
                }))
              } else if (ele == 'horror') {
                span.style.fontWeight = 700
                span.append(D.make('img', {
                  src: '/iconLib/horror.svg',
                  className: 'textImg'
                }))
              } else if (ele == 'drama') {
                span.style.fontWeight = 700
                span.append(D.make('img', {
                  src: '/iconLib/drama.svg',
                  className: 'textImg'
                }))
              }
              keywords.append(span)
            })
            terms.append( keywords)
          }
          terms.prepend(cat1)
          let description = D.make('div', {
            innerText: `${arr[x].description}`,
            className: 'searchDescription'
          })
          div.append(title, terms, description)
          frag.append(div)
        }
        frag.append(D.make('br'))
        return (frag)
      }
      recent.append(render(pages.hot, 0))
      popular.append(render(pages.popular, 0))
      D.find('#main').append(recent, popular)
      /*for (let x = 0; x < pages.popular.length; x++) {
        console.log(pages.popular[x].title)
      }*/
  }
}
