engine.createMob = function(ele) {

        Object.assign(ele, mobs[ele.name].create(ele.lvl))
        ele.ref = engine.renderUnit(ele)
        if (mobs[ele.name].style) {
          Object.assign(ele.ref.style, mobs[ele.name].style)
        }
        ele.ref.title = ele.title || ''
        ele.hp = engine.makeHp(ele)
        ele.maxHp = ele.hp
        ele.mp = engine.makeMp(ele)
        ele.maxMp = ele.mp
        if (!ele.ap) ele.ap = 0;
        if (ele.item) ele.ref.classList.add('item')
        if (ele.closed !== false) state.tiles[ele.x][ele.y].closed = true
        state.map.append(ele.ref)
        if (ele.newMob) {
          state.mobs.push(ele)
        }

}
