Object.assign(C.data.campaignList, {
  "Eastbrook Village": {
    id: 0,
    "info": {
      "title": "Your home village has a pest problem and doesn't have the money to pay someone qualified to take care of it. Luckily they have you, a local Adventurer-aspirant recently kicked out of their parent's house who's willing to work for cheap. All journeys start small however, and before you solve the town's problems you have one of your own to take care of...",
      "backgroundImage": "images/campaign/village1.jpg",
      "music": ["audio/campaign/TownLoopMusic.mp3", "audio/campaign/village.mp3",
      "audio/campaign/origTownLoop_small.mp3", "audio/campaign/ambientBirds1.mp3"]
    },
    "Intro": {
      "title": "A squirrel on your pillow",
      "music": {
        "introduction": {
          "src": "audio/campaign/squirrelChatter.mp3",
          "currentTime": 5
        }
      },
      "dialogue": {
        "introduction": `<p>For weeks a pesky squirrel has been stealing your breakfast and sleeping on your pillow. Its territorial nature has forced you to sleep on the floor, but no more! It's time to show this squirrel and all its chirpy little friends who the boss is.</p>
        <h3>{{user}}</h3>
        <say>"Give me back my pillow!"</say>
        `,
        "winMessage": `<h3>{{user}}</h3>
          <say>"My pillow is mine again, all mine..."</say>
          <h3>Innkeeper</h3>
          <say>"What happened to this room!?"</say>
        `,
        'loseMessage': `<h3>{{user}}</h3>
          <say>"I never wanted that pillow anyways..."</say>
        `
      },
      "AI": {
        "name": "Pillow Squirrel",
        "deck": {
          "base": 20,
          "deck": [
            7,7,7,50,50
          ],
          "income": 0.5
        },
        "difficulty": "easy"
      },
      "bounty": 5,
      "cardBounty": [7, 20, 50]
    },
    "Pests": {
      "title": "A noise in the attic",
      "dialogue": {
        "introduction": `
          <p>Eager to make the innkeeper happy after the mess you made of your room, you offer to take care of the noise in the attic.</p>
          <h3>{{user}}</h3> <say>"I ain't afraid of no ghosts!"</say>
          <p>The innkeeper shuts the door to the attic behind you just as you see several pairs of beady eyes staring at you from the shadows.</p>
        `,
        "winMessage":
          `<h3>{{user}}:</h3> <say>"Those noisy mice were no match for my awesome power."</say>
          <h3>Innkeeper:</h3> <say>"Enough messing around brat, go out and earn some money!"</say>
        `,
        'loseMessage':
          `<h3>Innkeeper</h3> <say>"Couldn't even handle a few mice? Stop wasting all your gold on candy and go buy some cards you can be proud of!"</say>`
      },
      "AI": {
        "name": "Nest",
        "deck": {
          "base": 20,
          "deck": [
            14, 14, 14, 7, 7, 14,50
          ],
          "income": 0.7
        },
        "difficulty": "easy"
      },
      "landPref": "grass",
      "bounty": 10,
      "cardBounty": [14, 7, 50]
    },
    "rats": {
      "title": "Rats in the Basement",
      "dialogue": {
        "introduction": `
          <p>After your success with the attic the innkeeper figured you could handle the basement as well</p>
          <h3>{{user}}</h3> <say>"Err, could I take a candle with me?"</say>
          <h3>Inkeeper</h3><say>"You'll see them just fine. Rat eyes glow in the dark."</say>
          <h3>{{user}}</h3><say>"You didn't tell me they were <b>rats!</b>"</say>
          <p>Once again you find that he's shut the door behind you during you moment of distraction but you're not worried at all. Rats are just like mice. Not bigger or meaner or more intelligent and bloodthirsty. Nope, not at all.</p>
        `,
        "winMessage":
          `
          <h3>Innkeeper:</h3> <say>"Good work. Maybe I should start hiring you regularly."</say>
          <h3>{{user}}</h3><say>"No thanks."</say>
          <p>You've got bigger dreams than becoming a rat-catcher. Also the bitey little things secretly freak you out. It was high time you got a job out in the light of day... and maybe bought a cat.</p>

        `,
        'loseMessage':
          `<h3>Innkeeper</h3> <say>"Couldn't even handle a few rats? I knew I should have hired the bobcat instead."</say>`
      },
      "AI": {
        "name": "Rat Infestation",
        "deck": {
          "base": 2,
          "deck": [
            0,
            1,
            14,
            0,
            0,
            14
          ],
          "income": 0.8
        },
        "difficulty": "easy"
      },
      "turn": "AI",
      "bounty": 15,
      "cardBounty": [14, 0]
    },
    "woodlandCreatures": {
      "title": "Squirrels are harassing travelers!",
      "music": {
        "introduction": {
          "src": "audio/campaign/squirrelChatter.mp3",
          "currentTime": 20
        }
      },
      "dialogue": {
        "introduction": `<p>It seems that when you kicked the squirrel out of your room it went and joined a gang of woodland creatures. It's evil nature must have spread, because all of them are just as noisy and annoying as the first.</p>
        <h3>{{user}}</h3>
        <say>"We meet again."</say>
        `,
        "winMessage": `<h3>{{user}}</h3>
          <say>"Who's the big-shot now, Mr. Squirrel?"</say>
        `,
        'loseMessage': `<h3>{{user}}</h3>
          <say>"At least I still have my pillow..."</say>
        `
      },
      "AI": {
        "name": "Woodland Creatures",
        "deck": {
          "base": 2,
          "deck": [
            4,
            5,
            5,
            7,
            7,
            4
          ]
        },
        "difficulty": "easy"
      },
      "landPref": "forest",
      "bounty": 20,
      "cardBounty": [4, 5, 7]
    },
    "corruptedWell": {
      "title": "Amphibious creatures are fouling the town well!",
      "dialogue": {
        "introduction": `
          <h3>Mayor</h3><say>"Yes, I think you're perfect for this job."</say>
          <p>You're not a fan of being lowered by rope into a dank, dark well, but this is the <i>mayor</i> asking. You've finally hit the big time so there's only one thing you can say.</p>
          <h3>{{user}}</h3>
          <say>"I'll do it!"</say>
        `,
        "winMessage": `<h3>{{user}}</h3>
          <say>"How you like me now?"</say>
          <h3>Bystander</h3>
          <say>"You stink like pond scum, go take a shower!"</say>
        `,
        'loseMessage': `<h3>{{user}}</h3>
          <say>"At least there weren't any rats."</say>
        `
      },
      "AI": {
        "name": "Corrupted Well",
        "deck": {
          "base": 2,
          "deck": [
            8,
            4,
            3,
            16,
            15,
            4,
            4,
            25,
            4,
            4,
            8, 43, 43
          ],
          "income": 1.04
        },
        "difficulty": "easy"
      },
      "landPref": "water",
      "bounty": 30,
      "cardBounty": [4, 8, 15]
    }
  }
})
