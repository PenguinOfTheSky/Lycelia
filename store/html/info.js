S.html.info = function() {
  'use strict'
  D.find('#main').innerHTML = `
  <article file='html/info.html' >
    <h1 style='text-align:center;'>About Lycelia's e-Store</h1>
    <div style='text-indent: 2%;'>
      <h2>FAQ</h2>
      <ol>
        <li><a href='#faq1'>Do I need to become a member?</a></li>
        <li><a href='#faq2'>How can I add content?</a></li>
        <li><a href='#faq3'>How do I raise my account level?</a></li>
      </ul>
      <h3 id='faq1'>Do I need to become a member?</h3>
      No, but some actions may only be taken by members<!--Free content may be browsed by all. Paid content requires creation of an account.-->
      <h3 id='faq2'>How can I add content?</h3>
      Any member can add content, just <a href='http://localhost:3000/?view=login'>log in/sign up</a> and you can start adding pages of your own by clicking the icon top right.
      <h3 id='faq3'>How do I raise my account level?</h3>
      Earn badges to level up and unlock new privileges. Badges can be earned for doing all sorts of things like having an account for over a week<!-- or taking classes at Lycelia University-->.
    <div>
  </article>
  `
}
