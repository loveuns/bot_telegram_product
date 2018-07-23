require('dotenv').config()
const redis         = require('redis')
const {promisify}   = require('util')

const client = redis.createClient(
    process.env.REDIS_ENDPOINT_PORT,
    process.env.REDIS_ENDPOINT_URL    
)
client.auth(process.env.REDIS_PASSWORD)

const getAsync = promisify(client.get).bind(client)
const setAsync = promisify(client.set).bind(client)
const delAsync = promisify(client.del).bind(client)

client.on('connect', () => {
    console.log('Connected to Redis')
})

client.on('error', err => {
    console.log(err)
})

module.exports = class RedisStorage {

    // 로그인 데이타 조회하기
    static async get(key) {
        try {
            return await getAsync(key)
        } catch(err) {
            throw new Error('error when RedisStorage.get')
        }
    }

    // 로그인 데이타 저장하기
    static async set(key, value) {
        try {
            return await setAsync(key, value)
        } catch(err) {
            throw new Error('error when RedisStorage.set')
        }
    }

    // 로그인 데이타 삭제하기
    static async del(key) {
        try {
            return await delAsync(key)
        } catch(err) {
            throw new Error('error when RedisStorage.del')
        }
    }

}