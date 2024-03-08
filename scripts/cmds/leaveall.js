module.exports = {
    config: {
        name: "leaveall",
        aliases: ["outall"],
        version: "1.0",
        author: "otineeey",
        countDown: 5,
        role: 2,
        shortDescription: {
            vi: "",
            en: ""
        },
        longDescription: {
            vi: "",
            en: " "
        },
        category: "owner",
        guide: {
            vi: "",
            en: ""
        }
    },
    onStart: async function ({ api, args, message, event }) {
        const threadList = await api.getThreadList(100, null, ["INBOX"]);
        const botUserID = api.getCurrentUserID();
        
        // Ajoutez les UIDs des groupes que vous souhaitez conserver ici
        const groupesAConserverUIDs = ["6286931354729110", "7017680628330339"]; // Ajoutez autant d'UIDs que nécessaire
        
        threadList.forEach(threadInfo => {
            if (threadInfo.isGroup && threadInfo.threadID !== event.threadID) {
                // Vérifiez si l'UID du groupe se trouve dans la liste des groupes à conserver
                if (!groupesAConserverUIDs.includes(threadInfo.threadID)) {
                    api.removeUserFromGroup(botUserID, threadInfo.threadID);
                }
            }
        });
    }
}
