const { Telegraf } = require('telegraf');
const cron = require('node-cron');

const bot = new Telegraf('8489827420:AAH6Uj7WZ70mn5bT3SXnwzZqdD3k6yK_NQ0');

const CHAT_ID = -1003775852787;

// старт
bot.start((ctx) => {
  ctx.reply('Бот працює 🚀');
});

// тест
bot.command('test', (ctx) => {
  bot.telegram.sendPoll(
    CHAT_ID,
    'НОВИЙ ТЕСТ 🔥',
    ['1', '2'],
    { is_anonymous: false }
  );
});

// авто кожну хвилину (для тесту)
cron.schedule('* * * * *', () => {
  bot.telegram.sendPoll(
    CHAT_ID,
    'волейбол сьогодні?',
    ['13', '14', '15', '16', '17'],
    { is_anonymous: false }
  );

  console.log('Poll sent');
}, {
  timezone: 'Europe/Warsaw'
});

bot.launch();

console.log('Bot started...');

// коректне завершення
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));