const fs = require('fs');
module.exports = {
  config: {
    name: "merci tamamo",
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
    if (event.body && event.body.toLowerCase() === "merci tamamo") {
      return message.reply({
        body: "mais de rien master à ton service 🦊❤️❤️❤️",
        attachment: fs.createReadStream("merci tamamo.mp4"),
      });
    }
  }
};