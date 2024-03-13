const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const KievRPSSecAuth = "FAB6BBRaTOJILtFsMkpLVWSG6AN6C/svRwNmAAAEgAAACNPpSPKR1kdBOAQ32JT3l5Lh2S7SQGhekSwYmy+gnSvNhpoD+/7Oi83TsRFbIxNhsGV63wQFkmGimZ2u79g4q3x2coFBDcIMWU8YTASNTNtwVV+PCWQLlb+dSni8pSOa3VNPs6Z/HwbzxNUT88WGjZcOSUhJn2+v0PfqPIrJCb8HgMs0/nxvFWuUxAUR598yj6VfILeAotWJYPuIt+nUmjuImG4A574OoElm5dyLAUornsh+7xpuzCv4RIIb9n97OYQ3ZjUWhgdZHVp1G6DnsQGor6ejo5l0yHyc9BaQsGMuM7hs0zPtK1pSjRR7/dagCXZYU5EOHKlmAFV6VaqiHc984FATjN8ThxKRuBkqbJ4CXwpNXrRw19+tEOIxX38pLqLKCRr1W6QkqCUQdO5oUbgaJ1ZKaLjiMe3HvouXDyaBi8HQzkEgVXpqNgJ19DE4Qj4wsGdddgIqrc15KFPJrcr8BORJeVP0fZ/HugfhSv3EQk53FZpcE6DOQQunH5tBV6B/3moWK8zxmJ+EUaIWPVfpCM6O8SGJ9FfSros6IDW0Lfx7d1BzSR5WI4Y4phJNA9FaDBlbxNGs8nkVVWKOq+kI6+5obRvLQQPEcTQXk4VZ80NSuX4jiq5+GmxmRmbJz++6SCaW9jdm1aRwA7RJPU/jPgOnGWvx8/YKwgU5xAxuZGdSYK9RZD0YIy1bGO1owEOgPg0qlLWKUSmp/iabpEflPDDoHjIUTqKxTHChjDF9eOTuQwmiuFDH7uAVV4u+N2ZkDTUcphd5dGWqDpL8uywL7JUOjrjpJ4qO88drZXf+IloBsmBCmVErfNZyABQTXG3PbFpTZ5ycdLu3pAOWsCHZjGF2QtzE5mL1kh+lzuPRv+GmFmlJoO2oysjcf21x6p67TbBj3NHmMfFQqsnUHagcJ6jZirH7YBsmVYwJYxYCE5BhGQdCCv8Ezj8rodiUydMiAvLGkP+ZuSAMcrO/3W5cCzwg3f1Fzb6gi12EewNRMmzUG40XwWjdCIAUHwpeKWbvJnvr5lVA3wU+eFTToZMPkaQCdOONkx4UdGGRPTavSKaRn92xd+BZ5kTBPi3rhHIW6MEqqqzlqR8heBdjQ4kho0NX5p125WTMfbnpAZhiKiZvM6G+fxrAtQrkyVeU+XXVvVbvhaPHJOh7cpsJLfZXyOFI/fK0OrZ+2SaPngYTC2qpUXZtjyj9j6+aswsbvaKE/j8nD7C2dMSDtv3MWt3Uxp8iF1Fa4qm7/7LWZkSep6uBxtsn9QAJriVlH8B38OzPb5p0t76jtxiygMHaaLpiXlaUSfT3R09yEz6sWP/RUycpzU5J2kxXRxmTS1pDgGJ/0GEGOMDbvPSGGm8GxK42SqpgcHa/JuDiAKhONECaCmxRgcFOiMZQBqAK72lp4h2fHIuPL1UIE27dE/7IO8rOEB1ZWBrSbtfkeJ9S9qdSADAUAN+jtiqjaxQjnQCFTxFIEFKgruHs";
const _U = "1QYYkobIBrH1RpySRsbWadnJp7ikrOulXgai4dbMaUXHvLeICiO1zLewzjjDSd0u9PCLuRYo5xTJPCt-oHMdSAgpLJ8U90ziZMw_a7Av_grHm8di83yI-ioCeRPUZ0S4rZasAyup7LU_xpdFzFbZ2zteA5IKmvioljauc3gbZtVe67_bQ1hdqBhjjdEgPTMRfYI19LWuuHXOZCshb_C6llg";
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
