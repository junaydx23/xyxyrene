const fetch = require('node-fetch');

module.exports = {
  config: {
    name: "time",
    version: "1.0",
    author: "Edson",
    shortDescription: "Get local time based on country",
    longDescription: "Get the local time based on the user's provided country.",
    category: "utility",
    guide: "{prefix}time <country>. Ex: {prefix}time France"
  },

  onStart: async function ({ message, args, api }) {
    const country = args.join(" ");

    if (!country) {
      return api.sendMessage("Please provide a country.", message.threadID);
    }

    try {
      const countryAPIUrl = `https://restcountries.com/v3.1/name/${encodeURIComponent(country)}?fields=timezones`;
      const response = await fetch(countryAPIUrl);
      const data = await response.json();

      if (data.length > 0 && data[0].timezones && data[0].timezones.length > 0) {
        const timezone = data[0].timezones[0];
        const currentTime = new Date().toLocaleString("en-US", { timeZone: timezone });
        return api.sendMessage(`Current time in ${country}: ${currentTime}`, message.threadID);
      } else {
        return api.sendMessage(`Unable to find time for ${country}. Please make sure the country name is correct.`, message.threadID);
      }
    } catch (error) {
      console.error("Error fetching local time:", error);
      return api.sendMessage("An error occurred while fetching local time. Please try again later.", message.threadID);
    }
  }
};
