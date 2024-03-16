import pkg from 'lodash'
const { get } = pkg

export async function generateText(openaiClient, clientText) {
    const options = {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: clientText }]
    }

    try {
        const response = await openaiClient.chat.completions.create(options)

        if (response && response.choices.length) {
            const botResponse = get(response, 'choices[0].message.content').trim()
            return `Chat GPT 🤖\n\n${botResponse}`
        } else {
            return "Desculpe, houve um problema ao processar sua solicitação."
        }
    } catch (e) {
        return `❌ OpenAI Response Error: ${e.toString()}`
    }
}