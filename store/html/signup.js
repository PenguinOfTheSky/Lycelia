S.html.signup = function() {
  'use strict'
  D.find('#main').innerHTML = `
  <div file='html/signup.js' style = 'text-align:center'>
  <h1> Create An Account </h1>
  <div id='formStatus'></div>
  <form id='signup_form'>
    <div style='display: inline-block; text-align: left;'>
      <label for='signup_username' >Username: </label><br>
      <label for='signup_password' >Password: </label>
    </div>
    <div style='display: inline-block; text-align: right;'>
      <input type='text' name="user" placeholder='username' id = 'signup_username' required pattern="[\\w ]{1,20}" title='1-20 letters numbers spaces or _'><br>
      <input type='password' name="pass" placeholder='password' id = 'signup_password' required pattern='.{8,70}' title="minimum 8 characters, over fifteen preferred, maximum 70"><br>
    </div>
    <p>Good passwords are >15 characters in length.</p>
    <input type='submit' class='btn btnSubmit' style='margin:.2rem;'>
  </form>
</div>
  `
  D.find('#main #signup_form').onsubmit = function(event) {
    event.preventDefault();
    let form = this;
    form = {
      user: form.user.value,
      pass: form.pass.value
    }
    post('/createAccount', form, function(data) {
      console.log(data)
      if (data.response == 'success') {
        D.find('#main #formStatus').innerHTML = `
        <h2 style='text-align:center'>Account Created!</h2>`
        setTimeout(function() {
          post('/verifyLogin', form, function(data) {
            if (data.key) {
              data.name = form.user
              S.DB.user = data
              S.events.save()
              setTimeout(function() {
                S.events.view('account')
              }, 10)
            }
          }, function(err) {
            console.log(err)
          }, {responseType: 'json'})
        }, 1000)
      } else {
        D.find('#main #formStatus').innerHTML = `
        <h2 style='text-align:center'>Name already taken</h2>`
        setTimeout(function() {
          D.find('#main #formStatus').innerHTML = ``
        }, 5000)
      }
    }, 0, {responseType: 'json'})
  }
}
