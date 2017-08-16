(function () {
    var _ = require('lodash');
    var browser = require('browser-sync');
    var colors = require('colors');
    var del = require('del');
    var filesize = require('filesize');
    var fs = require('fs');
    var gulp = require('gulp');
    var moment = require('moment');
    var path = require('path');
    var util = require('gulp-util');
    var webpack = require('webpack');
    var webpackStream = require('webpack-stream');

    var sprintf = require('sprintf-js').sprintf;

    var reload = false;
    var watchers = [];
    var tasks = {
        compile: [],
        default: [],
        watch: []
    };

    var config = {
        glob: {
            clean: ['web/resources']
        },
        js: {
            main: {
                origin: 'src/app',
                target: 'web/resources/js',
                file: 'main.js',
                glob: {
                    ts: ['**/*.ts'],
                    watch: ['**/*.html']
                }
            },
            uglify: {
                compress: {
                    drop_console: true,
                    warnings: false
                }
            },
            webpack: {
                entry: [
                    './node_modules/zone.js/dist/zone.js',
                    './node_modules/reflect-metadata/Reflect.js',
                    './src/app/main.ts'
                ],
                module: {
                    rules: [
                        {
                            test: /\.ts$/,
                            use: [
                                {
                                    loader: 'ts-loader',
                                    options: {
                                        transpileOnly: true,
                                        silent: true
                                    }
                                },
                                {
                                    loader: 'angular2-template-loader'
                                }
                            ]
                        },
                        {
                            test: /\.html$/,
                            loader: 'html-loader'
                        }
                    ]
                },
                resolve: {
                    extensions: ['.ts', '.js']
                },
                plugins: [
                    // Workaround for angular/angular#11580
                    new webpack.ContextReplacementPlugin(
                        /angular(\\|\/)core(\\|\/)@angular/,
                        path.resolve(__dirname, '../src')
                    )
                ]
            }
        },
        sync: {
            glob: [
                'web/index.html'
            ],
            server: {
                server: 'web',
                notify: false
            }
        },
        production: false,
        sourcemaps: false
    };

    var initialize = function () {
        config.production = !!util.env.production;
        config.sourcemaps = !!util.env.sourcemaps;

        correctConfigurationPaths();
        displayFlags();

        addCleanTasks();
        addHelpTasks();

        addJSTasks();

        addDefaultTasks();
    };

    var addCleanTasks = function () {
        var pattern = config.clean;
        gulp.task('clean', function () {
            del(pattern);
            output('cleaned', pattern.join(', '));
        });
    };

    var addDefaultTasks = function () {
        gulp.task('browser:watch', function () {
            browser.init(config.sync.server);
            watchers.push(gulp.watch(config.sync.glob, browser.reload))
        });

        tasks.default.push('browser:watch');

        gulp.task('default', tasks.default);
        gulp.task('compile', tasks.compile);
        gulp.task('watch', tasks.watch);
    };

    var addHelpTasks = function () {
        var options = [
            {task: '--silent', message: 'Removes built in gulp messages to simplify output'},
            {task: '--production', message: 'Adds minification to output JavaScript'},
            {task: '--sourcemaps', message: 'Adds sourcemaps to output JavaScript'}
        ];

        var tasks = [
            {task: 'default', message: 'Runs all compile tasks, watchers, and Browser Reload'},
            {task: 'clean', message: 'Removes all generated files'},
            {task: 'compile', message: 'Runs all compile tasks: JavaScript'},
            {task: 'js:compile', message: 'Compiles JavaScript libraries and TypeScript application'},
            {task: 'watch', message: 'Runs all watchers: JavaScript'},
            {task: 'js:watch', message: 'Watches JavaScript and TypeScript libraries for changes'}
        ];

        var getMaxLength = (function () {
            var length = 0;

            _.each(tasks, function (item) {
                if (item.task.length > length) {
                    length = item.task.length;
                }
            });

            return length;
        })();

        var logMessage = function (task, message, spaces) {
            console.log(task.cyan + ' '.repeat(spaces) + message);
        };

        var output = function (messages) {
            var length = getMaxLength;

            _.each(messages, function (item) {
                var spaces = (length - item.task.length) + 4;
                spaces += 4;

                logMessage(item.task, item.message, spaces);
            });
        };

        gulp.task('help', function () {
            console.log('');
            console.log('USAGE'.bold);
            logMessage('gulp [TASK] [OPTIONS]', '', 0);
            console.log('');

            console.log('OPTIONS'.bold);
            output(options);
            console.log('');

            console.log('TASKS'.bold);
            output(tasks);
            console.log('');
        });
    };

    var addJSTasks = function () {
        tasks.compile.push('js:compile');
        tasks.default.push('js:watch');
        tasks.watch.push('js:watch');

        if (config.sourcemaps) config.js.webpack.devtool = 'cheap-module-eval-source-map';
        if (config.production) {
            config.js.webpack.plugins.push(new webpack.optimize.UglifyJsPlugin(config.js.uglify));
        }

        gulp.task('js:compile:main', function () {
            compileTS(config.js.main);
        });

        gulp.task('js:compile', ['js:compile:main']);

        gulp.task('js:watch', ['js:compile'], function () {
            var main = config.js.main;
            var mainGlob = mapOriginGlob(main.origin, main.glob.ts.concat(main.glob.watch));

            watchers.push(gulp.watch(mainGlob, ['js:compile:main']));
        });
    };

    var compileTS = function (options) {
        var start = moment();
        var file = options.file;
        var target = options.target;
        var pattern = mapOriginGlob(options.origin, options.glob.ts);

        config.js.webpack.output = {
            filename: file
        };

        var stream = webpackStream(config.js.webpack, webpack, function (err, stats) {
            if (stats.compilation.errors.length) {
                console.log(stats.compilation.errors.toString());
            }

            if (stats.compilation.warnings.length) {
                console.log(stats.compilation.warnings.toString());
            }
        });

        output('compiling', options.origin);

        gulp.src(pattern)
            .pipe(stream)
            .pipe(gulp.dest(target))
            .on('finish', function () {
                outputStats('write', target, file, start);
                reload = true;
                reloadBrowser();
            });
    };

    // Utility Functions

    var correctPath = function (path) {
        // remove trailing slashes to normalize paths
        if (_.isArray(path)) {
            return _.map(path, function (item) {
                return item.replace(/^\/|\/$/g, '');
            });
        }

        return path.replace(/^\/|\/$/g, '');
    };

    var correctConfigurationPaths = function () {
        var keysToCorrect = ['origin', 'target', 'file'];

        var deepMap = function (obj) {
            _.each(obj, function (item, key) {
                if (_.includes(keysToCorrect, key)) {
                    obj[key] = correctPath(item);
                }

                if (_.isObject(item)) {
                    deepMap(item);
                }
            });
        };

        deepMap(config);
    };

    var displayFlags = function () {
        var getFlagStatus = function (flag) {
            return flag ? 'on'.green : 'off'.red;
        };

        var flags = '';
        flags += ' production[' + getFlagStatus(config.production) + ']';
        flags += ' sourcemaps[' + getFlagStatus(config.sourcemaps) + ']';

        output('flags', flags);
    };

    var getTimeElapsed = function (start) {
        return Math.round(moment().diff(start) / 1000 * 100) / 100;
    };

    var mapOriginGlob = function (origin, glob) {
        return _.map(glob, function (item) {
            var negating = item[0] === '!';

            if (negating) {
                origin = '!' + origin;
                item = item.replace('!', '');
            }

            return origin + '/' + item;
        });
    };

    var output = function (action, message, color) {
        color = color || 'green';

        console.log(sprintf(
            '[%s] %s: %s'.cyan,
            moment().format('HH:mm:ss'),
            action[color],
            message
        ));
    };

    var outputStats = function (action, path, file, start) {
        var size = filesize(fs.statSync(path + '/' + file).size);

        output(action, sprintf(
            '%s/%s %s after %s',
            path,
            file,
            colors.cyan(size),
            colors.magenta(getTimeElapsed(start) + ' s')
        ));
    };

    var reloadBrowser = function () {
        if (reload && browser.has('singleton')) {
            browser.reload();
            reload = false;
        }
    };

    initialize();
})();
