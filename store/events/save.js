{
  'use strict'
  S.events.save = function(target, sync) {
    //todo: add target functionality;
    localStorage.LyceliaStore = JSON.stringify(S.DB)
  }
}
