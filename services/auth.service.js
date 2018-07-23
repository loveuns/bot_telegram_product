const CloudStorage = require('../db/CloudStorage')

module.exports = class AuthService {

    // 회원 가입하기
    async signup(id, email, password) {
        try {
            const user = await CloudStorage.addUser(id, email, password) 
            return {
                text: '회원가입이 완료 되었습니다'
            }
        } catch(err) {
            throw new Error('error when AuthService.signup')
        }
    }

}