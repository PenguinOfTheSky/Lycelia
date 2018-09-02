let n = 1;
S.events.msg = function(obj, callback) {
  S.events.listen[n] = callback
  obj.id = n++
  obj.key = key;
  window.parent.postMessage(JSON.stringify(obj), '*');
}
