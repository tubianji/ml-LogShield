const tf = require('@tensorflow/tfjs-node');
const fs = require("fs");

function tokenizeText(text) {
  return text.split(" ");
}

function preprocessText(text) {
 