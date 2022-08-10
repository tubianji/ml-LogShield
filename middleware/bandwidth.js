const express = require('express');
const router = express.Router();

let totalUpload = 0;
let totalDownload = 0;
let totalRequests = 0;

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 B';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB