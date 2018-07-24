const CloudStorage      = require('../db/CloudStorage')
const BotUtil           = require('../utils/BotUtil')


module.exports = class ProductsService {
    constructor() {
        this.getList    = this.getList.bind(this);
        this.back       = this.back.bind(this);
      }


    // 상품목록 보여주기
    async getList(msg) {
        const chatId    = BotUtil.getChatId(msg)
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
            // 상품목록 가져오기
            products = await CloudStorage.getList()

            // [{"id":"0q", "price":"12000", "image":"http://", "name":"피자"}, {"id":"0q", ....}]
            console.log(`ProductsService.getList - products: ${JSON.stringify(products)}`)
        } catch(err) {
            throw new Error('error when ProductsService.getList') 
        }

        const options = {
            reply_markup: {
                inline_keyboard: this.getListInlineKeyboard(products)
            }
        }
        //-----------------------

        return {chatId, text, options}
    }


    // 인라인 키보드 버튼 처리 (상품 버튼) => 상품 상세정보 보여주기
    async getDetail(msg) {
        const callbackData      = BotUtil.parseCallbackData(msg)
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
            // 상품 상세정보 가져오기
            product = await CloudStorage.getDetail(callbackDataId)

            // {"id":"0q", "price":"12000", "image":"http://", "name":"피자"}
            console.log(`ProductsService.getDetail - product: ${JSON.stringify(product)}`)            
        } catch(err) {
            throw new Error('error when ProductsService.getDetail')
        }

        const text = `**${product.name}** ${product.price}원
        [이미지](${product.image})`
        //-----------------------  

        const options = {
            parse_mode      : 'Markdown',
            chat_id         : BotUtil.getChatIdByCallback(msg),
            message_id      : BotUtil.getMessageIdByCallback(msg),
            reply_markup    : {
                inline_keyboard: [
                    [{ text: '뒤로 가기', callback_data: JSON.stringify({type: 'back'}) }]
                ]
            }
        }

        return {text, options}
    }


    // 인라인 키보드 버튼 처리 (뒤로가기 버튼) => 상품목록 보여주기
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
            // 상품목록 가져오기
            products = await CloudStorage.getList()
            console.log(`ProductsService.back - products: ${JSON.stringify(products)}`)
        } catch(err) {
            throw new Error('error when ProductsService.back') 
        }

        const options = {
            chat_id         : BotUtil.getChatIdByCallback(msg),
            message_id      : BotUtil.getMessageIdByCallback(msg),
            reply_markup: {
                inline_keyboard: this.getListInlineKeyboard(products)
            }
        }
        //-----------------------          

        return {text, options}
    }


    getListInlineKeyboard(products) {
        const result = []
        products.forEach( p => 
            result.push( [{ text: p.name, callback_data: JSON.stringify({type: 'detail', id: p.id}) }] )
        )
        return result
    }

}
