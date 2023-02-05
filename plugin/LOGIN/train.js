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
    loss: "binaryCrossentropy",
    metrics: ["accuracy"],
  });

  return model;
}


async function trainModel(model, xs, ys) {
  const numEpochs = 565;
  const batchSize = 32;

  await model.fit(xs, ys, {
    batchSize,
    epochs: numEpochs,
    shuffle: true,
    validationSplit: 0.2,
    callbacks:{
      onEpochEnd: async(epoch, logs) =>{
          console.log("Epoch:" + epoch + " Loss:" + logs.loss * 100);
      }
    }
  });
  await model.save('file://./model');
  console.log("Training and model save complete!");
  return true;
}

function processSequences(sequences, tokenizer, maxTimeSteps) {
  const processedSequences = sequences.map((seq) => {
    const wordIndices = seq.map((token) => tokenizer.wordIndex[token] || 0);

    let processedSeq = wordIndices;
    if (processedSeq.length > maxTimeSteps) {
      processedSeq = processedSeq.slice(0, maxTimeSteps);
    } else {
      while (processedSeq.length < maxTimeSteps) {
        processedSeq.push(0);
      }
    }

    return processedSeq;
  });
  return tf.tensor2d(processedSequences);
}

function groupLogLinesByIP(lines) {
  const ipPattern = /\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b/;
  const logGroups = new Map();

  for (const line of lines) {
    const match = line.match(ipPattern);
    if (match) {
      const ip = match[0];

      if (logGroups.has(ip)) {
        logGroups.get(ip).push(line);
      } else {
        logGroups.set(ip, [line]);