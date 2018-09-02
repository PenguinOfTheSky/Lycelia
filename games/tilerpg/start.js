//temp
let id = 'A1'
let tileSize = 11

D.find(':root').style.setProperty('--tileSize', tileSize+'vh')
engine.loadMap(id)
engine.checkTile = function(x, y) {
  if (state.tiles[x] && state.tiles[x][y] && !state.tiles[x][y].closed) return true;
}
