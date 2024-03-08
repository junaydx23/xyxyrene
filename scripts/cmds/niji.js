const axios = require('axios');
const fs = require('fs');
 
module.exports = {
  config: {
    name: 'niji',
    version: '1.0',
    author: 'MarianCross',
    countDown: 0,
    role: 0,
    longDescription: {
      en: 'anime image gen'
    },
    category: 'ai',
    guide: {
      en: 'Niji v3/4'
    }
  },
 
  onStart: async function ({ message, args, event, api }) {
    const permission = ["100046162216589"];
    if (!permission.includes(event.senderID)) {
      api.sendMessage(
        `❌ | Command "niji" currently unavailable buy premium to use the command.`,
        event.threadID,
        event.messageID
      );
      return;
    }
    try {
      const info = args.join(' ');
      const [prompt] = info.split('|').map(item => item.trim());
      const text = args.join(" ");
      if (!text) {
        return message.reply("❎ | Please provide a prompt");
      }
      const modelParam = '1'; // Utilisation du premier modèle uniquement
      const apiUrl = `https://turtle-apis.onrender.com/api/sdxl?prompt=${prompt}&model=${modelParam}`;
 
      const startTime = new Date(); // Heure de début de la génération d'images
 
      await message.reply('Please wait...⏳');
 
      const form = {};
      form.attachment = [];
 
      // Générer quatre images
      for (let i = 0; i < 4; i++) {
        const response = await global.utils.getStreamFromURL(apiUrl);
        form.attachment.push(response);
      }
 
      const endTime = new Date(); // Heure de fin de la génération d'images
      const duration = (endTime - startTime) / 1000; // Durée en secondes
 
      // Créer le message d'attachement avec le nombre de secondes
      const attachmentMessage = `Voici les images générées 🎨 (${duration} secondes)`;
 
      // Envoyer les quatre images avec le message d'attachement
      await api.sendMessage({
        body: attachmentMessage,
        attachment: form.attachment
      }, event.threadID);
 
    } catch (error) {
      console.error(error);
      await message.reply('❎ | Sorry, API has a skill issue');
    }
  }
};
