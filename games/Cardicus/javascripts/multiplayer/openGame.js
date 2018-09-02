C.multiplayer.openGame = function() {
  C.socket.on("multiplayer", function (data){
      console.log(data)
  });
  //implement coin flip anim?

  $('#main_game').html($('#campaignStart').html())
  D.find('#UIarea').innerHTML = C.templates.UI()
  D.find('#nav').classList.add('hidden')
  scrollTo(0,0);
  XstartCampaign(1)

}
