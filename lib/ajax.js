Object.assign(S.lib.ajax, {
  post: function (url, data, callback, err, opts) {
    let json;
    if (typeof(data) == 'object') {
      try {
        if (!(data instanceof FormData)) {
          data = JSON.stringify(data)
          json = true;
        }
      } catch(err) {
        console.log(err)
      }
    }
    
    var req;
    // compatible with IE7+, Firefox, Chrome, Opera, Safari
    req = new XMLHttpRequest();
    req.open("POST", url, true);
    if (json) { 
      req.setRequestHeader("Content-type", "application/json");
    }
    if (opts) Object.assign(req, opts)
    req.send(data);
    req.onreadystatechange = function(){
        if (req.readyState == 4) {
          if (req.status == 200) {
            if (callback) callback(req.response);
          } else {
            console.log(req.status)
            if (err) err(req.status)
          }
        }
    }
  }
})
window.post = S.lib.ajax.post
