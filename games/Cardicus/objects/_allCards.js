Object.assign(window._allCards, {
  "0": {
    "name": "Rat",
    "function": 'Summon',
    "blurb": "Summons a rat to attack your foe",
    "flavor": "Shishka-rat",
    "type": "creature",
    "subtype": "beast small",
    "stats": {
      "attack": 15,
      "HP": 15,
      "MS": 2,
      "range": 0,
      "special": {
        "evasion": "10%"
      }
    },
    "options": ["Summon", "Evolve to Rat King"],
    "bounty": {
      "souls": 1
    },
    "cost": {
      "energy": 1
    },
    "evolveCost": {
      "souls": 5,
      "materia": 1
    },
    "graphics": {
      "0": "Rat",
      "handCard": "images/cards/0/handCard.png",
      "atRest": "images/cards/0/handCard.png"
    },
    "modifier": function(a) {
      if (a[0] == 'onStruck' && a[2] >= 0) {
        var x = game.random();
        if (x > .1) {
          return a[1](a[2]);
        } else {
          _game.miss = true
        }
      } else {
        return a[1](a[2])
      }
    },
    "shopPrice": 45
  },
  "1": {
    "name": "Rat King",
    "function": 'Summon',
    "blurb": "Summons a fiercesome rat to attack your foe",
    "flavor": "Stronger than the average rat",
    "type": "creature",
    "subtype": "beast medium",
    "restricted": true,
    "stats": {
      "attack": 25,
      "HP": 55,
      "MS": 2,
      "range": 0,
      "special": {
        "evasion": "25%"
      }
    },
    "options": ["Summon"],
    "bounty": {
      "souls": 2
    },
    "cost": {
      "energy": 2,
      "materia": 1,
      "souls": 1
    },
    "graphics": {
      "0": "Rat King",
      "handCard": "images/cards/1/handCard.jpg",
      "atRest": "images/cards/1/handCard.jpg"
    },
    "modifier": function(a) {
      if (a[0] == 'onStruck' && a[2] >= 0) {
        var x = game.random();
        if (x > .25) {
          return a[1](a[2])
        }
      } else {
        return a[1](a[2])
      }
    },
    "shopPrice": 30
  },
  "2": {
    "name": "Basic Fort",
    "function": "Fortress",
    "blurb": "Just your basic fortress",
    "flavor": "Lemon-fresh",
    "type": "fortress building",
    "subtype": "fortification titanic",
    "stats": {
      "attack": 20,
      "HP": 500,
      "MS": 0,
      "range": 1,
      "special": false
    },
    "options": [],
    "playOptions": [
      {
        type: 'Upgrade Card',
        text: "Upgrade to lvl 2 Basic Fort",
        id: 64,
        cost: {
          energy: 1,
          materia: 4
        }
      },
      {
        type: 'Upgrade Card',
        text: "Upgrade to Valentia",
        id: 65,
        cost: {
          energy: 10,
          materia: 10,
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
  "3": {
    "name": "Trained Gopher",
    "function": 'Build',
    "blurb": "Summons gopher in build area",
    "flavor": "Goes Far",
    "type": "creature",
    "subtype": "beast small worker",
    "stats": {
      "attack": 0,
      "HP": 20,
      "MS": 0,
      "range": 0,
      "special": {
        "Production": "mines .25 materia per turn"
      }
    },
    "options": ["Build"],
    "bounty": {},
    "cost": {},
    "modifier": function(a) {
      if (a[0] == 'onEnd') {
        a[2].player.materia += .25
        display.effects.generateResource('materia', '.25', a[2].unit[2])
      } else {
        return a[1](a[2])
      }
    },
    "graphics": {
      "0": "Gopher",
      "handCard": "images/cards/3/handCard.jpg",
      "atRest": "images/cards/3/atRest.jpg"
    },
    "shopPrice": 15
  },
  "4": {
    "name": "Turtle",
    "blurb": "Summons a slow-moving turtle",
    "flavor": "Beats hare.",
    "type": "creature",
    "subtype": "beast medium",
    "nature": "water",
    "stats": {
      "attack": 5,
      "HP": 75,
      "MS": 1,
      "range": 0,
      "special": false
    },
    "options": ["Summon", "Evolve to Ancient Turtle"],
    "bounty": {
      "souls": 1
    },
    "evolveCost": {
      "souls": 5,
      "materia": 1
    },
    "cost": {
      "materia": 2
    },
    "modifier": function(a) {
      return a[1](a[2])
    },
    "graphics": {
      "0": "Turtle",
      "handCard": "images/cards/4/handCard.jpg",
      "atRest": "images/cards/4/handCard.jpg"
    },
    "shopPrice": 20
  },
  "5": {
    "name": "Rabbit",
    "blurb": "Summons a quick-running rabbit.",
    "flavor": "Beats turtle.",
    "type": "creature",
    "subtype": "beast small",
    "stats": {
      "attack": 10,
      "HP": 15,
      "MS": 3,
      "range": 0,
      "special": false
    },
    "options": ["Summon"],
    "bounty": {
      "souls": 1
    },
    "cost": {
      "energy": 1
    },
    "modifier": function(a) {
      return a[1](a[2])
    },
    "graphics": {
      "0": "Rabbit",
      "handCard": "images/cards/5/handCard.jpg",
      "atRest": "images/cards/5/handCard.jpg"
    },
    "shopPrice": 10
  },
  "6": {
    "name": "Armored Bear",
    "blurb": "Summons a bear in plate-mail",
    "flavor": "Better than your average bear.",
    "type": "creature",
    "subtype": "beast large",
    "stats": {
      "attack": 45,
      "HP": 105,
      "MS": 2,
      "range": 0,
      "special": {
        "Armor": "Reduce damage taken by 2"
      }
    },
    "options": ["Summon"],
    "bounty": {
      "souls": 2
    },
    "cost": {
      "materia": 3,
      "energy": 2
    },

    "modifier": function(a) {
      if (a[0] == 'onStruck' && a[2] > 0) {
        if (a[2] - 2 > 0) {
          a[2] = a[2] - 2
        } else {
          a[2] = 0
        }
      }
      return a[1](a[2])
    },
    "music": {
      "summon": `audio/summon/bearGrowl.mp3`
    },
    "graphics": {
      "0": "Armored Bear",
      "handCard": "images/cards/6/handCard.jpg",
      "atRest": "images/cards/6/handCard.jpg"
    },
    "shopPrice": 45
  },
  "7": {
    "name": "Squirrel",
    "blurb": "Summons a squirrel to throw nuts at your enemies",
    "flavor": "Deze nuts",
    "type": "creature",
    "subtype": "beast small",
    "stats": {
      "attack": 10,
      "HP": 15,
      "MS": 2,
      "range": 1,
      "special": false
    },
    "options": ["Summon"],
    "bounty": {
      "souls": 1
    },
    "cost": {
      "energy": 1
    },
    "modifier": function(a) {
      return a[1](a[2])
    },
    "graphics": {
      "0": "Squirrel",
      "handCard": "images/cards/7/handCard.jpg",
      "atRest": "images/cards/7/handCard.jpg",
      "projectile": "images/projectiles/acorn.png"
    },
    "shopPrice": 15
  },
  "8": {
    "name": "Sunflower",
    "function": 'Build',
    "blurb": "Summons sunflower in build area.",
    "flavor": "Begone ye crows",
    "type": "plant",
    "subtype": "plant medium worker",
    "stats": {
      "attack": 0,
      "HP": 20,
      "MS": 0,
      "range": 0,
      "special": {
        "Production": "generates .25 energy per turn"
      }
    },
    "options": ["Build"],
    "bounty": {},
    "cost": {},
    "modifier": function(a) {
      if (a[0] == 'onEnd') {
        a[2].player.energy += .25
        display.effects.generateResource('energy', '.25', a[2].unit[2])
      } else {
        return a[1](a[2])
      }
    },
    "graphics": {
      "0": "Sunflower",
      "handCard": "images/cards/8/handCard.jpg",
      "atRest": "images/cards/8/atRest.jpg"
    },
    "shopPrice": 15
  },
  "9": {
    "name": "Rabid Unicorn",
    "function": 'Summon',
    "blurb": "Summons a crazed, fleet-footed unicorn",
    "flavor": "Dodge",
    "type": "creature",
    "subtype": "beast medium",
    "stats": {
      "attack": 100,
      "HP": 7,
      "MS": 3,
      "range": 0,
      "special": false
    },
    "options": ["Summon"],
    "bounty": {
      "souls": 1
    },
    "cost": {
      "energy": 4
    },
    "modifier": function(a) {
      return a[1](a[2])
    },
    "graphics": {
      "0": "Rabid Unicorn",
      "handCard": "images/cards/9/handCard.jpg",
      "atRest": "images/cards/9/handCard.jpg"
    },
    "shopPrice": 50
  },
  "10": {
    "name": "Cast Cannonball",
    "blurb": "Casts cannonball at enemy fort for 75 damage",
    "flavor": "Fire Away",
    "type": "spell",
    "subtype": "physical, single",
    "recycle": "true",
    "stats": {
      "damage": 75,
      "allowed": "enemy",
      "target": "fort",
      "type": "physical",
      "special": {}
    },
    "options": ["Cast"],
    "bounty": {},
    "cost": {
      "energy": 4,
      "materia": 2
    },
    "modifier": function(a) {
      return a[1](a[2])
    },
    "music": {
      "cast": "audio/effects/cannon.mp3"
    },
    "graphics": {
      "0": "Spear",
      "handCard": "images/cards/10/handCard.jpg",
      "projectile": "images/projectiles/cannonBall.svg"
    },
    "shopPrice": 20
  },
  "11": {
    "name": "Wood Tower",
    "blurb": "Summons a defensive tower",
    "flavor": "Fortalicious",
    "type": "inanimate building",
    "subtype": "fortification huge",
    "stats": {
      "attack": 10,
      "HP": 100,
      "MS": 0,
      "range": 1,
      "special": false
    },
    "options": ["Summon on Allied Square"],
    "playOptions": [{
      type: 'Upgrade Card',
      text: "Upgrade to Stone Tower",
      id: 49,
      cost: {
        materia: 2
      }
    }],
    "bounty": {
      "materia": 1
    },
    "cost": {
      "materia": 4
    },
    "modifier": function(a) {
      return a[1](a[2])
    },
    "graphics": {
      "0": "Wood Tower",
      "handCard": "images/cards/11/handCard.jpg",
      "atRest": "images/cards/11/handCard.jpg",
      "projectile": "images/projectiles/arrow.png"
    },
    "shopPrice": 50
  },
  "12": {
    "name": "Rifleman",
    "blurb": "Summons a sharpshooter",
    "flavor": "Got my eyes on you",
    "type": "creature",
    "subtype": "human medium",
    "stats": {
      "attack": 10,
      "HP": 10,
      "MS": 1,
      "range": 2,
      "special": false
    },
    "options": ["Summon"],
    "bounty": {
      "souls": 3
    },
    "cost": {
      "energy": 1,
      "materia": 4
    },
    "modifier": function(a) {
      return a[1](a[2])
    },
    "graphics": {
      "0": "Rifleman",
      "handCard": "images/cards/12/handCard.jpg",
      "atRest": "images/cards/12/handCard.jpg",
      "projectile": "images/projectiles/sniperBullet.svg"
    },
    "shopPrice": 60
  },
  "13": {
    "name": "Solar Plant",
    "function": 'Build',
    "blurb": "Summons magic solar plant in build area.",
    "flavor": "Hope no clouds",
    "type": "inanimate building",
    "subtype": "medium worker",
    "stats": {
      "attack": 0,
      "HP": 200,
      "MS": 0,
      "range": 0,
      "special": {
        "Production": "harvests 1.25 energy per turn"
      }
    },
    "options": ["Build"],
    "bounty": {
      "materia": 1
    },
    "cost": {
      "energy": 2,
      "materia": 2
    },
    "modifier": function(a) {
      if (a[0] == 'onEnd') {
        a[2].player.energy += 1.25
        display.effects.generateResource('energy', '1.25', a[2].unit[2])
      } else {
        return a[1](a[2])
      }
    },
    "graphics": {
      "0": "Solar Plant",
      "handCard": "images/cards/13/handCard.jpg",
      "atRest": "images/cards/13/handCard.jpg"
    },
    "shopPrice": 45
  },
  "14": {
    "name": "Mouse",
    "music": {
      "summon": `audio/summon/mouse.mp3`
    },
    "blurb": "Summons a mouse to attack your foe",
    "flavor": "Big ears, tiny body",
    "type": "creature",
    "subtype": "beast small",
    "stats": {
      "attack": 5,
      "HP": 5,
      "MS": 3,
      "range": 0,
      "special": {
        "evasion": "50%"
      }
    },
    "options": ["Summon"],
    "bounty": {
      "souls": 1
    },
    "cost": {
      "energy": 0.25
    },
    "graphics": {
      "0": "Mouse",
      "handCard": "images/cards/14/handCard.jpg",
      "atRest": "images/cards/14/handCard.jpg"
    },
    "modifier": function(a) {
      if (a[0] == 'onStruck' && a[2] >= 0) {
        var x = game.random();
        if (x > .5) {
          return a[1](a[2]);
        } else {
          _game.miss = true
        }
      } else {
        return a[1](a[2])
      }
    },
    "shopPrice": 10
  },
  "15": {
    "name": "Clay Wall",
    "blurb": "Summons a defensive wall",
    "flavor": "Keep your head down",
    "type": "inanimate building",
    "subtype": "fortification medium",
    "stats": {
      "attack": false,
      "HP": 100,
      "MS": 0,
      "range": 0,
      "priority": 1,
      "special": {
        "Taunt": "Enemies usually target this unit first"
      }
    },
    "playOptions": [{
      type: 'Upgrade Card',
      text: "Upgrade to Brick Wall",
      id: 40,
      cost: {
        materia: 1
      }
    }],
    "options": ["Summon on Allied Square"],
    "bounty": {
      "materia": .5
    },
    "cost": {
      "materia": 1.5
    },
    "modifier": function(a) {
      return a[1](a[2])
    },
    "graphics": {
      "0": "Clay Wall",
      "handCard": "images/cards/15/handCard.jpg",
      "atRest": "images/cards/15/handCard.jpg"
    },
    "shopPrice": 20
  },
  "16": {
    "name": "Ancient Turtle",
    "blurb": "Summons a stone-encrusted turtle",
    "flavor": "Slow and steady wins the race",
    "type": "creature",
    "subtype": "beast large",
    "nature": "water",
    "stats": {
      "attack": 10,
      "HP": 95,
      "MS": 1,
      "range": 0,
      "special": {
        "Sturdy": "Reduce damage taken by 1/3"
      }
    },
    "options": ["Summon", "Evolve to Atlas Turtle"],
    "bounty": {
      "souls": 1,
      "materia": 1
    },
    "evolveCost": {
      "souls": 8,
      "materia": 2
    },
    "cost": {
      "materia": 3,
      "souls": 1
    },
    "modifier": function(a) {
      if (a[0] == 'onStruck' && a[2] > 0) {
        if (a[2] / 2 > 0) {
          a[2] = Math.round(a[2] / 1.5)
        } else {
          a[2] = 0
        }
      }
      return a[1](a[2])
    },
    "graphics": {
      "0": "Ancient Turtle",
      "handCard": "images/cards/16/handCard.jpg",
      "atRest": "images/cards/16/atRest.jpg"
    },
    "shopPrice": 70
  },
  "17": {
    "name": "Bandage",
    "blurb": "Heal creature for up to 25 hp",
    "flavor": "Rub some dirt on it",
    "type": "spell",
    "subtype": "physical, single",
    "recycle": "true",
    "stats": {
      "damage": -25,
      "allowed": "friendly",
      "target": "creature",
      "type": "physical",
      "special": {}
    },
    "options": ["Cast"],
    "bounty": {},
    "cost": {
      "energy": 1,
      "souls": 1
    },
    "modifier": function(a) {
      return a[1](a[2])
    },
    "graphics": {
      "0": "Light",
      "handCard": "images/cards/17/handCard.jpg",
      "atRest": "images/cards/17/handCard.jpg"
    },
    "shopPrice": 30
  },
  "18": {
    "name": "Cast Spike",
    "blurb": "Hit unit for 20 damage, half damage to buildings",
    "flavor": "Big needle from the sky",
    "type": "spell",
    "subtype": "physical, single",
    "recycle": "true",
    "stats": {
      "damage": 20,
      "allowed": "any",
      "target": "unit",
      "type": "physical",
      "special": {}
    },
    "options": ["Cast"],
    "bounty": {},
    "cost": {
      "energy": 1,
      "souls": 1
    },
    "modifier": function(a) {
      return a[1](a[2])
    },
    "music": {
      "cast": 'audio/effects/bow.mp3'
    },
    "graphics": {
      "0": "Light",
      "handCard": "images/cards/18/handCard.jpg",
      "projectile": "images/projectiles/simpleSpear.svg"
    },
    "shopPrice": 30
  },
  "19": {
    "name": "Spark of Insight",
    "points": 1,
    "blurb": "Draw 2 cards",
    "flavor": "I draw... with both hands.",
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
      "handCard": "images/cards/19/handCard.jpg",
      "atRest": "images/cards/19/handCard.jpg"
    },
    "shopPrice": 50
  },
  "20": {
    "name": "Long Fort",//"Forbidden City",
    "points": 1,
    "function": "Fortress",
    "blurb": "Shoots up to 3 squares away",
    "flavor": "Ballistae come in handy",
    "type": "fortress building",
    "subtype": "fortification titanic",
    "stats": {
      "attack": 15,
      "HP": 350,
      "MS": 0,
      "range": 3,
      "special": false
    },
    "options": [],
    "playOptions": [
      {
        type: 'Upgrade Card',
        text: "Upgrade to lvl 2 Long Fort",
        id: 67,
        cost: {
          energy: 1,
          materia: 4
        }
      },
      {
        type: 'Upgrade Card',
        text: "Upgrade to Forbidden City",
        id: 69,
        cost: {
          energy: 10,
          materia: 10,
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
  "21": {
    "name": "Fanatic",
    "points": 6,
    "blurb": "Grows stronger with each attack",
    "flavor": "I'll get there. Eventually.",
    "type": "creature",
    "subtype": "human medium",
    "stats": {
      "attack": 2,
      "HP": 35,
      "MS": 2,
      "range": 1,
      "special": "Attack power grows by 3 after each attack"
    },
    "options": ["Summon"],
    "bounty": {
      "souls": 1
    },
    "cost": {
      "energy": 1,
      "souls": 1
    },
    "modifier": function(a) {
      if (a[0] == 'onAttack') {
        a[3].attacker.stats.attack += 3
      };
      return a[1](a[2])
    },
    "graphics": {
      "0": "Fanatic",
      "handCard": "images/cards/21/handCard.png",
      "atRest": "images/cards/21/handCard.png",
      "projectile": "images/projectiles/axe.svg"
    },
    "shopPrice": 50
  },
  "22": {
    "name": "Steel Worm",
    "points": 7,
    "function": 'Build',
    "blurb": "Summons earth-eating worm in build area.",
    "flavor": "Goes Far",
    "type": "creature",
    "subtype": "beast medium worker",
    "stats": {
      "attack": 0,
      "HP": 60,
      "MS": 0,
      "range": 0,
      "special": {
        "Production": "mines .75 materia per turn"
      }
    },
    "options": ["Build"],
    "bounty": {},
    "cost": {
      "materia": 1,
      "energy": 1
    },
    "modifier": function(a) {
      if (a[0] == 'onEnd') {
        a[2].player.materia += .75
        display.effects.generateResource('materia', '.75', a[2].unit[2])
      } else {
        return a[1](a[2])
      }
    },
    "graphics": {
      "0": "Steel Worm",
      "handCard": "images/cards/22/handCard.jpg",
      "atRest": "images/cards/22/handCard.jpg"
    },
    "shopPrice": 25
  },
  "23": {
    "name": "Mulligan",
    "points": 1,
    "blurb": "Heal unit for 40 hp, can increase above max HP, card does not recycle",
    "flavor": "May I please have another?",
    "type": "spell",
    "subtype": "physical, single",
    "beyondMax": true,
    "recycle": false,
    "stats": {
      "damage": -40,
      "allowed": "friendly",
      "target": "any",
      "type": "physical",
      "special": {}
    },
    "options": ["Cast"],
    "bounty": {},
    "cost": {
      "energy": 2,
      "souls": .5
    },
    "modifier": function(a) {
      return a[1](a[2])
    },
    "graphics": {
      "0": "Light",
      "handCard": "images/cards/23/handCard.jpg",
      "atRest": "images/cards/23/handCard.jpg"
    },
    "shopPrice": 30
  },
  "24": {
    "name": "Clay Soldier",
    "points": 2,
    "blurb": "Summons a ceramic swordsman on allied non-water square",
    "flavor": "I hear there's 5000 of these guys",
    "type": "creature",
    "subtype": "golem medium",
    "nature": "earth",
    "stats": {
      "attack": 25,
      "HP": 20,
      "MS": 2,
      "range": 0,
      "special": false
    },
    "options": ["Summon on Allied Square"],
    "allowedSummon": {grass: 1, forest: 1, stone: 1},
    "bounty": {
      "materia": .25
    },
    "cost": {
      "materia": 1,
      "energy": 1
    },
    "modifier": function(a) {
      return a[1](a[2])
    },
    "graphics": {
      "0": "Clay Soldier",
      "handCard": "images/cards/24/handCard.jpg",
      "atRest": "images/cards/24/handCard.jpg"
    },
    "shopPrice": 20
  },
  "25": {
    "name": "Frog",
    "points": 3,
    "blurb": "Summons a large, hungry frog",
    "flavor": "Eats flies, rabbits, anything that can fit in its mouth",
    "type": "creature",
    "subtype": "beast medium",
    "stats": {
      "attack": 10,
      "HP": 25,
      "MS": 1,
      "range": 1,
      "special": {
        "Specialist": "Ten bonus damage vs small units"
      }
    },
    "options": ["Summon"],
    "bounty": {
      "souls": 1
    },
    "cost": {
      "energy": 1,
      "materia": .5
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
    "graphics": {
      "0": "Frog",
      "handCard": "images/cards/25/handCard.jpg",
      "atRest": "images/cards/25/handCard.jpg",
      "projectile": "images/projectiles/bubble.svg"
    },
    "shopPrice": 20
  },
  "26": {
    "name": "Atlas Turtle",
    "blurb": "Summons an immense, godlike turtle",
    "flavor": "Something on my back?",
    "restricted": true,
    "type": "creature",
    "subtype": "beast titanic",
    "nature": "water",
    "stats": {
      "attack": 50,
      "HP": 150,
      "MS": 1,
      "range": 0,
      "special": {
        "Sturdy": "Reduces physical damage to self by 1/2"
      }
    },
    "options": ["Summon"],
    "bounty": {
      "souls": 4,
      "materia": 2
    },
    "cost": {
      "energy": 1,
      "materia": 10,
      "souls": 2
    },
    "modifier": function(a) {
      if (a[0] == 'onStruck' && a[2] > 0) {
        if (a[2] / 2 > 0) {
          a[2] = Math.round(a[2] / 2)
        } else {
          a[2] = 0
        }
      }
      return a[1](a[2])
    },
    "graphics": {
      "0": "Atlas Turtle",
      "handCard": "images/cards/26/handCard.jpg",
      "atRest": "images/cards/26/handCard.jpg"
    },
    "shopPrice": 70
  },
  "27": {
    "name": "Skeleton",
    "points": 6,
    "blurb": "Summons a skeleton minion",
    "flavor": "He's just skin and bones. Actually, just bones.",
    "type": "creature",
    "subtype": "human undead medium",
    "stats": {
      "attack": 10,
      "HP": 40,
      "MS": 2,
      "range": 0,
      "special": {
        "Flimsy": "Takes ten extra damage from melee units."
      }
    },
    "options": ["Summon"],
    "bounty": {},
    "cost": {
      "energy": .5,
      "souls": .5
    },
    "modifier": function(a) {
      if (a[0] == 'onStruck') {
        if (attacker.stats.range === 0) {
          a[2] += 10
        }
      };
      return a[1](a[2]);
    },
    "music": {
      "death": `audio/death/skeleton.mp3`
    },
    "graphics": {
      "0": "Skeleton",
      "handCard": "images/cards/27/handCard.jpg",
      "atRest": "images/cards/27/handCard.jpg"
    },
    "shopPrice": 15
  },
  "28": {
    "name": "Skeleton Archer",
    "points": 7,
    "blurb": "Summons a skeleton archer",
    "flavor": "Deadeye",
    "type": "creature",
    "subtype": "human undead medium",
    "stats": {
      "attack": 10,
      "HP": 15,
      "MS": 2,
      "range": 2,
      "special": {
        "Flimsy": "Takes ten extra damage from melee units."
      }
    },
    "options": ["Summon"],
    "bounty": {},
    "cost": {
      "energy": .5,
      "souls": .75
    },
    "modifier": function(a) {
      if (a[0] == 'onStruck') {
        if (attacker.stats.range === 0) {
          a[2] += 10
        }
      };
      return a[1](a[2]);
    },
    "music": {
      "death": `audio/death/skeleton.mp3`,
      "attack": 'audio/effects/bow.mp3'
    },
    "graphics": {
      "0": "Skeleton Archer",
      "handCard": "images/cards/28/handCard.jpg",
      "atRest": "images/cards/28/handCard.jpg",
      "projectile": 'images/projectiles/arrow.png'
    },
    "shopPrice": 15
  },
  "29": {
    "name": "Catapult",
    "points": 2,
    "blurb": "Summons a wall-wrecker",
    "flavor": "Did I make a mess?",
    "type": "creature",
    "subtype": "golem medium",
    "stats": {
      "attack": 10,
      "HP": 25,
      "MS": 1,
      "range": 1,
      "special": {
        "Specialist": "Forty bonus damage vs buildings"
      }
    },
    "options": ["Summon"],
    "bounty": {
      "materia": 1
    },
    "cost": {
      "materia": 4
    },
    "modifier": function(a) {
      if (a[0] == 'onAttack') {
        let types = defender.type.split(' ');
        let building = false;
        types.forEach(function(ele) {
          if (ele == 'building') {
            building = true
          }
        });
        if (building) {
          a[2] += 40
        }
      };
      return a[1](a[2])
    },
    "graphics": {
      "0": "Catapult",
      "handCard": "images/cards/29/handCard.jpg",
      "atRest": "images/cards/29/handCard.jpg",
      "projectile": "images/projectiles/boulder.svg"
    },
    "shopPrice": 20
  },
  "30": {
    "name": "Strong Fort",
    "points": 5,
    "function": "Fortress",
    "blurb": "Melee range powerhouse fortress",
    "flavor": "Who needs arrows when you have burning oil?",
    "type": "fortress building",
    "subtype": "fortification titanic",
    "stats": {
      "attack": 45,
      "HP": 700,
      "MS": 0,
      "range": 0,
      "special": false
    },
    "options": [],
    "playOptions": [
      {
        type: 'Upgrade Card',
        text: "Upgrade to lvl 2 Strong Fort",
        id: 72,
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
          energy: 10,
          materia: 10,
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
  "31": {
    "name": "Scylla",
    "points": 7,
    "blurb": "Summons a 3-headed scaled beast",
    "flavor": "Once a beautiful nymph, she was cursed to become a man-eating monster by Circe",
    "type": "creature",
    "subtype": "beast large",
    "nature": "water",
    "stats": {
      "attack": 65,
      "HP": 200,
      "MS": 2,
      "range": 1,
      "special": false
    },
    "options": ["Summon"],
    "bounty": {
      "materia": 2,
      "souls": 2
    },
    "cost": {
      "materia": 17,
      "energy": 5,
      "souls": 12
    },
    "modifier": function(a) {
      return a[1](a[2])
    },
    "graphics": {
      "0": "Scylla",
      "handCard": "images/cards/31/handCard.jpg",
      "atRest": "images/cards/31/handCard.jpg"
    },
    "shopPrice": 200
  },
  "32": {
    "name": "Gator",
    "points": 6,
    "blurb": "Summons a voracious reptile",
    "flavor": "Don't tread on me.",
    "type": "creature",
    "subtype": "beast medium",
    "nature": "water",
    "stats": {
      "attack": 25,
      "HP": 50,
      "MS": 2,
      "range": 0,
      "special": {
        "Aquatic Hunter": "Deals double damage in water squares."
      }
    },
    "options": ["Summon"],
    "bounty": {
      "materia": .5,
      "souls": .5
    },
    "cost": {
      "materia": 2,
      "energy": 1
    },
    "modifier": function(a) {
      if (a[0] == 'onAttack' && masterState[a[3].x].element[a[3].bot] == 'water') {
        a[2] *= 2
      };
      return a[1](a[2])
    },
    "graphics": {
      "0": "Gator",
      "handCard": "images/cards/32/handCard.jpg",
      "atRest": "images/cards/32/handCard.jpg"
    },
    "shopPrice": 30
  },
  "33": {
    "name": "Warpig",
    "points": 8,
    "blurb": "Summons a warthog trained for warfare",
    "flavor": "Not just any pig.",
    "type": "creature",
    "subtype": "beast medium",
    "stats": {
      "attack": 15,
      "HP": 55,
      "MS": 2,
      "range": 0,
      "special": false
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
      "0": "Warpig",
      "handCard": "images/cards/33/handCard.jpg",
      "atRest": "images/cards/33/handCard.jpg"
    },
    "shopPrice": 20
  },
  "34": {
    "name": "Goblin Pillager",
    "function": 'Summon',
    "blurb": "Summons a goblin strong vs buildings",
    "flavor": "Razes, then pillages.",
    "type": "creature",
    "subtype": "goblin medium",
    "stats": {
      "attack": 15,
      "HP": 25,
      "MS": 2,
      "range": 0,
      "special": {
        "Specialist": "+15 damage vs buildings"
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
      if (a[0] == 'onAttack') {
        if (defender.type.includes('building')) {
          a[2] += 15
        }
      };
      return a[1](a[2])
    },
    "graphics": {
      "0": "Goblin Pillager",
      "handCard": "images/cards/34/handCard.jpg",
      "atRest": "images/cards/34/handCard.jpg"
    },
    "shopPrice": 20
  },
  "35": {
    "name": "Common Troll",
    "function": 'Summon',
    "blurb": "Summons a standard Troll",
    "flavor": "It'll grow back.",
    "type": "creature",
    "subtype": "troll medium",
    "stats": {
      "attack": 17,
      "HP": 65,
      "MS": 1,
      "range": 0,
      "special": {
        "Trollblood": "Regenerates 10hp at start of owner's turn"
      }
    },
    "options": ["Summon", "Evolve to Mountain Troll", "Evolve to Moss Troll"],
    "evolveCost": {
      "souls": 1,
      "energy": 1
    },
    "bounty": {
      "souls": 1
    },
    "cost": {
      "materia": 2,
      "energy": 1
    },
    "modifier": function(a) {
      if (a[0] == 'onStart' && a[2][3].stats.HP < a[2][1].stats.HP) {
        a[2][3].stats.HP += 10;
        if (a[2][3].stats.HP > a[2][1].stats.HP) {
          a[2][3].stats.HP = Number(a[2][1].stats.HP)
        };
        return 'regenerate'
      } else {
        return a[1](a[2])
      }
    },
    "graphics": {
      "0": "Troll",
      "handCard": "images/cards/35/handCard.jpg",
      "atRest": "images/cards/35/handCard.jpg"
    },
    "shopPrice": 30
  },
  "36": {
    "name": "Mountain Troll",
    "function": 'Summon',
    "blurb": "Summons a troll from the snow alps",
    "flavor": "Sturdy. Reliable. Troll.",
    "type": "creature",
    "subtype": "troll large",
    "nature": "stone",
    "stats": {
      "attack": 20,
      "HP": 85,
      "MS": 1,
      "range": 0,
      "special": {
        "Trollblood": "Regenerates 8hp(16 on mountains) at start of owner's turn"
      }
    },
    "options": ["Summon"],
    "bounty": {
      "souls": 1
    },
    "cost": {
      "materia": 2,
      "energy": 1.5
    },
    "modifier": function(a) {
      if (a[0] == 'onStart' && a[2][3].stats.HP < a[2][1].stats.HP) {
        a[2][3].stats.HP += 8;
        if (masterState[a[3].x].element[a[3].bot] == 'stone') {
          a[2][3].stats.HP += 8
        }
        if (a[2][3].stats.HP > a[2][1].stats.HP) {
          a[2][3].stats.HP = Number(a[2][1].stats.HP)
        };
        return 'regenerate'
      } else {
        return a[1](a[2])
      }
    },
    "graphics": {
      "0": "Mountain Troll",
      "handCard": "images/cards/36/handCard.svg",
      "atRest": "images/cards/36/handCard.svg"
    },
    "shopPrice": 35
  },
  "37": {
    "name": "Moss Troll",
    "function": 'Summon',
    "blurb": "Summons a troll from the depths of the jungle",
    "flavor": "Favorite Hobby: Roasting merchants.",
    "type": "creature",
    "subtype": "troll large",
    "nature": "stone",
    "stats": {
      "attack": 20,
      "HP": 65,
      "MS": 2,
      "range": 0,
      "special": {
        "Trollblood": "Regenerates 8hp(16 in forest) at start of owner's turn"
      }
    },
    "options": ["Summon"],
    "bounty": {
      "souls": 1
    },
    "cost": {
      "materia": 2,
      "energy": 1.5
    },
    "modifier": function(a) {
      if (a[0] == 'onStart' && a[2][3].stats.HP < a[2][1].stats.HP) {
        a[2][3].stats.HP += 8;
        if (masterState[a[3].x].element[a[3].bot] == 'forest') {
          a[2][3].stats.HP += 8
        }
        if (a[2][3].stats.HP > a[2][1].stats.HP) {
          a[2][3].stats.HP = Number(a[2][1].stats.HP)
        };
        return 'regenerate'
      } else {
        return a[1](a[2])
      }
    },
    "graphics": {
      "0": "Forest Troll",
      "handCard": "images/cards/37/handCard.svg",
      "atRest": "images/cards/37/handCard.svg"
    },
    "shopPrice": 35
  },
  "38": {
    "name": "Cactus",
    "function": 'Summon',
    "blurb": "Summons thorny cactus",
    "flavor": "Hands off.",
    "type": "building",
    "subtype": "fortification medium",
    "stats": {
      "attack": false,
      "HP": 100,
      "MS": 0,
      "range": 0,
      "special": {
        "barbed": "Deals five pure damage to melee attackers."
      }
    },
    "evolveCost": {
      "souls": 1
    },
    "playOptions": [{
      type: 'Upgrade Card',
      text: "Upgrade to Wall of Thorns",
      id: 42,
      cost: {
        energy: 2,
        materia: 1
      }
    }],
    "options": ["Summon on Allied Square", "Evolve to Cactus Man"],
    "bounty": {
      "materia": .5
    },
    "cost": {
      "materia": 1.5
    },
    "modifier": function(a) {
      if (a[0] == 'onStruck' && a[3] && a[3].attacker && a[3].attacker.stats.range == 0) {
        a[3].attacker.stats.HP -= 5
      };
      return a[1](a[2]);
    },
    "graphics": {
      "0": "Cactus",
      "handCard": "images/cards/38/handCard.svg",
      "atRest": "images/cards/38/handCard.svg"
    },
    "shopPrice": 20
  },
  "39": {
    "name": "Cactus Man",
    "function": 'Summon',
    "blurb": "Summons sentient cactus with premptive defense",
    "flavor": "I've got a great personality.",
    "type": "building",
    "subtype": "fortification medium",
    "stats": {
      "attack": false,
      "HP": 100,
      "MS": 0,
      "attack": 10,
      "range": 1,
      "special": {
        "barbed": "Deals five pure damage to melee attackers."
      }
    },
    "options": ["Summon on Allied Square"],
    "bounty": {
      "materia": .5,
      "souls": .5
    },
    "restricted": true,
    "cost": {
      "materia": 3,
      "energy": 1,
      "souls": 1
    },
    "modifier": function(a) {
      if (a[0] == 'onStruck' && a[3] && a[3].attacker && a[3].attacker.stats.range == 0) {
        a[3].attacker.stats.HP -= 5
      };
      return a[1](a[2]);
    },
    "graphics": {
      "0": "Cactus Man",
      "handCard": "images/cards/39/handCard.svg",
      "atRest": "images/cards/39/handCard.svg",
      "projectile": "images/projectiles/simpleSpear.svg"
    },
    "shopPrice": 20
  },
  "40": {
    "name": "Brick Wall",
    "blurb": "A defensive wall",
    "flavor": "Baked by the sun, it finds strength.",
    "type": "inanimate building",
    "subtype": "fortification large",
    "stats": {
      "attack": false,
      "HP": 150,
      "MS": 0,
      "range": 0,
      "priority": 1,
      "special": {
        "Taunt": "Enemies usually target this unit first"
      }
    },
    "options": ["Summon on Allied Square"],
    "bounty": {
      "materia": .5
    },
    "restricted": true,
    "cost": {
      "materia": 2
    },
    "modifier": function(a) {
      return a[1](a[2])
    },
    "graphics": {
      "0": "Brick Wall",
      "handCard": "images/cards/40/handCard.jpg",
      "atRest": "images/cards/40/handCard.jpg"
    },
    "shopPrice": 20
  },
  "41": {
    "name": "Stone Wall",
    "blurb": "A defensive wall",
    "flavor": "Strong, but lacking mortar.",
    "type": "inanimate building",
    "subtype": "fortification large",
    "stats": {
      "attack": false,
      "HP": 125,
      "MS": 0,
      "range": 0,
      "priority": 1,
      "special": {
        "Taunt": "Enemies usually target this unit first"
      }
    },
    "options": ["Summon on Allied Square"],
    "bounty": {
      "materia": .5
    },
    "cost": {
      "materia": 2
    },
    "modifier": function(a) {
      return a[1](a[2])
    },
    "graphics": {
      "0": "Stone Wall",
      "handCard": "images/cards/41/handCard.jpg",
      "atRest": "images/cards/41/handCard.jpg"
    },
    "shopPrice": 20
  },
  "42": {
    "name": "Wall of Thorns",
    "function": 'Summon',
    "blurb": "Summons thorny cactus field",
    "flavor": "Don't touch.",
    "type": "building",
    "subtype": "fortification medium",
    "stats": {
      "attack": false,
      "HP": 200,
      "MS": 0,
      "range": 0,
      "special": {
        "barbed": "Deals ten pure damage to melee attackers."
      }
    },
    "restricted": true,
    "options": ["Summon on Allied Square"],
    "bounty": {
      "materia": .5
    },
    "cost": {
      "materia": 2.5
    },
    "modifier": function(a) {
      if (a[0] == 'onStruck' && a[3] && a[3].attacker && a[3].attacker.stats.range == 0) {
        a[3].attacker.stats.HP -= 10
      };
      return a[1](a[2]);
    },
    "graphics": {
      "0": "Cactus",
      "handCard": "images/cards/42/handCard.jpg",
      "atRest": "images/cards/42/handCard.jpg"
    },
    "shopPrice": 20
  },
  "43": {
    "name": "Happy Feet",
    "blurb": "Increase unit movement speed by 1",
    "flavor": "Comfortable boots wins battles.",
    "type": "spell",
    "subtype": "magic, single",
    "recycle": "true",
    "stats": {
      "allowed": "friendly",
      "target": "creature",
      "type": "physical",
      "special": {}
    },
    "options": ["Cast"],
    "bounty": {},
    "cost": {
      "energy": 1
    },
    "modifier": function(a) {
      return a[1](a[2])
    },
    "graphics": {
      "0": "Light",
      "handCard": "images/cards/43/handCard.jpg",
      "atRest": "images/cards/43/handCard.jpg"
    },
    "shopPrice": 20
  },
  "44": {
    "name": "Hanging Gardens",
    "function": "Fortress",
    "blurb": "The friendly fort.",
    "flavor": "Generates resources instead of arrows.",
    "type": "fortress building",
    "subtype": "fortification titanic",
    "stats": {
      "attack": false,
      "HP": 500,
      "MS": 0,
      "range": 0,
      "special": {
        "Production": "Generates .25 of random resource at end of turn"
      }
    },
    "options": [],
    "bounty": {},
    "cost": {},
    "graphics": {
      "0": "Pacifist Fort",
      "handCard": "images/cards/44/handCard.jpg",
      "atRest": "images/cards/44/handCard.jpg",
      "projectile": 'images/projectiles/arrow.png'
    },
    "modifier": function(a) {
      if (a[0] == 'onEnd') {
        let opts = {
          0: "materia",
          1: "energy",
          2: 'souls'
        }
        let choice = opts[Math.floor(game.random() * 3)]
        a[2].player[choice] += .25
        display.effects.generateResource(choice, '.25', a[2].unit[2])
      } else {
        return a[1](a[2])
      }
    },
    "shopPrice": 65
  },
  "45": {
    "name": "Cast Ankleweight",
    "blurb": "Reduce unit movement speed by 1",
    "flavor": "Worse than mistied shoelaces.",
    "type": "spell",
    "subtype": "magic, single",
    "recycle": "true",
    "stats": {
      "allowed": "enemy",
      "target": "creature",
      "type": "physical",
      "special": {}
    },
    "options": ["Cast"],
    "bounty": {},
    "cost": {
      "energy": 1,
      "materia": .5
    },
    "modifier": function(a) {
      return a[1](a[2])
    },
    "graphics": {
      "0": "Light",
      "handCard": "images/cards/45/handCard.jpg",
      "atRest": "images/cards/45/handCard.jpg"
    },
    "shopPrice": 20
  },
  "46": {
    "name": "Harrowing Gaze",
    "blurb": "Cuts unit HP by half",
    "flavor": "Confrontation with one's mortality is a grave thing.",
    "type": "spell",
    "subtype": "magic, single",
    "recycle": "true",
    "stats": {
      "allowed": "enemy",
      "target": "creature",
      "special": {}
    },
    "options": ["Cast"],
    "bounty": {},
    "cost": {
      "souls": 3
    },
    "modifier": function(a) {
      return a[1](a[2])
    },
    "graphics": {
      "0": "Light",
      "handCard": "images/cards/46/handCard.jpg",
      "atRest": "images/cards/46/handCard.jpg",
      "projectile": 'images/cards/46/handCard.jpg'
    },
    "shopPrice": 40
  },
  "47": {
    "name": "Comet",
    "blurb": "Strikes single enemy with great force",
    "flavor": "Frozen death from the sky",
    "type": "spell",
    "subtype": "physical, single",
    "recycle": "true",
    "stats": {
      "damage": 35,
      "allowed": "enemy",
      "target": "unit",
      "type": "physical",
      "special": {}
    },
    "options": ["Cast"],
    "bounty": {},
    "cost": {
      "energy": 2,
      "materia": 1
    },
    "modifier": function(a) {
      return a[1](a[2])
    },
    "graphics": {
      "0": "Light",
      "handCard": "images/cards/47/handCard.jpg",
      "projectile": "images/projectiles/comet.svg"
    },
    "shopPrice": 40
  },
  "48": {
    "name": "Meteor Shower",
    "blurb": "Strikes all units in square",
    "flavor": "",
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
      "materia": 3
    },
    "modifier": function(a) {
      return a[1](a[2])
    },
    "graphics": {
      "0": "Light",
      "handCard": "images/cards/48/handCard.jpg",
      "projectile": "images/projectiles/meteor.svg"
    },
    "music": {
      "cast": ""
    },
    "shopPrice": 45
  },
  "49": {
    "name": "Stone Tower",
    "function": 'Summon',
    "blurb": "Summons a stronger tower",
    "flavor": "Fortalicious",
    "type": "inanimate building",
    "subtype": "fortification huge",
    "stats": {
      "attack": 12,
      "HP": 150,
      "MS": 0,
      "range": 1,
      "special": false
    },
    "options": ["Summon on Allied Square"],
    "bounty": {
      "materia": 1
    },
    "cost": {
      "materia": 5
    },
    "modifier": function(a) {
      return a[1](a[2])
    },
    "graphics": {
      "0": "Basic Tower",
      "handCard": "images/cards/49/handCard.jpg",
      "atRest": "images/cards/49/handCard.jpg",
      "projectile": "images/projectiles/arrow.png"
    },
    "shopPrice": 50
  },

})
