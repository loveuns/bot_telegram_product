const CloudStorage = require('../db/CloudStorage')
const RedisStorage = require('../db/RedisStorage')

module.exports = class AuthService {

    // 회원 가입하기
    async signup(id, email, password) {
        try {
            const user = await CloudStorage.addUser(id, email, password) 

            const session = await RedisStorage.set(user.id, user.role)
            console.log(`Login: ${user.id}, Message: ${session}`)
            return {
                text: '회원가입이 완료 되었습니다'
            }
        } catch(err) {
            throw new Error('error when AuthService.signup')
        }
    }

    // 로그인
    async login(id, email, password) {
        try {
            const user = await CloudStorage.getUser(id)

            if(id != user.id) return { text : '회원가입을 해주세요 /signup id password'}          
            if(email != user.email) return { text : 'ID 확인해주세요 /signup id password'}
            if(password != user.password) return { text : 'password 확인해주세요 /signup id password'}        
          
            const session = await RedisStorage.set(user.id, user.role)
            console.log(`Login: ${user.id}, Message: ${session}`)
            return {
                text: '로그인 되었습니다'
            }
        } catch(err) {
            throw new Error('error when AuthService.login')
        }
    }    

    // 로그아웃 
    async logout(id) {
        try {
            const session = await RedisStorage.del(id)
            console.log(`Logout: ${id}, Message: ${session}`)
            return {
                text: '로그아웃 되었습니다'
            }
        } catch(err) {
            throw new Error('error when AuthService.logout')
        }
    }    

}