'use strict'
// player class object.
window.imports.player = function (data, playerDeck, identifier) {
      let cardlib = []
      for (let i = 0; i < playerDeck.deck.length; i++) {
        let a = playerDeck.deck[i]
        cardlib.push(U.clone(data[a]));
      }
      this.source = data
      this.fort = U.clone(data[playerDeck.base]);
      this.name = identifier
      //replace identifier with individual player id?
      this.materia = 1.25;
      this.energy = 1.25;
      this.souls = 1;
      this.miners = 1.25;
      this.plants = 1.25;
      this.soulProduction = 1;
      if (account.username ==='cow' && identifier ==='HumanPlayer') {
        this.materia = 20;
        this.souls = 20;
        this.energy = 20;
      }
      this.income = function() {
        this.materia += this.miners;
        this.energy += this.plants;
        this.souls += this.soulProduction;
      }
      this.checkResources = function() {
        return [this.materia, this.energy, this.souls];
      }

      this.allCards = cardlib.slice(0);
      this.deck = cardlib.slice(0);
      this.inPlay = [];
      this.exiled = [];
      this.graveyard = [];
      this.hand = [];

      this.discard = function(card) {
        if (card == undefined) {
          if (this.hand.length == 0) {
            return false;
          } else {
          var rand = Math.floor(Math.random() * this.hand.length);
          var discarded = this.hand[rand]
          this.hand.splice(rand, 1);
          this.graveyard.push(discarded);
        }
        } else {
          var discarded = this.hand[card]
          this.hand.splice(card, 1);
          this.graveyard.push(discarded);
        }
      }
      this.play = function(card) {
        var played = this.hand[card]
        let output = this.hand.splice(card, 1)[0];
        //might be something off here.  is inPlay even required?
        return output;
      }
      this.handCardDescription = function(card) {
        let checking = this.hand.slice(card, card+1)
        return checking;
      }
      this.draw = function(amt) {
        if (amt == undefined) {amt = 1}
        for (var x = 0; x < amt; x++) {
          if (this.deck.length > 0) {
            let newCard = this.deck.shift();
            this.hand.push(newCard)
          } else {
            this.deck = this.graveyard.slice(0)
            this.graveyard = [];
            if (this.deck.length == 0) {break;}
            this.shuffle(this.deck);
            let newCard = this.deck.shift();
            this.hand.push(newCard)
          }
        }
      }
      this.shuffle = function(array) {
        for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
      }
      this.refund = function(checker) {
        this.materia += checker[0]
        this.energy += checker[1]
        this.souls += checker[2]
      }
      this.cardCheck = function(h) {
        return U.clone(this.hand[h])
      }
       this.priceCheck = function(a, costType) {
        let resources = this.checkResources();
        let price = U.clone(this.hand[a][costType])
        let checker = [];
        checker.push(price.materia || 0, price.energy || 0, price.souls || 0)
        for (let i = 0; i < checker.length; i++) {
          if (checker[i] > resources[i]) {
            return false
          }
        }
        this.materia -= checker[0]
        this.energy -= checker[1]
        this.souls -= checker[2]
        return checker;
      }
      this.shuffle(this.deck);
  }
