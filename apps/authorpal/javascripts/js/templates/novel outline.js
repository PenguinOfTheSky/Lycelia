TS.js.templates["novel outline"] = {
  "rich text": function() {
    let obj = {
      object_root: {
        type: 'rich text',
        editor: 'rich text'
      },
      "main": ``
    }
    return obj
  },
  "plain text": function () {
    return TS.js.templates.html5['plain text']();
  },
  "markdown": function() {
    let obj = {
      object_root: {
        type: 'markdown',
        editor: 'markdown'
      },
      "main": ``
    }
    return obj
  },
  container: function () {
    return {
      object_root: {
        type: 'collection'
      }
    };
  },
  character: function () {
    let obj = {
      object_root: {
        type: 'rich text',
        editor: 'rich text'
      },
      "main": `<br><ul><li></li><li></li></ul> `
    }
    return obj;
  },
  chapter: function () {
    let obj = {
      object_root: {
        type: 'collection'
      },
      "blurb/summary": {
        object_root: {
          type: 'rich text',
          editor: 'rich text'
        },
        "main": ``
      },
      "locations": {
        object_root: {
          type: 'rich text',
          editor: 'rich text'
        },
        "main": ``
      },
      "characters": {
        object_root: {
          type: 'rich text',
          editor: 'rich text'
        },
        "main": ``
      },
      "timeline": {
        object_root: {
          type: 'rich text',
          editor: 'rich text'
        },
        "main": ``
      }
    };
    return obj;
  }
}
