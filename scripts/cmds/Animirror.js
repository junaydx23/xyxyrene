const axios = require("axios");
const { getStreamFromURL } = global.utils;


const models = {
  "1": "Anime Premium",
  "2": "Cartoon Premium",
  "3": "Anime Style: Maid Outfit",
  "4": "Anime Style: Beach Babe",
  "5": "Anime Style: Sweet Fantasy",
  "6": "Anime Style: Love Story Comic",
  "7": "Anime Style: High School Memories",
  "8": "Anime Style: Festive Christmas",
  "9": "Anime Art: Pirate Adventure ( One Piece )",
  "10": "Anime Art: Pop Star Sensation ( Oshi no Ko )",
  "11": "Anime Art: Ninja Legacy ( Naruto )",
  "12": "Anime Art: Super Warriors ( DBZ )",
  "13": "Anime Art: Dark Notebook ( Death Note )",
  "14": "Anime Art: Eternal Battle ( Bleach )",
  "15": "Anime Art: Wings of Destiny ( AOT )",
  "16": "Anime Art: Mystic Magic (Jujutsu Kaisen)",
  "17": "Anime Art: Tennis Prodigy (ThePrince of Tennis)",
  "18": "Anime Art: Demon Slayer Chronicles (Demon Slayer)",
  "19": "Anime Art: Alchemical Adventures (Fullmetal Alchemist)",
  "20": "Anime Art: Heroic Future (My Hero Academia)",
  "21": "Anime Art: Prehistoric Quest (Dr Stone)",
  "22": "Anime Art: Court Clash (Haikyuu)"
};

module.exports = {
  config: {
    name: "Animirror",
    version: "1.0",
    author: "SiAM",// Don't change 
    countDown: 15,
    role: 0,
    shortDescription: "Turn yourself into an anime character!",
    longDescription: "Apply an anime-style filter to an image to turn it into an anime character.",
    category: "Image",
    guide: {
      en: "{pn} [modelNumber]\nexample: {pn} 2\n\nHere are the available models:\n" + Object.entries(models).map(([number, name]) => `❏ ${number} : ${name}`).join("\n")
    }
  },

  onStart: async function ({ api, args, message, event }) {
    try {
      const [modelNumber] = args;

      if (!modelNumber || isNaN(modelNumber) || !models[modelNumber]) {
        return message.reply("Invalid model number. Please provide a valid model number from the list.");
      }

      if (!(event.type === "message_reply" && event.messageReply.attachments && event.messageReply.attachments.length > 0 && ["photo", "sticker"].includes(event.messageReply.attachments[0].type))) {
        return message.reply("Please reply to an image to apply the anime filter.⚠");
      }

      const imageUrl = event.messageReply.attachments[0].url;
      const encodedImageUrl = encodeURIComponent(imageUrl);

      const processingMessage = message.reply(`Applying the Filter, please wait...\nModel using: ${modelNumber} (${models[modelNumber]}) ⌛`);

      const response = await axios.get(`https://simoapi-aimirror.onrender.com/generate?imageUrl=${encodedImageUrl}&modelNumber=${modelNumber}`);

      const { imageUrl: generatedImageUrl } = response.data;
      const Stream = await getStreamFromURL(generatedImageUrl);

      await message.reply({
        body: `Anime Art applied ✨\nModel used: ${modelNumber} (${models[modelNumber]})`,
        attachment: Stream,
      });

      message.reaction("✅", event.messageID);
      message.unsend((await processingMessage).messageID);

    } catch (error) {
      console.error(error);
      message.reply("Failed to apply the Anime filter.⚠");
    }
  }
};
