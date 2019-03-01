const amount = require('count-files')('src/commands', (err, res) => {
  if (err) return console.log(err);
});

module.exports = {
  name: 'help',
  description: 'Lists all of my commands or info about a specific command. ℹ',
  aliases: ['commands', 'h', 'cmnds'],
  usage: '[command name]',
  execute(client, msg, args) {
    const data = [];
    const { commands } = client; // get the list of commands

    if (!args.length) {
      // if no arguments were passed...
      data.push(`Here\'s a list of my **${amount.files}** commands: \`\`\``);
      data.push(commands.map(command => command.name).join(', '));
      data.push('```');
      data.push(
        '\nYou can send `n!help [command name]` to get info on a specific command!'
      );

      return msg.author
        .send(data, { split: true })
        .then(() => {
          // send the response in the user's DMs.
          if (msg.channel.type == 'dm') return; // if the command was sent in DMs, exit out.
          msg.reply('I have sent you a DM with all of my commands!'); // if the command was sent in a server, tell the user to check their DMs.
        })
        .catch(error => {
          // if there was an error...
          console.log(
            `Could not send the help DM to ${msg.author.tag}.\n`,
            error
          ); // log the error.
          msg.reply("it seems like I can't DM you!"); // tell the user that they can not be DMed.
        });
    }

    const name = args[0].toLowerCase(); // get the command's name and convert it to lowercase.
    const command =
      commands.get(name) ||
      commands.find(c => c.aliases && c.aliases.includes(name)); // find a command with the same name as the arg.

    if (!command) return msg.reply("that's not a valid command!"); // if there is no command found, report that the command doesn't exist.

    data.push(`**Name:** ${command.name}`);

    if (command.aliases)
      data.push(`**Aliases:** ${command.aliases.join(', ')}`);
    if (command.description)
      data.push(`**Description:** ${command.description}`);
    if (command.permissions)
      data.push(
        `**Required Permissions:**\n\`\`\`${command.permissions.join(
          '\n'
        )}\`\`\``
      );
    if (command.usage)
      data.push(`**Usage:** n!${command.name} ${command.usage}`);
    if (command.guildOnly) data.push('**Guild Only?** True.');
    if (command.ownerOnly) data.push('**Owner Only?** True.');

    return msg.author
      .send(data, { split: true })
      .then(() => {
        // send the response in the user's DMs.
        if (msg.channel.type == 'dm') return; // if the command was sent in DMs, exit out.
        msg.reply('Check your DMs!'); // if the command was sent in a server, tell the user to check their DMs.
      })
      .catch(err => {
        // if there was an error...
        console.log(`Could not send the help DM to ${msg.author.tag}.\n`, err); // log the error.
        msg.reply("it seems like I can't DM you!"); // tell the user that they can not be DMed.
      });
  }
};
