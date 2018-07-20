// const CloudStorage = require('../db/CloudStorage')

module.exports = class ProductsContoller {
    constructor(bot) {
        this.bot = bot
        this.getList        = this.getList.bind(this)
        this.handleCallback = this.handleCallback.bind(this)
    }

    getList(msg) {
        const chatId    = msg.chat.id
        const text      = '상품목록' 

        // dummy data
        const options = {
            reply_markup: {
                inline_keyboard: [
                   [{ text: '치킨', callback_data: JSON.stringify({type: 'detail', id: '1'}) }], 
                   [{ text: '피자', callback_data: JSON.stringify({type: 'detail', id: '2'}) }]
                ]
            }
        }
        this.bot.sendMessage(chatId, text, options)

        // const result = []        
        // const productList = CloudStorage.getProductList()
        // productList.forEach(p => {
        //     result.push(
        //         [{ text: p.name, callback_data: p.id }]
        //     )
        // })
        // const options = {
        //     reply_markup: {
        //         inline_keyboard: result
        //     }
        // }
    }
    
    handleCallback(msg) {     
        const callbackData      = JSON.parse(msg.data)
        const callbackDataType  = callbackData.type        

        let serviceFn
        switch(callbackDataType) {
            case 'detail':
                serviceFn = this.getDetail
                break
            case 'back':
                serviceFn = this.back
                break
            default:
        }
        const reply = serviceFn(msg)
        this.bot.editMessageText(reply.text, reply.options)
    }

    getDetail(msg) {
        const chatId            = msg.message.chat.id
        const messageId         = msg.message.message_id
        const callbackData      = JSON.parse(msg.data)
        const callbackDataId    = callbackData.id

        // dummy data
        let text
        switch(callbackDataId) {
            case '1':
                text = `**치킨** 9000원  
[이미지](http://pncg.co.kr/resource/images/180502/180502-pc-chikenmenu-best1.png)`
                break
            case '2':
                text = `**피자** 12000원  
[이미지](http://www.59pizza.co.kr/data/file/menu02/thumb-978084556_g8ASUnc0_ce1f3edc4ab5dd43aa8a319110fdf1d6e1c67a6a_600x450.jpg)`
                break            
        }    
        
        const options = {
            parse_mode      : 'Markdown',
            chat_id         : chatId,
            message_id      : messageId,
            reply_markup    : {
                inline_keyboard: [
                    [{ text: '뒤로 가기', callback_data: JSON.stringify({type: 'back'}) }]
                ]
            }
        }
        return { text, options }
    }

    back(msg) {
        const chatId            = msg.message.chat.id
        const messageId         = msg.message.message_id
        const text      = '상품목록' 

        // dummy data
        const options = {            
            chat_id         : chatId,
            message_id      : messageId,
            reply_markup: {
                inline_keyboard: [
                   [{ text: '치킨', callback_data: JSON.stringify({type: 'detail', id: '1'}) }], 
                   [{ text: '피자', callback_data: JSON.stringify({type: 'detail', id: '2'}) }]
                ]
            }
        }
        return { text, options }
    }
}

