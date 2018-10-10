
window.LJS = {
  help: function(topic) {
    //call help('topic') or just help() to see topics available.
    let topics = {
      'D': `Shorthand for document. type D.help() for more info.`
    }
    if topics[topic]
    console.log(topics[topic])
    else (console.log(Object.keys(topics)))
  }
}
