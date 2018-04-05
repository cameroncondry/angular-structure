// libraries
const _ = require('lodash');
const chalk = require('chalk');
const gulp = require('gulp');
const moment = require('moment');
const path = require('path');
const util = require('util');
const yargs = require('yargs');

// variables
let config = require('./gulp.config.js');

// helpers
const noop = () => {};
const log = (...rest) => {
    let output = rest.map(util.inspect);
    output.unshift(chalk.gray(moment().format('HH:mm:ss')));
    output.unshift('[%s] %s');
    console.log.apply(console, output);
};

// initialize gulp tasks
initialize();

function initialize() {
    util.inspect.defaultOptions.colors = true;
    util.inspect.defaultOptions.depth = 3;

    displayFlags();

    normalizePaths(config);
}

function displayFlags() {
    let flags = ['production', 'sourcemaps', 'watch'];
    log(...flags);
}

/**
 * Guard against errors by normalizing file paths:
 * - remove begin/end slashes
 * - condense repeat slashes
 * @param {string} item
 * @returns {string}
 */
function normalizePath(item) {
    return _.isString(item)
        ? path.normalize(item).replace(/^\/|\/$/g, '')
        : item;
}

function normalizePaths(object) {
    const keys = ['origin', 'target', 'output'];

    const normalize = (obj) => {
        _.each(obj, (value, key) => {
            if (_.includes(keys, key)) obj[key] = normalizePath(value);
            if (_.isObject(value)) normalize(value);
        });
    };

    normalize(object);
}

// const on = gulp.on;
// gulp.on = (name, handler) => {
//     if (['task_start', 'task_stop'].includes(name)) return;
//
//     return on.apply(gulp, [name, handler]);
// };

// yargs.option('silent', {alias: 's', default: false, description: 'Reduces logging output', type: 'boolean'});
// yargs.option('watch', {alias: 'w', default: false, description: 'Reload browser and files on change', type: 'boolean'});
// yargs.parse();

gulp.task('default', () => {

});
