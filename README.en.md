[Ler em Português ](./README.md)

# Chat-GPT Bot

This project implements an artificial intelligence chatbot that uses the OpenAI API to generate textual responses, images, and text-to-audio conversions. The bot is built using the `venom-bot` library for integration with WhatsApp.

## Prerequisites

Before you start, you will need:

- Node.js installed on your machine.
- An OpenAI account with API access.
- Available credits in OpenAI to make API calls.

## Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Luccacvb/zap-gpt.git
   cd zap-gpt
   ```
2. **Install dependencies:**
   ```bash
   yarn install
   ```
3. **Configure environment variables:**

   There is an example in the `.env.example` file. Do not forget to rename the file to `.env` after configuring it, but here is an example:

   ```bash
   OPENAI_API_KEY=[Your OpenAI API Key]
   ORGANIZATION_ID=[Your OpenAI Organization ID]
   ```

4. **Fix for venom-bot:**

   Before running the project for the first time, run the following command to fix an internal error in venom-bot:

   ```bash
   node fix-venom.js
   ```

## Bot Features

The bot responds to messages directly through WhatsApp with the following commands:

- **send text:**: The bot will respond with text. To use, just send a message containing the desired text. (the command should be sent in lowercase, but feel free to change this condition)

- **send img [description]**: The bot will create an image based on the provided description and send it. To use, send a message starting with "send img" followed by a brief description of the image you want. (the command should be sent in lowercase, but feel free to change this condition)

- **Any other message**: The bot will automatically respond with an audio file containing the message converted to voice. Just send any text that is not a specific command.

## OpenAI Models Used

For the functionalities of this bot, different models from the OpenAI API are used:

- **Text**: Uses the `gpt-4` model to generate textual responses.
- **Image**: Uses the `dall-e-3` model for creating images based on descriptions provided.
- **Audios**:Audios: Uses the `tts-1` model with the `nova` voice to convert texts into audios.

For more details about each model and their capabilities, consult the [OpenAI API documentation](https://beta.openai.com/docs/).

## Running the Project

To start the bot, execute:

```bash
yarn start
```

## Logs

When starting the bot, logs will be displayed on the console to assist in monitoring and debugging activities. Here are some of the logs you can expect:

- **Number and Message**: For each message received, the bot will display the sender's number and the content of the message, allowing for easy tracking of the communication flow.

- **Ready and Waiting for Messages**: When the bot is fully initialized and ready to receive messages, a log with the message "Bot started and waiting for messages..." will be displayed. This indicates that everything is set up correctly and the bot is operational.

### Troubleshooting

- **Restart Recommendation**: If you notice unexpected behaviors or persistent errors, it is recommended to restart the bot service.

This log system is designed to facilitate the maintenance and operation of the bot, feel free to modify it as you wish.

## Limitations and Considerations

- The bot does not interact in groups, only in individual conversations. (Feel free to change this behavior)
- Messages to the bot must come from authorized numbers specified in the code. (I limited this to have more control over who should be responded to, but feel free to change)
