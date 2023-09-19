//npm install express axios telegraf dotenv nodemon
const express = require('express')
const app = express()
const axios = require('axios')
const path = require('path')
app.use(express.static('static'))
app.use(express.json())
require('dotenv').config()

const { Telegraf } = require('telegraf')
const { message } = require('telegraf/filters')

const bot = new Telegraf(process.env.BOT_TOKEN)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname__, '/index.html'))
})

bot.command('start', ctx => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, 'Hello world! Você está no bot Chinelinho\n\nCriado por André!')
})

bot.command('bitcoin', ctx => {
    var rate
    console.log(ctx.from)
    axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl
    `)
        .then(response => {
            console.log(response.data)
            rate = response.data.bitcoin
            const message = `Hello, hoje o preço do bitcoin em reais é ${rate.brl}.`
            bot.telegram.sendMessage(ctx.chat.id, message)
        })
})

// bot.on(message('text'), async (ctx) => {
//     // Explicit usage
//     //await ctx.telegram.sendMessage(ctx.message.chat.id, `Hello ${ctx.state.role}`)

//     // Using context shortcut
//     await ctx.reply(`Hello ${ctx.message.text}`)
//     console.log(ctx.message)
// })

bot.launch()