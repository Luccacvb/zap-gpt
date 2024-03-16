import { create } from 'venom-bot'
import * as dotenv from 'dotenv'
import { OpenAI } from 'openai'
import pkg from 'lodash'

import { generateText } from './GenerateText/generateText.js'
import { generateImage } from './GenerateImg/generateImg.js'

const { get } = pkg
dotenv.config()

const commands = async (client, message, openai) => {
    const commandPrefix = '/'
    const commandBody = message.body.slice(commandPrefix.length).trim()
    const command = commandBody.split(' ')[0]
    const args = commandBody.slice(command.length).trim()
    const messageFrom = get(message, 'from')
    const chatId = message.chatId // use to save history for chat

    //use to send msg and img to your number 
    const target = messageFrom === process.env.WHATSAPP_BOT_NUMBER ? message.to : messageFrom

    //use to send msg and img to outhers numbers
    // const target = chatId

    if (command === 'bot') {
        const response = await generateText(openai, chatId, args)
        client.sendText(target, response)
    }

    if (command === 'img') {
        const imgUrl = await generateImage(openai, chatId, args)

        await client.sendImage(
            target,
            imgUrl,
            args,
            'Imagem gerada pela IA DALL-E 🤖'
        )
    }
}

const start = async (client) => {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        organization: process.env.ORGANIZATION_ID,
    })

    client.onAnyMessage(message => {
        //this if remove send message to groups
        // if (!message.isGroupMsg) {
        console.log('Mensagem recebida:', message.body)
        commands(client, message, openai)
        // }
    })

    console.log('Bot iniciado e esperando por mensagens...')
}

create({
    session: 'Chat-GPT',
    multidevice: true
})
    .then(client => start(client))
    .catch(erro => {
        console.log('Erro ao iniciar o venom-bot:', erro)
    })
