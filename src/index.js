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
    const target = messageFrom === process.env.WHATSAPP_BOT_NUMBER ? message.to : messageFrom

    if (command === 'bot') {
        const response = await generateText(openai, args)
        client.sendText(target, response)
    }

    if (command === 'img') {
        const imgDescription = message.body.substring(message.body.indexOf(" "))
        const imgUrl = await generateImage(openai, imgDescription)

        await client.sendImage(
            target,
            imgUrl,
            imgDescription,
            'Imagem gerada pela IA DALL-E 🤖'
        )
    }
}

const start = async(client) => {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        organization: process.env.ORGANIZATION_ID,
    })

    client.onAnyMessage(message => {
        if (!message.isGroupMsg) {
            console.log('Mensagem recebida:', message.body)
            commands(client, message, openai)
        }
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
