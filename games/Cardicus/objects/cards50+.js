Object.assign(window._allCards,{
  "50": {
    "name": "Chipmunk",
    "points": 1,
    "function": 'Summon',
    "blurb": "Summons a little chipmunk to throw nuts at your enemies",
    "flavor": "Cute and not particularly deadly.",
    "type": "creature",
    "subtype": "beast small",
    "stats": {
      "attack": 5,
      "HP": 10,
      "MS": 2,
      "range": 1,
      "special": false
    },
    "options": ["Summon"],
    "bounty": {
      "souls": 1
    },
    "cost": {
      "energy": 0.5
    },
    "modifier": function(a) {
      return a[1](a[2])
    },
    "graphics": {
      "0": "Chipmunk",
      "handCard": "images/cards/50/handCard.jpg",
      "atRest": "images/cards/50/handCard.jpg",
      "projectile": "images/projectiles/acorn.png"
    },
    "shopPrice": 15
  },
  "51": {
    "name": "Vulture",
    "points": 7,
    "function": 'Summon',
    "blurb": "Summons a flying vulture",
    "flavor": "",
    "type": "creature",
    "subtype": "beast medium avian",
    "stats": {
      "attack": 5,
      "HP": 20,
      "MS": 2,
      "range": 0,
      "special": {
        "Flying": "Cannot be hit by melee units."
      }
    },
    "options": ["Summon"],
    "bounty": {
      "souls": 1
    },
    "cost": {
      "souls": 1,
      "materia": 1,
      "energy": 1
    },
    "modifier": function(a) {
      return a[1](a[2])
    },
    "music": {
      "summon": "audio/summon/vulture.mp3"
    },
    "graphics": {
      "handCard": "images/cards/51/handCard.jpg",
      "atRest": "images/cards/51/handCard.jpg"
    },
    "shopPrice": 45
  },
  "52": {
    "name": "Desert Hawk",
    "points": 8,
    "function": 'Summon',
    "blurb": "Summons a sharp-eyed hawk",
    "flavor": "",
    "type": "creature",
    "subtype": "beast small avian",
    "stats": {
      "attack": 25,
      "HP": 15,
      "MS": 2,
      "range": 0,
      "special": {
        "Flying": "Cannot be hit by melee units."
      }
    },
    "options": ["Summon"],
    "bounty": {
      "souls": 1
    },
    "cost": {
      "souls": 1,
      "materia": 1,
      "energy": 2
    },
    "modifier": function(a) {
      return a[1](a[2])
    },
    "graphics": {
      "handCard": "images/cards/52/handCard.jpg",
      "atRest": "images/cards/52/handCard.jpg"
    },
    "shopPrice": 55
  },
  "53": {
    "name": "???",
    "restricted": true,
    "function": '???',
    "blurb": "???",
    "flavor": "??",
    "type": "?",
    "subtype": "?",
    "stats": {
      "attack": "?",
      "HP": "?",
      "MS": "?",
      "range": "?",
      "special": "?"
    },
    "options": ["?"],
    "bounty": {
      "souls": "?"
    },
    "cost": {
      "souls": "?",
      "materia": "?",
      "energy": "?"
    },
    "modifier": function(a) {
      return a[1](a[2])
    },
    "graphics": {
      "handCard": "images/cards/53/handCard.jpg",
      "atRest": "images/cards/53/handCard.jpg"
    },
    "shopPrice": 55
  },
  "54": {
    "name": "Peacock",
    "points": 5,
    "function": 'Summon',
    "blurb": "Summons a flightless bird that draws the eye",
    "flavor": "",
    "type": "creature",
    "subtype": "beast medium avian",
    "stats": {
      "attack": 5,
      "HP": 20,
      "MS": 2,
      "range": 0,
      "priority": 1,
      "special": {
        "Taunt": "Tends to be attacked first."
      }
    },
    "options": ["Summon"],
    "bounty": {
      "souls": 1
    },
    "cost": {
      "materia": 1,
      "energy": 1
    },
    "modifier": function(a) {
      return a[1](a[2])
    },
    "graphics": {
      "handCard": "images/cards/54/handCard.jpg",
      "atRest": "images/cards/54/handCard.jpg"
    },
    "shopPrice": 25
  },
  "55": {
    "name": "Owl",
    "points": 6,
    "function": 'Summon',
    "blurb": "Summons a hunter of the night",
    "flavor": "",
    "type": "creature",
    "subtype": "beast small avian",
    "stats": {
      "attack": 10,
      "HP": 15,
      "MS": 2,
      "range": 0,
      "special": {
        "Flying": "Cannot be hit by melee units.",
        "Specialist": "Ten bonus damage vs small units"
      }
    },
    "options": ["Summon"],
    "bounty": {
      "souls": 1
    },
    "cost": {
      "souls": 1,
      "materia": 1,
      "energy": 2
    },
    "modifier": function(a) {
      if (a[0] == 'onAttack') {
        let types = defender.subtype.split(' ');
        let small = false;
        types.forEach(function(ele) {
          if (ele == 'small') {
            small = true
          }
        });
        if (small) {
          a[2] += 10
        }
      };
      return a[1](a[2])
    },
    "music": {
      "summon": `audio/summon/owl.mp3`
    },
    "graphics": {
      "handCard": "images/cards/55/handCard.jpg",
      "atRest": "images/cards/55/handCard.jpg"
    },
    "shopPrice": 55
  },
  "56": {
    "name": "Floating Castle",
    "points": 10,
    "function": "Fortress",
    "blurb": "The sky frees it from many dangers",
    "flavor": "",
    "type": "fortress building",
    "subtype": "fortification titanic",
    "stats": {
      "attack": 15,
      "HP": 400,
      "MS": 0,
      "range": 1,
      "special": {
        "Flying": "Cannot be hit by melee units."
      }
    },
    "options": [],
    "bounty": {},
    "cost": {},
    "graphics": {
      "handCard": "images/cards/56/handCard.jpg",
      "atRest": "images/cards/56/handCard.jpg",
      "projectile": 'images/projectiles/arrow.png'
    },
    "modifier": function(a) {
      return a[1](a[2])
    },
    "shopPrice": 35
  },
  "57": {
    "name": "Rock Crab",
    "points": 12,
    "blurb": "Summons a sturdy crab",
    "flavor": "Better than your average crab.",
    "type": "creature",
    "subtype": "beast small",
    "stats": {
      "attack": 10,
      "HP": 15,
      "MS": 2,
      "range": 0,
      "special": {
        "Armor": "Reduce damage taken by 5"
      }
    },
    "options": ["Summon"],
    "bounty": {
      "souls": .25,
      "materia": .25
    },
    "cost": {
      "materia": 1
    },

    "modifier": function(a) {
      if (a[0] == 'onStruck' && a[2] > 0) {
        if (a[2] - 5 > 0) {
          a[2] = a[2] - 5
        } else {
          a[2] = 0
        }
      }
      return a[1](a[2])
    },
    "music": {
      "summon": ``
    },
    "graphics": {
      "handCard": "images/cards/57/handCard.jpg",
      "atRest": "images/cards/57/handCard.jpg"
    },
    "shopPrice": 25
  },
  "58": {
    "name": "King Crab",
    "points": 12,
    "blurb": "Summons an extremely sturdy but slow crab",
    "flavor": "Decades under the crushing pressure of the deep sea have made it strong.",
    "type": "creature",
    "subtype": "beast small",
    "stats": {
      "attack": 15,
      "HP": 25,
      "MS": 1,
      "range": 0,
      "special": {
        "Armor": "Reduce damage taken by 15"
      }
    },
    "options": ["Summon"],
    "bounty": {
      "souls": .25,
      "materia": .5
    },
    "cost": {
      "materia": 2
    },

    "modifier": function(a) {
      if (a[0] == 'onStruck' && a[2] > 0) {
        if (a[2] - 15 > 0) {
          a[2] = a[2] - 15
        } else {
          a[2] = 0
        }
      }
      return a[1](a[2])
    },
    "music": {
      "summon": ``
    },
    "graphics": {
      "handCard": "images/cards/58/handCard.jpg",
      "atRest": "images/cards/58/handCard.jpg"
    },
    "shopPrice": 45
  },
  "59": {
    "name": "Tsunami",
    "points": 12,
    "blurb": "Injures units and changes square to water/ocean",
    "flavor": "The Ocean Devours",
    "type": "spell",
    "subtype": "physical, aoe",
    "recycle": "true",
    "stats": {
      "damage": 15,
      "allowed": "enemy",
      "target": "unit",
      "type": "physical",
      "special": {}
    },
    "options": ["Cast"],
    "bounty": {},
    "cost": {
      "energy": 3,
      "souls": 4,
    },
    "modifier": function(a) {
      return a[1](a[2])
    },
    "graphics": {
      "0": "Light",
      "handCard": "images/cards/59/handCard.jpg",
      "projectile": "images/projectiles/wave.jpg"
    },
    "shopPrice": 30
  },
  "60": {
    "name": "Whirlpool",
    "points": 12,
    "blurb": "Injures all units on water/ocean square",
    "flavor": "Beware the current",
    "type": "spell",
    "subtype": "physical, aoe",
    "recycle": "true",
    "stats": {
      "damage": 15,
      "allowed": "enemy",
      "target": "unit",
      "type": "physical",
      "special": {}
    },
    "options": ["Cast"],
    "bounty": {},
    "cost": {
      "energy": 2,
      "souls": 2,
    },
    "modifier": function(a) {
      return a[1](a[2])
    },
    "graphics": {
      "0": "Light",
      "handCard": "images/cards/60/handCard.jpg",
      "projectile": "images/projectiles/wave.jpg"
    },
    "shopPrice": 30
  },
  "61": {
    "name": "Terror of the Deep",
    "points": 12,
    "blurb": "<b>Permanently</b> reduces attack of enemy creature & card on water/ocean square by 50%",
    "flavor": "There's no telling what lurks beneath the waves",
    "type": "spell",
    "subtype": "physical, single",
    "recycle": "true",
    "stats": {
      "damage": 0,
      "allowed": "enemy",
      "target": "creature",
      "type": "physical",
      "special": {}
    },
    "options": ["Cast"],
    "bounty": {},
    "cost": {
      "energy": 2,
      "souls": 1
    },
    "modifier": function(a) {
      return a[1](a[2])
    },
    "graphics": {
      "0": "Light",
      "handCard": "images/cards/61/handCard.jpg",
      "projectile": "images/projectiles/wave.jpg"
    },
    "shopPrice": 30
  },
  "62": {
    "name": "Sand Castle",
    "points": 13,
    "function": "Fortress",
    "blurb": "While fragile, this fortress is easily rebuilt.",
    "flavor": "",
    "type": "fortress building",
    "subtype": "fortification titanic",
    "stats": {
      "attack": 15,
      "HP": 350,
      "MS": 0,
      "range": 2,
      "special": {
        "Swift Repairs": "Regenerates 25 HP/turn"
      }
    },
    "options": [],
    "playOptions": [{
      type: 'Upgrade Card',
      text: "Upgrade to lvl 2 Sand Castle",
      id: 63,
      cost: {
        energy: 2,
        materia: 4
      }
    },{
      type: 'Upgrade Card',
      text: "Upgrade to Atlantis",
      id: 71,
      cost: {
        energy: 10,
        materia: 10,
        souls: 2
      }
    }],
    "bounty": {},
    "cost": {},
    "graphics": {
      "handCard": "images/cards/62/handCard.jpg",
      "atRest": "images/cards/62/handCard.jpg",
      "projectile": 'images/projectiles/arrow.png'
    },
    "modifier": function(a) {
      if (a[0] == 'onStart' && a[2][3].stats.HP < a[2][1].stats.HP) {
        a[2][3].stats.HP += 25;
        if (a[2][3].stats.HP > a[2][1].stats.HP) {
          a[2][3].stats.HP = Number(a[2][1].stats.HP)
        };
        return 'regenerate'
      } else {
        return a[1](a[2])
      }
    },
    "shopPrice": 35
  },
  "63": {
    "name": "Lvl 2 Sand Castle",
    "points": 13,
    "restricted": true,
    "level": 2,
    "function": "Fortress",
    "blurb": "While fragile, this fortress is easily rebuilt.",
    "flavor": "",
    "type": "fortress building",
    "subtype": "fortification titanic",
    "stats": {
      "attack": 20,
      "HP": 450,
      "MS": 0,
      "range": 2,
      "special": {
        "Swift Repairs": "Regenerates 30 HP/turn"
      }
    },
    "options": [],
    "playOptions": [{
      type: 'Upgrade Card',
      text: "Upgrade to lvl 3 Sand Castle",
      id: 70,
      cost: {
        energy: 2,
        materia: 4
      }
    },{
      type: 'Upgrade Card',
      text: "Upgrade to Atlantis",
      id: 71,
      cost: {
        energy: 9,
        materia: 9,
        souls: 2
      }
    }],
    "bounty": {},
    "cost": {},
    "graphics": {
      "handCard": "images/cards/62/handCard.jpg",
      "atRest": "images/cards/62/handCard.jpg",
      "projectile": 'images/projectiles/arrow.png'
    },
    "modifier": function(a) {
      if (a[0] == 'onStart' && a[2][3].stats.HP < a[2][1].stats.HP) {
        a[2][3].stats.HP += 30;
        if (a[2][3].stats.HP > a[2][1].stats.HP) {
          a[2][3].stats.HP = Number(a[2][1].stats.HP)
        };
        return 'regenerate'
      } else {
        return a[1](a[2])
      }
    },
    "shopPrice": 35
  },
  "64": {
    "name": "Lvl 2 Basic Fort",
    "level": 2,
    "restricted": true,
    "function": "Fortress",
    "blurb": "Just your basic fortress",
    "flavor": "Lemon-fresh",
    "type": "fortress building",
    "subtype": "fortification titanic",
    "stats": {
      "attack": 30,
      "HP": 650,
      "MS": 0,
      "range": 1,
      "special": false
    },
    "options": [],
    "playOptions": [
      {
        type: 'Upgrade Card',
        text: "Upgrade to lvl 3 Basic Fort",
        id: 66,
        cost: {
          energy: 2,
          materia: 4
        }
      },
      {
        type: 'Upgrade Card',
        text: "Upgrade to Valentia",
        id: 65,
        cost: {
          energy: 9,
          materia: 9,
          souls: 2
        }
      }
    ],
    "bounty": {},
    "cost": {},
    "music": {
      "attack": 'audio/effects/bow.mp3'
    },
    "graphics": {
      "handCard": "images/cards/2/handCard.jpg",
      "atRest": "images/cards/2/handCard.jpg",
      "projectile": 'images/projectiles/arrow.png'
    },
    "modifier": function(a) {
      return a[1](a[2])
    },
    "shopPrice": 5
  },
  "65": {
    "name": "Valentia",
    "restricted": true,
    "function": "Fortress",
    "blurb": "Just your basic fortress",
    "flavor": "Lemon-fresh",
    "type": "fortress building",
    "subtype": "fortification titanic",
    "stats": {
      "attack": 50,
      "HP": 1000,
      "MS": 0,
      "range": 1,
      "special": false
    },
    "options": [],
    "bounty": {},
    "cost": {},
    "music": {
      "attack": 'audio/effects/bow.mp3'
    },
    "graphics": {
      "handCard": "images/cards/2/handCard.jpg",
      "atRest": "images/cards/2/handCard.jpg",
      "projectile": 'images/projectiles/arrow.png'
    },
    "modifier": function(a) {
      return a[1](a[2])
    },
    "shopPrice": 5
  },
  "66": {
    "name": "Lvl 3 Basic Fort",
    "level": 3,
    "restricted": true,
    "function": "Fortress",
    "blurb": "Just your basic fortress",
    "flavor": "Lemon-fresh",
    "type": "fortress building",
    "subtype": "fortification titanic",
    "stats": {
      "attack": 40,
      "HP": 800,
      "MS": 0,
      "range": 1,
      "special": false
    },
    "options": [],
    "playOptions": [
      {
        type: 'Upgrade Card',
        text: "Upgrade to Valentia",
        id: 65,
        cost: {
          energy: 8,
          materia: 8,
          souls: 2
        }
      }
    ],
    "bounty": {},
    "cost": {},
    "music": {
      "attack": 'audio/effects/bow.mp3'
    },
    "graphics": {
      "handCard": "images/cards/2/handCard.jpg",
      "atRest": "images/cards/2/handCard.jpg",
      "projectile": 'images/projectiles/arrow.png'
    },
    "modifier": function(a) {
      return a[1](a[2])
    },
    "shopPrice": 5
  },
  "67": {
    "name": "Lvl 2 Long Fort",
    "restricted": true,
    "points": 1,
    "level": 2,
    "function": "Fortress",
    "blurb": "Shoots up to 3 squares away",
    "flavor": "Ballistae come in handy",
    "type": "fortress building",
    "subtype": "fortification titanic",
    "stats": {
      "attack": 20,
      "HP": 500,
      "MS": 0,
      "range": 3,
      "special": false
    },
    "options": [],
    "playOptions": [
      {
        type: 'Upgrade Card',
        text: "Upgrade to lvl 3 Long Fort",
        id: 68,
        cost: {
          energy: 2,
          materia: 4
        }
      },
      {
        type: 'Upgrade Card',
        text: "Upgrade to Forbidden City",
        id: 69,
        cost: {
          energy: 9,
          materia: 9,
          souls: 2
        }
      }
    ],
    "bounty": {},
    "cost": {},
    "music": {
      "attack": 'audio/effects/bow.mp3'
    },
    "graphics": {
      "handCard": "images/cards/20/handCard.jpg",
      "atRest": "images/cards/20/handCard.jpg",
      "projectile": 'images/projectiles/arrow.png'
    },
    "modifier": function(a) {
      return a[1](a[2])
    },
    "shopPrice": 5
  },
  "68": {
    "name": "Lvl 3 Long Fort",
    "points": 1,
    "restricted": true,
    "level": 3,
    "function": "Fortress",
    "blurb": "Shoots up to 3 squares away",
    "flavor": "Ballistae come in handy",
    "type": "fortress building",
    "subtype": "fortification titanic",
    "stats": {
      "attack": 25,
      "HP": 650,
      "MS": 0,
      "range": 3,
      "special": false
    },
    "options": [],
    "playOptions": [
      {
        type: 'Upgrade Card',
        text: "Upgrade to Forbidden City",
        id: 69,
        cost: {
          energy: 8,
          materia: 8,
          souls: 2
        }
      }
    ],
    "bounty": {},
    "cost": {},
    "music": {
      "attack": 'audio/effects/bow.mp3'
    },
    "graphics": {
      "handCard": "images/cards/20/handCard.jpg",
      "atRest": "images/cards/20/handCard.jpg",
      "projectile": 'images/projectiles/arrow.png'
    },
    "modifier": function(a) {
      return a[1](a[2])
    },
    "shopPrice": 5
  },
  "69": {
    "name": "Forbidden City",
    "points": 1,
    "restricted": true,
    "function": "Fortress",
    "blurb": "Shoots up to 3 squares away",
    "flavor": "Ballistae come in handy",
    "type": "fortress building",
    "subtype": "fortification titanic",
    "stats": {
      "attack": 30,
      "HP": 800,
      "MS": 0,
      "range": 7,
      "special": false
    },
    "options": [],
    "bounty": {},
    "cost": {},
    "music": {
      "attack": 'audio/effects/bow.mp3'
    },
    "graphics": {
      "handCard": "images/cards/20/handCard.jpg",
      "atRest": "images/cards/20/handCard.jpg",
      "projectile": 'images/projectiles/arrow.png'
    },
    "modifier": function(a) {
      return a[1](a[2])
    },
    "shopPrice": 5
  },
  "70": {
    "name": "Lvl 3 Sand Castle",
    "points": 13,
    "restricted": true,
    "level": 3,
    "function": "Fortress",
    "blurb": "While fragile, this fortress is easily rebuilt.",
    "flavor": "",
    "type": "fortress building",
    "subtype": "fortification titanic",
    "stats": {
      "attack": 25,
      "HP": 550,
      "MS": 0,
      "range": 2,
      "special": {
        "Swift Repairs": "Regenerates 35 HP/turn"
      }
    },
    "options": [],
    "playOptions": [{
      type: 'Upgrade Card',
      text: "Upgrade to Atlantis",
      id: 71,
      cost: {
        energy: 8,
        materia: 8,
        souls: 2
      }
    }],
    "bounty": {},
    "cost": {},
    "graphics": {
      "handCard": "images/cards/62/handCard.jpg",
      "atRest": "images/cards/62/handCard.jpg",
      "projectile": 'images/projectiles/arrow.png'
    },
    "modifier": function(a) {
      if (a[0] == 'onStart' && a[2][3].stats.HP < a[2][1].stats.HP) {
        a[2][3].stats.HP += 35;
        if (a[2][3].stats.HP > a[2][1].stats.HP) {
          a[2][3].stats.HP = Number(a[2][1].stats.HP)
        };
        return 'regenerate'
      } else {
        return a[1](a[2])
      }
    },
    "shopPrice": 35
  },
  "71": {
    "name": "Atlantis",
    "points": 13,
    "restricted": true,
    "function": "Fortress",
    "blurb": "While fragile, this fortress is easily rebuilt.",
    "flavor": "",
    "type": "fortress building",
    "subtype": "fortification titanic",
    "stats": {
      "attack": 25,
      "HP": 650,
      "MS": 0,
      "range": 3,
      "special": {
        "Swift Repairs": "Regenerates 50 HP/turn"
      }
    },
    "options": [],
    "bounty": {},
    "cost": {},
    "graphics": {
      "handCard": "images/cards/62/handCard.jpg",
      "atRest": "images/cards/62/handCard.jpg",
      "projectile": 'images/projectiles/arrow.png'
    },
    "modifier": function(a) {
      if (a[0] == 'onStart' && a[2][3].stats.HP < a[2][1].stats.HP) {
        a[2][3].stats.HP += 50;
        if (a[2][3].stats.HP > a[2][1].stats.HP) {
          a[2][3].stats.HP = Number(a[2][1].stats.HP)
        };
        return 'regenerate'
      } else {
        return a[1](a[2])
      }
    },
    "shopPrice": 35
  },
  "72": {
    "name": "Lvl 2 Strong Fort",
    "restricted": true,
    "points": 5,
    "function": "Fortress",
    "blurb": "Melee range powerhouse fortress",
    "flavor": "Who needs arrows when you have burning oil?",
    "type": "fortress building",
    "subtype": "fortification titanic",
    "stats": {
      "attack": 55,
      "HP": 900,
      "MS": 0,
      "range": 0,
      "special": false
    },
    "options": [],
    "playOptions": [
      {
        type: 'Upgrade Card',
        text: "Upgrade to lvl 3 Strong Fort",
        id: 73,
        cost: {
          energy: 1,
          materia: 4
        }
      },
      {
        type: 'Upgrade Card',
        text: "Upgrade to Camelot",
        id: 74,
        cost: {
          energy: 9,
          materia: 9,
          souls: 2
        }
      }
    ],
    "bounty": {},
    "cost": {},
    "graphics": {
      "0": "Strong Fort",
      "handCard": "images/cards/30/handCard.jpg",
      "atRest": "images/cards/30/handCard.jpg",
      "projectile": 'images/projectiles/arrow.png'
    },
    "modifier": function(a) {
      return a[1](a[2])
    },
    "shopPrice": 105
  },
  "73": {
    "name": "Lvl 3 Strong Fort",
    "restricted": true,
    "points": 5,
    "function": "Fortress",
    "blurb": "Melee range powerhouse fortress",
    "flavor": "Who needs arrows when you have burning oil?",
    "type": "fortress building",
    "subtype": "fortification titanic",
    "stats": {
      "attack": 65,
      "HP": 1150,
      "MS": 0,
      "range": 0,
      "special": false
    },
    "options": [],
    "playOptions": [
      {
        type: 'Upgrade Card',
        text: "Upgrade to Camelot",
        id: 74,
        cost: {
          energy: 8,
          materia: 8,
          souls: 2
        }
      }
    ],
    "bounty": {},
    "cost": {},
    "graphics": {
      "0": "Strong Fort",
      "handCard": "images/cards/30/handCard.jpg",
      "atRest": "images/cards/30/handCard.jpg",
      "projectile": 'images/projectiles/arrow.png'
    },
    "modifier": function(a) {
      return a[1](a[2])
    },
    "shopPrice": 105
  },
  "74": {
    "name": "Camelot",
    "restricted": true,
    "points": 5,
    "function": "Fortress",
    "blurb": "Melee range powerhouse fortress",
    "flavor": "Who needs arrows when you have burning oil?",
    "type": "fortress building",
    "subtype": "fortification titanic",
    "stats": {
      "attack": 100,
      "HP": 1500,
      "MS": 0,
      "range": 0,
      "special": false
    },
    "options": [],
    "bounty": {},
    "cost": {},
    "graphics": {
      "0": "Strong Fort",
      "handCard": "images/cards/30/handCard.jpg",
      "atRest": "images/cards/30/handCard.jpg",
      "projectile": 'images/projectiles/arrow.png'
    },
    "modifier": function(a) {
      return a[1](a[2])
    },
    "shopPrice": 105
  },
  "75": {
    "name": "Rite of Greed",
    "points": 8,
    "blurb": "Gain 5 materia.",
    "flavor": "Sacrifice brings reward.",
    "type": "spell",
    "subtype": "wisdom",
    "recycle": "true",
    "stats": {},
    "options": ["Cast"],
    "bounty": {},
    "cost": {
      "souls": 4
    },
    "modifier": function(a) {
      return a[1](a[2])
    },
    "graphics": {
      "0": "Light",
      "handCard": "images/cards/75/handCard.jpg",
      "atRest": "images/cards/75/handCard.jpg"
    },
    "shopPrice": 25
  },
  "76": {
    "name": "Research Electric Eels",
    "points": 12,
    "blurb": "Permanently raise energy production by .25 (single-use)",
    "flavor": "E-lek-trissity.",
    "type": "spell",
    "subtype": "wisdom",
    "recycle": false,
    "stats": {},
    "options": ["Cast"],
    "bounty": {},
    "cost": {
      "materia": 1,
      "energy": 1
    },
    "modifier": function(a) {
      return a[1](a[2])
    },
    "graphics": {
      "0": "Light",
      "handCard": "images/cards/76/handCard.jpg",
      "atRest": "images/cards/76/handCard.jpg"
    },
    "shopPrice": 25
  },
  "77": {
    "name": "Study Shiny Pebbles",
    "points": 1,
    "blurb": "Permanently raise materia production by .25 (single-use)",
    "flavor": "Fool's gold.",
    "type": "spell",
    "subtype": "wisdom",
    "recycle": false,
    "stats": {},
    "options": ["Cast"],
    "bounty": {},
    "cost": {
      "materia": 1,
      "energy": 1
    },
    "modifier": function(a) {
      return a[1](a[2])
    },
    "graphics": {
      "0": "Light",
      "handCard": "images/cards/77/handCard.jpg",
      "atRest": "images/cards/77/handCard.jpg"
    },
    "shopPrice": 25
  },
  "79": {
    "name": "Sun Worship",
    "points": 11,
    "blurb": "Gain 5 energy.",
    "flavor": "Sacrifice brings reward.",
    "type": "spell",
    "subtype": "wisdom",
    "recycle": "true",
    "stats": {},
    "options": ["Cast"],
    "bounty": {},
    "cost": {
      "souls": 4
    },
    "modifier": function(a) {
      return a[1](a[2])
    },
    "graphics": {
      "0": "Light",
      "handCard": "images/cards/78/handCard.jpg",
      "atRest": "images/cards/78/handCard.jpg"
    },
    "shopPrice": 25
  },
})
