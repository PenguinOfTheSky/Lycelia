
Object.assign( window.U,
{
  "mount" : function (parentBox, templateName) {
    return `<x-box id = '${templateName}_Container' template='${templateName}' parentBox='${parentBox}'></x-box>`
  },
  "reflow": function() {
    let i = document.body.offsetWidth
  },
  "post" : function callAjax(url, data, callback, err, opts){
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

    var xmlhttp;
    // compatible with IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", url /*+ '?referrer=https://card-defense.com/Cardicus/'*/, true);
    if (json) {
      xmlhttp.setRequestHeader("Content-type", "application/json");
    }
    if (opts) Object.assign(xmlhttp, opts)
    xmlhttp.send(data);
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
              callback(xmlhttp.response);
          } else {
            console.log(xmlhttp.status)
            if (err) err(xmlhttp.status)
          }
        }
    }
  },
  "fetchHTML" : function (arr) {

  },
  "get" : function callAjax(url, callback){
    var xmlhttp;
    // compatible with IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, true);
    xmlhttp.send(null);
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
              callback(xmlhttp.responseText);
          } else {
            console.log(xmlhttp.status)
          }
        }
    }
  },
  "clone" : function (json) {
    return JSON.parse(JSON.stringify(json))
  },
  "createNode" : function (type, obj) {
    if (!type) {
      console.log('missing type!')
    } else {
      let output = document.createElement(type);
      Object.keys(obj).forEach(function(ele) {
        if (ele == 'innerHTML')
          output.innerHTML = obj[ele];
        else
          output.setAttribute(ele, obj[ele]);
      })
      return output;
    }
  },
  "make": function(type, obj) {
    return Object.assign(document.createElement(type), obj || {})
  },
  "getXY" : function (el) {
    el = el.getBoundingClientRect();
    return [el.left + window.scrollX + el.width/3, el.top + window.scrollY + el.height/3]
  },
  "shuffle" : function (array) {
    var i = 0
      , j = 0
      , temp = null

    for (i = array.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1))
      temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
  },
  createComponent : function({reference, css, parent,id, html, js, devMode}) {
    if (devMode) {
      console.log(arguments[0])
    }
    let box = TS.lib.createNode('div', {
      "name" : reference,
      "class": 'component'
    })
    let root = box.attachShadow({mode: 'open'})
    let style = TS.lib.createNode('style', {
      innerHTML : css})
    let main = TS.lib.createNode('div', {
      id: id,
      innerHTML : html})
    root.appendChild(style)
    root.appendChild(main)
    let opts = {}
    js({box, style, parent, opts})
    return {box: box, opts: opts}
  }
}
)
/*
let editor1 = atom.workspace.getActiveTextEditor()
editor1.getCursorBufferPosition()
Point {row: 20, column: 22}
*/
