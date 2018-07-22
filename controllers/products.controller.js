const ProductsService = require('../services/products.service')
const BotUtil         = require('../utils/BotUtil')

const productsService = new ProductsService()

module.exports = class ProductsContoller {
    constructor(bot) {
        this.bot = bot
        this.getList        = this.getList.bind(this)
        this.handleCallback = this.handleCallback.bind(this)
    }

    // /start /list => 상품목록 보여주기
    async getList(msg) {
        try {
            const reply = await productsService.getList(msg)
            this.bot.sendMessage(reply.chatId, reply.text, reply.options)
        } catch(err) {
            throw err
        }
    }
   
    // 인라인 키보드 응답 처리하기 
    async handleCallback(msg) {     
        const callbackData      = BotUtil.parseCallbackData(msg)
        const callbackDataType  = callbackData.type        

        let serviceFn = { 
            'detail': productsService.getDetail,
            'back'  : productsService.back
        }

        try {
            const reply = await serviceFn[callbackDataType](msg)
            this.bot.editMessageText(reply.text, reply.options)                
        } catch(err) {
            throw err
        }
    }

}

