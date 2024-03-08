const fs = require("fs");

module.exports = {
 config: {
 name: "v2a",
 aliases: ["video2audio"],
 description: "Convert Video to audio ",
 version: "1.0",
 author: "Gina Cole",
 countDown: 10,
 Description: {
			vi: "",
			en: "Reply to a video"
 },
 
 category: "media",
 },
 onStart: async function ({ api, event, args, message }) {
 try {
 const axios = require("axios");
 const fs = require("fs-extra");

 if (!event.messageReply || !event.messageReply.attachments || event.messageReply.attachments.length === 0) {
 api.sendMessage("Please reply to a video", event.threadID, event.messageID);
 return;
 }

 const att = event.messageReply.attachments[0];
 if (att.type !== "video") {
 api.sendMessage("please reply to the video🤒.", event.threadID, event.messageID);
 return;
 }

 const { data } = await axios.get(att.url, { method: 'GET', responseType: 'arraybuffer' });
 fs.writeFileSync(__dirname + "/assets/vdtoau.m4a", Buffer.from(data, 'utf-8'));

 const audioReadStream = fs.createReadStream(__dirname + "/assets/vdtoau.m4a");
 const msg = { body: "", attachment: [audioReadStream] };
 api.sendMessage(msg, event.threadID, event.messageID);
 } catch (e) {
 console.log(e);
 }
 },
};