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

const initialInteractionsData = [
    
    {input: ConvertToVector("Accordion"),output: { InteractionType: 1 }},
    {input: ConvertToVector("Tabs"),output: { InteractionType: 1 }},
    {input: ConvertToVector("Vertical Tabs"),output: { InteractionType: 1 }},
    {input: ConvertToVector("Dots"),output: { InteractionType: 1 }},
    {input: ConvertToVector("Vertical Dots"),output: { InteractionType: 1 }},
    {input: ConvertToVector("Flip Cards"),output: { InteractionType: 1 }},
    {input: ConvertToVector("Scroll Cards"),output: { InteractionType: 1 }},
    {input: ConvertToVector("Carousel"),output: { InteractionType: 1 }},
    {input: ConvertToVector("Hotspots"),output: { InteractionType: 1 }},
    {input: ConvertToVector("Step-by-Step"),output: { InteractionType: 1 }},
    {input: ConvertToVector("Accordion Left"),output: { InteractionType: 1 }},
    {input: ConvertToVector("Accordion Right"),output: { InteractionType: 1 }},
    {input: ConvertToVector("Accordion L"),output: { InteractionType: 1 }},
    {input: ConvertToVector("Accordion R"),output: { InteractionType: 1 }},
    {input: ConvertToVector("Accordion L R"),output: { InteractionType: 1 }},
    {input: ConvertToVector("Tabs Left"),output: { InteractionType: 1 }},
    {input: ConvertToVector("Tabs Right"),output: { InteractionType: 1 }},
    {input: ConvertToVector("Tabs L"),output: { InteractionType: 1 }},
    {input: ConvertToVector("Tabs R"),output: { InteractionType: 1 }},
    {input: ConvertToVector("Tabs L R"),output: { InteractionType: 1 }},
    {input: ConvertToVector("Vertical Tabs Left"),output: { InteractionType: 1 }},
    {input: ConvertToVector("Vertical Tabs Right"),output: { InteractionType: 1 }},
    {input: ConvertToVector("Vertical Tabs L"),output: { InteractionType: 1 }},
    {input: ConvertToVector("Vertical Tabs R"),output: { InteractionType: 1 }},
    {input: ConvertToVector("Vertical Tabs L R"),output: { InteractionType: 1 }},
    {input: ConvertToVector("Dots Left"),output: { InteractionType: 1 }},
    {input: ConvertToVector("Dots Right"),output: { InteractionType: 1 }},
    {input: ConvertToVector("Dots L"),output: { InteractionType: 1 }},
    {input: ConvertToVector("Dots R"),output: { InteractionType: 1 }},
    {input: ConvertToVector("Dots L R"),output: { InteractionType: 1 }},
    {input: ConvertToVector("Vertical Dots Left"),output: { InteractionType: 1 }},
    {input: ConvertToVector("Vertical Dots Right"),output: { InteractionType: 1 }},
    {input: ConvertToVector("Vertical Dots L"),output: { InteractionType: 1 }},
    {input: ConvertToVector("Vertical Dots R"),output: { InteractionType: 1 }},
    {input: ConvertToVector("Vertical Dots L R"),output: { InteractionType: 1 }},
    {input: ConvertToVector("Carousel Left"),output: { InteractionType: 1 }},
    {input: ConvertToVector("Carousel Right"),output: { InteractionType: 1 }},
    {input: ConvertToVector("Carousel L"),output: { InteractionType: 1 }},
    {input: ConvertToVector("Carousel R"),output: { InteractionType: 1 }},
    {input: ConvertToVector("Carousel L R"),output: { InteractionType: 1 }},
    {input: ConvertToVector("Interaction Hotspots"),output: { InteractionType: 1 }},
    {input: ConvertToVector("Step-by-Step Left"),output: { InteractionType: 1 }},
    {input: ConvertToVector("Step-by-Step Right"),output: { InteractionType: 1 }},
    {input: ConvertToVector("Step-by-Step L"),output: { InteractionType: 1 }},
    {input: ConvertToVector("Step-by-Step R"),output: { InteractionType: 1 }},
    {input: ConvertToVector("Step-by-Step L R"),output: { InteractionType: 1 }},
    {input: ConvertToVector("Flip Cards Image"),output: { InteractionType: 1 }},
    {input: ConvertToVector("Scroll Cards Image"),output: { InteractionType: 1 }},
    {input: ConvertToVector("Picture Left"),output: { InteractionType: 1 }},
    {input: ConvertToVector("Picture L"),output: { InteractionType: 1 }},
    {input: ConvertToVector("Picture Right"),output: { InteractionType: 1 }},
    {input: ConvertToVector("Picture R"),output: { InteractionType: 1 }},
    {input: ConvertToVector("Picture L R"),output: { InteractionType: 1 }},
    {input: ConvertToVector("Picture Center"),output: { InteractionType: 1 }}
]

function IntermediateCalc (x,y) {
    let difference = Math.floor(x/y);
    return difference;
}

let ArrSizeDifference = IntermediateCalc (filteredVectors.length, initialInteractionsData.length);





 let DataForNeural = [    
  ...filteredVectors.map((el) => ({
    input: el,
    output: { NotInteraction: 1 },
  })),
];






for (let i = 0; i < ArrSizeDifference; i++) {
    DataForNeural = DataForNeural.concat(initialInteractionsData);
    console.log(i);
}


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

console.log(PredictionResult('Explore each element in the tabs below.'));




/* 
const testData = [
    { input: "Accordion", output: "InteractionType" },
    { input: "Tabs", output: "InteractionType" },
    { input: "Tab", output: "InteractionType" },
    { input: "Dots", output: "InteractionType" },
    { input: "Flip Cards", output: "InteractionType" },
    { input: "Scroll Cards", output: "InteractionType" },
    { input: "Carousel", output: "InteractionType" },
    { input: "Hotspots", output: "InteractionType" },
    { input: "Step-by-Step", output: "InteractionType" },
    { input: "Interaction Accordion", output: "InteractionType" },
    {
      input: "Interaction (Accordion with a Graphic on the L/R)",
      output: "InteractionType",
    },
    {
      input: "Interaction (Accordion with a Graphic on the L)",
      output: "InteractionType",
    },
    {
      input: "Interaction (Accordion with a Graphic on the R)",
      output: "InteractionType",
    },
    { input: "Interaction Tabs", output: "InteractionType" },
    { input: "Interaction (Tabs Picture Left)", output: "InteractionType" },
    { input: "Interaction (Tabs Picture Right)", output: "InteractionType" },
    { input: "Interaction (Tabs with a Graphic on the L)", output: "InteractionType" },
    { input: "Interaction (Tabs with a Graphic on the R)", output: "InteractionType" },
    {
      input: "Interaction (Vertical Tabs with a Graphic on the L)",
      output: "InteractionType",
    },
    {
      input: "Interaction (Vertical Tabs with a Graphic on the R)",
      output: "InteractionType",
    },
    { input: "Interaction Dots", output: "InteractionType" },
    { input: "Interaction (Vertical Dots)", output: "InteractionType" },
    {
      input: "Interaction (Vertical Dots with a Graphic on the L)",
      output: "InteractionType",
    },
    {
      input: "Interaction (Vertical Dots with a Graphic on the R)",
      output: "InteractionType",
    },
    {
      input: "Interaction (Dots with a Graphic on the L)",
      output: "InteractionType",
    },
    {
      input: "Interaction (Dots with a Graphic on the R)",
      output: "InteractionType",
    },
    { input: "Interaction Flip Cards", output: "InteractionType" },
    { input: "Interaction Scroll Cards", output: "InteractionType" },
    { input: "Interaction Carousel", output: "InteractionType" },
    { input: "Interaction Hotspots", output: "InteractionType" },
    { input: "Interaction Step-by-Step", output: "InteractionType" },
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
console.log(`Accuracy: ${accuracy}%`);  */
