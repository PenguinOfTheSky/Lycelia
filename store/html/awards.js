{
  'use strict'
  let awardList = {
    'opinionated': {
      1: {
        title: "Liked 10 pages",
        src: "/iconLib/awards/opinionated1.svg",
        blurb: "Opinionated"
      },
      2: {
        title: "Liked 100 pages",
        src: "/iconLib/awards/opinionated2.jpg",
        blurb: "Kind-hearted"
      }
    },
    "authorBio": {
      1: {
        title: "Personalized author biography",
        src: "/iconLib/awards/authorBio1.svg",
        blurb: 'Extrovert'
      }
    },
    "follower": {
      1: {
        title: "Followed 10 pages",
        src: "/iconLib/awards/follower1.jpg",
        blurb: 'Watchful'
      },
      2: {
        title: "Followed 100 pages",
        src: "/iconLib/awards/follower2.jpg",
        blurb: 'Overseer'
      }
    },
    "creator": {
      1: {
        title: "Created 1 page",
        src: "/iconLib/awards/creator1.jpg",
        blurb: 'Author'
      },
      2: {
        title: "Created 5 pages",
        src: "/iconLib/awards/creator2.jpg",
        blurb: 'Avid Creator'
      }
    },
    "accountAge": {
      1: {
        title: "Account is over one day old",
        src: "/iconLib/awards/accountAge1.jpg",
        blurb: 'Acorn'
      },
      2: {
        title: "Account is over one week old",
        src: "/iconLib/awards/accountAge2.jpg",
        blurb: 'Duckling'
      }
    },
  }
  S.html.awards = function(type, level) {
    if (awardList[type] && awardList[type][level]) {
      let badge = D.make('div', {
        title: awardList[type][level].title,
        style: 'width:6.5rem; height:6rem; border-radius:25%; margin: .5vh;' //+"border: 2vh outset #777;"
      })
      /*if (level == 2) {
        badge.style.border = `2vh outset #c6d9d9`
      } else if (level == 3) {
        badge.style.border = `2vh outset #ffc64a`
      }*/
      badge.append(D.make('img', {
        alt: 'thumbs-up',
        src: awardList[type][level].src,
        style: `width:5.5rem;height:4.5rem;border-radius:25%;box-shadow: 0px 0px 1rem .5rem rgba(255,255,255,1) inset;     margin: .1rem;
    box-shadow: #111 0px 0px 0.2rem 0.1rem;`
      }), D.make('div', {
        innerText: awardList[type][level].blurb || ''
      }))
      return badge
    }
  }
}
