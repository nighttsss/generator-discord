module.exports = {
  name: 'ping',
  description: "Calculate the bot's heartbeat 🏓",
  execute(client, msg, args) {
    const heartbeat = `${Math.round(
      client.pings.reduce((a, b) => {
        return a + b;
      }) / client.pings.length
    )}ms`;

    msg.reply(`pong! 🏓 - Heartbeat of ${heartbeat}`);
  }
};
