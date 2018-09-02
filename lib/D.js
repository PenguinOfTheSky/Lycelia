let topics = {
  commandList: `find, findAll, make`,
  find: `same as .querySelector`,
  findAll: `same as .querySelectorAll`,
  make: `input: (type, opts); creates and returns a dom element.`

}
window.D = window.document
D.find = D.querySelector
D.findAll = D.querySelectorAll
D.make = function(type, obj) {
 return Object.assign(document.createElement(type), obj || {})
}
D.fetchJson = function() {
  console.log('this function coming soon.')
}
D.help = function(topic) {
  if (topic) {
    if (topics[topic]) console.log(topics[topic])
    else console.log(`help article not found.`)
  } else {
    let topicsList = '\n*  ' + Object.keys(topics).join('\n*  ')
    console.log(`type D.help("topic") for help on topic. List of topics: ${topicsList}`)
  }
}
