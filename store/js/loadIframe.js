S.js.loadIframe = function() {
  post('/store/getPageJSON', S.data.id, function(json) {
    if (json) {
      json = JSON.parse(json)
      //S.data.pageJson = json
      json['@type'] = 'article'
      json['@context'] = "http://schema.org"
      let crawlerData = D.make('script', {
        id: 'crawlerData',
        type: "application/ld+json",
        innerHTML: JSON.stringify(json, 0,2)
      })
      //if (D.find('#crawlerData')) D.find('#crawlerData').remove()
      //D.body.prepend(crawlerData)
      D.find('#crawler').innerHTML = `${JSON.stringify(json, 0, 2)}`
      D.find('#crawler').append(crawlerData)
      'use strict'
      let render = function() {
        try {
          let id = S.data.id
          let data = json //S.search[id]
          let div = D.make('div', {
            id: 'topDiv',
            style: ""
          })
          let title = D.make('h1', {

            style: 'text-align:center;margin-top:.1rem;margin-bottom:.1rem;'
          })
          title.append(D.make('span', {
            innerText: data.title + ' '
          }), D.make('a', {
            innerText: `by ${data.author}`,
            style: 'font-size: .8em; font-weight:500;font-style:italic;',
            href: '?author='+data.author
          }))
          let rating = S.html.rating_span(data.rating)
          rating.style.fontSize = "1rem"
          title.append(rating)
          let parents = D.make('ul', {
            style: "margin: 0px;"
          })
          let foundParents;
          let findParents = function(id, margin) {
            if (margin === 6) return 6;
            if (S.search[id].parent && S.search[S.search[id].parent]) {
              let finalMargin = findParents(S.search[id].parent, margin+1)
              foundParents = true;
              let li = D.make('li', {
                innerText: S.search[S.search[id].parent].title,
                style: `margin-left: ${finalMargin-margin}rem;`,
                className: 'link',
                onclick: function() {
                  S.events.load({id: S.search[id].parent})
                }
              })
              parents.append(li)
              return finalMargin
            } else return margin
          }
          findParents(id, 0)
          let flex = D.make('flex', {
            style: 'flex-break: break;justify-content: space-around;'
          })
          let stats = D.make('div', {
            style: "padding: .5rem;"
          })
          let likes = D.make('button', {
            className: 'btn btnSuccess',
            innerHTML: `<icon class='fa fa-thumbs-up'></icon> ` + Math.round(json.upvotes),
            onclick: function() {
              let like = function() {
                if (S.DB.account.likes[id]) return;
                S.DB.account.likes[id] = true
                json.upvotes+= S.DB.account.lvl
                S.events.save()
                likes.innerHTML = `<icon class='fa fa-thumbs-up'></icon> ` + Math.round(json.upvotes)
                let pkg = {
                  user: S.DB.user,
                  id: id,
                  upvote: true
                }
                post('/store/likeVote',pkg, function(data) {})
              }
              if (S.DB.account) like()
              else {
                alert('please login to hit "like"')
              }
            }
          }) //Number() paranoia?
          let dislikes = D.make('button', {
            className: 'btn btnWarn',
            innerHTML: `<icon class='fa fa-thumbs-down'></icon> ` + Math.round(json.downvotes),
            onclick: function() {
              let dislike = function() {
                if (S.DB.account.dislikes[id]) return;
                S.DB.account.dislikes[id] = true
                json.downvotes+= S.DB.account.lvl
                S.events.save()
                dislikes.innerHTML = `<icon class='fa fa-thumbs-down'></icon> ` + Math.round(json.downvotes)
                let pkg = {
                  user: S.DB.user,
                  id: id,
                  downvote: true
                }
                post('/store/likeVote',pkg, function(data) {})
              }
              if (S.DB.account) {
                dislike()
              } else {
                alert('please login to downvote')
              }
            }
          }) //Number() paranoia?

          let unfollow = D.make('button', {
            className: 'btn',
            innerText: "Unfollow",
            style: 'margin-left: .5rem;',
            onclick: function() {
              if (S.DB.account) {
                let pkg = {
                  user: S.DB.user,
                  id: id
                }
                post('/store/followPage',pkg, function(data) {
                  unfollow.parentNode.replaceChild(follow, unfollow)
                  delete S.DB.account.favorites[id]
                  S.events.save()
                })
              } else {
                alert('please re-login to unfollow')
              }
            }
          })
          let follow = D.make('button', {
            className: 'btnSuccess',
            innerText: "Follow this page",
            style: 'margin-left: .5rem;',
            onclick: function() {
              if (S.DB.account) {
                let pkg = {
                  user: S.DB.user,
                  id: id,
                  follow: true
                }
                post('/store/followPage',pkg, function(data) {
                  follow.parentNode.replaceChild(unfollow, follow)
                  S.DB.account.favorites[id] = (new Date).valueOf()
                  S.events.save()
                })
              } else {
                alert('please login to follow')
              }
            }
          })
          let comments = D.make('button', {
            innerText: 'Comments',
            className: 'btn btnInfo',
            'style': "margin-left: .2rem;",
            onclick: function() {
              S.events.load({comments: id})
            }
          })
          if (S.DB.user && S.search[id].author === S.DB.user.name) {
            let edit = D.make('button', {
              innerText: 'edit page',
              className: 'btn btnSubmit',
              style: 'float:right;',
              onclick: function() {
                post('/verifyKey',S.DB.user, function(data) {
                  if (data != 'false') {
                    S.pages.createPage(id)
                  } else {
                    S.html.login()
                  }
                })

              }
            })
            div.append(edit)
          }
          stats.append(likes, dislikes)
          if (!S.DB.account || !S.DB.account.favorites || !S.DB.account.favorites[id]) {
            stats.append(follow)
          } else {
            stats.append(unfollow)
          }
          stats.append(comments)
          if (foundParents) {
            flex.append(parents)
          }
          flex.append(stats)
          div.append(title,  flex)
          D.find('#main').innerHTML = ''
          D.find('#main').append(div)
          let getPage = function(affix) {
            post('/store/getPage', S.data.id + affix, function(data2) {
              if (data2) {
                let blob = new Blob([LZUTF8.decompress(data2, {inputEncoding: 'BinaryString'})], {type : 'text/html;charset=utf-8'});
                let iframeContainer = D.make("div")
                let iframe = D.make('iframe', {
                  style: 'width: 100%; height: 98.5vh; box-sizing:border-box;',
                  src:window.URL.createObjectURL(blob)/*should use this method in authorpal too. additional note: do i need to garbage collect this?*/
                })
                let full = false;
                let fullscreen = D.make("button", {
                  style: 'z-index:1;position:absolute;right:0;background-image:url("iconLib/fullscreen.svg");background-size:contain;width:1.3rem;height:1.3rem;opacity:.3;transition: opacity .25s ease-out;',
                  onmouseenter: function() {
                    this.style.opacity = 1
                  },
                  onmouseleave: function() {
                    this.style.opacity = .3
                  },
                  onclick: function() {
                    if (full == false ) {
                      this.style['background-image'] = "url('iconLib/compress.svg')"
                      Object.assign(iframeContainer.style, {
                        width: '100vw',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                        top: 0,
                        'z-index': 1,
                        backgroundColor: '#FCFCFC'
                      })
                      Object.assign(iframe.style, {
                        width: '100vw',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                        top: 0,
                        'z-index': 1
                      })
                      full = true;
                    } else {
                      full = false
                      this.style['background-image'] = "url('iconLib/fullscreen.svg')"
                      Object.assign(iframeContainer.style, {
                        width: '100%',
                        height: '',
                        position: 'relative',
                        left: "",
                        top: "",
                        'z-index': 0,
                        backgroundColor: '#FCFCFC'
                      })
                      Object.assign(iframe.style, {
                        width: '100%',
                        height: '98.5vh',
                        position: 'relative',
                        left: "",
                        top: "",
                        'z-index': 0
                      })
                    }
                  }
                })
                iframeContainer.append(iframe, fullscreen)
                blob = undefined //garbage collect
                if (json.author === "Lycelia") {
                  //nosandbox
                } else {
                  iframe.sandbox = "allow-scripts allow-forms allow-popups-to-escape-sandbox allow-popups allow-pointer-lock"
                }

                if (D.find('#bottomDiv')) {
                  D.find('#main').insertBefore(iframeContainer, D.find('#bottomDiv'))
                } else {
                  D.find('#main').append(iframeContainer)
                }
              } else {
                D.find('#main').innerHTML = `
                <article>
                  <h2>This page appears to be missing.</h2>
                  Hit the back button to return to sanity.
                </article>
                `
                if (S.DB.user && S.search[id].author === S.DB.user.name) {
                  let edit = D.make('button', {
                    innerText: 'edit page',
                    className: 'btn btnSubmit',
                    style: 'display:block;margin:0 auto;',
                    onclick: function() {
                      post('/verifyKey',S.DB.user, function(data) {
                        if (data != 'false') {
                          S.pages.createPage(id)
                        } else {
                          S.html.login()
                        }
                      })

                    }
                  })
                  D.find('#main').append(edit)

                }
              }
            }, function(err) {
              D.find('#main').innerHTML = `
              <article>
                <h2>This page appears to be missing.</h2>
                Hit the back button to return to sanity.
              </article>
              `
            })
          }
          let affix = ''
          let bottomDiv = D.make('div', {
            id: 'bottomDiv',
            innerHTML: `<div style='text-align:center'><a href='#topDiv'>Back to top</a></div>`
          })
          D.find('#main').append(bottomDiv)
          let addDescription = function() {
            let article = D.make('article')
            let p = D.make('p')
            let description = D.make('p', {
              innerText: json.description
            })
            article.append(description)
            D.find('#topDiv').append(article)
          }
          if (json.template == 'book') {
            if (!S.data.chapter) S.data.chapter = 1
            //if (S.data.chapter) {

          /*  } else {
              affix = '_' + json.chapters[0][0]// this vs 1?
            }*/
            if (S.data.chapter == 1) {
              addDescription()
            }
            let chapDiv = D.make('div', {
              id: 'chapDiv',
              style: 'text-align:center;'
            })
            let chapSelect = D.make('select', {
              onchange: function() {
                S.events.load({id: S.data.id, chapter: this.value})
              }
            })
            let chapIndex = 0;
            let chapArrayRef = {}
            json.chapters.forEach(function(ele, i) {
              chapIndex++
              chapArrayRef[chapIndex] = ele[0]
              let option = D.make('option', {
                innerText: (i+1)+'. ' + ele[1],
                value: chapIndex,//ele[0],
              })
              chapSelect.append(option)
            })
            chapDiv.append(chapSelect)
            if (S.data.chapter) chapSelect.value = S.data.chapter

            let cloneChapNav = chapDiv.cloneNode(1)
            bottomDiv.append(cloneChapNav)
            if (S.data.chapter) {
              bottomDiv.querySelector('select').value = S.data.chapter
            }
            bottomDiv.querySelector('select').onchange = function() {
              S.events.load({id: S.data.id, chapter: this.value})
            }
            if (+S.data.chapter < json.chapters.length) {
              let forward = D.make('button', {
                innerText: 'Next Chapter',
                style: 'margin-left:.5rem;',
                className: 'btnNudge',
                onclick: function() {
                  S.events.load({id: S.data.id, chapter: +S.data.chapter + 1})
                }
              })
              let secForward = forward.cloneNode(1)
              secForward.onclick = forward.onclick
              chapDiv.append(secForward)
              cloneChapNav.append(forward)
            }
            if (+S.data.chapter > 1) {
              let back = D.make('button', {
                innerText: 'Prev Chapter',
                style: 'margin-right:.5rem;',
                onclick: function() {
                  S.events.load({id: S.data.id, chapter: +S.data.chapter - 1})
                }
              })
              let secBack = back.cloneNode(1)
              secBack.onclick = back.onclick
              chapDiv.prepend(secBack)
              cloneChapNav.prepend(back)
            }
            D.find('#main').append(bottomDiv)
            affix = "_" + chapArrayRef[S.data.chapter]
            div.append(chapDiv)
          } else if (!json.template || json.template == '' || template == 'none') {
            addDescription()
          }
          getPage(affix)


        } catch (err) {
          console.log(err)
          D.find('#main').innerHTML = `
          <article>
            <h2>This page appears to be missing.</h2>
            Hit the back button to return to sanity.
          </article>
          `
          //console.log(err)
        }
      }
      if (S.search) {
        render()
      } else {
        post("/store/search", '', function(data) {
          S.search = JSON.parse(data)
          render()
        })
      }
    }
  }, function(err) {
    D.find('#main').innerHTML = `
    <article>
      <h2>This page appears to be missing.</h2>
      Hit the back button to return to sanity.
    </article>
    `
  })

}
