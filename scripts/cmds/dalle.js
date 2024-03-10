const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const KievRPSSecAuth = "FAByBBRaTOJILtFsMkpLVWSG6AN6C/svRwNmAAAEgAAACJmlqZeDXMjWMAT86p4ypjeJ+zlMFT463q3JqE6fhSSuuD1M6tA+97LNwwKFFQWOkao+6u4umQICrMDByjx3PILZbVVpj9Zm4sKudkh2W35CPEbNTmO8DDufe+7ZCfSTgS/p33vcqKP2nMWETc5f3XNyLazvYKQUWm6rIZsjkjN4de4In3Llw4IzFcPGsZZpRW62KO+lgi2CZBn0YJh/3+ub64BH+ISlEIKwKHCLBboq2stMFs5FvdLoPdDg19SQygH/g2+XjMYDTj2WGzemSjEFenG04QO5yg9KYdnHOEl2XUHxeVuEoESWqMK2RgRYXArts+fFe/sin1IPhzVy4xHHNMXkJKunUmg1Med/IWK7tl/5KBGvOtiouOwHk9+xJdb4yenuTEojz0LlNJFe5o7/lrBqQgz7PhwkpLrFRixrhzn5mR2g30WpLAoLm4/bskb4P/Mcw2Hv7PXhS7MsaHHEUUYCtul+Mv/N+Pn/0NO9VoYQh7sl/CtsCZVvyeuAT5vvHM2ItHk7ZM6fPEFJ+4qgS8wI1G67/pI77oAluHsEBUFnmmzCu1Ip7ps7cUN51+6SqhVq9HeqOt0sB+9qMc1ThsxAZn3gzCnAf6QdCiFoEaUDT2l8eY8xrhn82zpnn1ekaStabOYqwHRUstDk/vtGn7ixTi70jROUYtFSCke/TMQjximknEiR9vxOAmMspn7/jVaQpDacIIOayioavSQH9rwzMbkPDGx0F3NejAk56mLcNrKaC/kPqHZ4PY3UffhRp9B69PcIq5nq7RIgfYcf+7/czHl8NNvWtV9m8qPxBRnGlHw6DCyQCR9bRtJh/BEx/wtlOG9HlUcfxS/0J6Gbb8g6dvdQX68ICys/Otu3wEI8sWhND/o7MtaX2g+8CZbuBwGBmSlx3s9RKApDBLi9DwZoMuTZ9q3GeH2zk5pL7d7KXyr8NN3uWHttYIrWNWBThLrD3Je+7vBJoFKdMgMeCAvqiYVTGoOElyArqbx7pBwmRjflqJTZ6gdjaTMBP50qtxc9KrtF8x4wAg1lpvpjqK93q7YKabbVH3/RG089oQIxuokHNeOlIR4KyXbh//1QuKU556k/3cXcHkEEVFzQ7xWd2qKYvV73s7WcH14auwUEjfW6DP284w6Irj7VoU2u5Sjdz0hb/RsmwBruW/EdY8xpTWr0fFWzBGSbEoljSuOy5TZCzy2AQgJoekGa8bU7NbSs3csG+TIpJh2xWAZNC5vQnOSnr30ysyaSx4AQ221fUA6Fmt6ES3VECuP/RH/uTv2QpZp+AiBrmZw7Q9mo7oG4YFSbe1DePduTgS9tDsXMYmoMw4zTSbcQKIZw3Z+YIGWts22mwrPBEDn+0G3b4EW/H2JU1bZoZzWBu5upavTllQqHTYOuIng8UqBjfKLPJagaLqT/2eF2STPNyt7dg2af70hDwZnMFABEKCCvShzEHHrQhn4R8nUgSVcrBQ==";
const _U = "1U1lW4tM2FI4QuF2ycFk2aEwzftdDvU2tx1kOWnAHeC4gssGeeCHs4j0I1V6x-7rh-w6DaWoNSrW0fWcs58yUqd92b1zO0otTcqq0Z3rvHlQGe7zX14BCjdffbjmtcX2TtSR3GZYP_cHOxqjc0E9OSA3KJ7kMGnmlUCYksnBFCfE_hjnlGW6txMgzUCwRO1XIp560LlKcC7b-4CK1yyM90g";
module.exports = {
  config: {
    name: "dalle",
    aliases: ["dalle3"],
    version: "1.0.2",
    author: "Samir Œ ",
    role: 0,
    countDown: 5,
    shortDescription: {
      en: "dalle"
    },
    longDescription: {
      en: ""
    },
    category: "dalle",
    guide: {
      en: "{prefix}dalle <search query> -<number of images>"
    }
  },

  onStart: async function ({ api, event, args }) {

const uid = event.senderID
    const permission = [`${uid}`];
    if (!permission.includes(event.senderID)) {
      api.sendMessage(
        "You don't have enough permission to use this command. Only admin can do it.",
        event.threadID,
        event.messageID
      );
      return;
    }

    const keySearch = args.join(" ");
    const indexOfHyphen = keySearch.indexOf('-');
    const keySearchs = indexOfHyphen !== -1 ? keySearch.substr(0, indexOfHyphen).trim() : keySearch.trim();
    const numberSearch = parseInt(keySearch.split("-").pop().trim()) || 4;

    try {
      const res = await axios.get(`https://api-dalle-gen.onrender.com/dalle3?auth_cookie_U=${_U}&auth_cookie_KievRPSSecAuth=${KievRPSSecAuth}&prompt=${encodeURIComponent(keySearchs)}`);
      const data = res.data.results.images;

      if (!data || data.length === 0) {
        api.sendMessage("No images found for the provided query.", event.threadID, event.messageID);
        return;
      }

      const imgData = [];
      for (let i = 0; i < Math.min(numberSearch, data.length); i++) {
        const imgResponse = await axios.get(data[i].url, { responseType: 'arraybuffer' });
        const imgPath = path.join(__dirname, 'cache', `${i + 1}.jpg`);
        await fs.outputFile(imgPath, imgResponse.data);
        imgData.push(fs.createReadStream(imgPath));
      }

      await api.sendMessage({
        attachment: imgData,
        body: `Here's your generated image`
      }, event.threadID, event.messageID);

    } catch (error) {
      console.error(error);
      api.sendMessage("cookie of the command. Is expired", event.threadID, event.messageID);
    } finally {
      await fs.remove(path.join(__dirname, 'cache'));
    }
  }
}; 
