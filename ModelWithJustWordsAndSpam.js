const brain = require("brain.js");
const fs = require("fs");

let data = fs.readFileSync("arrWithoutSpam.json", "utf8");
let arrfromTiny = [
  " ",
  "Introduction ",
  "Picture (L with text)",
  "GD (1 graphic) -- Use this header style to request graphics",
  "Text   ",
  "After completing this lesson, you will be able to:",
  "Define business communication and list its functions\nIdentify the four types of business communication and the benefits of each one\nList the skills needed for effective communication",
  "It's time to get started! ",
  "Theoretical Material ",
  "Definition and Functions",
  "Text",
  "Poor communication can lead to misunderstandings, misinterpretations, wasted time, and, ultimately, lost revenue. Effective communication ensures everyone is on the same page and working toward a common goal, which promotes productivity and success.",
  "Effective communication is the process of sharing information or ideas and ensuring everyone understands each other. To communicate effectively, you need to understand the message being shared and the emotion, intention, and purpose behind it. Communication should result in all participants feeling content with the result, meaning that they not only understand each other but also agree with what was said.",
  "The four key elements of effective communication are:",
  "Message\nEmotion\nIntention\nPurpose",
  "Explore each element in the tabs below.",
  "Interaction (Tabs – Regular)",
  "Click each tab to see more information.",
  "Watch the video below for more (duration: 3.5 min).",
  "Video   ",
  "Now, test yourself to see if you can identify all four key elements of effective communication in the letter below.",
  "Text (Shadowbox)",
  "                                                                                                           (Optional) Background Color: #XXXXXX",
  "Use the accordion below to check how accurately you identified the key elements of effective communication.",
  "Interaction (Accordion)",
  "Click the heading to see more information.",
  "GR: # Large Graphics",
  "The main difference between business and general communication is the setting, or context, in which they occur. Business communication happens within the context of work or professional organizations, and it is usually more formal and structured and focuses on achieving specific organizational goals. General communication happens in various social contexts, such as among family, friends, and casual acquaintances, and is less formal and more free-flowing.",
  "The purpose of business communication is to convey information, solve problems, make decisions, and develop relationships within a professional context. It is often related to business transactions and decision-making processes. General communication serves a wider range of purposes, such as socialization, entertainment, information-sharing, and expressing emotions. Read the article Business Communication or General Communication: What's the difference? (study time: 10 min) to learn several more differences.",
  "In short, business communication is a formal type of communication that occurs within the context of work or professional organizations and focuses on achieving specific organizational goals. Any business communication should strive for inclusivity. This means it should consider the different contexts of all participating parties. This will prevent bias and give all participants an equal opportunity to express themselves and influence the results of the communication. In inclusive communication, it is recommended to use universal phrases, as not everyone shares the same background and experiences. It's important to avoid using language and terms that may alienate certain people or groups. This includes any business/industry jargon, acronyms, and even some seemingly \"common\" idioms that don't translate well globally. Learn more about inclusive language in the accordion below.",
  "Click each heading to see more information.",
  "Business communication is essential for conveying information, solving problems, making decisions, and developing relationships within a professional context. Read the article What is Business Communication, and why is it important? (study time: 10 min) and watch the video Learn the Importance of Business Communication (duration: 3 min) to explore the different features of business communication.",
  "Now that you know what business communication is and how it differs from general communication, explore its different functions. Effective communication is essential for the success of any organization and its activities. It helps establish common goals, allows ideas to be exchanged, encourages collaboration, increases efficiency, and improves decision-making.",
  "Interaction (Hotspots)",
  "Click each + button in the graphic below to see more information.",
  "Read the article The Functions of Business Communication for more (study time: 10 min).",
  "Check Your Understanding ",
  "Quiz (Checkboxes – Select All)",
  'Read the question below and select all the answers that are correct. Then, click "Submit."',
  "Communication Flows",
  "Business communication flows in various directions, including upward, downward, horizontally, and diagonally. Explore these directions in the scheme below.",
  "Read the article 4 Types of Business Communication and How They Benefit Your Business to learn the useful features of each type of communication flow (study time: 10 min). Additionally, you can watch the following videos to delve even deeper into the different types of business communication:",
  "Formal Communication||Flow of Communication||Business Communication (optional, duration: 6 min)\nFlow of Communications (optional, duration: 27 min)",
  "Quiz (Multiple Choice – Select One)",
  'Read the question below and select the correct answer. Then, click "Submit."',
  "Communication Skills",
  "Link",
  "Some important communication skills are the following:",
  "Active listening\nGiving and receiving constructive feedback\nManaging emotions\nUse technology to communicate effectively",
  "Watch the videos below for more (total duration: 21.5 min).",
  "Interaction (Carousel with video) ",
  "Click the arrows to navigate through the videos below. Click Play to watch the video. ",
  "Effective communication skills are critical for businesses to succeed in today's global economy. One aspect of communication that is becoming increasingly important for businesses operating in multinational or global contexts is cross-cultural communication.",
  "Multinational communication involves the exchange of information, ideas, and opinions among individuals from different cultures or regions. Communication styles, norms, and values can differ greatly across cultures, and organizations must be aware of these differences to communicate effectively. Companies operating across borders must understand how to navigate these differences and respect cultural diversity to achieve success.",
  "To effectively build communication in a multinational organization, it is necessary to use the principle of inclusivity. Inclusive communication is about inviting and considering ideas of diverse groups of employees who can represent identities different from yours (a different race, ethnicity, gender, sexual orientation, age, ability, socioeconomic status, appearance, etc.) and using language that will not articulate or imply ideas that are sexist, racist, or otherwise biased, prejudiced, or denigrating to any particular group of people.",
  "Take the course Multinational Communication in the Workplace for details (total study time: 40 min).",
  "Quiz   ",
  "Knowledge Check  ",
  "Practice  ",
  "Pre-Task Instructions  ",
  "Picture (L with text)   ",
  "Using 7Cs",
  "In this task, you will evaluate how much the proposed letters below align with the 7Cs of effective communication.",
  "This assignment should take you about 30 minutes.  ",
  "Please be aware that the task is mandatory.  ",
  "You can earn a maximum of 5 points for this task.  ",
  "You can use the table below to evaluate your work.",
  "Task Description:",
  "Read the letters.\nExplain which of the 7Cs are violated in each letter.",
  "Picture (R with text)",
  "Write down your answers in a file. The file can have the following extensions: .pdf, .doc, .docx. Then, attach the file with your answers in the field below.",
  "Writing a Letter With 7 Cs",
  "In this task, you will try to write a letter that aligns with the 7Cs of effective communication yourself.",
  "This assignment should take you about 1 hour.  ",
  "  ",
  "You can earn a maximum of 10 points for this task.  ",
  "Write a letter using the 7Cs.\nWrite down your answer in a file. The file can have the following extensions: .pdf, .doc, .docx. Then, attach the file with your answers in the field below.",
  "Summary   ",
  "Summary  ",
  "Course Completion  ",
  "Course Completion ",
];

const StringtoArray = (string) => {
  string = string.replace(/[^a-zA-Z0-9\s]/g, "");
  string = string.replace(/\s{2,}/g, " ");
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
  "Step by Step",
  "Left",
  "Right",
  "L",
  "R",
  "Interaction",
  "Image",
  "Picture",
  "Center",
];

const spamExpressions = [
  "Space",
  "Graded question: 1 point – 1 attempt",
  "Show the correct answer once all attempts have finished.",
  "GR: 1 Large  centered Graphic",
  "GR: # Large Graphics",
  "GD (1 graphic) -- Use this header style to request graphics",
  "Mockup. Redesign, please.",
  "GD (1 large graphic)",
  "GD (1 small graphic)",
  "End of the storyboard",
  "Text",
  "(Optional) Background Color: #XXXXXX",
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
  "Step by Step",
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

const InteractionSet = trainingData.map((text) => ConvertToVector(text));
const SpamSet = spamExpressions.map((text) => ConvertToVector(text));
const firstSet = InteractionSet.concat(SpamSet);

const excludedWords = getWordsFromVectors(firstSet, WordDictionary);

let filteredVectors = createFilteredVectors(WordDictionary, excludedWords);

filteredVectors = filteredVectors.splice(0, firstSet.length);

let DataForNeural = [
  ...spamExpressions.map((el) => ({
    input: ConvertToVector(el),
    output: { spam: 1 },
  })),
  { input: ConvertToVector("Accordion"), output: { AccordionRegular: 1 } },
  { input: ConvertToVector("Tabs"), output: { TabsRegular: 1 } },
  { input: ConvertToVector("Vertical Tabs"), output: { VertTabsRegular: 1 } },
  { input: ConvertToVector("Dots"), output: { DotsRegular: 1 } },
  {
    input: ConvertToVector("Vertical Dots"),
    output: { VerticalDotsRegular: 1 },
  },
  { input: ConvertToVector("Flip Cards"), output: { FlipCardsRegular: 1 } },
  { input: ConvertToVector("Flip Cards"), output: { FlipCardsRegular: 1 } },
  { input: ConvertToVector("Scroll Cards"), output: { ScrollCardsRegular: 1 } },
  { input: ConvertToVector("Scroll Cards"), output: { ScrollCardsRegular: 1 } },
  { input: ConvertToVector("Carousel"), output: { CarouselRegular: 1 } },
  { input: ConvertToVector("Hotspots"), output: { HotspotsRegular: 1 } },
  { input: ConvertToVector("Hotspots"), output: { HotspotsRegular: 1 } },
  { input: ConvertToVector("Step-by-Step"), output: { SBSRegular: 1 } },
  { input: ConvertToVector("Step by Step"), output: { SBSRegular: 1 } },
  { input: ConvertToVector("Accordion Left"), output: { AccordionLeft: 1 } },
  { input: ConvertToVector("Accordion Right"), output: { AccordionRight: 1 } },
  { input: ConvertToVector("Accordion L"), output: { AccordionLeft: 1 } },
  { input: ConvertToVector("Accordion R"), output: { AccordionRight: 1 } },
  { input: ConvertToVector("Accordion L R"), output: { AccordionRegular: 1 } },
  { input: ConvertToVector("Accordion Graphic L R"), output: { AccordionRegular: 1 } },
  { input: ConvertToVector("Tabs Left"), output: { TabsLeft: 1 } },
  { input: ConvertToVector("Tabs Right"), output: { TabsRight: 1 } },
  { input: ConvertToVector("Tabs L"), output: { TabsLeft: 1 } },
  { input: ConvertToVector("Tabs R"), output: { TabsRight: 1 } },
  { input: ConvertToVector("Tabs L R"), output: { TabsRegular: 1 } },
  { input: ConvertToVector("Vertical Tabs Left"), output: { VertTabsLeft: 1 } },
  {
    input: ConvertToVector("Vertical Tabs Right"),
    output: { VertTabsRight: 1 },
  },
  { input: ConvertToVector("Vertical Tabs L"), output: { VertTabsLeft: 1 } },
  { input: ConvertToVector("Vertical Tabs R"), output: { VertTabsRight: 1 } },
  {
    input: ConvertToVector("Vertical Tabs L R"),
    output: { VertTabsRegular: 1 },
  },
  { input: ConvertToVector("Dots Left"), output: { DotsLeft: 1 } },
  { input: ConvertToVector("Dots Right"), output: { DotsRight: 1 } },
  { input: ConvertToVector("Dots L"), output: { DotsLeft: 1 } },
  { input: ConvertToVector("Dots R"), output: { DotsRight: 1 } },
  { input: ConvertToVector("Dots L R"), output: { DotsRegular: 1 } },
  {
    input: ConvertToVector("Vertical Dots Left"),
    output: { VerticalDotsLeft: 1 },
  },
  {
    input: ConvertToVector("Vertical Dots Right"),
    output: { VerticalDotsRight: 1 },
  },
  {
    input: ConvertToVector("Vertical Dots L"),
    output: { VerticalDotsLeft: 1 },
  },
  {
    input: ConvertToVector("Vertical Dots R"),
    output: { VerticalDotsRight: 1 },
  },
  {
    input: ConvertToVector("Vertical Dots L R"),
    output: { VerticalDotsRegular: 1 },
  },
  { input: ConvertToVector("Carousel Left"), output: { CarouselLeft: 1 } },
  { input: ConvertToVector("Carousel Right"), output: { CarouselRight: 1 } },
  { input: ConvertToVector("Carousel L"), output: { CarouselLeft: 1 } },
  { input: ConvertToVector("Carousel R"), output: { CarouselRight: 1 } },
  { input: ConvertToVector("Carousel L R"), output: { CarouselRegular: 1 } },
  { input: ConvertToVector("Step-by-Step Left"), output: { SBSLeft: 1 } },
  { input: ConvertToVector("Step-by-Step Right"), output: { SBSRight: 1 } },
  { input: ConvertToVector("Step-by-Step L"), output: { SBSLeft: 1 } },
  { input: ConvertToVector("Step-by-Step R"), output: { SBSRight: 1 } },
  { input: ConvertToVector("Step-by-Step L R"), output: { SBSRegular: 1 } },
  { input: ConvertToVector("Step by Step Left"), output: { SBSLeft: 1 } },
  { input: ConvertToVector("Step by Step Right"), output: { SBSRight: 1 } },
  { input: ConvertToVector("Step by Step L"), output: { SBSLeft: 1 } },
  { input: ConvertToVector("Step by Step R"), output: { SBSRight: 1 } },
  { input: ConvertToVector("Step by Step L R"), output: { SBSRegular: 1 } },
  { input: ConvertToVector("Flip Cards Image"), output: { FlipCardsImage: 1 } },
  { input: ConvertToVector("Flip Cards Image"), output: { FlipCardsImage: 1 } },
  {
    input: ConvertToVector("Scroll Cards Image"),
    output: { ScrollCardsImage: 1 },
  },
  {
    input: ConvertToVector("Scroll Cards Image"),
    output: { ScrollCardsImage: 1 },
  },
  { input: ConvertToVector("Picture Left"), output: { PicLeft: 1 } },
  { input: ConvertToVector("Picture L"), output: { PicLeft: 1 } },
  { input: ConvertToVector("Picture Right"), output: { PicRight: 1 } },
  { input: ConvertToVector("Picture R"), output: { PicRight: 1 } },
  { input: ConvertToVector("Picture L R"), output: { PicLefft: 1 } },
  { input: ConvertToVector("Picture Center"), output: { PicCenter: 1 } },
  { input: ConvertToVector("Picture Center"), output: { PicCenter: 1 } },
  { input: ConvertToVector("Hotspots"), output: { HotspotsRegular: 1 } },
  ...filteredVectors.map((el) => ({
    input: el,
    output: { NotInteraction: 1 },
  })),
];

const net = new brain.NeuralNetwork({
  hiddenLayers: [30],
  learningRate: 0.01,
});

net.train(DataForNeural, {
  iterations: 20000,
  log: true,
  logPeriod: 1000,
  errorThresh: 0.005,
});

const PredictionResult = (net, string) => {
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

fs.writeFileSync('trainedNetwork.json', JSON.stringify(net.toJSON()));

module.exports = PredictionResult;

const testData = [
  { input: "GD (1 large graphic)", output: "spam" },
  { input: "GD (1 small graphic)", output: "spam" },
  { input: "Text", output: "spam" },
  { input: "Step by Step", output: "SBSRegular" },
  { input: "Accordion", output: "AccordionRegular" },
  { input: "Tabs", output: "TabsRegular" },
  { input: "Tab", output: "NotInteraction" },
  { input: "Dots", output: "DotsRegular" },
  { input: "Flip Cards", output: "FlipCardsRegular" },
  { input: "Scroll Cards", output: "ScrollCardsRegular" },
  { input: "Carousel", output: "CarouselRegular" },
  { input: "Hotspots", output: "HotspotsRegular" },
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
  const predictedOutput = PredictionResult(net, input);
  console.log(
    `Input: ${input}, Expected: ${expectedOutput}, Predicted: ${predictedOutput}`
  );
  if (predictedOutput === expectedOutput) {
    correctPredictions++;
  }
}

const accuracy = (correctPredictions / testData.length) * 100;
console.log(`Accuracy: ${accuracy}%`);
