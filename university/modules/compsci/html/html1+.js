Object.assign(Uni.modules, {
  "cs_html_1": {
    title: 'Introduction to HTML',
    difficulty: '100',
    type: 'class',
    credits: .5,
    category: ['Programming'],
    text: "Get started with HTML, the markup language that helps form webpages.",
    modules: ["cs_html_2", "cs_html_3"]
  },
  "cs_html_2": {
    type: "lesson",
    title: "What is HTML?",
    category: ['Programming', 'Computer Science'],
    text: `<b>HTML</b> (Hypertext Markup Language) is a <a href='https://en.wikipedia.org/wiki/Markup_language'>markup language</a>. It's a way of telling web browsers what to display and where. There have been several versions of HTML, but the most recent one is HTML5, and that is version taught in this course.`,
    license: "",
    questions: [
      {
        type: 'TF',
        text: "HTML is interpreted by web browsers to help create web pages.",
        answer: 'T'
      },
      {
        type: 'multiple',
        text: "Current version of HTML in most widespread use is?",
        options: ['XHTML', 'HTML5', 'HTML4'],
        answer: 1
      }
    ]
  },
  "cs_html_3": {
    type: "lesson",
    title: "HTML tags",
    category: ['Programming', 'Computer Science'],
    text: `Html <b>tags</b> are used to create <b>elements</b>. Elements can be anything from boxes to embedded video to something simple like italic text. We'll be starting with the <b>bold</b> element, which is made using start and end bold tags around text. like so: <code>${D.escapeHTML("<b>Cats</b> are the greatest")}</code> becomes <b>Cats</b> are the greatest.`,
    license: "",
    studyHtml: {
      placeholder: 'Try making typing a phrase and then making one of the words bold using tags',
      answer: `${D.escapeHTML("Please <b>don't</b> touch the paintings")}`,
      hint: `remember, whatever happens between the starting b tag and the end b tag becomes bold.`
    },
    questions: [
      {
        type: 'TF',
        text: `${D.escapeHTML('</b> is an end tag because it contains a /')}`,
        answer: 'T'
      },
    ]
  },

})
