
window.imports.login = function(parentBox) {
  'use strict'
  let box = parentBox.querySelector('#login_Container')
  box.querySelector('#showLogin_button').onclick = function() {
    this.style.display = 'none';
    box.querySelector('#login_Form').style.display = ''

  }
  box.querySelector('#showCreateAccount_button').onclick = function() {
    this.style.display = 'none';
    box.querySelector('#createAccount').style.display = ''
  }
box.querySelector('#login_Form').onsubmit = function(event) {
  event.preventDefault();
  let login = {username: box.querySelector('#user').value, password: box.querySelector('#pass').value}
  U.post( "/login", login, function( data ) {
    data = JSON.parse(data)
    if (data.response != 'failure') {
      window.account = data
      Card.user = login
      Card.events.save()
      account.login = login
      C.keypass = {user: login.username, key: data.key}
      D.find('#view').innerHTML = C.templates.topNav()
      imports.topNav();
    } else {
      box.querySelector('#statusLogin').innerHTML='<b style="color: red;">Login failed</b>'
    }
  }, function(err) {
    console.log(err + '\n fish')
  });
}
box.querySelector('#createAccount').onsubmit = function(event) {
  event.preventDefault();
  var user = box.querySelector('#user1').value;
  var pass = box.querySelector('#pass1').value;
  $.post( "/signup", { user: user, pass : pass}, function( data ) {
    if (data.response == 'success') {
      box.querySelector('#createAccount').innerHTML = 'Account Created!'
    } else {
      box.querySelector('#accountSuccess').innerHTML = 'Invalid username'
    }
  }, 'json');
}
}
