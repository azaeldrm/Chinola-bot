const config = require('./config');
const modules = require('./modules')
const Moment = require('moment');
const Discord = require('discord.js');

const token = config.token;
const client = new Discord.Client();

client.login(config.token);

client.on('ready', () => {
  console.log('Bot is now connected');
  client.channels.find(x => x.name === 'general').send('Hello! I\'m now connected to your channel. :)');
});

client.on('message', (msg) => {
  if (msg.content === '!hello') {
    msg.channel.send(`Hello ${msg.author}!`);
  }

  if (msg.content === '!date') {
    msg.channel.send(`Today\'s date is ` + Moment().format('MMMM Do, YYYY.'));
  }

  if (msg.content === '!time') {
    msg.channel.send(`The time is ` + Moment().format('hh:mm:ss A.'));
  }

  if (msg.content === '!timer') {
    const secs = 10;
    const startTime = Moment();
    const endTime = startTime.clone().add(secs, 'seconds');
    msg.channel.send(`You have until ` + endTime.format('hh:mm:ss') + ` (${secs} seconds) to join!`);
    modules.startCountdown(secs, msg);
  }

  if (msg.content === '!weather') {
    const city = 33578;
    modules.weatherByRequest(city, msg);
    // Add an ability for whoever writes !weather to add its country there
    // instead of listening again for another message (easier)
  }

  if (msg.content === '!web') {
    msg.channel.send('https://azaeljpg.com/');
  }

});

// Ideas:
// Add weather predictions for every day of the week.
// Playing around with code:
// Moment().add(1,'week').format('MMMM Do, YYYY.') adds to the current date.
