const axios = require("axios");

module.exports = {
  config: {
    name: 'gpt4',
    version: '1.0.1',
    author: 'Null69',
    countDown: 0,
    role: 0,
    category: 'Ai',
    shortDescription: {
      en: 'GPT-4',
    },
    longDescription: {
      en: 'GPT-4',
    },
    guide: {
      en: '{pn} [prompt |clear (to reset conversation)]',
    },
  },

  onStart: async function({ api, message, event, args, commandName }) {
    let prompt = args.join(' ');
    
    if (prompt === 'clear') {
        const resetUrl = `https://ai-tools.replit.app/gpt?prompt=clear&uid=${event.senderID}`;

        try {
            await axios.get(resetUrl);
            message.reply("Conversation reset successfully.");
        } catch (error) {
            console.error(error.message);
            message.reply("An error occurred while resetting the conversation.");
        }
        return;
    }
      const custom = ``;
      let tae = custom + "message:" + prompt;
    
    if (!prompt) {
      message.reply("Please provide a query.");
      return;
    }


    api.setMessageReaction("🟡", event.messageID, () => {}, true);

    const url = `https://ai-tools.replit.app/gpt?prompt=${encodeURIComponent(tae)}&uid=${event.senderID}`;

    try {
      const response = await axios.get(url);
      const result = response.data.gpt4;

      message.reply(`${result}`, (err, info) => {
        if (!err) {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
          });
        }
      });

      api.setMessageReaction("🟢", event.messageID, () => {}, true);
    } catch (error) {
      message.reply('An error occurred.');
      api.setMessageReaction("🔴", event.messageID, () => {}, true);
    }
  },

  onReply: async function({ api, message, event, Reply, args }) {
    const prompt = args.join(' ');
      const custom = ``;
      const tubol = custom + "message:" + prompt;
    const { author, commandName } = Reply;

    if (author !== event.senderID) return; // Check if sender matches

  if (args[0] === 'clear') {
        const resetUrl = `https://ai-tools.replit.app/gpt?prompt=clear&uid=${event.senderID}`;

        try {
            await axios.get(resetUrl);
            message.reply("Conversation reset successfully.");
        } catch (error) {
            console.error(error.message);
            message.reply("An error occurred while resetting the conversation.");
        }

        return;
    }
    api.setMessageReaction("🟡", event.messageID, () => {}, true);

    const url = `https://ai-tools.replit.app/gpt?prompt=${encodeURIComponent(tubol)}&uid=${event.senderID}`;
    
    try {
        const response = await axios.get(url);
        const content = response.data.gpt4;

        message.reply(`${content}`, (err, info) => {
            if (!err) {
                global.GoatBot.onReply.set(info.messageID, {
                    commandName,
                    messageID: info.messageID,
                    author: event.senderID,
                });
            }
        });

        api.setMessageReaction("🟢", event.messageID, () => {}, true);
    } catch (error) {
        console.error(error.message);
        message.reply("An error occurred.");
        api.setMessageReaction("🔴", event.messageID, () => {}, true);
    }
}
            
