C.events.message = function(str) {
  'use strict'
  let msg = U.make("h3", {
    innerHTML: str,
    style: 'pointer-events: none;text-align:center;font-weight:600; transition: 3.7s ease-in-out; position: fixed; top: 38%; z-index: 10000; text-shadow: .1rem .1rem .1rem #000; width:100%;color:white;'
  })
  D.find('#view').appendChild(msg)
  U.reflow();
  msg.style.opacity='0'
  setTimeout(function() {
    msg.remove()
  }, 2800)
}
