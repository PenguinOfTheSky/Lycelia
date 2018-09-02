Uni.home.account = function() {
  Uni.data.last.push("account")
  if (Uni.user && Uni.user.name) {
    D.find('#main').innerHTML = `
      <article>
        <h1>${Uni.user.name}'s Dashboard</h1>
        <p></p>
      </article>
    `
  } else {
    D.find('#main').innerHTML = `
      <article>
        <p>This page is not available for guest accounts. Please <a href='/&view=login'>sign in to Lycelia</a></p>
      </article>
    `
  }

}
