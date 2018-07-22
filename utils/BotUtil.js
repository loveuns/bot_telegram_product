module.exports = class BotUtil {
    static parseCallbackData(msg) {
        try {
            const data = JSON.parse(msg.data)
            return data
        } catch(err) {
            throw err
        }
    }

    static getChatId(msg) {
        return msg.chat.id
    }

    static getChatIdByCallback(msg) {
        return msg.message.chat.id
    }

    static getMessageIdByCallback(msg) {
        return msg.message.message_id
    }


}