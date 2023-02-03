const tf = require('@tensorflow/tfjs-node');
const fs = require("fs");

function tokenizeText(text) {
  return text.split(" ");
}

function preprocessText(text) {
  const lowercasedText = text.toLowerCase();

  return lowercasedText;
}

function createModel(vocabSize, inputDim) {
  const model = tf.sequential();
  model.add(
    tf.layers.embedding({
      inputDim: vocabSize,
      outputDim: inputDim,
      inputLength: null,
    })
  );
  model.add(
    tf.layers.bidirectional({
      layer: tf.layers.simpleRNN({ units: 16, returnSequences: true }),
      mergeMode: 'concat',
    }),
  );
  model.add(
    tf.layers.bidirectional({
      layer: tf.layers.simpleRNN({ units: 16 }),
      mergeMode: 'concat',
    }),
  );
  model.add(tf.layers.dense({ units: 1, activation: "sigmoid" }));

  model.compile({
    optimizer: "adam",
    loss: "binaryCrossentropy"