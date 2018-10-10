window.math = {}
math.render = function(str) {

}
math.fraction = function(a, b) {
  return `<math><mfrac><mn>${a}</mn><mi>${b}</mi> </mfrac></math>`
}
math.power = function(base, exponent) {
  return `<math>
     <msup>
        <mi>${base}</mi>
        <mn>${exponent}</mn>
     </msup>
  </math> `
}
math.help = function(topic) {
  let topics = {
    render: `renders human-readable math formulas.`,
    renderFraction: `renders a simple fraction`
  }
  if (topic) {
    if (topics[topic]) console.log(topics[topic])
    else console.log(`help article not found.`)
  } else {
    let topicsList = '\n*  ' + Object.keys(topics).join('\n*  ')
    console.log(`type math.help("topic") for help on topic. List of topics: ${topicsList} \n math is a library to render math formulas.`)
  }
}
