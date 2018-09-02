S.events.view = function(fileName, opts, url) {
  if (url !== undefined) history.pushState({}, "", url);
  S.html[fileName](opts)
}
