Uni.home.renderClassList = function(list) {
  let str =``;
  for (let x in list) {
    str += `<h3>${x}</h3><dl style="padding-left: 2rem;">`
    for (let v in list[x]) {
      str += `<dt>
        <b class="${(Uni.home.study(v) ? 'link' : 'badLink')}">${v}</b>
      </dt>
    <dd style="display: list-item;
    list-style-type: disc;">${list[x][v]}</dd>`
    }
    str += `</dl>`
  }
  return str
}
