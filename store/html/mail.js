S.html.mail = function() {
  'use strict'
  if (!S.DB.user) {
    S.events.view('login')
  }
  let composeMsg = D.make('form', {
    innerHTML: `<div id='statusMail'></div><h3>New Message</h3><div>Send to: <input maxlength="30" title='recipient' type='text' id='recipient'></div>
    <div>Subject: <input type='text' title='subject line' id='subject' maxlength="70"></div>
    <div><textarea style='width:100%;height:9.5rem;' id='text'></textarea></div>
    <input type='submit' value='Send'>`,
    style: 'margin:.3vh; margin-top: .5vh; box-shadow: .05vh .05vh .1vh .05vh black; padding: .5vh;',
    onsubmit: function(e) {
      e.preventDefault();
      let msg = {
        to: this.recipient.value,
        subject: this.subject.value,
        text: this.text.value,
        user: S.DB.user
      }
      post('/store/mail_send', msg, function(data) {
        data = JSON.parse(data)
        if (!data.error) {
          delete msg.user
          S.data.mail.sent[data.time] = msg
          D.find('#mailList').innerHTML = '<h2>Message sent</h2>'
        } else {
          D.find('#statusMail').innerHTML = '<b>Error. Wrong recipient username or login credentials expired.</b>'
        }
      })
    }
  })
  let newMessage = function(opts) {
    D.find('#mailList').innerHTML = ''
    D.find('#mailList').append(composeMsg)
    if (opts) {
      composeMsg.querySelector('#recipient').value = opts.to || ''
      composeMsg.querySelector('#subject').value = opts.subject || ''
    }
  }
  let renderMessage = function(id, type) {
    D.find('#mailList').innerHTML = ''
    let msg = D.make('div', {
      style: 'text-align:left; box-shadow: 2px 2px 5px 3px black; margin: .5rem 0;padding: .21rem;'
    })
    let msgNav = D.make('div', {

    })
    let date = D.make('span', {
      style: 'float: right;',
      innerText: (new Date(+id)).toLocaleDateString()
    })
    msgNav.append(date)
    let msgInfo = D.make('div')
    if (type == 'inbox') {
      let report = D.make('button', {
        innerText: 'Report'
      })
      let block = D.make('button', {
        innerText: 'Block user'
      })
      let friendRequest = D.make('button', {
        innerText: 'Send Friend Request'
      })
      let reply = D.make('button', {
        innerText: 'Reply',
        onclick: function() {
          newMessage({to: S.data.mail[type][id].from, subject: S.data.mail[type][id].subject})
        }
      })
      msgNav.append(reply)
      msgInfo.append(D.make('div', {
        innerText: `From: ${S.data.mail[type][id].from}`,
        className: 'link',
        onclick: function() {
          S.events.load({author: S.data.mail[type][id].from})
        }
      }))
    } else if (type =='sent') {
      msgInfo.append(D.make('div', {
        innerText: `To: ${S.data.mail[type][id].to}`,
        className: 'link',
        onclick: function() {
          S.events.load({author: S.data.mail[type][id].to})
        }
      }))
    }
    msgInfo.append(D.make('div', {
      innerText: 'Subject: '+ S.data.mail[type][id].subject
    }))
    let msgBody = D.make('div', {
      innerText: S.data.mail[type][id].text
    })
    msg.append(msgNav, msgInfo, D.make('hr'), msgBody)
    D.find('#mailList').append(msg)
  }
  let renderList = function(arr, type) {
    let keys = Object.keys(arr)
    if (!keys.length) {
      D.find('#mailList').innerHTML = 'No Messages Found'
    } else {
      keys = keys.sort(function(a,b) {
        return b-a
      })
      D.find('#mailList').innerHTML = ''
      let selected = {}
      let list = D.createDocumentFragment()
      keys.forEach(ele => {
        let msg = D.make('div', {
          style: `display: flex;flex-wrap:wrap; justify-content:space-between;margin: 1rem 0; box-shadow: 2px 2px 5px 2px black; padding: .25rem;border-radius:.2rem; cursor: pointer;`,
          onclick: function() {
            renderMessage(ele, type)
          }
        })
        let checkbox = D.make('button', {
          innerText: 'X',
          style: 'margin-right: .35rem;',
          onclick: function(e) {
            e.stopPropagation()
            let x = arr[ele]
            S.data.mail.trash[ele] = x;
            delete arr[ele]
            msg.remove();
            post('/store/mail_delete', {user: S.DB.user, id: ele, type: type}, function(data) {
              console.log(data)
            })
          }
        })
        let left = D.make('span', {
          innerText: arr[ele].from
        })
        if (type == 'sent') {
          left.innerText = 'to: ' + arr[ele].to
        }
        left.prepend(checkbox)
        let middle = D.make('span', {
          innerText: arr[ele].subject,
        })
        let right = D.make('span', {
          innerText: (new Date(+ele)).toLocaleDateString()
        })
        msg.append(left,middle, right);
        list.append(msg)
      })
      D.find('#mailList').append(list)
    }
  }
  post('/store/mail_list', S.DB.user, function(data) {
    data = JSON.parse(data)
    S.data.mail = data
    if (data.error) {
      delete S.DB.user
      delete S.DB.account
      S.events.save()
      S.events.view('login')
    } else {
      D.find('#main').innerHTML =  `
        <style>
          #mailNav {
            background-color: #DDD;
            box-shadow: .1rem .1rem .1rem .05rem black;
          }
          #mailNav > button {
            margin: .1rem .2rem;
          }
        </style>
        <article>
          <div id='mailNav'>
          </div>
          <div id= 'mailList'>

          </div>
        </article>
      `
      let navButtons = D.createDocumentFragment()
      navButtons.append(
        D.make('button', {
          innerHTML: 'Inbox',
          onclick: function() {renderList(data.inbox, 'inbox')}
        }),
        D.make('button', {
          innerHTML: 'Sent',
          onclick: function() {renderList(data.sent, 'sent')}
        }),
        D.make('button', {
          innerHTML: '<b>Compose/New Message</b>',
          onclick: function() {newMessage()}
        }),
        D.make('button', {
          innerHTML: 'Trash',
          style: 'display: none',
          onclick: function() {renderList(data.trash)}
        })
      )
      D.find('#mailNav').append(navButtons)
      renderList(data.inbox, 'inbox')
    }
  })
}
