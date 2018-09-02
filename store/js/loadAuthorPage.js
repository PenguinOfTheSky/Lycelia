S.js.loadAuthorPage = function() {
  post('/store/getAuthorPublic', S.data.author, function(author) {
    author = JSON.parse(author)
    D.find("#crawler").innerHTML = `${JSON.stringify(author, 0, 2)}`
    let main = D.find('#main')
    main.innerHTML = `
    <style>
      #stats {

      }
      #stats > div {
        justify-content: space-around;
        flex-wrap:wrap;
        display: flex;
      }
    </style>
    `
    let article = D.make('article')
    let title = D.make('h1', {
      innerText: S.data.author + "'s page"
    })
    let bio = D.make('div', {
      innerText: author.bio || ''
    })
    let stats = D.make('div', {
      id: 'stats',
      innerHTML: `<h2>Merit Badges<h2>`
    })
    let awards = D.make('div', {
    })
    for (let x in author.awards) {
      let badge = S.html.awards(x, author.awards[x])
      if (badge) awards.append(badge)
      else console.log(x, badge)
    }
    let infractions = D.make('div', {
      innerHTML: "A member since "+ (new Date(+author.created)).toLocaleDateString() +"<br><b>Infraction points </b>"
    })
    let infractionGlobe = D.make('span', {
      innerText: author.infractions.toFixed(0),
      style: 'border-radius:50%;padding:0rem .3rem ;'
    })
    if (author.infractions < 5) {
      infractionGlobe.style.backgroundColor ='rgba(0,255,0,.7)'
    } else if (author.infractions < 15) {
      infractionGlobe.style.backgroundColor ='rgba(255,203,0,.7)'
    } else {
      infractionGlobe.style.backgroundColor ='rgba(255,0,25,1)'
    }
    infractions.append(infractionGlobe)
    stats.append(awards)
    article.append(title)
    if (author.bio) article.append(bio)
    article.append(infractions,stats)
    main.append(article)
    let pages = D.make('div')
    let addPages = function() {
      let matched = []
      for (let x in S.search) {
        if (S.search[x].author ==S.data.author) matched.push(x)
      }
      matched.sort(function(a, b) {
        return S.search[b].modified - S.search[a].modified  //fixthis?
      })
      matched.forEach(function(ele) {
        let pageDiv = D.make('div', {
          style: 'margin: 2vh 10%; display: block;',
          className: 'btn',
          onclick: function() {
            S.events.load({id: ele})
          }
        })
        let title = D.make('div', {
          innerText: S.search[ele].title,
          style: 'font-weight:700;font-size:1.3rem;margin-left:1rem;'
        })
        let rating = S.html.rating_span(S.search[ele].rating)
        rating.style.fontSize='1rem'
        title.append(rating)
        let pageStats = D.make('flex', {
          style: 'flex-direction:column;justify-content:center;'
        })
        let updated = D.make('div', {
          innerText: `Updated ${new Date(S.search[ele].modified).toLocaleDateString()}`
        })
        let description = D.make('div', {
          innerText: `${S.search[ele].description}`,
          className: 'searchDescription'
        })
        pageStats.append(updated)
        pageDiv.append(title,pageStats, description)
        pages.append(pageDiv)
      })
      if (matched.length) {
        article.append(D.make('h2', {
          innerText: 'Works Published:'
        }))
        main.append(pages)
      }
    }
    if (S.search && S.searchUpdated > (new Date).valueOf() - 86400000) {
      addPages()
    } else {
      post("/store/search", '', function(data) {
        S.search = JSON.parse(data)
        S.searchUpdated = (new Date).valueOf()
        addPages()
      })
    }
  }, function(err) {
    console.log(err)
    D.find('#main').innerHTML = "<article><br><b>author page not found<b></article>"
  })

}
