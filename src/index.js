import { create } from 'venom-bot'
import * as dotenv from 'dotenv'
import { OpenAI } from 'openai'
import pkg from 'lodash'

import { generateText } from './GenerateText/generateText.js'
import { generateImage } from './GenerateImg/generateImg.js'
import { generateVoice } from './GenerateVoice/generateVoice.js'

const { get } = pkg
dotenv.config()

const BOT_NUMBER = '554799999999@c.us' // seu numero, para o bot n responder quando voce enviar uma mensagem 
const allowedNumbers = ['554799999999@c.us'] //Adicione aqui os numeros que a IA pode interagir 

const commands = async (client, message, openai) => {
    const messageFrom = get(message, 'from')
    const messageBody = get(message, 'body', "")

    console.log(messageFrom, messageBody)
    if (!allowedNumbers.includes(messageFrom)) return
    if (messageFrom === BOT_NUMBER) return

    const chatId = message.chatId // use para salvar o historico

    //use para enviar mensagem para outros contatos 
    const target = chatId

    if (messageBody.includes("enviar img")) {
        // Cria imagem com as descrições fornecidas 
        const args = messageBody.replace("img", "").trim()
        const imgUrl = await generateImage(openai, chatId, args)
        await client.sendImage(
            target,
            imgUrl,
            args,
            ''
        )
    }
    else if (messageBody.includes("enviar texto")) {
        // Responde em texto 
        const response = await generateText(openai, chatId, messageBody)
        client.sendText(target, response)
    }
    else {
        const textResponse = await generateText(openai, chatId, messageBody)

        // Converte texto em audio respondendo a mensagem atraves de audio
        const audioResponse = await generateVoice(client, chatId, textResponse);
        if (audioResponse instanceof Error) {
            client.sendText(chatId, audioResponse.message);
        }
    }
}

const start = async (client) => {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        organization: process.env.ORGANIZATION_ID,
    })

    client.onStateChange(state => {
        if (state === 'CONFLICT' || state === 'UNPAIRED' || state === 'DISCONNECTED') {
            client.restartService();
        }
    });

    await client.onAnyMessage(async message => {
        //N permite o bot interagir com grupos 
        if (!message.isGroupMsg) {
            await commands(client, message, openai);
        }
    });

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
