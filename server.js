const express = require("express");
const axios = require("axios");
const TelegramBot = require("node-telegram-bot-api");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

app.use(express.static("public"));

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Matches "/echo"
bot.onText(/\/price/, async (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message
    const res = await axios.get("https://api.pancakeswap.info/api/v2/tokens/0x397484a29e59f746e897140320425bbbf27ee334");

    resp = `💵 Price: $${Number(res.data.data.price).toFixed(10)}` || "";
    // send back the matched "whatever" to the chat
    bot.sendMessage(msg.chat.id, resp);
});

bot.onText(/\/buyback/, async (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message
    const priceRes = await axios.get("https://api.pancakeswap.info/api/v2/tokens/0x397484a29e59f746e897140320425bbbf27ee334");
    let price = Number(priceRes.data.data.price);

    const res = await axios.get(
        "https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=0x397484A29e59F746e897140320425Bbbf27EE334&address=0x000000000000000000000000000000000000dead&tag=latest&apikey=YZCXTQS4361QANZ1P7MCDD3HN765XGHT2K"
    );

    const buyback = (Number(res.data.result) / 1000000000).toFixed(0) || 0;
    const totalValue = ((Number(res.data.result) / 1000000000) * Number(price)).toFixed(2) || 0;
    const percent = (Number(res.data.result) / 1000000000000000 / 1000).toFixed(2) || 0;

    resp =
        `Buybacks of $TBC token come from winning bets and placing the profit on the chart. Tokens that have been bought back are then sent to a dead wallet and burnt forever, thereby reducing the effective supply.

  ◼️🔥 BURN STATS 🔥◼️

  Tokens Bought Back: ${buyback}
  Percentage of Overall Supply: ${percent}% 
  Total Value: $${totalValue}` || "";

    // send back the matched "whatever" to the chat
    bot.sendMessage(msg.chat.id, resp);
});

bot.onText(/\/countdown/, async (msg, match) => {
    //worldcup countdown
    const countDownDate = new Date("Nov 20, 2022").getTime();

    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    bot.sendMessage(
        msg.chat.id,
        `🏆 World Cup 2022 Countdown 🏆
        ${days} days until kicks off!`
    );
});

bot.onText(/\/groups/, async (msg, match) => {
    //worldcup countdown

    bot.sendPhoto(msg.chat.id, `./public/groups.png`, {
        caption: `🏆 World Cup 2022 Groups 🏆`,
    });
});
bot.onText(/\/schedule/, async (msg, match) => {
    //worldcup countdown

    bot.sendPhoto(msg.chat.id, `./public/schedule1.png`, {
        caption: `🏆 World Cup 2022 Schedule 🏆`,
    });
});
// Listen for any kind of message. There are different kinds of
// messages.
// bot.on("message", (msg) => {
//   const chatId = msg.chat.id;
//   console.log(msg);

//   // send a message to the chat acknowledging receipt of their message
//   bot.sendMessage(chatId, "Received your message");
// });

app.listen(process.env.PORT || 5000, () => {
    console.log("Server is running on port", process.env.PORT || 5000);
});
