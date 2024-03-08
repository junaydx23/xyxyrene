module.exports = {
  config: {
    name: "confess",
    aliases: ["confess"],
    version: "1.1", // Updated version
    author: "Jmlabaco",
    countDown: 5,
    role: 0,
    shortDescription: "Send a message to a specific thread.",
    longDescription: "Send a message to a specific thread using thread ID.",
    category: "box chat",
    guide: "Use: {p}confess <thread-id> <message>", // Updated guide
  },
  onStart: async function ({ api, event, args }) {
    if (args.length < 2) {
      api.sendMessage("Invalid Format. Use: {p}confess <thread/uid> <message>", event.threadID, event.messageID);
      return;
    }

    const idbox = args[0];
    const reason = args.slice(1).join(" ");

    const confessionMessage = `🌟 *Heure de confession* 🌟\n\n🫥 *Quelqu'un de BG vous fais part de ce message :* 🫥\n\n${reason}`;

    api.sendMessage(confessionMessage, idbox, () => {
      const youSentMessage = `🌟 *Confession envoyé maintenant va pécho Ed SAMA il est BG* 🌟\n\nYou Sent:\n\n${reason}`;
      api.sendMessage(`${api.getCurrentUserID()}`, () => {
        api.sendMessage(youSentMessage, event.threadID);
      });
    });
  }
};