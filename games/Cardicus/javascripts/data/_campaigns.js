Object.assign(C.data.campaignList, {
  "Goblin Town": {
    id: 2,
    "info": {
      "title": `It doesn't look quite like what you've heard. Rather than a shining city on a hill it's more of a pile of mud and bones, globbed together to form something that vaguely resembles a beehive. Was this really Mishalle?`,
      "required": 7,
      "backgroundImage": "images/campaign/goblinTown.jpg",
      "music": ["audio/campaign/didgeridoo.mp3", "audio/campaign/desertWind.mp3"]
    },
    "Gatekeepers": {
      "title": "Trouble at the Gates",
      "dialogue": {
        "introduction": `
        <p>The ground firms, bug receding with every step you take. The gates to the walled town are near at hand. Two men peer down at your from the tower. Or at least you think they're men. Perhaps it's the distance and the dehydration playing tricks on you but they seem rather small... and rather green.</p>
        <h3>{{user}}</h3>
        <say>"Let me in, those bog beasts are right behind me!"</say>
        <h3>Biter McBiterson</h3>
        <say>"What's the password?"</say>
        <p>The other man hits the speaker in the back of the head, prompting a yelp of outrage.</p>
        <h3>Smellyfoot Chomper</h3>
        <say>"Idiot, why would a mud monster know the password?"</say>
        <p>Mud monster? Are they talking about you? You suppose that there <i>is</i> more mud than skin showing on you.<p>
        <h3>{{user}}</h3>
        <say>"I'm not a mud monster, I'm--"</say>
        <p>You dodge as an arrow comes flying your way.</p>
        `,
        "winMessage": `<h3>{{user}}</h3>
          <say>"Victory for the Mud Meister!"</say>
        `,
        'loseMessage': `<h3>{{user}}</h3>
          <say>"I didn't want to go inside your stupid town anyways!"</say>
        `
      },
      "AI": {
        "name": "SmellyFoot & Biter",
        "deck": {
          "base": 20,
          "deck": [
            1,1,4,4,25,25,0,0,8,3,8,3,8,3,11,11,15,15,33,33,34, 18
          ],
          "income": 1.06
        },
        "difficulty": "easy"
      },
      "landPref": 'grass',
      "bounty": 70,
      "cardBounty": [11,15,33]
    },
    "Password": {
      "title": "Bathhouse Trolls",
      "dialogue": {
        "introduction": `
        <p>You are pleased to find that contrary to childhood tales, goblins do value higiene. The bathhouse is quite a bit better than the buckets people use at home, and at last the stink of the swamp is off you. You feel born anew, and politely refuse the mud paints the goblins use post-bath to artistically re-dirty themselves. Trouble arises when you go to leave though.</p>
        <h3>Hairyfoot</h3>
        <say>"Halt!"</say>
        <h3>{{user}}</h3>
        <say>"What's up?"</say>
        <h3>Hairyfoot</h3
        <say>"What's the password?"</say>
        <h3>{{user}}</h3>
        <say>"Huh? I'm just leaving. Shouldn't you have asked that before I came in?"</say>
        <h3>Hairyfoot</h3
        <say>"Tell me the password or prepare to be flogged"</say>
        <h3>{{user}}</h3>
        <say>"You're a troll, right? Shouldn't you be guarding a bridge somewhere?"</say>
        `,
        "winMessage": `<h3>{{user}}</h3>
          <say>"Password that."</say>
        `,
        'loseMessage': `<h3>{{user}}</h3>
          <say>"They need to work on their customer service."</say>
        `
      },
      "AI": {
        "name": "Hairyfoot",
        "deck": {
          "base": 20,
          "deck": [
            1,4,25,25,8,3,8,3,11,11,15,15,33,33,34,34,34,35,35,35,36, 38, 39
          ],
          "income": 1.08
        },
        "difficulty": "easy"
      },
      "landPref": ['water', 'stone'],
      "bounty": 75,
      "cardBounty": [35,34,33]
    },
    "Training": {
      "title": "Survival Training",
      "dialogue": {
        "introduction": `
        <p>You've learned your lesson about jaunting off into the wilderness unprepared. This time you'll learn about edible plants and memorize the landmarks to the next town. Luckily you've found someone who will teach you all that for cheap. Unfortunately goblins are into untraditional schooling.</p>
        <h3>{{user}}</h3>
        (bowing)
        <say>"Please teach me, Sensei."</say>
        <h3>Whitebeard</h3
        <say>"First you must wash the cacti."</say>
        <h3>{{user}}</h3>
        <say>"Huh? What does washing --"</say>
        <h3>Whitebeard</h3>
        <say>"First you must wash the cacti!"</say>
        `,
        "winMessage": `<h3>{{user}}</h3>
          <say>"Now I know cactus-fu."</say>
        `,
        'loseMessage': `<h3>{{user}}</h3>
          <say>"So. Many. Cactuses."</say>
        `
      },
      "AI": {
        "name": "Whitebeard",
        "deck": {
          "base": 20,
          "deck": [
            25,25,8,3,8,3,11,11,15,15,33,33,34,34,34,35,35,35,36, 38, 39, 38, 39, 38, 39, 51, 52, 17
          ],
          "income": 1.10
        },
        "difficulty": "easy"
      },
      "landPref": ['grass', 'stone'],
      "bounty": 75,
      "cardBounty": [35,34,38]
    },
    "Guardsmen return": {
      "title": "Miscreant",
      "dialogue": {
        "introduction": `
        <p>You've learned how to survive in the desert, how to take sustenance from cacti and fend off the dreaded cactus men. At last you feel prepared to journey forth once more. This is good, because your activities in Goblin Town have not gone unnoticed.</p>
        <h3>Biter McBiterson</h3>
        <say>"You there, what are you doing with that cactus?"</say>
        <p>The other man hits the speaker in the back of the head</p>
        <h3>Smellyfoot Chomper</h3>
        <say>"We was supposed to sneak up on him, remember?"</say>
        <p>That didn't sound good, but at least they weren't asking for another password.<p>
        <h3>{{user}}</h3>
        <say>"Nothing, I was just--"</say>
        <h3>Biter McBiterson</h3>
        <say>"That's enough out of you, miscreant! You think you can go around destroying the town's cactuses as you please?"</say>
        <h3>Smellyfoot Chomper</h3>
        <say>"Hey, isn't that the same guy they say attacked the troll?"</say>
        <h3>Biter McBiterson</h3>
        <say>"It's the mud monster!"</say>
        <p>Turned out that destroying cactuses as a training exercise and fighting with citizens was against the law here, who knew. Best to beat these two quickly and run before a gaggle of guardsmen arrived to drag you off to one of the infamous goblin prisons.</p>
        `,
        "winMessage": `<h3>{{user}}</h3>
          <say>"The Mud Meister is victorious again!"</say>
        `,
        'loseMessage': `<h3>{{user}}</h3>
          <say>"Best two out of three?"</say>
        `
      },
      "AI": {
        "name": "SmellyFoot & Biter",
        "deck": {
          "base": 20,
          "deck": [
            1,1,4,4,25,25,0,0,8,3,8,3,8,3,11,11,15,15,33,33,34,35,38,52,18,18
          ],
          "income": 1.11
        },
        "difficulty": "easy"
      },
      "landPref": 'grass',
      "bounty": 70,
      "cardBounty": [11,15,33]
    },
    "Mirage": {
      "title": "Mirage",
      "dialogue": {
        "introduction": `
        <p>Sands shift in the wind, running over your feet as you wearily plod over the dunes. You never thought you'd wish to be back in the bog again but the desert sun makes you crave that hellish fog, gators and all.</p>
        <h3>{{user}}</h3>
        <say>"W-water!"</say>
        <p>But upon reaching the oasis it disappears, leaving you to stumble through bones. You turn on your back only to see vultures circling above. They aren't patient to wait for your demise and seem ready to hurry things along.</p>
        <h3>{{user}}</h3>
        <say>"Uh-oh."</say>
        `,
        "winMessage": `<h3>{{user}}</h3>
          <say>"That'll teach you to try and eat me!"</say>
        `,
        'loseMessage': `<h3>Whitebeard</h3>
        <say>"Lessons take again, you must."</say>
        `
      },
      "AI": {
        "name": "Hungry Desert",
        "deck": {
          "base": 56,
          "deck": [
            51,52,0,38,8,3,8,3,8,3, 52, 51,15,33,33,34,35,38
          ],
          "income": 1.15
        },
        "difficulty": "easy"
      },
      "turn": "AI",
      "landPref": 'grass',
      "bounty": 80,
      "cardBounty": [51,52,38]
    },
  }
})
