[Read this in English](./README.en.md)

# Chat-GPT Bot

Este projeto implementa um bot de inteligência artificial de chat que utiliza a API da OpenAI para gerar respostas textuais, imagens e conversões de texto para áudio. O bot é construído usando a biblioteca `venom-bot` para integração com o WhatsApp.

## Pré-requisitos

Antes de iniciar, você precisará de:

- Node.js instalado na sua máquina.
- Uma conta na OpenAI com acesso à API.
- Créditos disponíveis na OpenAI para realizar chamadas à API.

## Configuração

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Luccacvb/zap-gpt.git
   cd zap-gpt
   ```
2. **Instale as dependências:**
   ```bash
   yarn install
   ```
3. **Configure as variáveis de ambiente:**

   No arquivo `.env.exemple` tem um exemplo do que precisa. Não esqueça de apos configurar alterar o nome do arquivo para `.env`, mas aqui vai um exemplo:

   ```bash
   OPENAI_API_KEY=[Sua API Key da OpenAI]
   ORGANIZATION_ID=[Seu ID de organização da OpenAI]
   ```

4. **Correção para o venom-bot:**

   Antes de executar o projeto pela primeira vez, execute o seguinte comando para corrigir um erro interno do venom-bot:

   ```bash
   node fix-venom.js
   ```

## Funcionalidades do Bot

O bot responde a mensagens diretamente através do WhatsApp com os seguintes comandos:

- **enviar texto**: O bot irá responder com texto. Para usar, basta enviar uma mensagem contendo o texto desejado. (o comando deve ser enviado com letras minúsculas, mas fique a vontade para alterar essa condição)

- **enviar img [descrição]**: O bot irá criar uma imagem baseada na descrição fornecida e enviá-la. Para usar, envie uma mensagem começando com "enviar img" seguido de uma breve descrição da imagem que deseja. (o comando deve ser enviado com letras minúsculas, mas fique a vontade para alterar essa condição)

- **Qualquer outra mensagem**: O bot irá responder automaticamente com um arquivo de áudio contendo a mensagem convertida para voz. Basta enviar qualquer texto que não seja um comando específico.

## Modelos Usados da OpenAI

Para as funcionalidades deste bot, são utilizados diferentes modelos da API da OpenAI:

- **Texto**: Utiliza o modelo `gpt-4o` para gerar respostas textuais.
- **Imagem**: Utiliza o modelo `dall-e-3` para a criação de imagens baseadas nas descrições fornecidas.
- **Áudios**: Utiliza o modelo `tts-1` com a voz `nova` para converter textos em áudios.

Para mais detalhes sobre cada modelo e suas capacidades, consulte a [documentação da API da OpenAI](https://beta.openai.com/docs/).

## Executando o Projeto

Para iniciar o bot, execute:

```bash
yarn start
```

## Logs

Ao iniciar o bot, serão exibidos logs no console para ajudar no monitoramento e na depuração das atividades. Aqui estão alguns dos logs que você pode esperar:

- **Número e Mensagem**: Para cada mensagem recebida, o bot exibirá o número do remetente e o conteúdo da mensagem, permitindo um acompanhamento fácil do fluxo de comunicação.

- **Pronto e Esperando por Mensagens**: Quando o bot estiver completamente inicializado e pronto para receber mensagens, um log com a mensagem "Bot iniciado e esperando por mensagens..." será exibido. Isso indica que tudo está configurado corretamente e o bot está operacional.

### Tratamento de Problemas

- **Recomendação de Reinicialização**: Se você notar comportamentos inesperados ou erros persistentes, é recomendável reiniciar o serviço do bot.

Este sistema de logs é projetado para facilitar a manutenção e a operação do bot, fique a vontade para alterar como quiser.

## Limitações e Considerações

- O bot não interage em grupos, apenas em conversas individuais. (Fique a vontade para alterar esse comportamento)
- As mensagens para o bot devem vir de números autorizados especificados no código. (Limitei para ter mais controle sobre quem deve ser respondido, porem fique a vontade para alterar)
