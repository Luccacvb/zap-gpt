import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function generateVoice(client, chatId, clientText) {
    const headers = {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
    };

    const body = {
        model: "tts-1",
        input: clientText.trim(),
        voice: "nova",
        output_format: "mp3"
    };

    try {
        const response = await axios.post('https://api.openai.com/v1/audio/speech', body, { headers, responseType: 'arraybuffer' });
        const directoryPath = path.resolve(__dirname, './speech_files');
        const audioFilePath = path.resolve(directoryPath, `${chatId}.mp3`);

        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true }); // necessita dessa pasta para conseguir criar o audio e enviar 
        }

        fs.writeFileSync(audioFilePath, response.data); // cria o arquivo de audio 

        await client.sendVoice(chatId, audioFilePath);
        fs.unlinkSync(audioFilePath); // remove o aquivo de audio 

    } catch (e) {
        console.error('Failed to generate speech:', e);
        return "Desculpe, houve um problema ao processar sua solicitação.";
    }
}
