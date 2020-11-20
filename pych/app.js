const TelegramBot = require('node-telegram-bot-api');
const Agent = require('socks5-https-client/lib/Agent');

const token = '1416043424:AAEsGDNnL5vBAJYs6836ldwoAYCLgFNNZTU';
const bot = new TelegramBot(token, {
  polling: true,
  request: { // 设置代理
    agentClass: Agent,
    agentOptions: {
      socksPassword: 'TA7Ak8XrDe9x7RyyVM'
    }
  }
});

// 匹配/hentai
bot.onText(/\/hentai/, function onLoveText(msg) {
  bot.sendMessage(msg.chat.id, 'Are you a hetai?');
});


// 匹配/echo
bot.onText(/\/echo (.+)/, (msg, match) => {

  const chatId = msg.chat.id;
  const resp = match[1];
  bot.sendMessage(chatId, resp);
});