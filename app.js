require('dotenv').config()
const TelegramBot           = require('node-telegram-bot-api')
const ProductsController    = require('./controllers/products.controller')
const AuthController        = require('./controllers/auth.controller')
const bot                   = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {polling: true})
const productsController    = new ProductsController(bot)
const authController        = new AuthController(bot)

bot.onText(/\/start/,       productsController.getList)
bot.onText(/\/list/,        productsController.getList)
bot.on('callback_query',    productsController.handleCallback)
bot.onText(/\/signup +(.)/, authController.signup)
bot.onText(/\/login +(.)/,  authController.login)
bot.onText(/\/logout/,      authController.logout)


