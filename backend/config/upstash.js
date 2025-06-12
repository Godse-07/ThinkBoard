const { Ratelimit } = require('@upstash/ratelimit');
const { Redis } = require('@upstash/redis');

require('dotenv').config();

const ratelimiter = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(12, "60s")
})

module.exports = ratelimiter;