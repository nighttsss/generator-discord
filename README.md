# generator-discord [![NPM version][npm-image]][npm-url]

> A simple Yeoman generator to generate a feature rich Discord.js bot!

`generator-discord` includes:

- [discord.js](https://github.com/discordjs/discord.js), a library that allows you to interact with the [Discord API](https://discordapp.com/developers/docs/intro)
- A command handler
- A dynamic help commands

`generator-discord` is also built upon [generator-node](https://github.com/yeoman/generator-node), therefore your project will also include:

- A filled `package.json` file
- [eslint](http://eslint.org/) linting and code style check
- [nsp](https://nodesecurity.io/) known vulnerability check
- [Travis CI](https://travis-ci.org/) continuous intergration (optional)
- A [license](https://spdx.org/licenses/)

## Installation

First, install [Yeoman](http://yeoman.io) and generator-discord using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-discord
```

Then generate your new project:

```bash
yo discord
```

## Getting Started

After the generation is complete, just make sure that your `config.js` looks right. Then you can work on your bot. The layout of the bot is pretty simple. The files for your bot are in the `/src` folder. `src/index.js` is the entry point. You can add commands to the `/commands` folder by adjusting the template given to you in `template.txt`. The help command generated is dynamic, so it will update as you add them.

When you want to run your bot, run the following command in your project's root folder:

```bash
$ npm run bot
```

## License

MIT © [Jacob Smith](https://jsmiith.github.io/)

[npm-image]: https://badge.fury.io/js/generator-discord.svg
[npm-url]: https://npmjs.org/package/generator-discord
