const RedisStorage = require('./db/RedisStorage')

RedisStorage.set('1', 'general')
.then(ret =>  console.log(ret))

RedisStorage.get('1')
.then(value => console.log(value))

// RedisStorage.del('1')
// .then(value => console.log(value))

RedisStorage.get('579276864')
.then(value => console.log(value))


