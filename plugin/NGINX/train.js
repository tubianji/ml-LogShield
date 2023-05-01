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
    const logRegex = /^(\S+) - - \[(.+)\] "(\S+) (.+?) (\S+)" (\d+) ?(\d+)? "([^"]*)" "([^"]*)"/;
  
    const parsedLogs = logs.map((log) => {
      const match = log.match(logRegex);
  
      if (match) {
        return {
          ip: match[1],
          timestamp: match[2],
          method: match[3],
          uri: match[4],
          protocol: match[5],
          statusCode: parseInt(match[6], 10),
          bytesSent: match[7] ? parseInt(match[7], 10) : null,
          referer: match[8],
          userAgent: match[9],
          label: 0,
        };
      }
    });
    return parsedLogs.filter((log) => log !== undefined);
  }  

const parsedLegitimateLogsArray = accessLogDataArray.map(logData => parseNginxLogs(logData));
const pa