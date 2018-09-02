C.introHints = function(nextHint) {
  return [[`(click to dispel this hint)<br>The highlighted area shows your resources; Materia, Energy, and Souls.
Some resources are gained each turned or mined, others can be gained by killing enemy units.`,
    "document.querySelector('#resourceContainer')", nextHint],
    [`This shows how many cards you have in your library and how many have died
or been discarded into your graveyard. When you library is empty your graveyard will reshuffle
into your library (assuming all your cards aren't in your deck or on the field)`,
      "document.querySelector('#cardResources')", nextHint],
    [`This is your fort. If it dies, you lose. Your opponent's fort is on the right. If it
hits zero HP either through spells or attacks, you win!`,
      "document.querySelector('#_2_D')", nextHint],
    [`Cards like these allow you to battle your opponent. Some summon creatures,
others cast magical effects like <b>heal</b>. The card will expand when you hover over it and show information
such as attack power or the like. The buttons that come up above it allow you to do things like<b>cast</b> or <b>summon</b> or <b>build</b>. Such actions take resources, displayed in M E S format, so keep an eye on your resources in the bottom left and
manage them wisely. Learn about other mechanics in the <a target='_blank' href='tutorial.html'>tutorial</a>`,
      "document.querySelector('.niceCard')", nextHint],
    [`When you're done casting all the cards you choose to/can afford, click here to end your turn. That's all for now, have fun!`,
      "document.querySelector('#endTurn')", nextHint]]
}
