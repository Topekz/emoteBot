const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();
const fs = require('fs');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("Type twitch emotes");
});

const emotes = JSON.parse(fs.readFileSync('emotes.json'));

console.log(emotes);

client.on('message', msg => {
    if(emotes.hasOwnProperty(msg.content)) {
      try {
        msg.delete();
      } catch(e) {}
      try {
        msg.channel.send(new Discord.MessageEmbed()
          .setColor('#FFFFFF')
          .setAuthor(msg.author.username, msg.author.avatarURL())
          .attachFiles(new Discord.MessageAttachment('./emotes/' + emotes[msg.content], emotes[msg.content]))
          .setImage('attachment://' + emotes[msg.content])
        );
      } catch(e) {}
    }
});

client.login(process.env.DC_KEY);
