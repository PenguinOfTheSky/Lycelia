SR.start = function() {
  let formatText = function(str) {
    var keep = {
      p: true,
      b: true,
      i: true,
      u: true,
      br: true,
      em: true,
      strong: true,
      h1: true,
      h2: true,
      h3: true,
      h4: true,
      li: true
    };
    str = str.replace(/<\/?([a-z0-9=;:()]+) ?[^>]*>/g, function(wholeMatch, tagName)
    {
      if (keep[tagName]) {
        if (tagName == 'br' || tagName =='li') return ' ';
        else if (tagName == 'h1' || tagName == 'h2' || tagName == 'h3' || tagName =='h4' ) {
          if (wholeMatch[1] == '/') return "</b></p> ";
          else return  " <p><b>";
        }
        if (wholeMatch[1] == '/') return "</" + tagName + ">";
        else return  "<" + tagName + ">";
      }
      return '';
    });
    str = str.split('')

    let sections = []
    let inHTML = false
    let begin = 0;
    let bold = false
    let italic = false
    let endTag = false;
    let toggleBold = false;
    let toggleItalic = false;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === '<') {
        if (str[i+1] == '/') {
          if (str[i+2] == 'p' || str[i+3] == 'r') {
            endTag = true;
          } else if (str[i+2] == "b" || str[i+2] == "s") {
            toggleBold = true;
          } else if (str[i+2] == "i" || str[i+2] == "e") {
            toggleItalic = true;
          }
        } else {
          if (toggleBold) {
            toggleBold = false;
            bold = false;
          }
          if (toggleItalic) {
            toggleItalic = false;
            italic = false;
          }
          if (str[i+1] == "b" || str[i+1] == "s") {
            bold = true
          } else if (str[i+1] == "i" || str[i+1] == "e") {
            italic = true
          } else endTag = false
          inHTML = true
        }
      } else if (str[i] === '>') {
        inHTML = false
        if (endTag) str.splice(i+1, 0, ' ')
      }
      if (inHTML == false) {
        if (str[i] === '\n' && (str[i+1] === '\n' || str[i+1] ==='\r') ) {
          str[i] = ' <br> '
          let segment = str.slice(begin, i).join("")
          if (bold) {
            segment = '<b>' + segment + '</b>'
          }
          if (italic) {
            segment = '<i>' + segment +  '</i>'
          }
          sections.push(segment, ' <br> ')
          begin = i + 1
        } else if (str[i] === ' '|| str[i] === '\n') {
          let segment = str.slice(begin, i).join("")
          if (bold) {
            segment = '<b>' + segment + '</b>'
          }
          if (italic) {
            segment = '<i>' + '</i>'
          }
          sections.push(segment)
          begin = i + 1
        }
      }
      if (i === str.length-1) {
        sections.push(str.slice(begin, i+1).join(""))
      }
    }
    sections = sections.filter(ele => ele !== '')
    str = sections.join(' ')
    D.find('#pasteDiv').innerHTML = str;
    SR.data.text = sections;
    let n = 0;
    let test = RegExp('^[ ( <br> )]*$')
    while ((test.test(SR.data.text[n])) && n < SR.data.text.length) {n++}

    main.refs.output.innerHTML = SR.data.text.slice(n, n + SR.data.speed.wordCount).join(' ')
  }
  let main = SR.lib.jtml([

    'h1', {
      innerText: "Lycelia Speed Reading App"
    },
    /*'p', {
      innerHTML: `Found a bug or desire an improvement/feature? Leave us a message <a href='https://github.com/PenguinOfTheSky/Speed-Reading-Software-Online/issues' target='_blank'>here</a>`
    },*/
    'div', {
      children: [
        'div', {
          ref: 'navButtons',
          children: [
            /*  'button', {innerText: 'Paste Text'},*/
            'select', {
              style: 'font-size:1rem;',
              innerHTML: `
                <option disabled selected>Sample Texts</option>
                <option value='Pride and Prejudice.txt'>Pride and Prejudice</option>
                <option value='The Time Machine.txt'>The Time Machine</option>
                <option value='Dracula.txt'>Dracula</option>
                <option value='Frankenstein.txt'>Frankenstein</option>
                <option value='The Wonderful Wizard of Oz.txt'>Wizard of Oz.txt</option>
                <option value='huck finn.txt'>Huckleberry Finn</option>
                <option value='treasure island.txt'>Treasure Island</option>
                <option value='dorian gray.txt'>Dorian Gray</option>
                <option value='great expectations.txt'>Great Expectations</option>
                <option value=''></option>
              `,
              onchange: function() {
                fetch(`/speedreader/samples/${this.value}`)
                .then(response => response.text())
                .then((data) => {
                  D.find('#pasteDiv').innerHTML = data
                  D.find('#pasteDiv').oninput()
                })
                D.find('#storyPosition').value = 0;
                main.refs.storyPosition.oninput()
              }
            },
            'button', {
              children: [
                'label', {innerText: 'Upload File from PC (.txt/.html): '},
                "input", {
                  type: 'file',
                  onchange: function(e) {
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        formatText(reader.result);
                    }
                    reader.readAsText(this.files[0]);
                  }
                }
              ]
            }
          ]
        },
        'div', {
          ref: 'pasteDiv',
          children: [
            'div', {
              className: 'well',
              id: 'pasteDiv',
              contentEditable: true,
              ref: 'pastedText',
              style: ' min-height: 4rem; max-height: 7rem;overflow-y: auto;max-width:97%;margin:0 auto;',
              innerHTML: `Copy-Paste your text here or run this short demo by clicking "Play" below (The words will start flashing at bottom of page, make sure to scroll down if necessary).  You can find tons of books to test and improve your reading speed and comprehension at https://www.gutenberg.org \n or use one of the available sample texts by clicking up above this box.`,
              onkeypress: function(event) {
                event.stopPropagation();
              },
              oninput: function() {
                formatText(this.innerHTML)

              }
            },
          ]
        },
        'div', {
          ref: 'controls'
        },
        'span', {
          id: 'positionPercent',
          style: 'visibility:hidden;',
          innerHTML: `0%`
        },
        'input', {
          id: 'storyPosition',
          ref: 'storyPosition',
          type: 'range',
          value: 0,
          title: 'Story Position',
          min: 0,
          max: 100,
          step: .1,
          style: 'width:70%',
          onmouseenter: function() {
            D.find('#positionPercent').style.visibility = 'visible'
          },
          onmouseleave: function() {
            D.find('#positionPercent').style.visibility = 'hidden'
          },
          oninput: function() {
            SR.data.storyPosition = Math.floor(this.value/100 * SR.data.text.length)
            let n = SR.data.storyPosition
            main.refs.output.innerHTML = SR.data.text.slice(n, n + SR.data.speed.wordCount).join(' ')
            D.find('#positionPercent').innerText = Math.trunc(SR.data.storyPosition/SR.data.text.length * 100) + '%'
          }
        },
        'div', {
          id: 'output',
          ref: 'output',
          style: 'margin-top: 1%; padding: .1rem; max-width:60%; margin: 0 auto; margin-top: .3rem; font-size:1.1rem; border-radius: 1rem; min-height:12rem;',
          innerText: "Text will flash here when you hit play"
        }
      ]
    }
  ])
  SR.data.text = main.refs.pasteDiv.innerText.split(' ');
  main.refs.controls.append(SR.controls(main.refs.pastedText, main.refs.output).html)
  document.body.append(main.html)
}
