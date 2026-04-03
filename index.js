const { Telegraf } = require('telegraf');
const cron = require('node-cron');

const bot = new Telegraf('8489827420:AAH6Uj7WZ70mn5bT3SXnwzZqdD3k6yK_NQ0');

const CHAT_ID = -1003775852787;

// старт
bot.start((ctx) => {
  ctx.reply('Бот працює 🚀');
});

// авто кожну хвилину (виправив,тепер кожен день о 12:00)
cron.schedule('0 12 * * *', () => {
  bot.telegram.sendPoll(
    CHAT_ID,
    'волейбол сьогодні?',
    ['13','14','15','16','17','18','19'],
    { is_anonymous: false }
  );

  console.log('Poll sent at:', new Date());
}, {
  scheduled: true,
  timezone: "Europe/Warsaw"
});

bot.launch();

console.log('Bot started...');

// коректне завершення
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));