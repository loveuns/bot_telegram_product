const TelegramBot           = require('node-telegram-bot-api')
const ProductsController    = require('./controllers/products.controller')
require('dotenv').config()

const bot                   = new TelegramBot(process.env.TOKEN, {polling: true})
const productsController    = new ProductsController(bot)

bot.onText(/\/start/, productsController.getList)
bot.on('callback_query', productsController.handleCallback)

