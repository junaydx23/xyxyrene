const fs = require('fs');
module.exports = {
  config: {
    name: "bonne nuit",
    version: "1.0",
    author: "Otineeeeeyyyyyy",
    countDown: 5,
    role: 0,
    shortDescription: "no prefix",
    longDescription: "no prefix",
    category: "no prefix",
  },
  onStart: async function(){},
  onChat: async function({ event, message, getLang }) {
    if (event.body && event.body.toLowerCase() === "bonne nuit") {
      return message.reply({
        body: "Bonne nuit fais de Beaux Rêves que Dieu te garde 🦊❤️❤️❤️",
        attachment: fs.createReadStream("bonne nuit.mp4"),
      });
    }
  }
};