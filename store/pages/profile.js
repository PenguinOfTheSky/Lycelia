S.pages.profile = function() {
  D.find('#main').innerHTML = `<article>
    Add a short bio to personalize your author page.
    <form id='bioForm'>
      <textarea name='bio' id='bio' style='width:100%;min-height:6rem;' maxlength=800></textarea>
      <input type='submit' class='btn btnSubmit'>
    </form>
    You can see your author page at <a href='?author=${S.DB.user.name}'>https://lycelia.com/?author=${S.DB.user.name}</a>
  </article>`
  post('/store/getAuthorPublic', S.DB.user.name, function(data) {
    data = JSON.parse(data)
    if (data.bio) D.find('#bio').value = data.bio
  })
  D.find('#bioForm').onsubmit = function(e) {
    e.preventDefault();
    let pkg = {
      user: S.DB.user,
      bio: this.bio.value
    }
    post('/store/editProfile', pkg, function(data) {})
    D.find('#main').innerHTML = `<article><h3>Bio updated!</h3></article>`
    setTimeout(function(){
      //S.DB.account.description = this.bio.value
      S.events.load({author: S.DB.user.name})
    }, 1200)

  }
}
