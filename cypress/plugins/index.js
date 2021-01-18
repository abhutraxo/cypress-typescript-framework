/// <reference types="cypress" />

const path = require('path');
const webpack = require('@cypress/webpack-preprocessor');
const happoTask = require('happo-cypress/task');

module.exports = (on) => {
  const options = {
    webpackOptions: require('../../webpack.config'),
  };
  on('file:preprocessor', webpack(options));
  on('task', {
    log(message) {
      console.log(message);
      return null;
    },
  });
  on('before:browser:launch', (browser, launchOptions) => {
    if (browser.name === 'chrome') {
      launchOptions.args.push('--window-size=1280,1024');
      launchOptions.args.push('--force-device-scale-factor=2');
      launchOptions.preferences.default['download'] = {
        default_directory: path.join(path.resolve('.') + '/cypress/e2e/resources/'),
        prompt_for_download: false,
      };
    }

    return launchOptions;
  });
  on('task', {
    deleteFile(fileName) {
      const fs = require('fs');
      const downloadPath = path.join(path.resolve('.') + '/cypress/e2e/resources/');
      const absolutePath = downloadPath + fileName;
      const fileStats = fs.statSync(absolutePath);
      const fileSize = fileStats.size;

      if (fs.existsSync(absolutePath) && fileSize > 0) {
        try {
          fs.unlinkSync(absolutePath);
          console.log('File deleted');
          return null;
        } catch (err) {
          console.log(err);
        }
      }
      console.log('File is not exists');
      return null;
    },
  });
  on('task', happoTask);
};
