// Подключение предварительно обученной сети
/* const PredictionResult = require('./ModelWithJustWords.js'); */

const brain = require('brain.js');
const fs = require('fs');

let data = fs.readFileSync("arrWithoutSpam.json", "utf8");
let arrfromTiny = JSON.parse(data);






const StringtoArray = (string) => {
    string = string.replace(/[^a-zA-Z0-9\s]/g, "");
    string = string.replace(/\s{2,}/g, ' ');
    string = string.toLowerCase();
    return string.split(" ");
  };

  
  const ConvertToVector = (text) => {
    let textTokens = StringtoArray(text);
    let vector = [];
    Object.keys(WordDictionary).forEach((word) => {
      vector.push(textTokens.includes(word) ? 1 : 0);
    });
    return vector;
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



const trainedNetwork = fs.readFileSync('trainedNetwork.json', 'utf8');
const currentNet = new brain.NeuralNetwork();
currentNet.fromJSON(JSON.parse(trainedNetwork));

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

console.log(PredictionResult(currentNet, 'Interaction (Tabs/Carousel?)'));
// Загружаем предварительно обученную сеть из файла
/* const trainedNetwork = fs.readFileSync('trainedNetwork.json', 'utf8');
const net = new brain.recurrent.LSTM();
net.fromJSON(JSON.parse(trainedNetwork));

// Используем предварительно обученную сеть для работы с данными
function transformInteractionName (str) {
    str = str.replaceAll(/\W/g, '');
    str = str.toLowerCase();
    return str;
} */
/*     const testData = [
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
        const predictedOutput = PredictionResult(currentNet, input);
        console.log(
          `Input: ${input}, Expected: ${expectedOutput}, Predicted: ${predictedOutput}`
        );
        if (predictedOutput === expectedOutput) {
          correctPredictions++;
        }
      }
      
      const accuracy = (correctPredictions / testData.length) * 100;
      console.log(`Accuracy: ${accuracy}%`); */