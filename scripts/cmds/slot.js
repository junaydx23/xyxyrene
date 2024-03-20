const coolEmojis = ["🔥", "⭐️", "💎", "🧃", "🏵️", "🍭", "🎰"];

function getRandomEmoji() {
  const winSymbols = ["🔥", "🌈", "🍭","⭐️", "💎"]; // Symbols with higher win chance

  const randomIndex = Math.floor(Math.random() * coolEmojis.length);
  const emoji = coolEmojis[randomIndex];

  if (winSymbols.includes(emoji)) {
    // Increase the chance of selecting a winning symbol (80% chance)
    if (Math.random() < 0.8) {
      return emoji;
    }
  }

  // Fallback to a random selection if the win chance is not met
  return coolEmojis[Math.floor(Math.random() * coolEmojis.length)];
}

module.exports.config = {
  name: "slot",
  version: "1.0",
  role: 0,
  author: "JISHAN76",
  shortDescription: {
    en: "Slot game",
  },
  longDescription: {
    en: "Slot game.",
  },
  category: "Games",
};

module.exports.langs = {
  en: {
    invalid_amount: "Please enter a valid and positive amount to have a chance to win double.",
    not_enough_money: "You don't have enough balance to place that bet.",
    spin_message: "Spinning...",
    win_message: "Congratulations! You won $%1 with symbols: %2 %3 %4!",
    lose_message: "Oops! You lost $%1. Better luck next time.",
    jackpot_message: "🎉 Jackpot! You won $%1 with three %2 symbols! 🎉",
  },
};

module.exports.onStart = async function ({ args, message, event, usersData, getLang }) {
  const { senderID } = event;
  const userData = await usersData.get(senderID);
  const amount = parseInt(args[0]);

  if (isNaN(amount) || amount <= 0) {
    return message.reply(getLang("invalid_amount"));
  }

  if (amount > userData.money) {
    return message.reply(getLang("not_enough_money"));
  }

  const slot1 = getRandomEmoji();
  const slot2 = getRandomEmoji();
  const slot3 = getRandomEmoji();

  const winnings = calculateWinnings(slot1, slot2, slot3, amount);

  await usersData.set(senderID, {
    money: userData.money + winnings,
    data: userData.data,
  });

  const messageText = getSpinResultMessage(slot1, slot2, slot3, winnings, getLang);

  return message.reply(messageText);
};

function calculateWinnings(slot1, slot2, slot3, betAmount) {
  if (slot1 === slot2 && slot2 === slot3) {
    return betAmount * 3;
  } else if (slot1 === slot2 || slot1 === slot3 || slot2 === slot3) {
    return betAmount * 2;
  } else {
    return -betAmount;
  }
}

function getSpinResultMessage(slot1, slot2, slot3, winnings, getLang) {
  if (winnings > 0) {
    if (slot1 === slot2 && slot2 === slot3) {
      return getLang("jackpot_message", winnings, slot1);
    } else {
            const winMessage = getLang("win_message", winnings, slot1, slot2, slot3);
      return `${winMessage}`;
    }
  } else {
    const loseMessage = getLang("lose_message", -winnings);
    const slotMessage = `Your slot: ${slot1} | ${slot2} | ${slot3}`;
    return `${loseMessage}\n${slotMessage}`;
  }
}

module.exports.calculateWinnings = calculateWinnings;
module.exports.getSpinResultMessage = getSpinResultMessage;