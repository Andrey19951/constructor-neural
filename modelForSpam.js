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
    { input: ConvertToVector('Tabs'), output: { TabsRegular: 1 } },
    { input: ConvertToVector('Tab'), output: { TabsRegular: 1 } },
    { input: ConvertToVector('Dots'), output: { DotsRegular: 1 } },
    { input: ConvertToVector('Flip Cards'), output: { FlipCards: 1 } },
    { input: ConvertToVector('Scroll Cards'), output: { ScrollCards: 1 } },
    { input: ConvertToVector('Carousel'), output: { Carousels: 1 } },
    { input: ConvertToVector('Hotspots'), output: { Hotspots: 1 } },
    { input: ConvertToVector('Step-by-Step'), output: { StepbyStep: 1 } },
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
    
  ] , {
    iterations: 20000,
    errorThresh: 0.011
  });

  const PredictionResult = (string) => {
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