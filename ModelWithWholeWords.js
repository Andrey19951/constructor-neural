const brain = require("brain.js");
const fs = require('fs');

/* Model for only intercation typ (without modifications) */
const StringtoArray = (string) => {
  string = string.replace(/[^a-zA-Z0-9\s]/g, "");
  string = string.toLowerCase();
  transformed = string.split(" ");
  return transformed;
};

const WordDictionary = {};

const InteractionTypes = [
  "Accordion",
  "Tabs",
  "Tab",
  "Dots",
  "Flip Cards",
  "Scroll Cards",
  "Carousel",
  "Hotspots",
  "Step-by-Step",
  "Step by Step",
  "Interaction Accordion",
  "Interaction (Accordion with a Graphic on the L/R)",
  "Interaction (Accordion with a Graphic on the L)",
  "Interaction (Accordion with a Graphic on the R)",
  "Interaction Tabs",
  "Interaction (Tabs Picture Left)",
  "Interaction (Tabs Picture Right)",
  "Interaction (Tabs with a Graphic on the L)",
  "Interaction (Tabs with a Graphic on the R)",
  "Interaction (Vertical Tabs with a Graphic on the L)",
  "Interaction (Vertical Tabs with a Graphic on the R)",
  "Interaction Dots",
  "Interaction (Vertical Dots)",
  "Interaction (Vertical Dots with a Graphic on the L)",
  "Interaction (Vertical Dots with a Graphic on the R)",
  "Interaction (Dots with a Graphic on the L)",
  "Interaction (Dots with a Graphic on the R)",
  "Interaction Flip Cards",
  "Interaction Scroll Cards",
  "Interaction Carousel",
  "Interaction Hotspots",
  "Interaction Step-by-Step",
  "Checkboxes",
  "Multiple Choice",
  "Quiz"
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



  const ConvertToVector = (text) => {
    let textTokens = StringtoArray(text);
    let vector = {};
    textTokens.forEach((token) => {
      if (WordDictionary[token]) {
        vector[token] = WordDictionary[token];
        vector[token]++;
      }
    });
    
    return vector;
  }


  const net = new brain.NeuralNetwork({
    hiddenLayers: [20]
  });
  
  net.train([
    { input: ConvertToVector('Accordion'), output: { AccordionRegular: 1 } },
    { input: ConvertToVector('Accordion Left'), output: { AccordionLeft: 1 } },
    { input: ConvertToVector('Accordion Right'), output: { AccordionRight: 1 } },
    { input: ConvertToVector('Tabs'), output: { TabsRegular: 1 } },
    { input: ConvertToVector('Tabs Right'), output: { TabsRight: 1 } },
    { input: ConvertToVector('Tabs Left'), output: { TabsLeft: 1 } },
    { input: ConvertToVector('Tab'), output: { TabsRegular: 1 } },
    { input: ConvertToVector('Tab Right'), output: { TabsRight: 1 } },
    { input: ConvertToVector('Tab Left'), output: { TabsLeft: 1 } },
    { input: ConvertToVector('Dots'), output: { DotsRegular: 1 } },
    { input: ConvertToVector('Flip Cards'), output: { FlipCards: 1 } },
    { input: ConvertToVector('Scroll Cards'), output: { ScrollCards: 1 } },
    { input: ConvertToVector('Carousel'), output: { Carousels: 1 } },
    { input: ConvertToVector('Hotspots'), output: { Hotspots: 1 } },
    { input: ConvertToVector('Step-by-Step'), output: { StepbyStep: 1 } },
    { input: ConvertToVector('Step by Step'), output: { StepbyStep: 1 } },
    { input: ConvertToVector('Interaction Accordion'), output: { AccordionRegular: 1 } },
    { input: ConvertToVector('Interaction (Accordion with a Graphic on the L/R)'), output: { AccordionLeft: 1 } },
    { input: ConvertToVector('Interaction (Accordion with a Graphic on the L)'), output: { AccordionLeft: 1 } },
    { input: ConvertToVector('Interaction (Accordion with a Graphic on the R)'), output: { AccordionRight: 1 } },
    { input: ConvertToVector('Interaction Tabs'), output: { TabsRegular: 1 } },
    { input: ConvertToVector('Interaction (Tabs Picture Left)'), output: { TabsLeft: 1 } },
    { input: ConvertToVector('Interaction (Tabs Picture Right)'), output: { TabsRight: 1 } },
    { input: ConvertToVector('Interaction (Tabs with a Graphic on the L)'), output: { TabsLeft: 1 } },
    { input: ConvertToVector('Interaction (Tabs with a Graphic on the R)'), output: { TabsRight: 1 } },
    { input: ConvertToVector('Interaction (Vertical Tabs with a Graphic on the L)'), output: { VerticalTabs: 1 } },
    { input: ConvertToVector('Interaction (Vertical Tabs with a Graphic on the R)'), output: { VerticalTabs: 1 } },
    { input: ConvertToVector('Interaction Dots'), output: { DotsRegular: 1 } },
    { input: ConvertToVector('Interaction (Vertical Dots)'), output: { DotsVerticalRegular: 1 } },
    { input: ConvertToVector('Interaction (Vertical Dots with a Graphic on the L)'), output: { DotsVerticalLeft: 1 } },
    { input: ConvertToVector('Interaction (Vertical Dots with a Graphic on the R)'), output: { DotsVerticalRight: 1 } },
    { input: ConvertToVector('Interaction (Dots with a Graphic on the L)'), output: { DotsRegularLeft: 1 } },
    { input: ConvertToVector('Interaction (Dots with a Graphic on the R)'), output: { DotsRegularRight: 1 } },
    { input: ConvertToVector('Interaction Flip Cards'), output: { FlipCards: 1 } },
    { input: ConvertToVector('Interaction Scroll Cards'), output: { ScrollCards: 1 } },
    { input: ConvertToVector('Interaction Carousel'), output: { Carousels: 1 } },
    { input: ConvertToVector('Interaction Hotspots'), output: { Hotspots: 1 } },
    { input: ConvertToVector('Interaction Step-by-Step'), output: { StepbyStep: 1 } },
    { input: ConvertToVector('Interaction Step by Step'), output: { StepbyStep: 1 } },
    
  ] , {
    iterations: 25000,
    errorThresh: 0.011
  });
  
  /* fs.writeFileSync('trainedNetwork.json', JSON.stringify(net.toJSON())); */

  const PredictionResult = (net, string) => {
    result = net.run(ConvertToVector(string));
    maxKey = null;
    maxValue = 0;
  
    for (const key in result) {
      if (result[key] > maxValue) {
        maxValue = result[key];
        maxKey = key;
      }
    }
  
    return maxKey;
  };


/*   const testData = [
    { input: 'Accordion',output:'AccordionRegular'},
    { input: 'Tabs',output:'TabsRegular'},
    { input: 'Tab',output:'TabsRegular'},
    { input: 'Dots',output:'DotsRegular'},
    { input: 'Flip Cards',output:'FlipCards'},
    { input: 'Scroll Cards',output:'ScrollCards'},
    { input: 'Carousel',output:'Carousels'},
    { input: 'Hotspots',output:'Hotspots'},
    { input: 'Step-by-Step',output:'StepbyStep'},
    { input: 'Interaction Accordion',output:'AccordionRegular'},
    { input: 'Interaction (Accordion with a Graphic on the L/R)',output:'AccordionLeft'},
    { input: 'Interaction (Accordion with a Graphic on the L)',output:'AccordionLeft'},
    { input: 'Interaction (Accordion with a Graphic on the R)',output:'AccordionRight'},
    { input: 'Interaction Tabs',output:'TabsRegular'},
    { input: 'Interaction (Tabs Picture Left)',output:'TabsLeft'},
    { input: 'Interaction (Tabs Picture Right)',output:'TabsRight'},
    { input: 'Interaction (Tabs with a Graphic on the L)',output:'TabsLeft'},
    { input: 'Interaction (Tabs with a Graphic on the R)',output:'TabsRight'},
    { input: 'Interaction (Vertical Tabs with a Graphic on the L)',output:'VerticalTabs'},
    { input: 'Interaction (Vertical Tabs with a Graphic on the R)',output:'VerticalTabs'},
    { input: 'Interaction Dots',output:'DotsRegular'},
    { input: 'Interaction (Vertical Dots)',output:'DotsVerticalRegular'},
    { input: 'Interaction (Vertical Dots with a Graphic on the L)',output:'DotsVerticalLeft'},
    { input: 'Interaction (Vertical Dots with a Graphic on the R)',output:'DotsVerticalRight'},
    { input: 'Interaction (Dots with a Graphic on the L)',output:'DotsRegularLeft'},
    { input: 'Interaction (Dots with a Graphic on the R)',output:'DotsRegularRight'},
    { input: 'Interaction Flip Cards',output:'FlipCards'},
    { input: 'Interaction Scroll Cards',output:'ScrollCards'},
    { input: 'Interaction Carousel',output:'Carousels'},
    { input: 'Interaction Hotspots',output:'Hotspots'},
    { input: 'Interaction Step-by-Step',output:'StepbyStep'}   
  ];

let correctPredictions = 0;
for (let i = 0; i < testData.length; i++) {
  const input = testData[i].input;
  const expectedOutput = testData[i].output;
  const predictedOutput = PredictionResult(net, input);
  console.log(predictedOutput)
  if (predictedOutput[0] === expectedOutput[0]) {
    correctPredictions++;
  }
}

const accuracy = correctPredictions / testData.length;
console.log('Accuracy:', accuracy); */


module.exports = PredictionResult;