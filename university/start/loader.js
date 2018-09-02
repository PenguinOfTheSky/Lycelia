let scripts = [
      "home/splash.js",
      'home/json/Natural Sciences.js',
      'home/json/Computer Science.js',
      'home/json/Math.js',
      'home/renderClassList.js',
      'home/search.js',
      'home/info.js',
      'home/account.js',
      "topNav/init.js",
      'start/run.js',
      'render/base.js',
      'render/header.js',
      'render/moduleMap.js',
      'render/class.js', 'render/lesson.js', 'render/lessonQuestions.js',
      'render/link.js',
      'render/path.js',
      'render/subject.js',
      'render/field.js',
      'render/dlList.js',
      'render/browse.js',
      'render/cards.js',
      'modules/A1+.js',
      'modules/A50+.js',
      'modules/A100+.js',
      'modules/A110+.js'
    ]
    initScriptsLoaded = 0;
    let scriptsHolder = document.createDocumentFragment()
    scripts.forEach(ele => {
      let script = Object.assign(document.createElement('script'), {
        src : ele,
        onload: function() {
          if (++initScriptsLoaded == scripts.length) {
            Uni.run()
          }
        }
      })
      scriptsHolder.append(script)
    })
    document.head.append(scriptsHolder)
