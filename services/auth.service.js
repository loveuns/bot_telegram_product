const CloudStorage = require('../db/CloudStorage')
const RedisStorage = require('../db/RedisStorage')

module.exports = class AuthService {

    // 회원 가입하기
    async signup(id, email, password) {
        try {
            // 회원정보 DB에 저장하기
            const role = 'general'
            const ret = await CloudStorage.addUser(id, email, password, role)
            console.log(`AuthService.signup - ${id} signup: ${JSON.stringify(ret)}`)
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
            // 회원정보 DB에서 가져오기
            const user = await CloudStorage.getUser(id)

            // {"id":"579276864","role":"general","email":"a","password":"1"}   
            console.log(`AuthService.login - user check: ${JSON.stringify(user)}`)

            if(id != user.id) return { text : '회원가입을 해주세요 /signup id password'}          
            if(email != user.email) return { text : 'ID 확인해주세요 /signup id password'}
            if(password != user.password) return { text : 'password 확인해주세요 /signup id password'}        
          
            // 로그인 데이타 레디스에 저장하기
            const ret = await RedisStorage.set(user.id, user.role)
            console.log(`AuthService.login - ${id} : ${JSON.stringify(ret)}`)
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
            // 로그인 데이타 레디스에서 삭제하기
            const ret = await RedisStorage.del(id)
            console.log(`AuthService.logout - ${id} : ${ret}`)
            return {
                text: '로그아웃 되었습니다'
            }
        } catch(err) {
            throw new Error('error when AuthService.logout')
        }
    }
    
    // 로그인여부와 사용자권한 체크
    async isAuthenticated(id, role) {
        try {
            // 로그인 데이타 레디스에서 조회하기
            const userRole = await RedisStorage.get(id)
            console.log(`AuthService.isAuthenticated - ${id} : ${userRole}`)
            if (!userRole) return false
            if (role === userRole) return true
            return false
        } catch(err) {
            throw new Error('error when AuthService.isAuthenticated')
        }
    }

}