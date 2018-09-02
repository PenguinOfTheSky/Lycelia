window.imports.library = function() {
  'use strict'
      let data1 = account.cards
      account.cards = data1.slice()
      let listed = {}
      let output = document.createDocumentFragment();;
      for (let x = 0; x < data1.length; x++) {
        if (!listed[data1[x]]) {
          let aDiv = U.make('div', {
            className: 'libCard',
            innerHTML: U.longCardFormat(_allCards[data1[x]]) + '<br>'
          })
          let value = Math.round(_allCards[data1[x]].shopPrice*.7)
          let sellButton = U.make('button', {
            "class" : 'sellNow',
            "name": "_$" + data1[x],
            "innerHTML" : "Sell for " + value + "gp",
            onclick: function() {

            }
          })
          //aDiv.appendChild(sellButton)
          output.appendChild(aDiv)
          listed[data1[x]] = {
            amt: 1,
            ref: aDiv
          }
        } else {
          listed[data1[x]].amt++
        }
      }
      let listKeys = Object.keys(listed)
      for (let x = 0; x < listKeys.length; x++) {
        if ( listed[listKeys[x]].amt > 1) {
          listed[listKeys[x]].ref.querySelector('.cardTitle').innerHTML += ` (x${listed[listKeys[x]].amt})`
        }
      }
      D.find('#library_Library').innerHTML = '';
      D.find('#library_Library').appendChild(output)
      $('#library_Library').html($('#library_template').html());
  $('#buildEditDecks').on('click', function() {
      D.find('#library_container').innerHTML = C.templates.deckEditor_Template()
      imports.deckEditor();
      $('#library_Deck').html($('#library_decks_template').html())
  });
}
