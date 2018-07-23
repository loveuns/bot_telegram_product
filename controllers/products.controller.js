const ProductsService = require('../services/products.service')
const BotUtil         = require('../utils/BotUtil')
const productsService = new ProductsService()

module.exports = class ProductsContoller {
    constructor(bot) {
        this.bot = bot
        this.getList        = this.getList.bind(this)
        this.handleCallback = this.handleCallback.bind(this)
    }

    // 커맨드 처리 (/start, /list) => 상품목록 보여주기
    async getList(msg) {
        try {
            const {chatId, text, options} = await productsService.getList(msg)
            this.bot.sendMessage(chatId, text, options)
        } catch(err) {
            throw err
        }
    }
   
    // 인라인 키보드 버튼 처리 
    async handleCallback(msg) {     
        const callbackData      = BotUtil.parseCallbackData(msg)
        const callbackDataType  = callbackData.type        

        let serviceFn = { 
            'detail': productsService.getDetail,
            'back'  : productsService.back
        }

        try {
            const {text, options} = await serviceFn[callbackDataType](msg)
            this.bot.editMessageText(text, options)                
        } catch(err) {
            throw err
        }
    }

}

