C.templates.store = function() {
    D.find('#main_game').innerHTML = `
    <style>
      .storeCardContainer {
        background-image: url('images/pattern1.svg');
        background-size:contain;
        display: inline-block;
        border-style: solid; border-color: rgba(0,0,0,.8);
        background-color:#444;
        box-shadow: .02rem .02rem .1rem black;
        margin: .15rem;
        box-sizing:border-box;
      }
      #buy_main {
        text-align: center;
      }
    </style>
    <form style='text-align:center;' id='searchStore'>
      <label>Search:
        <input type='text' name ='search' placeholder='' >
      </label>
      <button type='submit'><icon class='fa fa-search'></icon></button>
    </form>
    <div style='margin-left:10%;'>
    Purple: Summons<br>
    Green: Fortresses (one allowed per deck);<br>
    Blue: Spells<br>
    Yellow: Summons unit in build area behind fortress
    </div>
    <div id = 'buy_main'>Loading...</div>
    `
  let displayCards = function(terms) {
    if (account.username == 'cow') C.cheats.quests()
    if (terms) terms = terms.split(' ')
    else terms = []
    let output = document.createDocumentFragment();
    let sorter = []
    loop1:
    for (let x in _allCards) {
      if (x == 53) continue;
      if (terms.length) {
        let ele = JSON.stringify(_allCards[x])
        for (let i = 0; i < terms.length; i++) {
          if (ele.match(new RegExp(terms[i], 'i'))) continue;
          else continue loop1;
          //avoid false positives on incomplete words in future?
        }
      }
      if (!account.campaigns) account.campaigns = []
      let uLevel = account.campaigns.length || 0
      let n;
      if (uLevel >= (_allCards[x].points || 0)) n = x
      else n = 53
      let aDiv = U.createNode('div', {
        "innerHTML" : U.longCardFormat(_allCards[n]) + '<br>',
        "class": "storeCardContainer"
      })
      if (uLevel >= (_allCards[x].points || 0)) {
        let aButton = U.createNode('button', {
          "class" : (_allCards[n].restricted ? 'btn btnWarn' : 'buyNow btn'),
          "id": "_$" + _allCards[n].id,
          "innerHTML" : (_allCards[n].restricted ? "Can't be bought" : "Buy for " + _allCards[n].shopPrice + "gp")
        })
        aDiv.appendChild(aButton)
      } else {
        let aButton = U.createNode('button', {
          "class" : (_allCards[n].restricted ? 'btn btnWarn' : 'buyNow btn'),
          "id": "_$" + _allCards[n].id,
          "innerHTML" : "Not Enough Quest Points"
        })
        aDiv.appendChild(aButton)
      }
      sorter.push({points: _allCards[x].points || 0, item: aDiv})
    }
    sorter.sort(function(a, b) {
      return  a.points - b.points
    })
    sorter.forEach(ele => {
      output.append(ele.item)
    })
    document.querySelector('#buy_main').innerHTML = ''
    $('#buy_main').append(output);
    $('.buyNow').on('click', function() {
      let chosenCard = $(this).attr('id').slice(2);
      let price = _allCards[chosenCard].shopPrice;
      if (price <= account.gold) {
        account.gold -= price
        account.cards.push(+chosenCard)
        C.events.successMsg('Card purchased, added to library')
        $('#goldDisplay').text(account.gold)
      } else {
        C.events.errorMsg('Insufficient Funds')
      }
    })
  }
  displayCards()
  D.find('#searchStore').onsubmit = function(e) {
    e.preventDefault()
    displayCards(this.search.value)
  }
}
