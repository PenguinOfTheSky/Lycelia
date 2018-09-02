S.pages.createPage = function(id) {
  let totalFileSize = 0
  for (let x in S.DB.account.pages) {
    totalFileSize += S.DB.account.pages[x]
  }
  D.find('#main').innerHTML = `
  <style>
    #main table, #main tr {
      border: .1rem solid black;
      border-collapse: collapse;
      padding: .1rem;
    }
    #main table {
      width: 100%;
    }
    #main textarea {
      box-sizing: border-box;
    }
    #main form {
    }
    #main table input {
      display: block;
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
    }
  </style>
  <article>
  ${id ? `<h1>Editing "${id}"</h1>`: ''}
  ${id ? `<button class = 'btnDanger' id='deletePage'>Delete "${id}"</button>`: ''}
  <p>
  New users are limited to 1MB worth of pages (link/embed images/video stored in the cloud rather including in the page directly to reduce file size).</p>
  <p>Increase your account level to unlock more storage space.<br> Current account level: ${S.DB.account.lvl.toFixed(2)} <br> Max Storage space: ${S.DB.account.lvl.toFixed(2)}MB <br>
  Used: ${totalFileSize/1000000}MB (${(totalFileSize/1000000/S.DB.account.lvl * 100).toFixed(2)}%)</p>
    </article>

    <form id='newSeller_Form' style='margin 0 auto; width:100%;'>
      <div id='formStatus'></div>
      <table id='formTable'>
        <tr>
          <td >Page Title</td>
          <td><input type='text' name='pageName' placeholder="John's Pizzas" maxlength='33' required></td>
        </tr>
        <tr>
          <td>Type</td>
          <td>
            <select name='type'>
              <option value='text'>Content</option>
              <option value='blog'>Blog</option>
              <option value='business'>Business</option>
              <option value='app'>App</option>
              <!--<option>Product Listing</option>
              <option>Rental Listing</option>-->
            </select>
          </td>
        </tr>
        <tr>
          <td>subtypes</td>
          <td><input type='text' name='subtypes' placeholder="News/novel/fanfiction/etc." maxlength='50'></td>
        </tr>
        <tr>
          <td >Keywords</td>
          <td><input type='text' name='keywords' placeholder="Fantasy, Antebellum US, Stock Market" maxlength='50'></td>
        </tr>
        <tr>
          <td >Parent ID (optional)</td>
          <td><input type='text' name='parentID' placeholder="example: f34" maxlength='8' style='width:7rem;'></td>
        </tr>
        <tr>
          <td >Description</td>
          <td style='width:80%'><textarea type='text' style='width:100%;height:4rem;' name='description' placeholder="" maxlength='500'></textarea></td>
        </tr>
        <tr>
          <td >Rating</td>
          <td>
            <select name='rating'>
              <option value='0'>G</option>
              <option value='7'>PG-7</option>
              <option value='13'>PG-13</option>
              <option value='18'>R</option>
              <option value='21'>X</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>Select Template</td>
          <td>
            <select required name='template'  id='selectTemplate'>
              <option selected disabled></option>
              <option value='none'>None (manual)</option>
              <!--<option value='blog'>Blog</option>
              <option value='business'>Business</option>-->
              <option value='book'>Book/other sequential works</option>
              <!--<option value='app'>App</option>
              <option>Product Listing</option>
              <option>Rental Listing</option>-->
            </select>
          </td>
        </tr>
      <!--  <tr id='singleFile' style='display:none;'>
        </tr>-->
      </table>
      <div id='uploadHint'></div>
      <div id='template' style='margin-top:.5rem;'></div>
      <div style='text-align:center;'>
        <label >I agree to the <a target='_blank' href='/store/ToS_create.html'>terms of service</a></label> <input type='checkbox' required><br>
        <input type='submit' class='btnSubmit' ${id? "value='Submit edit'" : ""}>
      </div>
    </form>
  `
  let template;
  D.find('#selectTemplate').onchange =function(e,opts) {
    template = this.value;
    //D.find('#template').style.display ='table-row'
    S.pages[this.value +'_Template'](opts)
  }

  if (id) {
    D.find('#uploadHint').innerHTML = `<p>Hint:Leave uploads blank to keep content unchanged from previous upload.</p>`
    let form = D.find('#main #newSeller_Form')
    post('/store/getPageJSON', id, function(data) {
      data = JSON.parse(data)
      form.pageName.value = data.title
      form.parentID.value = data.parent
      form.subtypes.value = data.subtypes.join(', ')
      form.keywords.value = data.keywords.join(', ')
      form.description.value = data.description
      form.type.value = data.type
      form.rating.value = data.rating
      form.template.value = data.template || 'none'
      if (data.template == 'book') form.chapters = data.chapters
      D.find('#selectTemplate').onchange(0,data)
    })
    D.find('#deletePage').onclick = function() {
      let del = confirm('Are you sure you want to delete this page?')
      if (del) {
        post('/store/deletePage', {id: id, user: S.DB.user}, function(data) {
          if (data == 'deleted') {
            D.find('#main').innerHTML = `<h1 style='text-align:center;margin-top:2rem;'>Page Deleted</h1>`
            setTimeout(function() {
              S.events.view('account')
            }, 1100)
          }
        })
      }
    }
  }
  D.find('#main #newSeller_Form').onsubmit = function(e) {
    e.preventDefault()
    let form = {
      title: this.pageName.value,
      user: S.DB.user,
      type: this.type.value,
      parent: this.parentID.value,
      subtypes: this.subtypes.value,
      keywords: this.keywords.value,
      description: this.description.value,
      rating: this.rating.value,
      id: id
    }
    let file = S.pages[template + '_Render'](form)
    if (file.template == 'book') {
      form.template = 'book'
      form.chapters = file.list
    }
    let target = '/store/createPage'
    if (id) target = '/store/editPage'
    post(target, form, function(data) {
      if (data =='created') {

        D.find('#main article').innerHTML = `<h2 style='text-align:center;'>Page Created</h2>`
        setTimeout(function() {
          S.pages.listPages({refresh: true})
        }, 1000)
      } else if (data =='edited') {
        D.find('#main article').innerHTML = `<h2 style='text-align:center;'>Edit Submitted</h2>`
        setTimeout(function() {
          S.pages.listPages()
        }, 1000)
      }
    }, function(err) {
      D.find('#formStatus').innerHTML = '<b class="btnWarn">Page creation failed.</b>'
    })
  }
}
