import pkg from 'lodash'
const { get } = pkg
const chatImageDescriptions = {}

export async function generateImage(openaiClient, chatId, description) {
    if (!chatImageDescriptions[chatId]) {
        chatImageDescriptions[chatId] = []
    }

    if (typeof description === 'string' && description.trim() !== '') {
        chatImageDescriptions[chatId].push(description.trim())
    }

    const options = {
        model: "dall-e-3",
        prompt: description,
        size: "1024x1024",
        quality: "standard",
        n: 1,
    }

    try {
        const response = await openaiClient.images.generate(options)
        const url = get(response, 'data[0].url')
        return url
    } catch (e) {
        return "Erro ao gerar imagem. Por favor, tente novamente mais tarde."
    }
}