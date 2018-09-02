window.imports.log = function(parentBox) {
  let box = parentBox;
  if (!Card.user || !Card.user.username) {
    box.querySelector('#login_Container').innerHTML+=C.html.login()
    imports.login(box)
  }
  U.get('components/log/patch notes.txt', function(data) {
    box.querySelector('#logText').innerHTML = data
  })
  box.querySelector('#revealInfo').onclick = function() {
    box.querySelector('#logView').style.display = 'block'
    box.querySelector('#logViewMain').innerHTML = box.querySelector('#logInfo').innerHTML
  }
  box.querySelector('#hideLogView').onclick = function() {
    box.querySelector('#logView').style.display = 'none'
  }

}
