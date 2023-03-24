const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');

async function loadModel() {
    const model = await tf.loadLayersModel('file://./plugin/NGINX/model/model.json');
    return model;
}

const accessLogData = fs.readFileSync('./plugin/NGINX/Train/test/access.log', 'utf8');

function parseNginxLogs(logData) {
    const logs = logData.split('\n');
    const logRegex = /^(\S+) - - \[(.+)\] "(\S+) (.+?) (\S+)" (\d+) (\d+) "([^"]*)" "([^"]*)"/;

    const parsedLogs = logs.map((log) => {
        const match = log.match(logRegex);

        if (match) {
            return {
                ip: match[1],
                timestamp: match[2],
                method: match[3],
                uri