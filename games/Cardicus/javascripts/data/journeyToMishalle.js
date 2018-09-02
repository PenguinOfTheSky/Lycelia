Object.assign(C.data.campaignList, {
  "Journey to Mishalle": {
    id: 1,
    "info": {
      "title": "It's time to head out into the world, but can you handle what you find?",
      "required": 4,
      "backgroundImage": "images/campaign/journey.jpg",
      "music": "audio/campaign/peepers.mp3"
    },
    "The Marsh": {
      "title": "Watch your step, the marsh is full of hidden perils.",
      "dialogue": {
        "introduction": `
        <h3>Frog Prince</h3>
        <say><b>"Crooooak."</b></say>
        <p>You stop at the sound and are surprised to see a dog-sized frog staring back at you. Curiously it appears to be wearing a circlet of vines, almost like a primitive crown.</p>
        <h3>{{user}}</h3>
        <say>"Well ain't that cute. Froggy thinks its a prince."</say>
        <h3>Frog Prince</h3>
        <say><b>"CroooOOAAAKK!"</b></say>
        `,
        "winMessage": `<h3>{{user}}</h3>
          <say>"Not getting no kiss from me, froggy, no sir."</say>
        `,
        'loseMessage': `<h3>{{user}}</h3>
          <say>"Please forgive me your highness!"</say>
        `
      },
      "AI": {
        "name": "Frog Prince",
        "deck": {
          "base": 2,
          "deck": [
            25,
            25,
            8,
            4,
            3,
            16,
            15,
            4,
            4,
            16,
            4,
            4,
            8,17,17
          ],
          "income": 1.08
        },
        "difficulty": "easy"
      },
      "landPref": 'water', //water
      "bounty": 50,
      "cardBounty": [15,25,16]
    },
    "The Bog Hamlet": {
      "title": "Flooded Hamlet",
      "dialogue": {
        "introduction": `
        <p>You come along a long-abandoned hamlet shortly before dark and wonder if it might be a good place to make camp. The thatch roofs are all rotted away but a few walls are still up to block the wind. There's an eeriness about it that has you wary though. The buildings have sunken half into the soft earth as if the bog were a living thing trying to swallow it whole. Even the gravestones of the cemetary were sinking into the muck.</p>
        <h3>{{user}}</h3>
        <say>Creepy...</say>
        <p>You turn back, intent on making camp as far from the cemetary as possible, but before you even take a step you feel a cold, bony hand grasp your ankle</p>
        <h3>{{user}}</h3>
        <say>"EEEEEEK!"</say>
        `,
        "winMessage": `<h3>{{user}}</h3>
          <say>"Rest in pieces."</say>
        `,
        'loseMessage': `<h3>{{user}}</h3>
          <say>"Yep, time to run."</say>
        `
      },
      "AI": {
        "name": "Swamp Cemetary",
        "deck": {
          "base": 2,
          "deck": [
            15,1,1,21,27,27,28,28,0,15, 55, 55,46,46,47
          ],
          "income": 1.10,
          "baseSouls": 5
        },
        "difficulty": "easy"
      },
      "landPref": 'water', //water
      "bounty": 60,
      "cardBounty": [15,27,28]
    },
    "Sunken God": {
      "title": "Something in the Water",
      "dialogue": {
        "introduction": `
        <p>The journey through the bog is taking far longer than you'd expected. The muck grasps up to your knees and only the dim light of the sun through the fog tells you that you haven't been walking in circles.</p>
        <h3>{{user}}</h3>
        <say>Just a little further. This bog can't go on forever.</say>
        <p>There is a strange stillness to the air, even the everpresent mosquitos mysteriously absent. The hairs on the back of your neck rise as if someone is watching you, but there's no one there.</p>
        <h3>{{user}}</h3>
        <say>"I think those wild mushrooms I found are making me paranoid..."</say>
        <h3><b>Shbooom!</b></h3>
        <p>Water and mud blow into the sky as the snout of some enormous beast bursts forth. It seems stuck for now but slowly rising. Wanting nothing to do with a monster large enough to eat a house in one bite you decide to run. Unfortunately the stillness of before is gone and the animals seem to be going mad. You'll have to deal with them quickly to escape the beast at your back.
        `,
        "winMessage": `<h3>{{user}}</h3>
          <say>"Whew, close one."</say>
        `,
        'loseMessage': `<h3>{{user}}</h3>
          <say>"Hiding inside a log -- always the best option."</say>
        `
      },
      "AI": {
        "name": "Scylla",
        "deck": {
          "base": 30,
          "deck": [
            1,1,4,4,25,25,0,0,8,3,8,3,8,3,31,5,5,14, 32, 55,46,47,17
          ],
          "income": 1.15
        },
        "difficulty": "easy"
      },
      "landPref": 'water', //water
      "bounty": 70,
      "cardBounty": [32,25,30]
    }
  }
})
