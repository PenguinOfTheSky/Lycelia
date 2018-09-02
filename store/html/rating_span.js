S.html.rating_span = function(num) {
  let rating = D.make('span', {
    style: 'float: right;border-radius:5%;',
    innerHTML: 'rated '
  })
  switch(num) {
    case "0":
      rating.innerText += 'G'
      rating.style.backgroundColor = 'rgb(100,255,100)'
      break;
    case "7":
      rating.innerText += 'PG-7'
      rating.style.backgroundColor = 'rgb(0,255,255)'
      break;
    case "13":
      rating.innerText += 'PG-13'
      rating.style.backgroundColor = 'rgb(242,145,247)'
      break;
    case "18":
      rating.innerText += 'R'
      rating.style.backgroundColor = 'rgb(255,173,0)'
      break;
    case "21":
      rating.innerText += 'X'
      rating.style.backgroundColor = 'rgb(255,44,44)'
      break;
    default: //change to exception?
      rating.innerText = 'X'
      rating.style.backgroundColor = 'rgb(255,44,44)'
      break;
  }
  return rating
}
