const brain = require("brain.js");
const fs = require('fs');



// Функция нормализации строк
const StringtoArray = (string) => {
  string = string.replace(/[^a-zA-Z0-9\s]/g, "");
  string = string.toLowerCase();
  let transformed = string.split(" ");
  return transformed;
};

// Создание словаря слов
const WordDictionary = {};
const InteractionTypes = [
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

// Создание словаря слов из обучающей выборки

InteractionTypes.forEach((element) => {
  let tokens = StringtoArray(element);
  tokens.forEach((token) => {
    if (!WordDictionary[token]) {
      WordDictionary[token] = 0;
    }
    WordDictionary[token]++;
  });
});

// Преобразование текста в вектор
const ConvertToVector = (text) => {
  let textTokens = StringtoArray(text);
  let vector = [];
  Object.keys(WordDictionary).forEach((word) => {
    vector.push(textTokens.includes(word) ? 1 : 0);
  });
  return vector;
};

// Подготовка обучающего набора данных
const trainingData = [
  ...InteractionTypes.map(el => ({
    input: ConvertToVector(el), 
    output: {spam: 1}
  })),
  {input: ConvertToVector('Picture (L with text)'), output: {notspam: 1}},
  {input: ConvertToVector('crabss'), output: {notspam: 1}},
  {input: ConvertToVector('Based on the text provided below you can see some examples and implement them into you everyday life'), output: {notspam: 1}},
  {input: ConvertToVector('1231221adsdasadsda'), output: {notspam: 1}},
  {input: ConvertToVector('Interaction (Carousel with video) '), output: {notspam: 1}},
  {input: ConvertToVector('Interaction (Accordion)'), output: {notspam: 1}},
  {input: ConvertToVector('Shadowbox with a Graphic: Center'), output: {notspam: 1}},
  {input: ConvertToVector('Medium picture (left)'), output: {notspam: 1}},
  {input: ConvertToVector('Text (Shadowbox)'), output: {notspam: 1}},
  {input: ConvertToVector('Quiz grading: default graded (add other quiz setting if different)'), output: {notspam: 1}},
  {input: ConvertToVector('Usually, the main contact point (project manager, delivery manager, or solution architect) forwards the draft to the stakeholder(s).  '), output: {notspam: 1}},
  {input: ConvertToVector('Read the question below. Then, click each item and drag it into the correct location.'), output: {notspam: 1}},
];

// Создание и обучение нейронной сети
const net = new brain.NeuralNetwork({
  hiddenLayers: [3],
  learningRate: 0.01,
});

net.train(trainingData, {
  iterations: 20000,
  log: true,
  logPeriod: 500,
  errorThresh: 0.005,
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



/* Проверка точности

const testData = [
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
    { input: 'Effective business communication is important for successful business operations and growth. It allows businesses to convey information accurately, make decisions quickly and efficiently, and solve problems in a timely manner. It also helps build relationships with stakeholders, including customers, employees, and suppliers.',output:'notInteraction'},
    { input: 'If you are responsible for communications for a specific practice or location, topics will often come from your stakeholders based',output:'notInteraction'},
    { input: 'asdasdas asdsada qw121213 54543543435 sdfsdfsdffsd',output:'notInteraction'},
    { input: '',output:'notInteraction'}  
  ];






let correctPredictions = 0;
for (let i = 0; i < testData.length; i++) {
  const input = testData[i].input;
  const expectedOutput = testData[i].output;
  const predictedOutput = PredictionResult(input);
  console.log(predictedOutput)
  if (predictedOutput[0] === expectedOutput[0]) {
    correctPredictions++;
  }
}

const accuracy = correctPredictions / testData.length;
console.log('Accuracy:', accuracy);  */

/* для обнаружения спама */

function test2(str) {
  for (i = 0; i < spamWords.length; i++) {
    console.log(spamWords[i]);
    if (str.includes(spamWords[i])) {
      return true;
    }
  }

  return false;
}

/*  регулярочка для спама с GD, GR
/(GD|GR)\s*(\:|\s).*(graphic)/i  */

arrfromTiny = [
  " ",
  "Introduction ",
  "Picture (L with text)",
  "GD (1 graphic) -- Use this header style to request graphics",
  " ",
  "Text   ",
  "After completing this lesson, you will be able to:",
  "Define business communication and list its functions\nIdentify the four types of business communication and the benefits of each one\nList the skills needed for effective communication",
  " ",
  "Picture (L with text)",
  "GD (1 graphic) -- Use this header style to request graphics",
  "It's time to get started! ",
  " ",
  "Theoretical Material ",
  "Definition and Functions",
  "Picture (L with text)",
  "GD (1 graphic) -- Use this header style to request graphics",
  " ",
  "Text",
  "Poor communication can lead to misunderstandings, misinterpretations, wasted time, and, ultimately, lost revenue. Effective communication ensures everyone is on the same page and working toward a common goal, which promotes productivity and success.",
  "Effective communication is the process of sharing information or ideas and ensuring everyone understands each other. To communicate effectively, you need to understand the message being shared and the emotion, intention, and purpose behind it. Communication should result in all participants feeling content with the result, meaning that they not only understand each other but also agree with what was said.",
  " ",
  "The four key elements of effective communication are:",
  "Message\nEmotion\nIntention\nPurpose",
  "Explore each element in the tabs below.",
  " ",
  "Interaction (Tabs – Regular)",
  "Click each tab to see more information.",
  " ",
  " ",
  " ",
  " ",
  "Text",
  "Watch the video below for more (duration: 3.5 min).",
  " ",
  "Video   ",
  " ",
  "Text",
  "Now, test yourself to see if you can identify all four key elements of effective communication in the letter below.",
  " ",
  "Text (Shadowbox)",
  "                                                                                                           (Optional) Background Color: #XXXXXX",
  " ",
  "Text",
  "Use the accordion below to check how accurately you identified the key elements of effective communication.",
  " ",
  "Interaction (Accordion)",
  "Click the heading to see more information.",
  "GR: # Large Graphics",
  " ",
  "Text",
  "The main difference between business and general communication is the setting, or context, in which they occur. Business communication happens within the context of work or professional organizations, and it is usually more formal and structured and focuses on achieving specific organizational goals. General communication happens in various social contexts, such as among family, friends, and casual acquaintances, and is less formal and more free-flowing.",
  "The purpose of business communication is to convey information, solve problems, make decisions, and develop relationships within a professional context. It is often related to business transactions and decision-making processes. General communication serves a wider range of purposes, such as socialization, entertainment, information-sharing, and expressing emotions. Read the article Business Communication or General Communication: What's the difference? (study time: 10 min) to learn several more differences.",
  "In short, business communication is a formal type of communication that occurs within the context of work or professional organizations and focuses on achieving specific organizational goals. Any business communication should strive for inclusivity. This means it should consider the different contexts of all participating parties. This will prevent bias and give all participants an equal opportunity to express themselves and influence the results of the communication. In inclusive communication, it is recommended to use universal phrases, as not everyone shares the same background and experiences. It's important to avoid using language and terms that may alienate certain people or groups. This includes any business/industry jargon, acronyms, and even some seemingly \"common\" idioms that don't translate well globally. Learn more about inclusive language in the accordion below.",
  " ",
  "Interaction (Accordion)",
  "Click each heading to see more information.",
  " ",
  "Text",
  "Business communication is essential for conveying information, solving problems, making decisions, and developing relationships within a professional context. Read the article What is Business Communication, and why is it important? (study time: 10 min) and watch the video Learn the Importance of Business Communication (duration: 3 min) to explore the different features of business communication.",
  " ",
  "Now that you know what business communication is and how it differs from general communication, explore its different functions. Effective communication is essential for the success of any organization and its activities. It helps establish common goals, allows ideas to be exchanged, encourages collaboration, increases efficiency, and improves decision-making.",
  " ",
  "Interaction (Hotspots)",
  "Click each + button in the graphic below to see more information.",
  " ",
  " ",
  " ",
  " ",
  " ",
  "Text",
  "Read the article The Functions of Business Communication for more (study time: 10 min).",
  " ",
  "Check Your Understanding ",
  "Quiz (Checkboxes – Select All)",
  "Read the question below and select all the answers that are correct. Then, click \"Submit.\"",
  " ",
  "Communication Flows",
  "Picture (L with text)",
  " ",
  "Text",
  "Business communication flows in various directions, including upward, downward, horizontally, and diagonally. Explore these directions in the scheme below.",
  " ",
  "Interaction (Hotspots)",
  "Click each + button in the graphic below to see more information.",
  " ",
  " ",
  " ",
  " ",
  " ",
  "Text",
  "Read the article 4 Types of Business Communication and How They Benefit Your Business to learn the useful features of each type of communication flow (study time: 10 min). Additionally, you can watch the following videos to delve even deeper into the different types of business communication:",
  "Formal Communication||Flow of Communication||Business Communication (optional, duration: 6 min)\nFlow of Communications (optional, duration: 27 min)",
  " ",
  "Picture (L with text)",
  " ",
  "Check Your Understanding ",
  "Quiz (Multiple Choice – Select One)",
  "Read the question below and select the correct answer. Then, click \"Submit.\"",
  " ",
  "Communication Skills",
  "Picture (L with text)",
  "Link",
  "Text",
  "Some important communication skills are the following:",
  "Active listening\nGiving and receiving constructive feedback\nManaging emotions\nUse technology to communicate effectively",
  "Watch the videos below for more (total duration: 21.5 min).",
  " ",
  "Interaction (Carousel with video) ",
  "Click the arrows to navigate through the videos below. Click Play to watch the video. ",
  " ",
  " ",
  " ",
  " ",
  " ",
  "Text",
  "Effective communication skills are critical for businesses to succeed in today's global economy. One aspect of communication that is becoming increasingly important for businesses operating in multinational or global contexts is cross-cultural communication.",
  "Multinational communication involves the exchange of information, ideas, and opinions among individuals from different cultures or regions. Communication styles, norms, and values can differ greatly across cultures, and organizations must be aware of these differences to communicate effectively. Companies operating across borders must understand how to navigate these differences and respect cultural diversity to achieve success.",
  " ",
  "To effectively build communication in a multinational organization, it is necessary to use the principle of inclusivity. Inclusive communication is about inviting and considering ideas of diverse groups of employees who can represent identities different from yours (a different race, ethnicity, gender, sexual orientation, age, ability, socioeconomic status, appearance, etc.) and using language that will not articulate or imply ideas that are sexist, racist, or otherwise biased, prejudiced, or denigrating to any particular group of people.",
  " ",
  "Picture (L with text)",
  "Link",
  "Text",
  "Take the course Multinational Communication in the Workplace for details (total study time: 40 min).",
  " ",
  "Check Your Understanding ",
  "Quiz (Checkboxes – Select All)",
  "Read the question below and select all the answers that are correct. Then, click \"Submit.\"",
  " ",
  "Quiz   ",
  "Knowledge Check  ",
  "Picture (L with text)",
  " ",
  "Quiz (Checkboxes – Select All)",
  "Read the question below and select all the answers that are correct. Then, click \"Submit.\"",
  " ",
  "Quiz (Multiple Choice – Select One)",
  "Read the question below and select the correct answer. Then, click \"Submit.\"",
  " ",
  "Quiz (Multiple Choice – Select One)",
  "Read the question below and select the correct answer. Then, click \"Submit.\"",
  " ",
  "Practice  ",
  "Pre-Task Instructions  ",
  "Picture (L with text)   ",
  " ",
  "Using 7Cs",
  " ",
  "Text (Shadowbox)",
  "                                                                                                           (Optional) Background Color: #XXXXXX",
  " ",
  "In this task, you will evaluate how much the proposed letters below align with the 7Cs of effective communication.",
  " ",
  "This assignment should take you about 30 minutes.  ",
  " ",
  "Please be aware that the task is mandatory.  ",
  " ",
  "You can earn a maximum of 5 points for this task.  ",
  " ",
  "You can use the table below to evaluate your work.",
  " ",
  " ",
  " ",
  "Task Description:",
  "Read the letters.\nExplain which of the 7Cs are violated in each letter.",
  " ",
  "Picture (L with text)",
  " ",
  " ",
  "Picture (R with text)",
  " ",
  " ",
  "Picture (L with text)",
  " ",
  "Write down your answers in a file. The file can have the following extensions: .pdf, .doc, .docx. Then, attach the file with your answers in the field below.",
  " ",
  "Writing a Letter With 7 Cs",
  "In this task, you will try to write a letter that aligns with the 7Cs of effective communication yourself.",
  " ",
  "This assignment should take you about 1 hour.  ",
  " ",
  "Please be aware that the task is mandatory.  ",
  "  ",
  "You can earn a maximum of 10 points for this task.  ",
  " ",
  "You can use the table below to evaluate your work.",
  " ",
  "Task Description:",
  "Write a letter using the 7Cs.\nWrite down your answer in a file. The file can have the following extensions: .pdf, .doc, .docx. Then, attach the file with your answers in the field below.",
  " ",
  "Summary   ",
  "Summary  ",
  "Picture (L with text)",
  "GD (1 graphic) -- Use this header style to request graphics",
  " ",
  "Course Completion  ",
  "Course Completion ",
  "Picture (L with text)",
  "GD (1 graphic) -- Use this header style to request graphics",
  " "
]
/* 
arrfromTiny.forEach(el => {
  result = PredictionResult(el);
  if (result == 'spam') {
    console.log(el + ' ' + result);
  }
}); */

arrWithoutSpam = []
arrfromTiny.forEach(el => 
{
  result = PredictionResult(el);
  if (result !== 'spam') {
    arrWithoutSpam.push(el);
  }
}
);

console.log(arrWithoutSpam);
fs.writeFileSync('arrWithoutSpam.json', JSON.stringify(arrWithoutSpam));

