Uni.render.cards = function(arr) {
  let output = `<flex style='flex-flow: wrap; justify-content: space-around;'>`
  for (let i = 0; i < arr.length; i++) {
    let card = `
    <card>
      <div><b>${arr[i].top}</b></div>
      <div><img src='${'images/' + arr[i].src || ''}'></div>
      <div>${arr[i].bot}</div>
    </card>
    `
    output += card
  }
  output += '</flex>'
  return output
}
