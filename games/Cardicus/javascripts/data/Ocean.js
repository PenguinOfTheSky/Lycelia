Object.assign(C.data.campaignList, {
  "Fel Harbor": {
    id: 3,
    "info": {
      "required": 10,
      "title": "Your desert trek is over at last, water everywhere as far as you can see. It's a bit more salty and shark-infested than you hoped....",
      "backgroundImage": "images/campaign/felHarbor.jpg",
      "music": ["audio/campaign/oceanSurf.mp3"]
    },
    "The Beach": {
      "title": "Crazy Tom Sparrow",
      "dialogue": {
        "introduction": `<p>The hot desert winds fade, replaced by a cool breeze that smells of salt. As your weary steps carry you forward the sand dunes are swiftly conquered by grass, broken white shells scattered everywhere. The next dune is the last. A brilliant blue ocean stretches out before you, lapping at a pebble-strewn beach.</p>
        <h3>Crazy Tom</h3>
        <say>"You there, do you know my name?"</say>
        <h3>{{user}}</h3>
        <say>"...no? I've only just gotten here"</say>
        <h3>Crazy Tom</h3>
        <say>"I'm Tom Sparrow, captain of the greatest fishing kayak to ever sail the ocean blue! Everyone knows my name -- except for pirates. Are you a pirate?""</say>
        <h3>{{user}}</h3>
        <say>"Of course not! I can't even swim."</say>
        <h3>Crazy Tom</h3>
        <say>"That's just what a pirate would say."</say>
        `,
        "winMessage": `<h3>{{user}}</h3>
          <say>"Believe me now?"</say>
          <h3>Crazy Tom</h3>
          <say>"I believe you're a pirate!"</say>
        `,
        'loseMessage': `<h3>Crazy Tom</h3>
          <say>"Take that, dirty pirate scum!"</say>
        `
      },
      "AI": {
        "name": "Crazy Tom",
        "deck": {
          "base": 20,
          "deck": [
            8,8,8,3,3,3,8,3,21,21,21,21,15,15,32,32,54,54,9,9,9, 57,57,57,57, 18, 18, 18
          ],
          "income": 1.09
        },
        "difficulty": "easy"
      },
      "bounty": 75,
      "cardBounty": [57, 54, 21]
    },
    "Bar Island": {
      "title": "Bar Island",
      "dialogue": {
        "introduction": `<p>Crazy Tom wasn't too friendly but you're sure they can't all be crazy. According to Tom there's a village on the nearby island. Luckily there's a route to get there without a boat, a sand bar that allows passage at low tie.</p>
        <p>The sand bar is soft underfoot, puddles everywhere as you get an early start before the tide has finished receding.</p>
        <h3>Scylla</h3>
        <say>Skraaaaaw!</say>
        <h3>{{user}}</h3>
        <say>"No hard feelings about that time in the swamp, right?"</say>
        <h3>Scylla</h3>
        <say>Skraaaaaw!</say>
        `,
        "winMessage": `<h3>{{user}}</h3>
          <say>"Can't we just be friends?"</say>
          <h3>Scylla</h3>
          <say>Skraaaaaw...</say>
        `,
        'loseMessage': `
          <h3>Scylla</h3>
          <say>Skraaaaaw!</say>
        `
      },
      "AI": {
        "name": "Scylla",
        "deck": {
          "base": 30,
          "deck": [
            8,8,8,3,3,3,8,3,31,32,32,27,28,4,4,57,57,58,58,31,31,47,47,47,46
          ],
          "income": 1.13
        },
        "difficulty": "easy"
      },
      "turn": "AI",
      "landPref": 'water',
      "bounty": 85,
      "cardBounty": [57, 54, 58]
    },
    "Capetown": {
      "title": "Capetown",
      "previous": 'Bar Island', //write functionality later?
      "dialogue": {
        "introduction": `<p>The village is a peaceful one. The villagers go about their work salting fish and hanging clothes, others whitewashing their houses. It's a pleasant respite after such a long time adventuring. A slightly saltier version of home.</p>
        <p>You close your eyes, appreciating for a moment the tranquility. You wonder though what that whistling sound is. Some strange bird? A creature of the sea?</p>
        <p><b>KBAANG!</b></p>
        <p>The peace is interrupted by a massive cannon ball shattering an outhouse.</p>
        <h3>Villager</h3>
        <say>"Run for your lives!"</say>
        <h3>{{user}}</h3>
        <say>"Don't worry, I'll protect you."</say>
        `,
        "winMessage": `<h3>{{user}}</h3>
          <say>"Crime never pays."</say>
        `,
        'loseMessage': `
        <h3>{{user}}</h3>
          <say>"Parlay?"</say>
        `,
        'AI_lowHP': `
          <h3>Pirate</h3>
          <say>"Arrrgh!"</say>
        `
      },
      "AI": {
        "name": "Pirates",
        "deck": {
          "base": 67,
          "deck": [
            10,10,59,60,59,60,59,60,22,8,8,3,13,3,22,13,31,32,32,27,28,4,4,57,57,58,58,31,31,47,47,47,46,10,18,18,61,29
          ],
          "income": 1.16
        },
        "difficulty": "easy"
      },
      "turn": "AI",
      "landPref": ['water', 'grass'],
      "bounty": 85,
      "cardBounty": [60, 59, 58]
    },
    "Leviathan": {
      "title": "Leviathan",
      "previous": 'Bar Island', //write functionality later?
      "dialogue": {
        "introduction": `<p></p>
        <p></p>
        <h3>Scylla</h3>
        <say>Skraw skraa raa Skraaaw!</say>
        <p>Scylla points you out to the Leviathan
        <h3>{{user}}</h3>
        <say>Great, she has friends.</say>
        `,
        "winMessage": `<h3>{{user}}</h3>
          <say>"Go sleep with the fishes!"</say>
        `,
        'loseMessage': `
          <h3>Scylla</h3>
          <say>Skraaaaaw!</say>
        `
      },
      "AI": {
        "name": "Leviathan",
        "deck": {
          "base": 63,
          "deck": [
            61,59,59,59,60,59,60,59,60,8,22,8,13,3,3,31,32,32,27,28,4,4,57,57,58,58,31,31,47,47,47,46,61
          ],
          "income": 1.18
        },
        "difficulty": "easy"
      },
      "landPref": ['grass', 'forest'],
      "bounty": 85,
      "cardBounty": [60, 59, 61]
    },
  }
})
