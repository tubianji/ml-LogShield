const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');
const path = require('path');

function readLogs(dir) {
    const files = fs.readdirSync(dir);
    let logDataArray = [];

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const fileData = fs.readFileSync(filePath, 'utf8');
        logDataArray.push(fileData);
    });

    return logDataArray;
}
const accessLogDataArray = readLogs('./plugin/NGINX/Train/normal');
const maliciousLogDataArray = readLogs('./plugin/NGINX/Train/malicious');

function parseNginxLogs(logData) {
    const logs = logData.split('\n');
    const logRegex = /^(\S+) 