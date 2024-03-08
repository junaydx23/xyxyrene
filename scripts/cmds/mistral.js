const axios = require('axios');
const tracker = {};

module.exports = {
  config: {
    name: "mistral",
    version: "1.0",
    author: "rehat--",
    countDown: 5,
    role: 0,
    longDescription: "Mistral 8x7B Version 1.0",
    category: "ai",
    guide: { en: "{pn} <query>" },
  },
  clearHistory: function () {
    global.GoatBot.onReply.clear();
  },
  onStart: async function ({ message, event, args, usersData, commandName }) {
    const prompt = args.join(' ');
    const userName = await usersData.getName(event.senderID);
    const userID = event.senderID;

    if (!args[0]) return message.reply('Please enter a query.');

    if (args[0] === 'clear') {
      this.clearHistory();
      const c = await clean(userID);
      if (c) return message.reply('Conversation history cleared.');
    }
    await mistral(prompt, userID, message, userName);
  },

  onReply: async function ({ Reply, message, event, args, getLang, usersData }) {
    const { author } = Reply;
    if (author !== event.senderID) return;
    const prompt = args.join(' ');
    const userID = event.senderID;
    const userName = await usersData.getName(event.senderID);
    await mistral(prompt, userID, message, userName);
  }
};

async function clean(userID) {
  if (tracker[userID]) {
    delete tracker[userID];
    return true;
  }
  return false;
}

async function mistral(text, userID, message, userName) {
  if (!tracker[userID]) {
    tracker[userID] = `${userName}.\n`;
  }
  tracker[userID] += `${text}.\n`;

  try {
    const query = `- Current prompt: ${text}\n\n - Conversation:\n${tracker[userID]}\n`;
    const url = `https://api-turtle.onrender.com/api/mistral`;
    const response = await axios.post(url, { query }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const resultText = response.data.choices[0].message.content;
    tracker[userID] += `${resultText}`;
    await message.reply(`${resultText}\n\nYou can reply to continue chatting.`, (error, info) => {
      global.GoatBot.onReply.set(info.messageID, {
        commandName: 'mistral',
        author: userID
      });
    });
  } catch (error) {
    message.reply("An error occurred.");
  }
}
