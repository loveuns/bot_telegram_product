const AuthService = require('../services/auth.service')
const BotUtil     = require('../utils/BotUtil')
const authService = new AuthService()

module.exports = class AuthMiddleware {
    constructor(bot) {
        this.bot = bot
        this.auth = this.auth.bind(this)
    }

    // 로그인여부와 권한 체크
    auth(role, next) {
        return async msg => {
            try {
                const id        = BotUtil.getUserId(msg)
                const chatId    = BotUtil.getChatId(msg)
                
                const isAuth = await authService.isAuthenticated(id, role)
                if (!isAuth) return this.bot.sendMessage(chatId, '인증되지 않은 사용자입니다')
                next(msg)
            } catch(err) {
                throw(err)
            }
        }
    }
}
