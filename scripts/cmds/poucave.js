const request = require('request');
const fs = require('fs');
const axios = require('axios');

module.exports = {
  config: {
    name: 'poucave',
    version: '1.1', // Mettre à jour la version pour refléter les modifications
    author: 'Samir B. Thakuri',
    countDown: 5,
    role: 0,
    shortDescription: '',
    longDescription: '',
    category: 'test',
  },

  onChat: async function ({ event, api, threadsData, usersData }) {
    const { createReadStream } = require('fs');
    let { messageID, senderID, threadID, body: content } = event;

    if (!global.logMessage) global.logMessage = new Map();
    if (!global.data) global.data = {};
    if (!global.data.botID) global.data.botID = api.getCurrentUserID();

    const thread = await threadsData.get(parseInt(threadID)) || {};

    if (typeof thread['resend'] !== 'undefined' && thread['resend'] === false) return;
    if (senderID === global.data.botID) return;

    if (event.type !== 'message_unsend') {
      global.logMessage.set(messageID, {
        msgBody: content,
        attachment: event.attachments,
      });
    }

    if (event.type === 'message_unsend') {
      var getMsg = global.logMessage.get(messageID);
      if (!getMsg) return;

      const data = await usersData.get(senderID);
      const name = await usersData.getName(senderID);

      let num = 0;
      let msg = {
        body: `${name} just removed ${getMsg.attachment.length} attachment(s).${getMsg.msgBody !== '' ? `\nContent: ${getMsg.msgBody}` : ''}`,
        attachment: [],
        mentions: { tag: name, id: senderID },
      };

      for (var i of getMsg.attachment) {
        num += 1;
        if (i.type === 'photo' || i.type === 'video' || i.type === 'audio') {
          var ext = i.type === 'photo' ? 'jpg' : i.type === 'video' ? 'mp4' : 'mp3';
          var path = `./cache/${num}.${ext}`;
          var dataStream = (await axios.get(i.url, { responseType: 'stream' })).data;
          dataStream.pipe(fs.createWriteStream(path));
          msg.attachment.push(createReadStream(path));
        }
      }

      if (msg.attachment.length > 0) {
        api.sendMessage(msg, threadID);
      } else {
        api.sendMessage(`${name} Rien n'échappe à Tamamo Von Einzbern 🦊. Tu voulais nous cacher ça: ${getMsg.msgBody}`, threadID);
      }
    }
  },

  onStart: async function ({ api, event, threadsData, args }) {
    // ... (Votre logique actuelle pour activer/désactiver la fonctionnalité resend)
  },
};
