S.js.loadComments = function() {
  'use strict'
  D.find('#main').innerHTML = ''
  post('/store/getComments', S.data.comments, function(comments) {
    try {
      comments = JSON.parse(comments)
      let top = D.make("article", {
        innerHTML: `<h2>Comments & Discussion</h2>`
      })
      let renderComment = function(x) {
        try {
          let line = D.make('div', {
            style: `margin-top:.3rem; box-shadow: 1px 1px .1rem .03rem black;word-break: break-word;`
          })
          let header = D.make("p", {
            innerText: (new Date(+x)).toLocaleString(),
            style: ' margin:0;'
          })
          let author = D.make("span", {

          })
          author.append(D.make('a', {
            innerText: `${comments[x].by}`,
            style: 'font-weight:700; margin-left:1rem;',
            href: '/?author='+comments[x].by
          }),' said:')
          header.append(author)
          let text = D.make('p', {
            innerText: comments[x].text,
            style: 'margin:.1rem;'
          })
          line.append(header, text)
          top.append(line)
        } catch(err) {console.log(err)}
      }
      if (!Object.keys(comments).length) {
        top.innerHTML += `<p>No comments found.</p>`
      } else {
        for (let x in comments) {
          renderComment(x)

        }
      }
      let addComment = D.make('form', {
        style: `margin:0 auto; margin-top:1rem;text-align:center; max-width:100%; width:35rem;`,
        onsubmit: function(e) {
          e.preventDefault();
          let text = D.find('#text').value//contentWindow.document.querySelector('#textBox').innerText
          if (text.length) {
            D.find('#text').value = ''
            let pkg = {
              text: text,
              user: S.DB.user,
              id: S.data.comments
            }
            post('/store/addComment', pkg, function(data){
              data = JSON.parse(data)
              if (data.success) {
                console.log(data)
                let date = (new Date).valueOf()
                comments[date] = {
                  by: S.DB.user.name,
                  text: text
                }
                renderComment(date)
              } else {
                console.log(data.err)
                if (data.err == 'login failed') S.html.login(1)
              }
            })
          }
        }
      })
      if (S.DB.account) {
        addComment.innerHTML = `<hr>Add a comment below
        <textarea id='text' style='min-height:10rem;width:98%;' maxlength=1500></textarea><br>
        <!--<iframe id='text' src='/lib/richText.html' style=' width:100%;min-height:14rem;box-sizing:border-box;'></iframe>-->
        <input type='submit' value='Add comment' class='btn btnSubmit'>`
      } else {
        addComment.innerHTML = `<b>Please <a href='/?view=account'>login</a> if you wish to leave a comment`
      }

      D.find('#main').append(top, addComment)
    } catch (err) {
      console.log(err)
    }
  })
}
