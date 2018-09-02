S.html.accountInfo = function() { //use this for password changes?
  'use strict'
  D.find('#main').innerHTML = `
    <article>
      <h1>${S.DB.user.name}'s account info</h1>
    </article>
  `
