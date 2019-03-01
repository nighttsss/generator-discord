'use strict';

// generated using jsmiith's generator-discord

const config = require('../config.js');

const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.login(config.token);

// command handler
const commandFiles = fs
  .readdirSync('./src/commands/')
  .filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

// events

client.on('ready', () => console.log(`${config.name} is ready!`));

client.on('message', msg => {
  if (msg.author.bot) return; // if a bot sends a message, ignore it

  if (msg.content.startsWith(config.prefix)) {
    // if the message has the assigned prefix in it...
    const args = msg.content.slice(config.prefix.length).split(/ +/); // get all of the arguments into an array
    const commandName = args.shift().toLowerCase();

    const command =
      client.commands.get(commandName) ||
      client.commands.find(
        cmd => cmd.aliases & cmd.aliases.includes(commandName)
      ); // get the command by it's name or aliases
    if (!command) return; // if the command doesn't exist, stop

    if (command.permissions) {
      // if the command has a permissions property...
      var missingPermissions = [];

      for (let i = 0; i < command.permissions.length; i++) {
        // for every permission specified...
        if (!msg.member.hasPermission(command.permissions[i]))
          // if the member doesn't have the current permission...
          missingPermissions.push(command.permissions[i]); // push the permission to the missingPermissions array
      }

      // if the user is missing permissions, alert them.
      if (missingPermissions.length > 0)
        return msg.reply(
          "sorry, but you don't have permission to run that command!"
        );
    }

    // if the command has an ownerOnly property and user is not the server's owner
    if (command.ownerOnly && msg.author.id !== msg.guild.owner.id)
      return msg.reply(
        "sorry, but you don't have permission to run that command!"
      );

    // if the command has a guildOnly property and the message is not in a guild's text channel
    if (command.guildOnly && msg.channel.type !== 'text')
      return msg.reply("I can't execute that command inside DMs!");

    if (command.args && !args.length) {
      // if the command has an args property, but none are passed...
      let reply = "you didn't provide any arguments!";

      if (command.usage)
        // if the command has a usage property...
        reply += `\nThe proper usage would be: \`${prefix}${command.name} ${
          command.usage
        }\``;

      return msg.reply(reply);
    }

    try {
      command.execute(client, msg, args); // try to execute the command
    } catch (err) {
      console.log(err); // log any errors
      msg.reply('there was an error trying to execute that command!');
    }
  }
});
