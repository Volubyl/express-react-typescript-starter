#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
const nodemon = require('nodemon');
const cp = require('child_process');
const path = require('path');

const { log } = console;

const ENV = process.env.NODE_ENV || 'developement';

if (ENV === 'developement') {
  nodemon({
    watch: ['src'],
    ext: 'ts',
    ignore: ['src/**/*.test.ts'],
    exec: 'ts-node ./src/bin/www.ts',
  });

  nodemon
    .on('start', function start() {
      log('Node server has started in developement mode');
    })
    .on('quit', function quit() {
      log('App has quit');
      process.exit();
    })
    .on('restart', function restart(files) {
      log('App restarted due to: ', files);
    });
} else {
  log('Node server has started in production mode');
  cp.fork(path.join(__dirname, '../build/bin/www.js'));
}
