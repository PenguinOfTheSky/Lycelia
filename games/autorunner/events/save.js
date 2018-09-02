{
  events.loadStart = function() {
    localforage.getItem('autorunner', function(err, obj) {
      if (err){
         console.log(err);
         return;
       } else {
         Object.assign(data.hero, obj)
       }
    })
  }
  events.save = function() {
    let hero = {}
    for (let x in data.hero) {
      if (x != "hearts" && x != "ref" && x != 'heartsUpdate' && x!= 'pos' && x != 'dir' && x != 'width' && x != 'height') {
        hero[x] = data.hero[x]
      }
    }
    localforage.setItem('autorunner', hero)
    hero = undefined;
  }
}
