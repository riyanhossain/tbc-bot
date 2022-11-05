const axios = require("axios");
const TelegramBot = require("node-telegram-bot-api");

// replace the value below with the Telegram token you receive from @BotFather
const token = "5730162874:AAFixU8PirGec4IQFoPvRJ-I8cxPab1k7Ww";

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Matches "/echo [whatever]"
bot.onText(/\/price/, async (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message
  const res = await axios.get(
    "https://api.pancakeswap.info/api/v2/tokens/0x397484a29e59f746e897140320425bbbf27ee334"
  );

  resp = `Price: $${Number(res.data.data.price).toFixed(10)}` || "";
  // send back the matched "whatever" to the chat
  bot.sendMessage(
    msg.chat.id,
    resp,
  );
});

// Listen for any kind of message. There are different kinds of
// messages.
// bot.on("message", (msg) => {
//   const chatId = msg.chat.id;
//   console.log(msg);

//   // send a message to the chat acknowledging receipt of their message
//   bot.sendMessage(chatId, "Received your message");
// });
