const snippets = [
  {
    id: `1`,
    code: `// Welcome to JS!`,
    title: `single-line.js`,
    description: `single line comment in JS`,
    language: `javascript`,
    tags: [`utility`],
  },
  {
    id: `2`,
    code: `for (var i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i);
  }, 1000);
}`,
    title: `var-challenge.js`,
    description: `scoping challenge problem`,
    language: `javascript`,
    tags: [`challenge`],
  },
  {
    id: `3`,
    code: `switch (numOfStudents) {
  case 1:
    // do something;
    break;
  case 2:
  case 3:
    // do something;
    break;
  default:
  // do some default behavior.
}`,
    title: `switch.js`,
    description: `Switch statement`,
    language: `javascript`,
    tags: [`utility`],
  },
  {
    id: `4`,
    code: `class Pet {
  constructor(name) {
    this.name = name;
  }

  doTrick(trick) {
    console.log(\`I can \${trick}. Watch this!\`);
  }
}

class Dog extends Pet {
  constructor(name) {
    super(name);
  }

  sit() {
    console.log(\`I am sitting\`);
  }
}

const myDog = new Dog("Mike");
myDog.doTrick("jump");

// Output: I can jump. Watch this!`,
    title: `inheritance.js`,
    description: `OOP inheritance`,
    language: `javascript`,
    tags: [`theory`],
  },
];

module.exports = snippets;
