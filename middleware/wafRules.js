const express = require('express');
const logger = require('../utils/logger');
const router = express.Router();
const path = require('path');
const fs = require('fs');
let totalblocked = 0;
const wafRulesPath = path.join(__dirname, '../WAF/waf-rules.json');
const wafRules = JSON.parse(fs.readFileSync(wafRulesPath, 'utf8'));

function checkAgainstWAFRules(value) {
  for (const rule of wafRules) {
    const regex = new RegExp(rule.reg, 'i');
    if (regex.test(value)) {
      logger.error('WAF', `Rule ${rule.id}: "${rule.cmt}" in category "${rule.type}" has been triggered by request at ${new Date().toISOString()}`);
      totalblocked++;
      return true;
    }
  }
  return false;
}

router.use((req, res, next) => {
  const whitelisted = (process.env.WHITELISTED || '').split(',').ma