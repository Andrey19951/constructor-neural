// Подключение предварительно обученной сети
const PredictionResult = require('./ModelWithWholeWords');

const brain = require('brain.js');
const fs = require('fs');


const trainedNetwork = fs.readFileSync('trainedNetwork.json', 'utf8');
const net = new brain.NeuralNetwork();
net.fromJSON(JSON.parse(trainedNetwork));

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
    console.log(PredictionResult(net, 'Dots -  Vertical '));