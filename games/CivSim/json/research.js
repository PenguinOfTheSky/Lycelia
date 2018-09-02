Object.assign(json, {
  research: function() {

    let obj = {

      "Stick Shelters": {
        level: {
          0: {
            tip: "A leaf bed is nice, but a roof would be even better.",
            info: ``,
            cost: {
              time: .1,
              logs: 10
            }
          },
          1: {
            name: 'Lean-to Shelter',
            tip: "You've learned how to build a lean-to shelter! Unfortunately it takes a lot of wood and only fits two people.",
            info: ``,
            onclick: function() {
            },
            cost: {
              time: .3,
              logs: 50
            }
          },
          2: {
            req: ["Sharpness", 1],
            name: 'Tipi & Wigwam',
            tip: "For travel or for long-term stay they're revolutionary, but now it may be time to try for something larger.",
            info: ``,
            onclick: function() {
            },
            cost: {
              time: 1,
              logs: 200
            }
          },
          3: {
            name: 'Yurt & Longhouse',
            req: ["Fire", 3],
          }
        },

      },
      "Fire": {
        level: {
          0: {
            tip: `Your people desire warmth, and from the fires of lightning strikes you may have found a solution.<br><i>The flames are almost as pretty as shinies.</i>`,
            info: ``,
            cost: {
              shinies: 20,
              time: .2
            }
          },
          1: {
            name: 'Hand Drill',
            tip: `Your people have learned how to create fire by rubbing sticks together!<hr>Creating tribal bonfires is costly and time-consuming but the use of tools may make the process more efficient. `,
            info: ``,
            cost: {
              shinies: 100,
              time: .2
            }
          },
          2: {
            name: 'Bow Drill'
          }
        },

      },
      "Sharpness": {
        level: {
          0: {
            req: ["Fire", 2],
            tip: `<i>Throwing stones has worked for generations, but sharp rocks seem to have uses too.</i>`,
            info: ``,
            cost: {
              time: .3,
              logs: 10,
              shinies: 20,
              gold:10
            }
          },
          1: {
            name: "Sharpened Rocks"
          }
        }
      },
    }
    let opts = {
      "init": function() {
        let frag = D.createDocumentFragment()
        let div = D.make('div', {
          className: "menuDisplay_item",
          innerHTML: `Your scientists are currently working at ${Math.round(pc.scienceSpeed*100)}% speed. <b>Bribe</b> them if you need them to work faster or <b>train</b> with them.`
        })
        frag.appendChild(div)
        let keys = Object.keys(obj)
        let createItem = function(ele) {
          let cost =``
          let level = pc.research[ele] || 0
          if (!obj[ele].level || !obj[ele].level[level]) return;
          let disabled;
          if (obj[ele].level[level].req) {
            if  (!pc.research[obj[ele].level[level].req[0]] || pc.research[obj[ele].level[level].req[0]] < obj[ele].level[level].req[1] ) {
              if (!pc.research[ele]) return;
              else {
                disabled = true
              }
            }
          }
          if (obj[ele].level[level].cost) {
            for (let x in obj[ele].level[level].cost) {
              cost += " " + obj[ele].level[level].cost[x]
              cost += render.iconString(x)
            }
            if (disabled) cost += `<br> requires ${obj[ele].level[level].req[0]} level ${obj[ele].level[level].req[1]}`
            let buttons = D.createDocumentFragment()
            let buyButtonStr
            if (!obj[ele].level[level+1] || !obj[ele].level[level+1].name) buyButtonStr = `Research level ${level + 1}<br>`+cost
            else buyButtonStr =`Research ${obj[ele].level[level+1].name}<br>` + cost
            buttons.append(
              D.make('button', {
              innerHTML: buyButtonStr,
              className: 'buy',
              disabled: disabled,
              onclick: function() {

                pc.research[ele] = level + 1;
                let newDiv = createItem(ele)
                if (newDiv) div.parentNode.replaceChild(newDiv, div)
                else {
                  this.remove()
                  div.innerHTML += "<div>Fully Researched</div>"
                }
                opts.init()
              }
              })
            )
            let owned = D.make('div', {
              innerText: ``
            })
            let div = D.make('div', {
              className: 'menuDisplay_item',
              innerHTML: `<b style='display:block;text-align:center;'>${ele}:: level ${level}</b> ${obj[ele].level[level].tip}<br>`
            })
            div.append(buttons, owned)
            return div
          } else {
            let div = D.make('div', {
              className: 'menuDisplay_item',
              innerHTML: `<b style='display:block;text-align:center;'>${ele}:: level ${level}</b><br> Fully researched.<br>`
            })
            return div
          }
        }
        keys.forEach(ele => {

          let div = createItem(ele)
          frag.append(div || '')
        })
        D.find('#menuDisplay').innerHTML = ""
        D.find('#menuDisplay').append(frag)
      },
    }
    return opts
  }
})
