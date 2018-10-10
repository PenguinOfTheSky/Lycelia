S.events.view = function(fileName, opts, url) {
  if (url !== undefined) {
    url = '/' + url;
    history.pushState({}, "", url);
  }
  S.html[fileName](opts)
}
