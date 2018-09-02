S.html.login = function(expired) {
  'use strict'
  D.find('#main').innerHTML = `
  <div file='html/login.js' style="text-align:center;">
    ${expired? '<p>Please re-login, your signin key has expired</p>' : ''}
  <h1> Login </h1>
  <div id='loginStatus'></div>
<form id='login_form'>
<div style='display: inline-block; text-align: left;'>
  <label for='login_username' >Username: </label><br>
  <label for='login_password' >Password: </label>
</div>
<div style='display: inline-block; text-align: right;'>
  <input type='text' name="user" placeholder='username' id = 'login_username' required pattern="[\\w ]{1,20}" title='1-20 letters numbers spaces or _'><br>
  <input type='password' name="pass" placeholder='password' id = 'login_password' required pattern='.{8,70}' title="minimum 8 characters, over fifteen preferred, maximum 70"><br>
</div>
<br>
<input type='submit' class='btn btnSubmit' style='margin:.2rem;'>
</form>
<b> Don't have an account? <a class='link' onclick="S.events.view('signup')">Sign up now</a>.</b>
  </div>
  `
  D.find('#login_form').onsubmit = function(event) {
    event.preventDefault();
    let form = {
      user: this.user.value,
      pass: this.pass.value
    }
    post('/verifyLogin', form, function(data) {
      if (data.key) {
        data.name = form.user
        D.find('#loginStatus').innerHTML = `<h2 style='text-align:center;'>Login Accepted</h2>`
        S.DB.user = data
        S.events.save()
        setTimeout(function() {
          S.events.view('account')
        }, 1000)
      }
    }, function(err) {
      D.find('#loginStatus').innerHTML = '<b class="btnWarn">Login Failed. Try again or create new account.</b>'
      delete S.DB.account
      delete S.DB.user
    }, {responseType: 'json'})
  }
}
