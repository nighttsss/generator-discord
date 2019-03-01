'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const _ = require('lodash');

module.exports = class extends Generator {
  default() {
    this.composeWith(require.resolve('generator-node/generators/app'), {
      babel: false,
      boilerplate: false,
      readme:
        '## Installation' +
        '\n' +
        '\n' +
        'Clone this repository, and run:' +
        '\n' +
        '```sh' +
        '\n' +
        '$ npm i' +
        '\n' +
        '```' +
        '\n' +
        '\n' +
        '## Usage' +
        '\n' +
        '\n' +
        '```sh' +
        '\n' +
        '$ npm run bot' +
        '\n' +
        '```'
    });
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the exquisite ${chalk.red('generator-discord')} generator!`
      )
    );

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message:
          "Your Discord bot's username. (Do not input the discriminator; you can add this later)",
        default: 'Awesome Username!'
      },
      {
        type: 'input',
        name: 'token',
        message: "Your bot's token (you can add this later)",
        default: 'supersecrettoken'
      },
      {
        type: 'list',
        name: 'voice',
        message: 'Do you need voice support for your bot?',
        choices: [
          "No, I don't need voice support",
          'Yes, through node-opus (prefered)',
          'Yes, through opusscript'
        ],
        filter: val => {
          switch (val) {
            case "No, I don't need voice support":
              return '';
            case 'Yes, through node-opus (prefered)':
              return 'node-opus';
            case 'Yes, through opusscript':
              return 'opusscript';
          }
        }
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.promptName
      this.props = props;
    });
  }

  writing() {
    // Base dir
    this.fs.copyTpl(
      this.templatePath('bot.js'),
      this.destinationPath('src/index.js')
    );

    this.fs.copyTpl(
      this.templatePath('config.js'),
      this.destinationPath('config.js'),
      {
        name: this.props.name,
        prefix: `+${_.toLower(this.props.name)}`,
        token: this.props.token
      }
    );

    // Commands
    this.fs.copyTpl(
      this.templatePath('commands/template.txt'),
      this.destinationPath('src/commands/template.txt')
    );

    this.fs.copyTpl(
      this.templatePath('commands/ping.js'),
      this.destinationPath('src/commands/ping.js')
    );

    this.fs.copyTpl(
      this.templatePath('commands/help.js'),
      this.destinationPath('src/commands/help.js')
    );
  }

  install() {
    let deps = ['discord.js', 'fs', 'count-files'];
    if (this.props.voice) {
      deps.push(this.props.voice);
    }

    this.npmInstall(deps, {
      save: true
    });

    console.log(
      yosay(
        'By the way, if you see that npm says that there is a "' +
          chalk.red('UNMET PEER' + ' DEPENDENCY') +
          '" don\'t  worry.'
      )
    );
  }
};
