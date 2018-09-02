window.imports.deckEditor = function() {
  'use strict'
  $('#createNewDeck').on('click', function() {
    let deckName = document.querySelector('#newDeckName').value
    if (deckName != '') {
      for (let i = 0; i < account.decks.length; i++) {
        if (account.decks.name == deckName) {
          alert('deck name already taken')
          return;
        }
      }
      account.decks.push({name: deckName, base: 2, deck: []})
      var option = document.createElement("option");
      option.text = deckName;
      document.querySelector('#listDecks').add(option)
      document.querySelector('#listDecks').value = deckName
      document.querySelector('#listDecks').onchange()
    } else {
      document.querySelector('#newDeckName').style.border = '3px solid red'
    }
  })
  account.decks.forEach(function(ele){
    var option = document.createElement("option");
    option.text = ele.name;
    document.querySelector('#listDecks').add(option)
  })
  document.querySelector('#listDecks').onchange = function() {
    account.currentDeck = this.value
    openDeck(this.options[this.selectedIndex].text)
  }
  let openDeck = function(chosenDeck) {

    document.querySelector('#library_deck_current').style.display = 'block'
    let a;
    account.decks.forEach(function(ele) {
      if (ele.name == chosenDeck)
      a = ele
    })
    for (let p = 0; p < a.length; p++) {
      if (a[p].name == account.currentDeck) {
        a = JSON.parse(JSON.stringify(a[p]))
        break;
      }
    }
    let libCopy = JSON.parse(JSON.stringify(account.cards))
    let fort = a.base;
    let deckCards = a.deck.slice(0);
    for (let x = 0; x < account.cards.length; x++) {
      let p = account.cards[x]
      account.cards[x] = parseInt(p);
    }
    for (let i = 0; i < deckCards.length; i++) {
      for (let x = 0; x < libCopy.length; x++) {
        if (libCopy[x] == deckCards[i]) {
          libCopy.splice(x, 1);
          break;
        }
      }
    }
    let formatDeck = function() {
    let viewDeckCards = document.createDocumentFragment()
    let aDiv = U.createNode('div', {
      class: "aCard",
      "name": `${(_allCards[fort].id)}_Deck`,
      innerHTML: U.longCardFormat(_allCards[fort], 'cardFormat inFort') + '<br>'
    })
    viewDeckCards.appendChild(aDiv)
    let deckList = {}
    deckCards.forEach(ele=> {
      if (!deckList[ele]) deckList[ele] = 1
      else (deckList[ele]++)
    })
    let deckKeys = Object.keys(deckList)
    for (let x = 0; x < deckKeys.length; x++) {
      let aDiv = U.createNode('div', {
        class: "aCard inDeck",
        "name": `${(_allCards[deckKeys[x]].id)}_Deck`,
        innerHTML: U.longCardFormat(_allCards[deckKeys[x]], 'cardFormat')
      })
      if (deckList[deckKeys[x]] > 1) {
        aDiv.querySelector('.cardTitle').innerHTML += ` x${deckList[deckKeys[x]]}<br>`
      }
      viewDeckCards.appendChild(aDiv)
    }
    document.querySelector('#viewDeckCards').innerHTML = ''
    document.querySelector('#viewDeckCards').appendChild(viewDeckCards)
    let displayNotDeck = function(terms) {
      if (terms) terms = terms.split(' ')
      else terms = []
      let listLib = {}
      libCopy.forEach(ele=> {
        if (!listLib[ele]) listLib[ele] = 1
        else (listLib[ele]++)
      })
      let libKeys = Object.keys(listLib)
      let notCards = document.createDocumentFragment();
      loop1:
      for (let x = 0; x < libKeys.length; x++) {
        if (terms.length) {
          let ele = JSON.stringify(_allCards[libKeys[x]])
          for (let i = 0; i < terms.length; i++) {
            if (ele.match(new RegExp(terms[i], 'i'))) continue;
            else continue loop1;
            //avoid false positives on incomplete words in future?
          }
        }
        let types = _allCards[libKeys[x]].type.split(' ')
        let found = false;
        for (let i = 0; i < types.length; i++) {
          if (types[i] === 'fortress') found = true;
        }
        let aDiv = U.createNode('div', {
          class: "aCard outsideDeck",
          "name": `${(_allCards[libKeys[x]].id)}_Deck`,
          innerHTML: U.longCardFormat(_allCards[libKeys[x]], 'cardFormat', true) + '<br>'
        })
        if (found) aDiv.setAttribute('class', 'aCard outsideFort')
        if (listLib[libKeys[x]] > 1) {
          aDiv.querySelector('.cardTitle').innerHTML += ` x${listLib[libKeys[x]]}<br>`
        }
        notCards.appendChild(aDiv)
      }
      document.querySelector('#viewOtherCards').innerHTML = '';
      document.querySelector('#viewOtherCards').appendChild(notCards)
      if (document.querySelector('#viewOtherCards').innerHTML == '') document.querySelector('#viewOtherCards').innerHTML='No more cards in deck'
    }
    displayNotDeck()
    let swap = function( arr1, arr2, id) {
      console.log(id)
      let swapped;
      for (let x = 0; x < arr1.length; x++) {
        if (arr1[x] == id) {
          swapped = arr1.splice(x, 1);
          break;
        }
      }
      arr2.push(swapped[0])
    }
    $('.outsideFort').on('click', function() {
      let id = parseInt($(this).attr('name'))
      fort = id;
      formatDeck();
    })
    $('.outsideDeck').on('click', function() {
      let id = parseInt($(this).attr('name'))
      swap(libCopy, deckCards, id);
      formatDeck();
    })
      let waiting = false;
      let audio_CardFlip = new Audio('audio/Card Sounds/Card Browsing/CardBrowsing1.mp3')
    $('.aCard').on('mouseenter', function() {
      audio_CardFlip.currentTime = .1
      if (!waiting) audio_CardFlip.play();
    })
    $('.aCard').on('mouseleave', function() {
      audio_CardFlip.pause();
    })
    $('.aCard').on('click', function() {
      waiting = true;
      setTimeout(function() {
        waiting = false;
      }, 400)
      let audio = new Audio('audio/Card Sounds/Card Place/CardPlace1.mp3')
      audio.play();
    })
    $('.inDeck').on('click', function() {
      let id = parseInt($(this).attr('name'))
      swap(deckCards, libCopy, id);
      formatDeck();
    })
    $('#saveThisDeck').on('click', function() {
      let newDeck = deckCards.slice(0)
      account.decks.forEach(function(ele) {
        if (ele.name == chosenDeck) {
          ele.deck = newDeck;
          return 0;
        }
      })
      D.find('#main_game #status').innerHTML = `<h3 style='text-align:center'>Deck Saved</h3>`
      setTimeout(function() {
        D.find('#main_game #status').innerHTML = ''
      }, 1700)
    })
    /*document.querySelector('#chooseMainDeck').onclick = function() {
      account.currentDeck = chosenDeck;
    }*/

    D.find('#searchLibrary').onsubmit = function(e) {
      e.preventDefault()
      displayNotDeck(this.search.value)
    }
  }
    formatDeck();
  }
  document.querySelector('#listDecks').onchange()
}
