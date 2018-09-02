{
  'use strict'
  SR.controls = function(input, output) {
    let speed = {
      wordCount: 1,
      interval: 250
    }
    SR.data.speed = speed
    SR.data.storyPosition = 0;
    let n = SR.data.storyPosition;
    let interval, text;
    let run = function() {
      text = SR.data.text
      let length = text.length
      interval = setInterval(function run() {
        n = SR.data.storyPosition;
        if (n < length) {
          let section = text.slice(n, n + speed.wordCount)
          let x = speed.wordCount;
          for (let i = 0; i < section.length; i++) {
            if (x <= 0) {
              section = section.slice(0, i)
              n = n - (section.length - i )
              break;
            }

            let splitLength = section[i].split(/[-—]/).length
            x -= splitLength;
            if (section[i] == ' <br> ') section[i] = ' ¶ '
          }

          output.innerHTML = section.join(' ')
          SR.data.storyPosition+=speed.wordCount
          D.find('#storyPosition').value = SR.data.storyPosition/length * 100
          D.find('#positionPercent').innerText = Math.trunc(SR.data.storyPosition/length * 100) + '%'
        } else {
          SR.data.storyPosition = 0;
          clearInterval(interval)
          buttons.refs.playPause.innerHTML = `<icon class="fa fa-play"></icon>`
          running = !running
          output.innerHTML = text.slice(n, n + speed.wordCount).join(' ')
          D.find('#storyPosition').value = SR.data.storyPosition/length * 100
          D.find('#positionPercent').innerText = Math.trunc(SR.data.storyPosition/length * 100) + '%'
          return 0;
        }
      }, speed.interval)
    }
    let stop = function() {
      clearInterval(interval)
    }
    let running = false;
    let buttons = SR.lib.jtml([
      'speedOptions', {
        style: 'display: inline-flex; flex-direction: column; font-weight:700;font-size:1.1rem;',
        children: [
          'label', {
            innerText: 'number of words per segment: ',
            children: [
              'input', {
                type: 'number',
                min: 1,
                max: 24,
                step: 1,
                value: speed.wordCount,
                oninput: function() {
                  let x = Math.round(this.value)
                  if (x < 1) x = 1
                  else if (x > 24) x = 24
                  this.value = x
                  speed.wordCount = Number(this.value)
                  buttons.refs.wpm.click()
                }
              }
            ]
          },
          'label', {
            innerText: 'speed: ',
            children: [
              'input', {
                type: 'range',
                style: 'direction: rtl; width: 70vw;',
                min: 34,
                max: 500,
                step: .5,
                value: speed.interval,
                oninput: function() {
                  speed.interval = Number(this.value)
                  buttons.refs.wpm.click()
                }
              }
            ]
          },
          'div', {
            ref: 'wpm',
            innerText: 'Estimated WPM(words/minute): ' + (speed.wordCount * 1000/speed.interval * 60),
            onclick: function() {
              this.innerText = 'Estimated WPM: ' + Math.round(speed.wordCount * 1000/speed.interval * 60)
            }
          }
        ]
      },
      'br', {},
      'button', {
        innerText: 'Click to Change Font',
        onclick: function() {
          buttons.refs.fontSettings.classList.toggle('hidden')
        }
      },
      'fontSettings', {
        style: 'display: inline-flex; flex-direction: column;',
        ref: 'fontSettings',
        className: 'hidden',
        children: [
          'label', {
            innerText: 'font size: ',
            children: [
              'input', {
                ref: 'fontSize',
                type: 'range',
                step: .05,
                value: 1.1,
                min: .8,
                max: 8,
                oninput: function() {
                  output.style['font-size'] = this.value + 'rem'
                }
              }
            ]
          },
          'br', {},
          'label', {
            innerText: 'max width: ',
            children: [
              'input', {
                ref: 'maxWidth',
                type: 'range',
                value: 60,
                min: 10,
                max: 100,
                step: 1,
                oninput: function() {
                  output.style['max-width'] = this.value + '%';
                }
              }
            ]
          },
          'br', {},
          'label', {
            innerText: 'font family: ',
            children: [
              'select', {
                ref: 'fontFamily',
                children: [
                  'option', {
                    innerText:'Times New Roman',
                    value: 'Times New Roman'
                  },
                  'option', {
                    innerText:'Courier New',
                    value: 'Courier New'
                  },
                  'option', {
                    innerText:'Arial',
                    value: 'Arial'
                  },
                  'option', {
                    innerText:'Cursive',
                    value: 'Niconne, cursive'
                  }
                ],
                onchange: function() {
                  output.style['font-family'] = this.value;
                }
              }
            ]
          },
          'br', {},
          'label', {
            innerText: 'Alignment: ',
            children: [
              'select', {
                children: [
                  'option', {
                    innerText:'Center',
                    value: 'center'
                  },
                  'option', {
                    innerText:'Left',
                    value: 'left'
                  },
                  'option', {
                    innerText:'Right',
                    value: 'right'
                  }
                ],
                onchange: function() {
                  output.style['text-align'] = this.value;
                }
              }
            ]
          }
          /*'input', {
            type: 'submit'
          } */
        ]
      },
      'br', {},
      'button', {
        innerHTML: '<icon class="fa fa-fast-backward"></icon>',
        onclick: function() {
          SR.data.storyPosition = 0;
          n = SR.data.storyPosition
          D.find('#storyPosition').value = SR.data.storyPosition/SR.data.text.length * 100
          output.innerHTML = text.slice(n, n + speed.wordCount).join(' ')
        }
      },
      'button', {
        ref: 'rewind',
        title: 'hotkey: a or left arrow',
        innerHTML: '<icon class="fa fa-backward"></icon>',
        onclick: function() {
          SR.data.storyPosition -= 5 * speed.wordCount
          if (SR.data.storyPosition < 0) SR.data.storyPosition = 0
          n = SR.data.storyPosition
          D.find('#storyPosition').value = SR.data.storyPosition/SR.data.text.length * 100
          output.innerHTML = text.slice(n, n + speed.wordCount).join(' ')
        }
      },
      'button', {
        ref: 'playPause',
        title: 'hotkey: spacebar',
        innerHTML: '<icon class="fa fa-play"></icon>',
        onclick: function() {
          if (!running) {
            this.innerHTML = '<icon class="fa fa-pause"></icon>'
            run()
          }
          else {
            this.innerHTML = '<icon class="fa fa-play"></icon>'
            stop()
          }
          running = !running
        }
      }
    ])
    document.body.onkeypress = function(event) {
      if(event.key == ' '){
        event.preventDefault();
        buttons.refs.playPause.click()
        return false;
      } else if (event.key == 'a') {
        buttons.refs.rewind.click()
      } else {
          return true;
      }
    }
    document.body.onkeydown = function(event) {
      if (event.key == 'ArrowLeft') {
        buttons.refs.rewind.click()
      } else {
          return true;
      }
    }
    return buttons
  }

}
