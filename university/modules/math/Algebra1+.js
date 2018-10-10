Object.assign(Uni.modules, {
  "math_Alg1_1": {
    title: 'Introduction to Algebra 1',
    difficulty: 'Grade 5-9',
    type: 'class',
    credits: 2,
    category: ['Math'],
    text: "Learn the basics of algebra and unlock",
    modules: ["math_Alg1_2", "math_Alg1_3", "math_Alg1_4", "math_Alg1_5", "math_Alg1_6", "math_Alg1_7", "math_Alg1_8", "math_Alg1_9", "math_Alg1_10", "math_Alg1_10"]
  },
  "math_Alg1_2": {
    "type": 'lesson',
    title: "Introduction & Review 1",
    category: ['Math'],
    text: `
      <p>Remember, for this class you should have a pencil and paper available at all times. If a calculator is required it will be noted in the lesson, otherwise attempt to do all problems on paper and show your work. Keeping notes down on paper is also highly recommended. Don't write a textbook, but write down enough to remember relevant facts and formulas.</p>
      <p>Before we get into what algebra is, let's start with a pratical exercise. </p>
      <p>In algebra an equal's sign (=) means that what is on the left side of the equal's sign has the same value as on the right side, even if they may be in different forms.</p>
      <p>Note: In this course "/" signifies division, * signifies multiplication. When writing problems down on paper, you may use a small dot to medium sized dot in place of an asterisk. You may also use a ÷ in place of a / for division if you so choose. </p>
    `,
    license: ``,
    questions: [
      {
        type: 'TF',
        text: `5 = 5 ?`,
        answer: 'T'
      },
      {
        type: 'TF',
        text: `7 = 9 ?`,
        answer: 'F'
      },
      {
        type: 'TF',
        text: `6 = 4 + 1 + 1 ?`,
        answer: 'T'
      },
      {
        type: 'TF',
        text: `15/3 = 10/4 * 2 ?`,
        answer: 'T'
      },
      {
        type: 'multiple',
        text: "20 = ?",
        options: ['100/20', '2*2*2*2', "4 * 5"],
        answer: 2
      },
    ]
  },
  "math_Alg1_3": {
    "type": 'lesson',
    title: "What is Algebra?",
    category: ['Math'],
    text: `
      <p>Unlike previous maths, algebra uses <b>variables</b> in order to solve a much wider array of problems. Typically we use letters like <i>x, y,</i> or <i>n</i> to stand in for something else. </p>
      <p>Note: "/" signifies division, * signifies multiplication. ">=" is a greater-than or equals sign. </p>
    `,
    license: ``,
    questions: [
      {
        type: 'TF',
        text: `Let x = 4; does 2 * x = 8 ?`,
        answer: 'T'
      },
      {
        type: 'TF',
        text: `<p>More than one variable can be used at once.</p>
        Let x = 9, let n = 5. Is x > n ?`,
        answer: 'T'
      },
      {
        type: 'multiple',
        text: `<p>Variables can change over time. For example, let's say that Bob has 6 sheep. Then he gains two. If <b>x</b> represents the number of Bob's sheep we can express that mathematically as the following: </p>
        Let x = 6; x = x + 2;
        <p>How much is x? (how many sheep does Bob have now?)`,
        options: ['4', '6', "8"],
        answer: 2
      },
      {
        type: 'multiple',
        text: `<p>Sometimes you don't know a variable immediately. For instance <b>n</b> can be the number of cars at your school, which includes 7 cars in one parking lot and 8 in another. Mathematically that becomes: </p>
        n = 7 + 8;
        <p>How much is n?`,
        options: ['1', '15', "13"],
        answer: 1
      },
    ]
  },
  "math_Alg1_4": {
    "type": 'lesson',
    title: "What is Algebra?",
    category: ['Math'],
    text: `
      <p>Sometimes one variable is used to solve for another variable.</p>
      <p></p>
    `,
    license: ``,
    questions: [
      {
        type: 'TF',
        text: `Let x = 4; y = x; does y = 4?`,
        answer: 'T'
      },
      {
        type: 'TF',
        text: `Let x = 4; y = x + 1; Is y greater than x?`,
        answer: 'T'
      },
      {
        type: 'multiple',
        text: `<p>The number of trees <b>y</b> in the village green is equal to the number of oaks <b>o</b> plus the number of pines <b>p</b></p>
        According to a survey of the village green, o = 5 and p = 24; how much does y equal?`,
        options: ['29', '33', "0"],
        answer: 0
      },
      {
        type: 'multiple',
        text: `<p>y = 3x + 1</p>
        If x = 3, y = ?`,
        options: ['11','10', '16', "4"],
        answer: 1
      },
    ]
  },
  "math_Alg1_5": {
    "type": 'lesson',
    title: "Coefficients",
    category: ['Math'],
    text: `
      <p>The questions below cover some shorthand used in algebra to speed up the writing of problems and make them easier to understand at a glance.</p>
      <p></p>
    `,
    license: ``,
    questions: [
      {
        type: 'TF',
        text: `<p><b>4x</b> is an example of mathematical shorthand. The "4" is a coefficient, which is a fancy way of saying that 4x = 4 * x. Whatever is placed directly in front of a variable is the same as multiplying by that number (coefficient). Thus 12x is the same as writing 12 * x or (12 * x), it just saves you some paper.</p>
        Question: does 2 * 2 * x = 4x?`,
        answer: 'T'
      },
      {
        type: 'TF',
        text: `If there is no coefficient written, the coefficient is assumed to be 1. Thus x is the same as 1x which is the same as 1 * x`,
        answer: 'T'
      },
      {
        type: 'TF',
        text: `Coefficients can also be negative. -2n is another way of saying -2 * n. -x is the same as -1 * x`,
        answer: 'T'
      },
      {
        type: 'multiple',
        text: `<p>let x = 5; -x = ?</p>`,
        options: ['5', '-5', "x"],
        answer: 1
      },
      {
        type: 'multiple',
        text: `<p>Remember, subtracting a negative number reverses the sign, thus 5 minus negative 3 becomes 8.</p>
        If x = -10, 5 - x = ?`,
        options: ['10','-5', '15', "5"],
        answer: 2
      },
    ]
  },
  "math_Alg1_6": {
    "type": 'lesson',
    title: "More coefficient practice",
    category: ['Math'],
    text: `
      <p>Time to go deeper into coefficient practice. Remember, a coefficient is shorthand for multiplication</p>
      <p></p>
    `,
    license: ``,
    questions: [
      {
        type: 'TF',
        text: `Does 5 * 3 + x simply to 15x?`,
        answer: 'F'
      },
      {
        type: 'TF',
        text: `x = -(-x)?`,
        answer: 'T'
      },
      {
        type: 'TF',
        text: `x + x + x = 3x?`,
        answer: 'T'
      },
      {
        type: 'multiple',
        text: `<p>Coefficients can also be decimals.</p>
        <p>x = 10; 3.5x = ?</p>`,
        options: ['35', '-25', "30"],
        answer: 0
      },
      {
        type: 'multiple',
        text: `If x = -10, 5 + 2x = ?`,
        options: ['10','-5', '-15', "5"],
        answer: 2
      },
    ]
  },
  "math_Alg1_7": {
    "type": 'lesson',
    title: "Variable Coefficients",
    category: ['Math'],
    text: `
      <p>Time for a little more coefficient practice. Remember, a coefficient is shorthand for multiplication</p>
      <p></p>
    `,
    license: ``,
    questions: [
      {
        type: 'TF',
        text: `Does 24x + x simplify to 25x?`,
        answer: 'T'
      },
      {
        type: 'multiple',
        text: `<p>Coefficients can also be fractions.</p>
        <p>x = 12; ${math.fraction(2,3)}x = ?`,
        options: ['6', '16', "8"],
        answer: 2
      },
      {
        type: 'multiple',
        text: `Variables can multiply by being written together too. Writing xy is essentially the same as writing x * y.
        <p>If x = 5 and y = 10, what is 2xy?</p>`,
        options: ['80','25', '50', "100"],
        answer: 3
      },
    ]
  },
  "math_Alg1_8": {
    "type": 'lesson',
    title: "Exponents Review",
    category: ['Math'],
    text: `
      <p>Hopefuly you've seen exponents before in prior classes, but we'll review them during this lesson.</p>
      <p></p>
    `,
    license: ``,
    questions: [
      {
        type: 'TF',
        text: `A positive exponent basically means to multiply something (the <b>base</b>) by itself that many times.
        <p>Question: does 3<sup>2</sup> = 3 * 3 = 9 ?</p>`,
        answer: 'T'
      },
      {
        type: 'TF',
        text: `A negative exponent can be solved by taking the <b>reciprocal</b> and then making the exponent positive. A reciprocal is when you flip something over the fraction line, so 5 becomes ${math.fraction(1,5)} and ${math.fraction(3,4)} becomes ${math.fraction(4,3)}, ${math.fraction(1,7)} would become 7. Thus 4<sup>-2</sup> would become ${math.fraction(1,math.power(4,2))} which is the same as ${math.fraction(1,16)}
        <p>Question: does 5<sup>-2</sup> = 1/(5*5) = ${math.fraction(1,25)}?</p>`,
        answer: 'T'
      },
      {
        type: 'multiple',
        text: `<p>${math.power(3,3)} + 4<sup>2</sup> = ?</p>`,
        hint: `<p>3<sup>3</sup> = 3 * 3 * 3; 4<sup>2</sup> = 4 * 4`,
        options: ['43', '25', `9 ${math.fraction(1,4)}`],
        answer: 0
      },
      {
        type: 'multiple',
        text: `Exponents of the same base can be added together when the bases are multiplied, such that 3<sup>2</sup> * 3<sup>4</sup> = 3<sup>6</sup>.
        <p>3*3*3 * 3<sup>4</sup> + 3*3 can also be written as</p>`,
        options: ['3<sup>12</sup> + 9','3<sup>9</sup>', '3<sup>7</sup> + 3<sup>2</sup>'],
        answer: 2
      },
    ]
  },
  "math_Alg1_9": {
    "type": 'lesson',
    title: "Exponents & Variables",
    category: ['Math'],
    text: `
      <p>Okay, time for some simple exponents and variables.</p>
      <p></p>
    `,
    license: ``,
    questions: [
      {
        type: 'TF',
        text: `let x = 5; x<sup>2</sup> = 5<sup>2</sup>?`,
        answer: 'T'
      },
      {
        type: 'TF',
        text: `let x = 4, n = 3; x<sup>n</sup> = 4<sup>3</sup>?`,
        answer: 'T'
      },
      {
        type: 'multiple',
        text: `let m = 25; m<sup>-1</sup> = ?`,
        hint: `Remember to take the <b>reciprocal</b>`,
        options: [math.fraction(1,5), math.fraction(1,25), "5"],
        answer: 1
      },
      {
        type: 'multiple',
        text: `let m = ${math.power(6,2)}, x = m + 1.
        <p>x = ?</p>`,
        options: ['37','7', '35', '49'],
        answer: 0
      },
    ]
  },
  "math_Alg1_10": {
    "type": 'lesson',
    title: "More Exponents",
    category: ['Math'],
    text: `
      <h3>Vocabulary Review:</h3>
      <dl>
      <dt><b>base</b></dt>
      <dd>The number to be raised to a power</dd>
      <dt><b>exponent</b></dt>
      <dd>The power to which a number is to be raised</dd>
      <dt><b>power</b></dt>
      <dd>The result of the operation. 2 raised to the third power = 8; The third power of 2 is 8</dd>
      </dl>
      Note: Common English usage is to use the words power and exponent interchangeably. While technically incorrect, context generally conveys the meaning.
      <h3>Lesson</h3>
      <p>When multiplying two like bases like ${math.power(3,5)} * ${math.power(3,3)} the exponents can be added together, simplifying to ${math.power(3,8)}</p>
      <p>However, when a power is taken <i>of</i> a power, the exponents are multiplied. Thus (${math.power(4,3)}${math.power(')',5)} becomes ${math.power(4,15)}
    `,
    license: ``,
    questions: [
      {
        type: 'multiple',
        text: ` (${math.power('4', 2)}${math.power(')',3)} = ?`,
        options: [math.fraction(1,math.power(4,6)), math.power(4,5), `${math.power(4,6)}`],
        answer: 2
      },
      {
        type: 'multiple',
        text: `let m = 5; (${math.power('m', 3)}${math.power(')',-1)} = ?`,
        options: [math.fraction(1,math.power(5,3)), math.fraction(1,25), `${math.power(-5,3)}`],
        answer: 0
      }
    ]
  },
  "math_Alg1_11": {
    "type": 'lesson',
    title: "Section One Review",
    category: ['Math'],
    text: `
      <p>Time to review what we've learned this section:</p>
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    `,
    license: ``,
    questions: [
      {
        type: 'TF',
        text: `let x = 5; x<sup>2</sup> = 5<sup>2</sup>?`,
        answer: 'T'
      },
      {
        type: 'TF',
        text: `let x = 4, n = 3; x<sup>n</sup> = 4<sup>3</sup>?`,
        answer: 'T'
      },
      {
        type: 'multiple',
        text: `let m = 25; m<sup>-1</sup> = ?`,
        hint: `Remember to take the <b>reciprocal</b>`,
        options: [math.fraction(1,5), math.fraction(1,25), "5"],
        answer: 1
      },
      {
        type: 'multiple',
        text: `let m = ${math.power(6,2)}, x = m + 1.
        <p>x = ?</p>`,
        options: ['37','7', '35', '49'],
        answer: 0
      },
    ]
  },
})
