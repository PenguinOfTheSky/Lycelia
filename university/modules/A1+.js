Object.assign(Uni.modules, {
  "A1": {
    id: "A1",
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
  "A2": {
    id: 'A2',
    title: 'Introduction to HTML',
    difficulty: '100',
    type: 'class',
    credits: .5,
    category: ['Programming'],
    text: "Get started with HTML, the markup language that helps form webpages.",
    modules: ["A1"]
  },
  'A3': {
    id: 'A3',
    title: "Novice HTML5 Programmer",
    difficulty: '100',
    prereqs: [''],
    category: ['Computer Science', 'Programming'],
    type: 'path',
    modules: ['A2'],
    text: `Displays familiarity with basic programming concepts and is able to make basic web pages and programs using HTML5.`,
    image: ""
  },
  "A4": {
    id: "A4",
    type: 'field',
    title: 'Natural Sciences',
    modules: ['A16', 'A17', 'A78', 'A79', 'A80', 'A81'],
    text: 'Sciences concerning the physical world'
  },
  "A5": {
    id: 'A5',
    type: 'field',
    title: 'Math & Computer Science',
    modules: ['A6', 'A76', 'A77', 'A86'],
    text: ''
  },
  "A6": {
    id: 'A6',
    type: 'subject',
    title: 'Programming',
    modules: ['A3'],
    text: 'The study of coding languages and how to build programs.'
  },
  'A7': {
    id: 'A7',
    title: 'K-12',
    type: 'field',
    text: '',
    modules: ['']
  },
  'A8': {
    id: 'A8',
    title: 'Pre-Kindergarten',
    type: 'field',
    text: '',
    modules: ['']
  },
  'A9': {
    id: 'A9',
    title: "Browse Subjects",
    type: 'browse',
    modules: ["A4", "A5", "A7", "A8", "A10", "A11", "A12", "A13"]
  },
  'A10': {
    id: 'A10',
    title: 'Life Skills & Misc.',
    type: 'field',
    modules: [],
    text: ''
  },
  'A12': {
    id: 'A12',
    title: 'Social Sciences',
    type: 'field',
    modules: ['A14', 'A15', 'A76', 'A88'],
    text: ''
  },
  'A13': {
    id: 'A13',
    title: 'Humanities',
    type: 'field',
    modules: ['A90', 'A84', 'A82', 'A83', 'A87', 'A92'],
    text: ''
  },
  "A14": {
    id: 'A14',
    type: 'subject',
    title: 'Economics',
    modules: ['A18', 'A19', 'A20', 'A21'],
    text: 'The study of markets; the study of the production, distribution, and trade of goods and services.'
  },
  "A15": {
    id: 'A15',
    type: 'subject',
    title: 'Psychology',
    modules: [''],
    text: 'The study of the human mind, of human behavior and neurochemistry.'
  },
  "A16": {
    id: 'A16',
    type: 'subject',
    title: 'Astronomy',
    modules: [''],
    text: 'The study of outer space; of cosmic phenomena; of celestial bodies and the physics thereof.'
  },
  "A17": {
    id: 'A17',
    type: 'subject',
    title: 'Physics',
    modules: ['A94', 'A95'],
    text: 'The study of the laws that govern the universe; of the nature and behavior of matter and energy.'
  },
  'A18': {
    id: 'A18',
    category: ['Economics'],
    title: "Econ 101, Macroeconomics",
    difficulty: '100',
    prereqs: [''],
    type: 'class',
    credits: 1,
    modules: [],
    text: `Introduction to macroeconomics.`,
  },
  'A19': {
    id: 'A19',
    title: "Minor in Economics",
    difficulty: '200',
    prereqs: [''],
    type: 'path',
    modules: ['A18'],
    text: `Signifies a considerable knowledge of economics.`,
  },
  'A20': {
    id: 'A20',
    title: "Associate of Economics",
    difficulty: '250',
    prereqs: [''],
    type: 'path',
    modules: ['A19'],
    text: `Requires significant knowledge of Economics in addition to the general education requirements for associate's degrees.`,
  },
  'A21': {
    id: 'A21',
    title: "Bachelor's of Arts in Economics",
    difficulty: '400',
    prereqs: [''],
    type: 'path',
    modules: [''],
    text: `Requires broad knowledge of Economics in addition to the general education requirements for bachelor's degrees.`
  },
  'A22': {
    id: 'A22',
    title: "Bachelor's of Science in Economics",
    difficulty: '450',
    prereqs: [''],
    type: 'path',
    modules: ['A2'],
    text: `Requires deep knowledge of Economics in addition to the general education requirements for bachelor's degrees.`
  },
  "A23": {
    "title": "Bachelor's of Arts in Psychology",
    "id": 23,
    "type": "path",
    "difficulty": 400,
    "prereqs": [],
    "modules": [],
    "text": "Requires broad knowledge of Psychology in addition to the general education requirements for bachelor's degrees."
  },
  "A24": {
    "title": "Bachelor's of Arts in Astronomy",
    "id": 24,
    "type": "path",
    "difficulty": 400,
    "prereqs": [],
    "modules": [],
    "text": "Requires broad knowledge of Astronomy in addition to the general education requirements for bachelor's degrees."
  },
  "A25": {
    "title": "Bachelor's of Arts in Physics",
    "id": 25,
    "type": "path",
    "difficulty": 400,
    "prereqs": [],
    "modules": [],
    "text": "Requires broad knowledge of Physics in addition to the general education requirements for bachelor's degrees."
  },
  "A26": {
    "title": "Bachelor's of Arts in Biology",
    "id": 26,
    "type": "path",
    "difficulty": 400,
    "prereqs": [],
    "modules": [],
    "text": "Requires broad knowledge of Biology in addition to the general education requirements for bachelor's degrees."
  },
  "A27": {
    "title": "Bachelor's of Arts in Chemistry",
    "id": 27,
    "type": "path",
    "difficulty": 400,
    "prereqs": [],
    "modules": [],
    "text": "Requires broad knowledge of Chemistry in addition to the general education requirements for bachelor's degrees."
  },
  "A28": {
    "title": "Bachelor's of Arts in Sociology",
    "id": 28,
    "type": "path",
    "difficulty": 400,
    "prereqs": [],
    "modules": [],
    "text": "Requires broad knowledge of Sociology in addition to the general education requirements for bachelor's degrees."
  },
  "A29": {
    "title": "Bachelor's of Arts in Geology",
    "id": 29,
    "type": "path",
    "difficulty": 400,
    "prereqs": [],
    "modules": [],
    "text": "Requires broad knowledge of Geology in addition to the general education requirements for bachelor's degrees."
  },
  "A30": {
    "title": "Bachelor's of Arts in Anthropology",
    "id": 30,
    "type": "path",
    "difficulty": 400,
    "prereqs": [],
    "modules": [],
    "text": "Requires broad knowledge of Anthropology in addition to the general education requirements for bachelor's degrees."
  },
  "A31": {
    "title": "Bachelor's of Arts in History",
    "id": 31,
    "type": "path",
    "difficulty": 400,
    "prereqs": [],
    "modules": [],
    "text": "Requires broad knowledge of History in addition to the general education requirements for bachelor's degrees."
  },
  "A32": {
    "title": "Bachelor's of Arts in Archaeology",
    "id": 32,
    "type": "path",
    "difficulty": 400,
    "prereqs": [],
    "modules": [],
    "text": "Requires broad knowledge of Archaeology in addition to the general education requirements for bachelor's degrees."
  },
  "A33": {
    "title": "Bachelor's of Arts in Computer Science",
    "id": 33,
    "type": "path",
    "difficulty": 400,
    "prereqs": [],
    "modules": [],
    "text": "Requires broad knowledge of Computer Science in addition to the general education requirements for bachelor's degrees."
  },
  "A34": {
    "title": "Bachelor's of Arts in Applied Mathematics",
    "id": 34,
    "type": "path",
    "difficulty": 400,
    "prereqs": [],
    "modules": [],
    "text": "Requires broad knowledge of Applied Mathematics in addition to the general education requirements for bachelor's degrees."
  },
  "A35": {
    "title": "Bachelor's of Arts in Mathematics",
    "id": 35,
    "type": "path",
    "difficulty": 400,
    "prereqs": [],
    "modules": [],
    "text": "Requires broad knowledge of Mathematics in addition to the general education requirements for bachelor's degrees."
  },
  "A36": {
    "title": "Bachelor's of Science in Psychology",
    "id": 36,
    "type": "path",
    "difficulty": 450,
    "prereqs": [],
    "modules": [],
    "text": "Requires deep knowledge of Psychology in addition to the general education requirements for bachelor's degrees."
  },
  "A37": {
    "title": "Bachelor's of Science in Astronomy",
    "id": 37,
    "type": "path",
    "difficulty": 450,
    "prereqs": [],
    "modules": [],
    "text": "Requires deep knowledge of Astronomy in addition to the general education requirements for bachelor's degrees."
  },
  "A38": {
    "title": "Bachelor's of Science in Physics",
    "id": 38,
    "type": "path",
    "difficulty": 450,
    "prereqs": [],
    "modules": [],
    "text": "Requires deep knowledge of Physics in addition to the general education requirements for bachelor's degrees."
  },
  "A39": {
    "title": "Bachelor's of Science in Biology",
    "id": 39,
    "type": "path",
    "difficulty": 450,
    "prereqs": [],
    "modules": [],
    "text": "Requires deep knowledge of Biology in addition to the general education requirements for bachelor's degrees."
  },
  "A40": {
    "title": "Bachelor's of Science in Chemistry",
    "id": 40,
    "type": "path",
    "difficulty": 450,
    "prereqs": [],
    "modules": [],
    "text": "Requires deep knowledge of Chemistry in addition to the general education requirements for bachelor's degrees."
  },
  "A41": {
    "title": "Bachelor's of Science in Sociology",
    "id": 41,
    "type": "path",
    "difficulty": 450,
    "prereqs": [],
    "modules": [],
    "text": "Requires deep knowledge of Sociology in addition to the general education requirements for bachelor's degrees."
  },
  "A42": {
    "title": "Bachelor's of Science in Geology",
    "id": 42,
    "type": "path",
    "difficulty": 450,
    "prereqs": [],
    "modules": [],
    "text": "Requires deep knowledge of Geology in addition to the general education requirements for bachelor's degrees."
  },
  "A43": {
    "title": "Bachelor's of Science in Anthropology",
    "id": 43,
    "type": "path",
    "difficulty": 450,
    "prereqs": [],
    "modules": [],
    "text": "Requires deep knowledge of Anthropology in addition to the general education requirements for bachelor's degrees."
  },
  "A44": {
    "title": "Bachelor's of Science in History",
    "id": 44,
    "type": "path",
    "difficulty": 450,
    "prereqs": [],
    "modules": [],
    "text": "Requires deep knowledge of History in addition to the general education requirements for bachelor's degrees."
  },
  "A45": {
    "title": "Bachelor's of Science in Archaeology",
    "id": 45,
    "type": "path",
    "difficulty": 450,
    "prereqs": [],
    "modules": [],
    "text": "Requires deep knowledge of Archaeology in addition to the general education requirements for bachelor's degrees."
  },
  "A46": {
    "title": "Bachelor's of Science in Computer Science",
    "id": 46,
    "type": "path",
    "difficulty": 450,
    "prereqs": [],
    "modules": [],
    "text": "Requires deep knowledge of Computer Science in addition to the general education requirements for bachelor's degrees."
  },
  "A47": {
    "title": "Bachelor's of Science in Applied Mathematics",
    "id": 47,
    "type": "path",
    "difficulty": 450,
    "prereqs": [],
    "modules": [],
    "text": "Requires deep knowledge of Applied Mathematics in addition to the general education requirements for bachelor's degrees."
  },
  "A48": {
    "title": "Bachelor's of Science in Mathematics",
    "id": 48,
    "type": "path",
    "difficulty": 450,
    "prereqs": [],
    "modules": [],
    "text": "Requires deep knowledge of Mathematics in addition to the general education requirements for bachelor's degrees."
  },
  "A49": {
    "title": "Minor in Psychology",
    "id": 49,
    "type": "path",
    "difficulty": 200,
    "prereqs": [],
    "modules": [],
    "text": "Requires strong grounding in Psychology as well as some introduction to higher-level concepts."
  },

})
