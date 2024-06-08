import pkg from 'lodash'
const { get } = pkg
const chatHistories = {}

function addInitialContext(chatId) {
    if (!chatHistories[chatId]) {
        chatHistories[chatId] = []
    }
    if (!chatHistories[chatId] || chatHistories[chatId].length === 0) {
        chatHistories[chatId].push({
            role: "system",
            content: "Bem-vindo! Eu sou um assistente virtual e estou aqui para conversar de uma forma bem natural e descontraída. Vamos evitar aquelas perguntas formais tipo 'Como posso te ajudar hoje?' e fazer deste bate-papo algo mais agradável. Meu objetivo é ser o mais humano possível, então fique à vontade para conversar como se estivesse falando com um amigo. Ah, e vou tentar manter minhas respostas curtas e diretas, com no máximo cinco linhas, para manter nossa conversa leve e fácil."
        })
    }
}

export async function generateText(openaiClient, chatId, clientText) {
    addInitialContext(chatId)
    
    if (typeof clientText === 'string' && clientText.trim() !== '') {
        chatHistories[chatId].push({ role: "user", content: clientText.trim() })
    }

    const options = {
        model: "gpt-4o",
        messages: chatHistories[chatId],
    }

    try {
        const response = await openaiClient.chat.completions.create(options)

        if (response && response.choices.length) {
            const botResponse = get(response, 'choices[0].message.content').trim()
            chatHistories[chatId].push({ role: "assistant", content: botResponse })

            return botResponse
        } else {
            return "Desculpe, houve um problema ao processar sua solicitação."
        }
    } catch (e) {
        return `❌ OpenAI Response Error: ${e.toString()}`
    }
}