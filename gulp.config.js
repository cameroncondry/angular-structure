module.exports = {
    target: 'web/resources',
    js: {
        landing: {
            origin: 'src/js/landing',
            output: 'landing.js',
            glob: [
                '**/*.js',
                'main.js'
            ]
        },
        plugins: {
            origin: '/src/js/plugins/',
            output: '/plugins.js',
            glob: [
                '*.js'
            ]
        },

        // main: {
        //     webpack: {
        //
        //     }
        // }
    },
    sass: {},
    sync: {}
};





// build: {
//     landing: {
//         origin: 'src/js',
//             target: 'web/resources/js',
//             output: 'landing.js',
//             glob: [
//             '**/*.js'
//         ]
//     },
//     webpack: {
//         entry: {
//             landing: './src/app/landing.ts',
//                 main: './src/app/main.ts'
//         },
//         output: {
//             filename: '[name].js',
//                 path: 'build/js'
//         }
//     }
// }
