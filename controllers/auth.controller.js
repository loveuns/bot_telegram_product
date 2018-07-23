const AuthService   = require('../services/auth.service')
const BotUtil       = require('../utils/BotUtil');
const authService   = new AuthService()

module.exports = class AuthController {
    constructor(bot) {
        this.bot = bot
        this.signup = this.signup.bind(this)
    }

    async signup(msg) {
        const chatId    = BotUtil.getChatId(msg)
        const id        = BotUtil.getUserId(msg)
        const ret       = BotUtil.getUserMsg(msg)
        const email     = ret[0]
        const password  = ret[1]

        try {
            const {text}  = await authService.signup(id, email, password) 
            this.bot.sendMessage(chatId, text)
        } catch(err) {
            throw err
        }
    }

}