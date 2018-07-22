const CloudStorage = require('../db/CloudStorage')

module.exports = class ProductsContoller {
    constructor(bot) {
        this.bot = bot
        this.getList        = this.getList.bind(this)
        this.handleCallback = this.handleCallback.bind(this)
        this.back           = this.back.bind(this)
    }

    // /start 초기응답 - 상품목록 보여주기
    async getList(msg) {
        const chatId    = msg.chat.id
        const text      = '상품목록'

        // 1. dummy data --------
        // const options = {
        //     reply_markup: {
        //         inline_keyboard: [
        //            [{ text: '치킨', callback_data: JSON.stringify({type: 'detail', id: '1'}) }], 
        //            [{ text: '피자', callback_data: JSON.stringify({type: 'detail', id: '2'}) }]
        //         ]
        //     }
        // }
        // ----------------------

        // 2. db data -----------
        let products
        try {
            products = await CloudStorage.getList()
        } catch(err) {
            throw new Error('error when ProductsContoller.getList') 
        }

        const options = {
            reply_markup: {
                inline_keyboard: this.getListInlineKeyboard(products)
            }
        }
        //-----------------------
        
        this.bot.sendMessage(chatId, text, options)
    }

    getListInlineKeyboard(products) {
        const result = []
        products.forEach( p => 
            result.push( [{ text: p.name, callback_data: JSON.stringify({type: 'detail', id: p.id}) }] )
        )
        return result
    }
    
    // 인라인 키보드 응답
    async handleCallback(msg) {     
        const callbackData      = JSON.parse(msg.data)
        const callbackDataType  = callbackData.type        

        let serviceFn = { 
            'detail': this.getDetail,
            'back'  : this.back
        }

        try {
            const reply = await serviceFn[callbackDataType](msg)
            this.bot.editMessageText(reply.text, reply.options)                
        } catch(err) {
            throw err
        }
    }

    // 인라인 키보드 응답 - 상품 상세정보 보여주기
    async getDetail(msg) {
        const callbackData      = JSON.parse(msg.data)
        const callbackDataId    = callbackData.id

        // 1. dummy data --------
        // let text
        // switch(callbackDataId) {
        //     case '1':
        //         text = `**치킨** 9000원  
        //         [이미지](http://pncg.co.kr/resource/images/180502/180502-pc-chikenmenu-best1.png)`
        //         break
        //     case '2':
        //         text = `**피자** 12000원  
        //         [이미지](http://www.59pizza.co.kr/data/file/menu02/thumb-978084556_g8ASUnc0_ce1f3edc4ab5dd43aa8a319110fdf1d6e1c67a6a_600x450.jpg)`
        //         break            
        // }
        //-----------------------            

        // 2. db data -----------       
        let product
        try {
            product = await CloudStorage.getDetail(callbackDataId)            
        } catch(err) {
            throw new Error('error when ProductsContoller.getDetail')
        }

        const text = `**${product.name}** ${product.price}원
        [이미지](${product.image})`
        //-----------------------  

        const options = {
            parse_mode      : 'Markdown',
            chat_id         : msg.message.chat.id,
            message_id      : msg.message.message_id,
            reply_markup    : {
                inline_keyboard: [
                    [{ text: '뒤로 가기', callback_data: JSON.stringify({type: 'back'}) }]
                ]
            }
        }

        return { text, options }
    }

    // 인라인 키보드 응답 - 뒤로가기(상품목록 보여주기)
    async back(msg) {
        const text      = '상품목록'  

        // 1. dummy data --------
        // const options = {            
        //     chat_id         : msg.message.chat.id,
        //     message_id      : msg.message.message_id,
        //     reply_markup: {
        //         inline_keyboard: [
        //            [{ text: '치킨', callback_data: JSON.stringify({type: 'detail', id: '1'}) }], 
        //            [{ text: '피자', callback_data: JSON.stringify({type: 'detail', id: '2'}) }]
        //         ]
        //     }
        // }
        //-----------------------
        
        // 2. db data -----------       
        let products
        try {
            products = await CloudStorage.getList()
        } catch(err) {
            throw new Error('error when ProductsContoller.back') 
        }

        const options = {
            chat_id         : msg.message.chat.id,
            message_id      : msg.message.message_id,
            reply_markup: {
                inline_keyboard: this.getListInlineKeyboard(products)
            }
        }
        //-----------------------          

        return { text, options }
    }
}

