S.html.account = function() {
  'use strict'
  if (!S.DB.user) {
    S.events.view('login')
  }
  post('/store/account', S.DB.user, function(data) {
    data = JSON.parse(data)
    S.data.account = data;
    if (data.error) {
      delete S.DB.user
      delete S.DB.account
      S.events.save()
      S.events.view('login')
    } else {
      S.DB.account = S.data.account
      S.events.save()
      D.find('#main').innerHTML =  `
        <style>
        </style>
        <article>
          <h1>Welcome ${S.DB.user.name}</h1>
          <p><b>Options:</b></p>
          <ul>
            <li class='link' onclick='S.events.load({author: "${data.user}"})'>Visit Profile</li>
            <li class='link' onclick='S.pages.profile()'>Manage Profile</li>
            <li class='link' onclick='S.pages.createPage()'>Create a page/post</li>
            <!--<dt class='link'>See earnings</dt>-->
            <li class='link' onclick='S.pages.listPages()'>Manage pages</li>
            <li class='link' id='signOut'>Sign out</li>
          </ul>
          <div id='stats'>
            <h2>Stats</h2>
            <ul id='statsList'>
              <li>Account Level: ${(data.lvl).toFixed(2)}</li>
            </ul>
          </div>
        </article>
      `
      if (data.favorites && Object.keys(data.favorites).length) {
        let pages = D.make('div')
        let addPages = function() {
          let matched = Object.keys(data.favorites)
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
            D.find('#main').append(D.make('h2', {
              innerText: 'Following:',
              style:'text-align:center;'
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
      }
      if (data.pages && Object.keys(data.pages).length) {
        let makeLikes = function() {
          let likes = 0
          for (let x in data.pages) {
            if (S.search[x]) {
              likes += S.search[x].upvotes || 0
            }
          }
          D.find('#statsList').innerHTML += `<li>Your pages have received ${likes.toFixed(0)} likes</li>`
        }
        if (!S.search) {
          post("/store/search", '', function(data) {
            S.search = JSON.parse(data)
            S.searchUpdated = (new Date).valueOf()
            makeLikes()
          })
        } else {
          makeLikes()
        }
      }
      if (data.infractions.length == 0) {
        D.find('#statsList').innerHTML += `<li>You have committed 0 infractions</li>`
      }
      D.find('#main #signOut').onclick = function() {
        delete S.DB.user
        delete S.DB.account
        S.events.save()
        S.events.view('home')
      }
    }
  })
}
