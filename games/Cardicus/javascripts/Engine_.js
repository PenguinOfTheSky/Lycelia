window.imports.Engine  = function(user1, user2, board) {
  let turn = 0
  C.activeGame.playerTurn = C.players.left
  board.gameStart();
  this.next = function(add) {
    if (add) turn++
    chooseTurn();
  }
  function chooseTurn () {
    turn++
    C.activeGame.turnCount = turn;
    if (turn % 2 === 1) {
      C.activeGame.playerTurn = C.players.left
      user1.turnStart();
      if (D.find('#uiContainer')) D.find('#uiContainer').style.background = "linear-gradient(90deg, rgba(0,255,0,.7), transparent)"
    } else {
      C.activeGame.playerTurn = C.players.right
      user2.turnStart();
      if (D.find('#uiContainer')) D.find('#uiContainer').style.background = "linear-gradient(90deg, transparent, rgba(255,0,0,.7))"
    }
  }
  this.endTurn = function() {
    $('#testStep').off()
    if (turn % 2 === 1) {

      board.iterate(user1.player.name, user2.player.name);
    } else {
      board.iterate(user2.player.name, user1.player.name);

    }

  }
}
