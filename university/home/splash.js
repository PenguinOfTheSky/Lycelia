Uni.home.splash = function(back) {
    if (!back) history.pushState({}, "", '/university');
  D.find('#main').innerHTML = `
  <article>
    <h1>Lycelia University (Alpha v.06)</h1>
    <p>21st Century Learning</p>
    <form id='search' style='margin: .3rem;'>
      <h2>Search</h2>
      <table style='margin: 0 auto;'>
        <tr>
          <td><label for='selectType'>I am searching for a </label></td>
          <td>
            <select id='selectType' name='type'>
              <option value='class'>Class</option>
              <option value='subject'>Subject</option>
              <option value='path'>Path/Certificate/Degree</option>
            </select>
          </td>
        </tr>
        <!--<tr>
          <td><label for='searchSubject'>Subject</label>
          </td>
          <td><input type='search' id='searchSubject' name='subject'>
          </td>
        </tr> -->
        <tr>
          <td><label for='searchClass'>Name/Title</label></td>
          <td><input type='search' id='searchTitle' name='title'></td>
        </tr>
        <tr>
          <td><label for='searchDescription'>Description</label></td>
          <td><input type='search' id='searchDescription' name='description'></td>
        </tr>
        <tr>
          <td><label for='selectLevel'>Grade level</label></td>
          <td>
            <select id='selectLevel' name='level'>
              <option>all</option>
              <option>Age 0-6</option>
              <option>Grades 1 & 2</option>
              <option>Grades 3-5</option>
              <option>Grades 6-8</option>
              <option>Grades 9-11</option>
              <option>Grade 12, Adult Ed, Freshman college</option>
              <option >200 level</option>
              <option >300 level</option>
              <option>400 level</option>
            </select>
          </td>
        </tr>
      </table>
      <button type='submit' class='btn btnSubmit'>Search <icon class='fa fa-search'></icon></button>
    </form>
    <hr>
    or <button id='browseAll' onclick='Uni.render.base("A9");'>Browse subjects</button>
    <div id='subjectTiles'></div>
    <div id='searchResults'></div>
  </article>

  `
  D.find('#search').onsubmit = function(e) {
    e.preventDefault()
    Uni.home.search(this)
  }

}
