const axios = require("axios");

module.exports = {
  config: {
    name: "meme2",
    version: "1.0",
    author: "Ed",
    countDown: 5,
    role: 0,
    shortDescription: "Générateur de mèmes",
    longDescription: "Créez des mèmes amusants à partir de modèles populaires.",
    category: "funny",
    guide: "{pn} <texte haut> <texte bas>: créez un mème personnalisé",
  },

  langs: {
    en: {
      guide: "{pn} <top text> <bottom text>: create a custom meme",
    },
  },

  onStart: async function ({ args, message, getLang }) {
    if (args.length !== 2) {
      return message.reply(getLang("guide", { pn: message.prefix }));
    }

    const [topText, bottomText] = args;

    try {
      const memeUrl = await generateMeme(topText, bottomText);
      return message.reply({ attachment: memeUrl });
    } catch (err) {
      console.error(err);
      return message.reply("Une erreur s'est produite lors de la création du mème.");
    }
  },
};

async function generateMeme(topText, bottomText) {
  const apiUrl = "https://api.imgflip.com/caption_image";
  const templateId = 181913649; // ID du modèle de mème (Drake Hotline Bling)
  const username = "PrinceFiogbe";
  const password = "1234azerqsdf";

  const response = await axios.post(apiUrl, null, {
    params: {
      template_id: templateId,
      username,
      password,
      text0: topText,
      text1: bottomText,
    },
  });

  if (response.data.success) {
    return response.data.data.url;
  } else {
    throw new Error("Échec de la création du mème");
  }
}