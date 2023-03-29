import Redis from 'ioredis'

const redisConfig = {
  port: 6379,
  host: '127.0.0.1',
}

export const redis = new Redis(redisConfig)
redis.on('error', (err) => console.warn('Redis cluster Error', err))
redis.on('connect', () => console.log('\x1B[32mredis连接成功'))
