import axios from 'axios';

// Função para baixar imagem e converter para Base64
async function getImageAsBase64(url) {
    const response = await axios({
        url,
        responseType: 'arraybuffer'
    });
    return Buffer.from(response.data).toString('base64');
}

export default getImageAsBase64