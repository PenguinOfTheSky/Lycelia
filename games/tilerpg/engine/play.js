engine.play = function(action) {
  let played = false
  let skillbar = {
    "1": true,
    "2": true,
    "3": true,
    "4": true,
    "5": true,
    "6": true,
  }
  if (skillbar[action]) {
    if (D.find('#skill' + action).firstChild) {
      D.find('#skill' + action).firstChild.click()
    }
  } else if (action == 'down') {
    if (state.tiles[data.hero.x] && state.tiles[data.hero.x][data.hero.y+1] && !state.tiles[data.hero.x][data.hero.y+1].closed) {
      data.hero.move(0,1)
      played = 5
    }
  } else if (action == 'up') {
    if (state.tiles[data.hero.x] && state.tiles[data.hero.x][data.hero.y-1] && !state.tiles[data.hero.x][data.hero.y-1].closed) {
      data.hero.move(0,-1)
      played = 5
    }
  } else if (action =='left') {
    if (state.tiles[data.hero.x-1] && state.tiles[data.hero.x-1][data.hero.y] && !state.tiles[data.hero.x-1][data.hero.y].closed) {
      data.hero.move(-1,0)
      played = 5
    }
  } else if (action =='right') {
    if (engine.checkTile(data.hero.x+1, data.hero.y)) {
      data.hero.move(1,0)
      played = 5
    }
  }
  if (played) {
    engine.moveMobs({ap:5});
  }
}
