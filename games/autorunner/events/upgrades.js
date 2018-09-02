{
  let closed = true;
  let modal;
events.upgrades = function() {
  if (closed) {
    closed = false;
    modal = D.make('div', {
      id: 'upgradeModal',
      innerHTML: `<style>
        #upgradeModal div {
          line-height:initial;
        }
      </style>`,
      style: 'position: fixed; top: 5%; z-index:9999; transition: 1s linear all; width:96vw; height: 90vh; background-color: rgba(250,250,250,.97);left:2vw;box-shadow:.2vh .2vh 2vh 1vh #222;border-radius:1vh;padding:2vh;box-sizing:border-box; overflow-y:auto;'
    })
    let gc = D.make('span', {
      innerHTML: Math.floor(data.hero.gc) + '<img style="width:1.5rem;height:1.5rem;" src="https://lycelia.com/iconLib/coins.svg"> &nbsp',
      style: 'text-shadow:0px 0px 2px white;font-size:1.5rem;margin-left:5%;'
    })
    let gcImage = `<img style="width:1.2rem;height:1.2rem;vertical-align: middle;" src="https://lycelia.com/iconLib/coins.svg">`
    let updateGC = function() {
      gc.innerHTML = Math.floor(data.hero.gc) + '<img style="width:1.5rem;height:1.5rem;" src="https://lycelia.com/iconLib/coins.svg"> &nbsp'
    }
    updateGC()
    let closeModal = D.make('button', {
      className: 'btn btnWarn',
      innerText: 'X',
      style: 'float: right;',
      onclick: function() {
        events.upgrades()
        data.isPaused = !data.isPaused
      }
    })
    let maxHp = D.make('div', {
    })
    maxHp.append(D.make('span', {
      id: 'maxHpStat',
      innerText: `Current maximum hp: ${data.hero.maxHp} -- `
    }), D.make('button', {
      className: 'btn',
      innerHTML: `Upgrade by .5 for ${Math.round(data.hero.maxHp**3.25)}${gcImage}`,
      onclick: function() {
        if (data.hero.gc >= data.hero.maxHp**3.25) {
          data.hero.gc -= Math.round(data.hero.maxHp**3.25)
          data.hero.maxHp += .5;
          data.hero.hp += .5;
          data.hero.heartsUpdate()
          D.find('#maxHpStat').innerHTML = `Current maximum hp: ${data.hero.maxHp} -- `
          this.innerHTML = `Upgrade by .5 for ${Math.round(data.hero.maxHp**3.25)}${gcImage}`
          updateGC()
        }
      }
    }))
    let speedUp = D.make('div', {
    })
    speedUp.append(D.make('span', {
      id: 'speedUp',
      innerText: `Current speed upwards: ${Math.round(data.hero.speed_up*100)}% -- `
    }), D.make('button', {
      className: 'btn',
      innerHTML: `Upgrade by 1% for ${Math.round((data.hero.speed_up*100 - 29)**2.22)}${gcImage}`,
      onclick: function() {
        let cost = Math.round((data.hero.speed_up*100 - 29)**2.22)
        if (data.hero.gc >= cost) {
          data.hero.gc -= cost
          data.hero.speed_up += .01;
          data.hero.heartsUpdate()
          D.find('#speedUp').innerHTML = `Current speed upwards: ${Math.round(data.hero.speed_up*100)}% -- `
          this.innerHTML = `Upgrade by 1% for ${Math.round((data.hero.speed_up*100 - 29)**2.22)}${gcImage}`
          updateGC()
        }
      }
    }))
    let speedRight = D.make('div', {
    })
    speedRight.append(D.make('span', {
      id: 'speedRight',
      innerText: `Current speed rightwards sprint: ${Math.round(data.hero.speed_right*100)}% -- `
    }), D.make('button', {
      className: 'btn',
      innerHTML: `Upgrade by 1% for ${Math.round((data.hero.speed_right*100 - 19)**2.2)}${gcImage}`,
      onclick: function() {
        let cost = Math.round((data.hero.speed_right*100 - 19)**2.2)
        if (data.hero.gc >= cost) {
          data.hero.gc -= cost
          data.hero.speed_right += .01;
          data.hero.heartsUpdate()
          D.find('#speedRight').innerText = `Current speed upwards: ${Math.round(data.hero.speed_right*100)}% -- `
          this.innerHTML = `Upgrade by 1% for ${Math.round((data.hero.speed_right*100 - 19)**2.2)}${gcImage}`
          updateGC()
        }
      }
    }))
    let doubleJump = D.make("div")
    if (data.hero.skills.doubleJump) {
      doubleJump.innerHTML = `<b>DoubleJump</b> -- already learned`
    } else {
      doubleJump.innerHTML = `<b>DoubleJump</b> -- `
      doubleJump.append(D.make('button', {
        className: 'btn',
        innerHTML: `Learn for 800${gcImage}`,
        onclick: function() {
          if (data.hero.gc >= 800) {
            data.hero.gc -= 800
            data.hero.skills.doubleJump = {
              max: 12,
              cd: false
            }
            updateGC()
            this.remove();
            doubleJump.innerHTML = `<b>DoubleJump</b> -- Learned. `
          }
        }
      }))
    }
    let dashRight = D.make("div")
    if (data.hero.skills.dashRight) {
      dashRight.innerHTML = `<b>Dash Right (hotkey i)</b> -- already learned`
    } else {
      dashRight.innerHTML = `<b>Dash Right</b> -- `
      dashRight.append(D.make('button', {
        className: 'btn',
        innerHTML: `Learn for 500${gcImage}`,
        onclick: function() {
          if (data.hero.gc >= 500) {
            data.hero.gc -= 500
            data.hero.skills.dashRight = true
            updateGC()
            this.remove();
            dashRight.innerHTML = `<b>Dash Right (hotkey i)</b> -- already learned`
          }
        }
      }))
    }
    modal.append(D.make('div', {
      innerHTML: `This game was built by <a href='https://lycelia.com/'>Lycelia</a> | <a href='https://ko-fi.com/E1E89L64' target='_blank'><img height='36' style='border:0px;height:36px; vertical-align:middle;' src='https://az743702.vo.msecnd.net/cdn/kofi2.png?v=0' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a> to support this game.<hr>`
    }),gc, closeModal,maxHp, speedUp, speedRight,dashRight,doubleJump)
    D.find('body').append(modal)
  } else {
    closed = true;
    modal.remove();
  }
}
}
