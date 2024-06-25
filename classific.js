const brain = require('brain.js');
const natural = require('natural');
const tokenizer = new natural.WordTokenizer();


const letterTokenizer = (text) => {  
  text = text.replaceAll(/\W/g, '');
  text = text.toLowerCase();
  return text.split('')
};



const InteractionTypes = [
  'Accordions',
  'cards',
  'Flip',
  'Scroll',
  'Tabs',
  'Carousels',
  'Hotspots',
  'Step-by-Step',
  'Dots',
  'Picture',
  'left',
  'right',
  'vertical',
  'msdp',
  'extra',
  'regular',
  'Graphic'
  ];

const letterDictionary = {};

InteractionTypes.forEach((element) => {
  let tokens = letterTokenizer(element);
  tokens.forEach((token) => {
    if (!letterDictionary[token]) {
      letterDictionary[token] = 0;
    }
    letterDictionary[token]++;
  });
});


const ConvertToVector = (text) => {
  let textTokens = letterTokenizer(text);
  let vector = {};
  textTokens.forEach((token) => {
    if (letterDictionary[token]) {
      vector[token] = letterDictionary[token];
      vector[token]++;
    }
  });
  
  return vector;
}



const net = new brain.NeuralNetwork({
  hiddenLayers: [7]
});

net.train([
  { input: ConvertToVector('Accordion'), output: { Accordion: 1 } },
  { input: ConvertToVector('Tabs'), output: { Tabs: 1 } },
  { input: ConvertToVector('Dots'), output: { Dots: 1 } },
  { input: ConvertToVector('Flip Cards'), output: { FlipCards: 1 } },
  { input: ConvertToVector('Scroll Cards'), output: { ScrollCards: 1 } },
  { input: ConvertToVector('Carousel'), output: { Carousels: 1 } },
  { input: ConvertToVector('Hotspots'), output: { Hotspots: 1 } },
  { input: ConvertToVector('Step-by-Step'), output: { StepbyStep: 1 } },
  { input: ConvertToVector('Interaction Accordion'), output: { Accordion: 1 } },
  { input: ConvertToVector('Interaction (Accordion with a Graphic on the L/R)'), output: { Accordion: 1 } },
  { input: ConvertToVector('Interaction (Accordion with a Graphic on the L)'), output: { Accordion: 1 } },
  { input: ConvertToVector('Interaction (Accordion with a Graphic on the R)'), output: { Accordion: 1 } },
  { input: ConvertToVector('Interaction Tabs'), output: { Tabs: 1 } },
  { input: ConvertToVector('Interaction (Tabs Picture Left)'), output: { Tabs: 1 } },
  { input: ConvertToVector('Interaction (Tabs Picture Right)'), output: { Tabs: 1 } },
  { input: ConvertToVector('Interaction (Tabs with a Graphic on the L)'), output: { Tabs: 1 } },
  { input: ConvertToVector('Interaction (Tabs with a Graphic on the R)'), output: { Tabs: 1 } },
  { input: ConvertToVector('Interaction (Vertical Tabs with a Graphic on the L)'), output: { Tabs: 1 } },
  { input: ConvertToVector('Interaction (Vertical Tabs with a Graphic on the R)'), output: { Tabs: 1 } },
  { input: ConvertToVector('Interaction Dots'), output: { Dots: 1 } },
  { input: ConvertToVector('Interaction (Vertical Dots)'), output: { Dots: 1 } },
  { input: ConvertToVector('Interaction (Vertical Dots with a Graphic on the L)'), output: { Dots: 1 } },
  { input: ConvertToVector('Interaction (Vertical Dots with a Graphic on the R)'), output: { Dots: 1 } },
  { input: ConvertToVector('Interaction (Dots with a Graphic on the L)'), output: { Dots: 1 } },
  { input: ConvertToVector('Interaction (Dots with a Graphic on the R)'), output: { Dots: 1 } },
  { input: ConvertToVector('Interaction Flip Cards'), output: { FlipCards: 1 } },
  { input: ConvertToVector('Interaction Scroll Cards'), output: { ScrollCards: 1 } },
  { input: ConvertToVector('Interaction Carousel'), output: { Carousels: 1 } },
  { input: ConvertToVector('Interaction Hotspots'), output: { Hotspots: 1 } },
  { input: ConvertToVector('Interaction Step-by-Step'), output: { StepbyStep: 1 } },
  
] , {
  iterations: 10000,
  errorThresh: 0.005
});


console.log(net.run(ConvertToVector('Flip Cards with text only')));
console.log(net.run(ConvertToVector(' Interaction (Tabs Picture Left) ')));
console.log(net.run(ConvertToVector('Interaction (Flip Cards)')));
console.log(net.run(ConvertToVector('Accordion with a Graphic on the L')));
console.log(net.run(ConvertToVector('Accordion with a Graphic on the R')));


/* // Пример текстовых данных
const documents = [
  'tabs regular',
  'tabs picture on right',
  'tabs picture on left',
  'interaction tabs'
];

// Создание мешка слов
const bagOfWords = {};

// Обучение мешка слов на текстовых данных
documents.forEach((document) => {
  const tokens = tokenizer.tokenize(document);
  tokens.forEach((token) => {
    if (!bagOfWords[token]) {
      bagOfWords[token] = 0;
    }
    bagOfWords[token]++;
  });
});


// Преобразование текста в вектор мешка слов
const ConvertToVector = (text) => {
  let textTokens = tokenizer.tokenize(text);
  let vector = {};
  textTokens.forEach((token) => {
    if (bagOfWords[token]) {
      vector[token] = bagOfWords[token];
      vector[token]++;
    }
  });
  
  return vector;
}

console.log(ConvertToVector('tabs')) */
