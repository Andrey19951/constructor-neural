const brain = require("brain.js");
const fs = require("fs");

let data = fs.readFileSync("arrWithoutSpam.json", "utf8");
let arrfromTiny = JSON.parse(data);

const StringtoArray = (string) => {
  string = string.replace(/[^a-zA-Z0-9\s]/g, "");
  string = string.replace(/\s{2,}/g, ' ');
  string = string.toLowerCase();
  return string.split(" ");
};

const WordDictionary = {};
const InteractionTypes = [
  "Accordion",
  "Tabs",
  "Vertical",
  "Dots",
  "Flip",
  "Cards",
  "Scroll",
  "Carousel",
  "Hotspots",
  "Step-by-Step",
  "Left",
  "Right",
  "L",
  "R",
  "Interaction",
  "Image",
  "Picture",
  "Center",
];

const trainingData = [
  "Accordion",
  "Tabs",
  "Vertical Tabs",
  "Dots",
  "Flip Cards",
  "Scroll Cards",
  "Carousel",
  "Hotspots",
  "Step-by-Step",
  "Accordion Left",
  "Accordion Right",
  "Accordion L",
  "Accordion R",
  "Accordion L R",
  "Tabs Left",
  "Tabs Right",
  "Tabs L",
  "Tabs R",
  "Tabs L R",
  "Vertical Tabs Left",
  "Vertical Tabs Right",
  "Vertical Tabs L",
  "Vertical Tabs R",
  "Vertical Tabs L R",
  "Dots Left",
  "Dots Right",
  "Dots L",
  "Dots R",
  "Dots L R",
  "Vertical Dots Left",
  "Vertical Dots Right",
  "Vertical Dots L",
  "Vertical Dots R",
  "Vertical Dots L R",
  "Carousel Left",
  "Carousel Right",
  "Carousel L",
  "Carousel R",
  "Carousel L R",
  "Interaction Hotspots",
  "Step-by-Step Left",
  "Step-by-Step Right",
  "Step-by-Step L",
  "Step-by-Step R",
  "Step-by-Step L R",
  "Flip Cards Image",
  "Scroll Cards Image",
  "Picture Left",
  "Picture L",
  "Picture Right",
  "Picture R",
  "Picture L R",
  "Picture Center",
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

let filteredVectors = createFilteredVectors(WordDictionary, excludedWords);

filteredVectors = filteredVectors.splice(0, firstSet.length);


let DataForNeural = [
    {input: ConvertToVector("Accordion"),output: { AccordionRegular: 1 }},
    {input: ConvertToVector("Tabs"),output: { TabsRegular: 1 }},
    {input: ConvertToVector("Vertical Tabs"),output: { VertTabsRegular: 1 }},
    {input: ConvertToVector("Dots"),output: { DotsRegular: 1 }},
    {input: ConvertToVector("Vertical Dots"),output: { VerticalDotsRegular: 1 }},
    {input: ConvertToVector("Flip Cards"),output: { FlipCardsRegular: 1 }},
    {input: ConvertToVector("Flip Cards"),output: { FlipCardsRegular: 1 }},
    {input: ConvertToVector("Scroll Cards"),output: { ScrollCardsRegular: 1 }},
    {input: ConvertToVector("Scroll Cards"),output: { ScrollCardsRegular: 1 }},
    {input: ConvertToVector("Carousel"),output: { CarouselRegular: 1 }},
    {input: ConvertToVector("Hotspots"),output: { HotspotsRegular: 1 }},
    {input: ConvertToVector("Hotspots"),output: { HotspotsRegular: 1 }},
    {input: ConvertToVector("Step-by-Step"),output: { SBSRegular: 1 }},
    {input: ConvertToVector("Accordion Left"),output: { AccordionLeft: 1 }},
    {input: ConvertToVector("Accordion Right"),output: { AccordionRight: 1 }},
    {input: ConvertToVector("Accordion L"),output: { AccordionLeft: 1 }},
    {input: ConvertToVector("Accordion R"),output: { AccordionRight: 1 }},
    {input: ConvertToVector("Accordion L R"),output: { AccordionRegular: 1 }},
    {input: ConvertToVector("Tabs Left"),output: { TabsLeft: 1 }},
    {input: ConvertToVector("Tabs Right"),output: { TabsRight: 1 }},
    {input: ConvertToVector("Tabs L"),output: { TabsLeft: 1 }},
    {input: ConvertToVector("Tabs R"),output: { TabsRight: 1 }},
    {input: ConvertToVector("Tabs L R"),output: { TabsRegular: 1 }},
    {input: ConvertToVector("Vertical Tabs Left"),output: { VertTabsLeft: 1 }},
    {input: ConvertToVector("Vertical Tabs Right"),output: { VertTabsRight: 1 }},
    {input: ConvertToVector("Vertical Tabs L"),output: { VertTabsLeft: 1 }},
    {input: ConvertToVector("Vertical Tabs R"),output: { VertTabsRight: 1 }},
    {input: ConvertToVector("Vertical Tabs L R"),output: { VertTabsRegular: 1 }},
    {input: ConvertToVector("Dots Left"),output: { DotsLeft: 1 }},
    {input: ConvertToVector("Dots Right"),output: { DotsRight: 1 }},
    {input: ConvertToVector("Dots L"),output: { DotsLeft: 1 }},
    {input: ConvertToVector("Dots R"),output: { DotsRight: 1 }},
    {input: ConvertToVector("Dots L R"),output: { DotsRegular: 1 }},
    {input: ConvertToVector("Vertical Dots Left"),output: { VerticalDotsLeft: 1 }},
    {input: ConvertToVector("Vertical Dots Right"),output: { VerticalDotsRight: 1 }},
    {input: ConvertToVector("Vertical Dots L"),output: { VerticalDotsLeft: 1 }},
    {input: ConvertToVector("Vertical Dots R"),output: { VerticalDotsRight: 1 }},
    {input: ConvertToVector("Vertical Dots L R"),output: { VerticalDotsRegular: 1 }},
    {input: ConvertToVector("Carousel Left"),output: { CarouselLeft: 1 }},
    {input: ConvertToVector("Carousel Right"),output: { CarouselRight: 1 }},
    {input: ConvertToVector("Carousel L"),output: { CarouselLeft: 1 }},
    {input: ConvertToVector("Carousel R"),output: { CarouselRight: 1 }},
    {input: ConvertToVector("Carousel L R"),output: { CarouselRegular: 1 }},
    {input: ConvertToVector("Step-by-Step Left"),output: { SBSLeft: 1 }},
    {input: ConvertToVector("Step-by-Step Right"),output: { SBSRight: 1 }},
    {input: ConvertToVector("Step-by-Step L"),output: { SBSLeft: 1 }},
    {input: ConvertToVector("Step-by-Step R"),output: { SBSRight: 1 }},
    {input: ConvertToVector("Step-by-Step L R"),output: { SBSRegular: 1 }},
    {input: ConvertToVector("Flip Cards Image"),output: { FlipCardsImage: 1 }},
    {input: ConvertToVector("Flip Cards Image"),output: { FlipCardsImage: 1 }},
    {input: ConvertToVector("Scroll Cards Image"),output: { ScrollCardsImage: 1 }},
    {input: ConvertToVector("Scroll Cards Image"),output: { ScrollCardsImage: 1 }},
    {input: ConvertToVector("Picture Left"),output: { PicLeft: 1 }},
    {input: ConvertToVector("Picture L"),output: { PicLeft: 1 }},
    {input: ConvertToVector("Picture Right"),output: { PicRight: 1 }},
    {input: ConvertToVector("Picture R"),output: { PicRight: 1 }},
    {input: ConvertToVector("Picture L R"),output: { PicLefft: 1 }},
    {input: ConvertToVector("Picture Center"),output: { PicCenter: 1 }},    
    {input: ConvertToVector("Picture Center"),output: { PicCenter: 1 }},  
    {input: ConvertToVector("Hotspots"),output: { HotspotsRegular: 1 }},  
  ...filteredVectors.map((el) => ({
    input: el,
    output: { NotInteraction: 1 },
  })),
];

const net = new brain.NeuralNetwork({
  hiddenLayers: [20],
  learningRate: 0.01,
});

net.train(DataForNeural, {
  iterations: 20000,
  log: true,
  logPeriod: 1000,
  errorThresh: 0.005,
});

const PredictionResult = (net , string) => {
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

console.log(PredictionResult(net, 'Interaction (Accordion)'));

/* fs.writeFileSync('trainedNetwork.json', JSON.stringify(net.toJSON()));

module.exports = PredictionResult; */

/* const testData = [
  { input: "Accordion", output: "AccordionRegular" },
  { input: "Tabs", output: "TabsRegular" },
  { input: "Tab", output: "NotInteraction" },
  { input: "Dots", output: "DotsRegular" },
  { input: "Flip Cards", output: "FlipCardsRegular" },
  { input: "Scroll Cards", output: "ScrollCardsRegular" },
  { input: "Carousel", output: "CarouselRegular" },
  { input: "Hotspots", output: "Hotspots" },
  { input: "Step-by-Step", output: "SBSRegular" },
  { input: "Interaction Accordion", output: "AccordionRegular" },
  {
    input: "Interaction (Accordion with a Graphic on the L/R)",
    output: "AccordionRegular",
  },
  {
    input: "Interaction (Accordion with a Graphic on the L)",
    output: "AccordionLeft",
  },
  {
    input: "Interaction (Accordion with a Graphic on the R)",
    output: "AccordionRight",
  },
  { input: "Interaction Tabs", output: "TabsRegular" },
  { input: "Interaction (Tabs Picture Left)", output: "TabsLeft" },
  { input: "Interaction (Tabs Picture Right)", output: "TabsRight" },
  { input: "Interaction (Tabs with a Graphic on the L)", output: "TabsLeft" },
  { input: "Interaction (Tabs with a Graphic on the R)", output: "TabsRight" },
  {
    input: "Interaction (Vertical Tabs with a Graphic on the L)",
    output: "VertTabsLeft",
  },
  {
    input: "Interaction (Vertical Tabs with a Graphic on the R)",
    output: "VertTabsRight",
  },
  { input: "Interaction Dots", output: "DotsRegular" },
  { input: "Interaction (Vertical Dots)", output: "VerticalDotsRegular" },
  {
    input: "Interaction (Vertical Dots with a Graphic on the L)",
    output: "VerticalDotsLeft",
  },
  {
    input: "Interaction (Vertical Dots with a Graphic on the R)",
    output: "VerticalDotsRight",
  },
  {
    input: "Interaction (Dots with a Graphic on the L)",
    output: "DotsLeft",
  },
  {
    input: "Interaction (Dots with a Graphic on the R)",
    output: "DotsRight",
  },
  { input: "Interaction Flip Cards", output: "FlipCardsRegular" },
  { input: "Interaction Scroll Cards", output: "ScrollCardsRegular" },
  { input: "Interaction Carousel", output: "CarouselRegular" },
  { input: "Interaction Hotspots", output: "HotspotsRegular" },
  { input: "Interaction Step-by-Step", output: "SBSRegular" },
];

let correctPredictions = 0;
for (let i = 0; i < testData.length; i++) {
  const input = testData[i].input;
  const expectedOutput = testData[i].output;
  const predictedOutput = PredictionResult(input);
  console.log(
    `Input: ${input}, Expected: ${expectedOutput}, Predicted: ${predictedOutput}`
  );
  if (predictedOutput === expectedOutput) {
    correctPredictions++;
  }
}

const accuracy = (correctPredictions / testData.length) * 100;
console.log(`Accuracy: ${accuracy}%`); */
