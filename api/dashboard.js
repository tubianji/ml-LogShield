const { CurrentlyBlockedUsers, TotalBlocked, TotalRpm } = require('../middleware/rateLimiter').rateLimitData;
const { totalwafblocked } = require('../middleware/wafRules').wafData;
const { AVGServerPing } = require('../middleware/ping');
const { bandwidth } = require('../middleware/bandwidth');
const os = require('node:os');
const pidusage = require('pidusage');

module.exports = (router, client, checkAuth) => {
    router.post("/admin", checkAuth, async (req, res) => {
        const processStats = await pidusage(process.pid);

        const data = {
            "waf": {
                "totalwafblocked": totalwafblocked()
            },
            "rateLimit": {
                "CurrentlyBlockedUsers": CurrentlyBlockedUsers(),
                "Totalblocked": Object.fromEntries(TotalBlocked().entries()),
            },
            "ping": {
                "AVGServerPing": `${await AVGServerPing()}ms`,
         