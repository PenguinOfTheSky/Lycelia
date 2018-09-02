'use strict'
Object.assign(L.lib.jsdom, {
  //lib for converting js to html.
  createNode: function (type, obj) {
    let node = Object.assign(document.createElement(type), obj);
    return node;
  },
  jtml: function(arr) {
    /*
        give in form [
          'h1', {innerText: 'hello world'},
          'h2', {innerText: 'Onwards', ref: 'firstChapter',
          'p', {children: [
            'span', {innerText: 'hello'}
            ]}
        ]
        optional: ref, children, must give at least a blank {}
    */
    let elements = {
        html: document.createDocumentFragment(),
        refs: {}
    };
    for (let i = 0; i < arr.length; i+=2) {
      let children = null;
      if (arr[i+1].children) {
          children = arr[i+1].children
          delete arr[i+1].children
      }
      let ele = Object.assign(document.createElement(arr[i]), arr[i+1])
      elements.html.append(ele)
      if (arr[i+1].ref) {
          elements.refs[arr[i+1].ref] = ele
      } 
        if (children) {
          children = L.lib.jsdom.jtml(children)
          ele.append(children.html)
          Object.assign(elements.refs, children.refs)
      } 
    }
    return elements;
  }
})
