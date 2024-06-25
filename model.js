const brain = require('brain.js');
const fs = require('fs');


const trainingData = [
  { input: 'interaction tabs regular', output: 'tabsreg' },
  { input: 'interaction tabs picture on right', output: 'tabsright' },
  { input: 'interaction tabs picture on left', output: 'tabsleft' },
  { input: 'tabs regular', output: 'tabsreg' },
  { input: 'tabs right', output: 'tabsright' },
  { input: 'tabs left', output: 'tabsleft' }
];


function transformInteractionName (str) {
  str = str.replaceAll(/\W/g, '');
  str = str.toLowerCase();
  return str;
}


const testData = [
  {input: transformInteractionName('Tabs – Regular'), output: 'tabsreg'},
  {input: transformInteractionName('Interaction (Tabs – Regular)'), output: 'tabsreg'},
  {input: transformInteractionName(' Interaction (Tabs Picture on Right) '), output: 'tabsright'},
  {input: transformInteractionName(' Interaction (Tabs Picture Right) '), output: 'tabsright'},
  {input: transformInteractionName(' Interaction (Tabs Picture on Left) '), output: 'tabsleft'},
  {input: transformInteractionName(' Interaction (Tabs Picture Left) '), output: 'tabsleft'},
]

const net = new brain.recurrent.LSTM({
  activation: 'tanh'
});

net.train(trainingData, {
  hiddenLayers: [3],
  iterations: 2000
});



// Оценка производительности модели на тестовой выборке
let correctPredictions = 0;
for (let i = 0; i < testData.length; i++) {
  const input = testData[i].input;
  const expectedOutput = testData[i].output;
  const predictedOutput = net.run(input);
  console.log(predictedOutput)
  if (predictedOutput[0] === expectedOutput[0]) {
    correctPredictions++;
  }
}

const accuracy = correctPredictions / testData.length;
console.log('Accuracy:', accuracy);


fs.writeFileSync('trainedNetwork.json', JSON.stringify(net.toJSON()));


/* Функция для преобразования в нижний регистр и удаления скобок и прочих знаков */
