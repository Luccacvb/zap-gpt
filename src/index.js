import { create } from 'venom-bot';
import * as dotenv from 'dotenv';
import { OpenAI } from 'openai';
// import getImageAsBase64 from './GenerateImg/downloadAndSendImg.js';

import pkg from 'lodash';
const { get } = pkg;

dotenv.config();

async function getDavinciResponse(openaiClient, clientText) {
    console.log('Obtendo resposta de Davinci para:', clientText);

    const options = {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: clientText }]
    };

    try {
        const response = await openaiClient.chat.completions.create(options);

        if (response && response.choices.length) {
            const botResponse = get(response, 'choices[0].message.content').trim();
            return `Chat GPT 🤖\n\n${botResponse}`;
        } else {
            console.log('Formato de resposta inesperado:', response);
            return "Desculpe, houve um problema ao processar sua solicitação.";
        }
    } catch (e) {
        console.error('Erro ao obter resposta de gpt:', e);
        return `❌ OpenAI Response Error: ${e.toString()}`;
    }
}

async function getDalleResponse(openaiClient, description) {
    const options = {
        model: "dall-e-3",
        prompt: description,
        size: "1024x1024",
        quality: "standard",
        n: 1,
    };
    try {
        const response = await openaiClient.images.generate(options);
        console.log('img', response)
        return response.data[0].url;
    } catch (e) {
        console.error('Erro ao gerar imagem:', e);
        return "Erro ao gerar imagem. Por favor, tente novamente mais tarde.";
    }
}



const commands = async (client, message, openai) => {
    const commandPrefix = '/';
    const commandBody = message.body.slice(commandPrefix.length).trim();
    const command = commandBody.split(' ')[0];
    const args = commandBody.slice(command.length).trim();
    const target = message.from === process.env.WHATSAPP_BOT_NUMBER ? message.to : message.from;

    if (command === 'bot') {
        const response = await getDavinciResponse(openai, args);
        client.sendText(target, response);
    }

    //PRECISO CORRIGIR IMG!!!!!!!!!!!!
    // if (command === 'img') {
    //     const imgDescription = message.body.substring(message.body.indexOf(" "));
    //     console.log('zzzz', imgDescription);
    //     const imgUrl = await getDalleResponse(openai, imgDescription)

    //     console.log(
    //         'xxxx',
    //         message.from === process.env.PHONE_NUMBER ? message.to : message.from,
    //         target,
    //         imgUrl,
    //         'image.png',
    //         message,
    //         imgDescription,
    //     );

    //     await client.sendImage(
    //         target,
    //         imgUrl,
    //         imgDescription,
    //         'Imagem gerada pela IA DALL-E 🤖'
    //     ).then((result) => {
    //         console.log('Result: ', result); //return object success
    //     })
    //         .catch((erro) => {
    //             console.error('Error when sending: ', erro); //return object error
    //         });
    // }
}

async function start(client) {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        organization: process.env.ORGANIZATION_ID,
    });

    client.onAnyMessage(message => {
        if (!message.isGroupMsg) {
            console.log('Mensagem recebida:', message.body);
            commands(client, message, openai);
        }
    });

    console.log('Bot iniciado e esperando por mensagens...');
}

create({
    session: 'Chat-GPT',
    multidevice: true
})
    .then(client => start(client))
    .catch(erro => {
        console.log('Erro ao iniciar o venom-bot:', erro);
    });
