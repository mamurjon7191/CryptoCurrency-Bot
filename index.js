const Telegram = require("telegraf");
const axios = require("axios");

const bot = new Telegram("5590557160:AAHprckjxlSqQ_kppH53q0j_f8OyatgF9vg");

///////////////////////////////////////////////////////////////////////

// Learning inline keybooards

// bot.start((ctx) => {
//   console.log(ctx.from.first_name);
//   ctx.reply("Welcome " + ctx.from.first_name + "!");
// });

// bot.command("test", (ctx) => {
//   bot.telegram.sendMessage(ctx.chat.id, "Choose one of your favourite fruit", {
//     reply_markup: {
//       inline_keyboard: [
//         [
//           { text: "apple", callback_data: "apple" },
//           { text: "peach", callback_data: "peach" },
//         ],
//         [{ text: "water-melon", callback_data: "water-melon" }],
//       ],
//     },
//   });
// });

// bot.action("apple", (ctx) => {
//   ctx.deleteMessage();
//   bot.telegram.sendMessage(ctx.chat.id, "Find types of apple", {
//     reply_markup: {
//       inline_keyboard: [
//         [
//           { text: "apple-uzb", callback_data: "apple" },
//           { text: "peach-russia", callback_data: "peach" },
//         ],
//         [{ text: "water-melon-kirgiz", callback_data: "water-melon" }],
//         [{ text: "Back to menu", callback_data: "back" }],
//       ],
//     },
//   });
// });

// bot.action("back", (ctx) => {
//   ctx.deleteMessage();
//   bot.telegram.sendMessage(ctx.chat.id, "Choose one of your favourite fruit", {
//     reply_markup: {
//       inline_keyboard: [
//         [
//           { text: "apple", callback_data: "apple" },
//           { text: "peach", callback_data: "peach" },
//         ],
//         [{ text: "water-melon", callback_data: "water-melon" }],
//       ],
//     },
//   });
// });

///////////////////////////////////////////////////////////////////////

const apiKey =
  "abdb559cb313f7da314df61c86ffca86596b44299abbcdcce97591b372a03c24";

const start = (ctx) => {
  bot.telegram.sendMessage(ctx.chat.id, "Choose one of the Crypto", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Crypto prices", callback_data: "allCrypotoes" }],
        [{ text: "CoinMarketCap", url: "https://www.cryptocompare.com/" }],
      ],
    },
  });
};

bot.start((ctx) => {
  ctx.reply(
    "Welcome " +
      ctx.from.first_name +
      " ," +
      "this bot gives you crypto currency information!"
  );
  start(ctx);
});

bot.action("allCrypotoes", (ctx) => {
  ctx.deleteMessage();
  bot.telegram.sendMessage(
    ctx.chat.id,
    "Get price information,choose one crypto currencies below",
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "BTC", callback_data: "BTC" },
            { text: "ETH", callback_data: "ETH" },
          ],
          [
            { text: "BCH", callback_data: "BCH" },
            { text: "LTC", callback_data: "LTC" },
          ],
          [{ text: "Back to Menu", callback_data: "start" }],
        ],
      },
    }
  );
});

bot.action("start", (ctx) => {
  ctx.deleteMessage();
  start(ctx);
});

const crypto = ["BTC", "ETH", "BCH", "LTC"];

bot.action(crypto, async (ctx) => {
  ctx.deleteMessage();
  const one = ctx.update.callback_query.data;
  try {
    const data = await axios.get(
      `https://min-api.cryptocompare.com/data/price?fsym=${one}&tsyms=USD,JPY,EUR`
    );
    let message = `
      USD:${data.data.USD}
      JPY:${data.data.JPY}
      EUR:${data.data.EUR}`;
    bot.telegram.sendMessage(ctx.chat.id, message, {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Back to cryptoes", callback_data: "allCrypotoes" }],
        ],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

bot.launch();
