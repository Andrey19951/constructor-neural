const brain = require("brain.js");
const fs = require("fs");

let data = fs.readFileSync("arrWithoutSpam.json", "utf8");
let arrfromTiny = JSON.parse(data);

const StringtoArray = (string) => {
  string = string.replace(/[^a-zA-Z0-9\s]/g, "");
  string = string.toLowerCase();
  return string.split(" ");
};

const WordDictionary = {};
const InteractionTypes = [
  "Accordion", "Tabs", "Tab", "Dots", "Flip Cards", "Scroll Cards", "Carousel",
  "Hotspots", "Step-by-Step", "Interaction Accordion", "Interaction (Accordion Picture Left)",
  "Interaction (Accordion Picture Right)", "Interaction (Accordion with a Graphic on the L/R)",
  "Interaction (Accordion with a Graphic on the L)", "Interaction (Accordion with a Graphic on the R)",
  "Interaction Tabs", "Interaction (Tabs Picture Left)", "Interaction (Tabs Picture Right)",
  "Interaction (Tabs with a Graphic on the L)", "Interaction (Tabs with a Graphic on the R)",
  "Interaction (Vertical Tabs with a Graphic on the L)", "Interaction (Vertical Tabs with a Graphic on the R)",
  "Interaction Dots", "Interaction (Vertical Dots)", "Interaction (Vertical Dots with a Graphic on the L)",
  "Interaction (Vertical Dots with a Graphic on the R)", "Interaction (Dots with a Graphic on the L)",
  "Interaction (Dots with a Graphic on the R)", "Interaction Flip Cards", "Interaction Scroll Cards",
  "Interaction Carousel", "Interaction Hotspots", "Interaction Step-by-Step",
  "Picture (L with text)", "Picture (R with text)"
];

const trainingData = [
  "Accordion", "Tabs", "Tab", "Dots", "Flip Cards", "Scroll Cards", "Carousel", "Hotspots",
  "Step-by-Step", "Interaction Accordion", "Interaction (Accordion Picture Left)",
  "Interaction (Accordion Picture Right)", "Interaction (Accordion with a Graphic on the L/R)",
  "Interaction (Accordion with a Graphic on the L)", "Interaction (Accordion with a Graphic on the R)",
  "Interaction Tabs", "Interaction (Tabs Picture Left)", "Interaction (Tabs Picture Right)",
  "Interaction (Tabs with a Graphic on the L)", "Interaction (Tabs with a Graphic on the R)",
  "Interaction (Vertical Tabs with a Graphic on the L)", "Interaction (Vertical Tabs with a Graphic on the R)",
  "Interaction Dots", "Interaction (Vertical Dots)", "Interaction (Vertical Dots with a Graphic on the L)",
  "Interaction (Vertical Dots with a Graphic on the R)", "Interaction (Dots with a Graphic on the L)",
  "Interaction (Dots with a Graphic on the R)", "Interaction Flip Cards", "Interaction Scroll Cards",
  "Interaction Carousel", "Interaction Hotspots", "Interaction Step-by-Step",
  "Picture (L with text)", "Picture (Left with text)", "Picture (R with text)",
  "Picture (Right with text)", "Picture (L/R with text)"
];

InteractionTypes.forEach((element) => {
  let tokens = StringtoArray(element);
  tokens.forEach((token) => {
    if (!WordDictionary[token]) {
      WordDictionary[token] = 0;
    }
    WordDictionary[token]++;
  });
});

arrfromTiny.forEach((element) => {
  let tokens = StringtoArray(element);
  tokens.forEach((token) => {
    if (!WordDictionary[token]) {
      WordDictionary[token] = 0;
    }
    WordDictionary[token]++;
  });
});

const ConvertToVector = (text) => {
  let textTokens = StringtoArray(text);
  let vector = [];
  Object.keys(WordDictionary).forEach((word) => {
    vector.push(textTokens.includes(word) ? 1 : 0);
  });
  return vector;
};

const getWordsFromVectors = (vectors, dictionary) => {
  const words = Object.keys(dictionary);
  const wordsInVectors = new Set();

  vectors.forEach((vector) => {
    vector.forEach((value, index) => {
      if (value === 1) {
        wordsInVectors.add(words[index]);
      }
    });
  });

  return Array.from(wordsInVectors);
};

const createFilteredVectors = (dictionary, excludedWords) => {
  const words = Object.keys(dictionary);
  const filteredWords = words.filter((word) => !excludedWords.includes(word));

  const vectors = filteredWords.map((word) => {
    const vector = new Array(words.length).fill(0);
    const index = words.indexOf(word);
    vector[index] = 1;
    return vector;
  });

  return vectors;
};

const firstSet = trainingData.map((text) => ConvertToVector(text));

const excludedWords = getWordsFromVectors(firstSet, WordDictionary);

const filteredVectors = createFilteredVectors(WordDictionary, excludedWords);

let DataForNeural = [
  { input: ConvertToVector("Accordion"), output: { AccordionRegular: 1 } },
  { input: ConvertToVector("Tabs"), output: { TabsRegular: 1 } },
  { input: ConvertToVector("Tab"), output: { TabsRegular: 1 } },
  { input: ConvertToVector("Dots"), output: { DotsRegular: 1 } },
  { input: ConvertToVector("Flip Cards"), output: { FlipCards: 1 } },
  { input: ConvertToVector("Scroll Cards"), output: { ScrollCards: 1 } },
  { input: ConvertToVector("Carousel"), output: { Carousels: 1 } },
  { input: ConvertToVector("Hotspots"), output: { Hotspots: 1 } },
  { input: ConvertToVector("Step-by-Step"), output: { StepbyStep: 1 } },
  {
    input: ConvertToVector("Interaction Accordion"),
    output: { AccordionRegular: 1 },
  },
  {
    input: ConvertToVector("Interaction (Accordion Picture Left)"),
    output: { AccordionLeft: 1 },
  },
  {
    input: ConvertToVector("Interaction (Accordion Picture Right)"),
    output: { AccordionRight: 1 },
  },
  {
    input: ConvertToVector("Interaction (Accordion with a Graphic on the L/R)"),
    output: { AccordionLeft: 1 },
  },
  {
    input: ConvertToVector("Interaction (Accordion with a Graphic on the L)"),
    output: { AccordionLeft: 1 },
  },
  {
    input: ConvertToVector("Interaction (Accordion with a Graphic on the R)"),
    output: { AccordionRight: 1 },
  },
  { input: ConvertToVector("Interaction Tabs"), output: { TabsRegular: 1 } },
  {
    input: ConvertToVector("Interaction (Tabs Picture Left)"),
    output: { TabsLeft: 1 },
  },
  {
    input: ConvertToVector("Interaction (Tabs Picture Right)"),
    output: { TabsRight: 1 },
  },
  {
    input: ConvertToVector("Interaction (Tabs with a Graphic on the L)"),
    output: { TabsLeft: 1 },
  },
  {
    input: ConvertToVector("Interaction (Tabs with a Graphic on the R)"),
    output: { TabsRight: 1 },
  },
  {
    input: ConvertToVector(
      "Interaction (Vertical Tabs with a Graphic on the L)"
    ),
    output: { VerticalTabs: 1 },
  },
  {
    input: ConvertToVector(
      "Interaction (Vertical Tabs with a Graphic on the R)"
    ),
    output: { VerticalTabs: 1 },
  },
  { input: ConvertToVector("Interaction Dots"), output: { DotsRegular: 1 } },
  {
    input: ConvertToVector("Interaction (Vertical Dots)"),
    output: { DotsVerticalRegular: 1 },
  },
  {
    input: ConvertToVector(
      "Interaction (Vertical Dots with a Graphic on the L)"
    ),
    output: { DotsVerticalLeft: 1 },
  },
  {
    input: ConvertToVector(
      "Interaction (Vertical Dots with a Graphic on the R)"
    ),
    output: { DotsVerticalRight: 1 },
  },
  {
    input: ConvertToVector("Interaction (Dots with a Graphic on the L)"),
    output: { DotsRegularLeft: 1 },
  },
  {
    input: ConvertToVector("Interaction (Dots with a Graphic on the R)"),
    output: { DotsRegularRight: 1 },
  },
  {
    input: ConvertToVector("Interaction Flip Cards"),
    output: { FlipCards: 1 },
  },
  {
    input: ConvertToVector("Interaction Scroll Cards"),
    output: { ScrollCards: 1 },
  },
  { input: ConvertToVector("Interaction Carousel"), output: { Carousels: 1 } },
  { input: ConvertToVector("Interaction Hotspots"), output: { Hotspots: 1 } },
  {
    input: ConvertToVector("Interaction Step-by-Step"),
    output: { StepbyStep: 1 },
  },
  {
    input: ConvertToVector("Picture (L with text)"),
    output: { PictureLeft: 1 },
  },
  {
    input: ConvertToVector("Picture (Left with text)"),
    output: { PictureLeft: 1 },
  },
  {
    input: ConvertToVector("Picture (R with text)"),
    output: { PictureRight: 1 },
  },
  {
    input: ConvertToVector("Picture (Right with text)"),
    output: { PictureRight: 1 },
  },
  {
    input: ConvertToVector("Picture (L/R with text)"),
    output: { PictureLeft: 1 },
  },
  ...filteredVectors.map((el) => ({
    input: el,
    output: { NotInteraction: 1 },
  }))
];

const net = new brain.NeuralNetwork({
  hiddenLayers: [70, 35],
  learningRate: 0.01
});

net.train(DataForNeural, {
  iterations: 20000,
  log: true,
  logPeriod: 1000,
  errorThresh: 0.005
});

const PredictionResult = (string) => {
  const result = net.run(ConvertToVector(string));
  let maxKey = null;
  let maxValue = 0;

  for (const key in result) {
    if (result[key] > maxValue) {
      maxValue = result[key];
      maxKey = key;
    }
  }

  return maxKey;
};

const testData = [
  { input: 'Accordion', output: 'AccordionRegular' },
  { input: 'Tabs', output: 'TabsRegular' },
  { input: 'Tab', output: 'TabsRegular' },
  { input: 'Dots', output: 'DotsRegular' },
  { input: 'Flip Cards', output: 'FlipCards' },
  { input: 'Scroll Cards', output: 'ScrollCards' },
  { input: 'Carousel', output: 'Carousels' },
  { input: 'Hotspots', output: 'Hotspots' },
  { input: 'Step-by-Step', output: 'StepbyStep' },
  { input: 'Interaction Accordion', output: 'AccordionRegular' },
  { input: 'Interaction (Accordion with a Graphic on the L/R)', output: 'AccordionLeft' },
  { input: 'Interaction (Accordion with a Graphic on the L)', output: 'AccordionLeft' },
  { input: 'Interaction (Accordion with a Graphic on the R)', output: 'AccordionRight' },
  { input: 'Interaction Tabs', output: 'TabsRegular' },
  { input: 'Interaction (Tabs Picture Left)', output: 'TabsLeft' },
  { input: 'Interaction (Tabs Picture Right)', output: 'TabsRight' },
  { input: 'Interaction (Tabs with a Graphic on the L)', output: 'TabsLeft' },
  { input: 'Interaction (Tabs with a Graphic on the R)', output: 'TabsRight' },
  { input: 'Interaction (Vertical Tabs with a Graphic on the L)', output: 'VerticalTabs' },
  { input: 'Interaction (Vertical Tabs with a Graphic on the R)', output: 'VerticalTabs' },
  { input: 'Interaction Dots', output: 'DotsRegular' },
  { input: 'Interaction (Vertical Dots)', output: 'DotsVerticalRegular' },
  { input: 'Interaction (Vertical Dots with a Graphic on the L)', output: 'DotsVerticalLeft' },
  { input: 'Interaction (Vertical Dots with a Graphic on the R)', output: 'DotsVerticalRight' },
  { input: 'Interaction (Dots with a Graphic on the L)', output: 'DotsRegularLeft' },
  { input: 'Interaction (Dots with a Graphic on the R)', output: 'DotsRegularRight' },
  { input: 'Interaction Flip Cards', output: 'FlipCards' },
  { input: 'Interaction Scroll Cards', output: 'ScrollCards' },
  { input: 'Interaction Carousel', output: 'Carousels' },
  { input: 'Interaction Hotspots', output: 'Hotspots' },
  { input: 'Interaction Step-by-Step', output: 'StepbyStep' }
];

let correctPredictions = 0;
for (let i = 0; i < testData.length; i++) {
  const input = testData[i].input;
  const expectedOutput = testData[i].output;
  const predictedOutput = PredictionResult(input);
  console.log(`Input: ${input}, Expected: ${expectedOutput}, Predicted: ${predictedOutput}`);
  if (predictedOutput === expectedOutput) {
    correctPredictions++;
  }
}

const accuracy = (correctPredictions / testData.length) * 100;
console.log(`Accuracy: ${accuracy}%`);
