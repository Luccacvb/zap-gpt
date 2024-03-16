import pkg from 'lodash'
const { get } = pkg
const chatHistories = {}

export async function generateText(openaiClient, chatId, clientText) {
    if (!chatHistories[chatId]) {
        chatHistories[chatId] = []
    }

    if (typeof clientText === 'string' && clientText.trim() !== '') {
        chatHistories[chatId].push({ role: "user", content: clientText.trim() })
    }

    console.log('teste',chatHistories )

    const options = {
        model: "gpt-4-turbo-preview",
        messages: chatHistories[chatId],
    }

    try {
        const response = await openaiClient.chat.completions.create(options)

        if (response && response.choices.length) {
            const botResponse = get(response, 'choices[0].message.content').trim()
            chatHistories[chatId].push({ role: "assistant", content: botResponse })

            return `Chat GPT 🤖\n\n${botResponse}`
        } else {
            return "Desculpe, houve um problema ao processar sua solicitação."
        }
    } catch (e) {
        return `❌ OpenAI Response Error: ${e.toString()}`
    }
}