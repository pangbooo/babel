const path = require('path');

module.exports = {
    mode: 'development',
    entry: './index',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './webpack.bundle.js',
        environment: {
            arrowFunction: false
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_module/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    loose: true,
                                    modules: 'commonjs'
                                }
                            ]
                        ],
                        plugins: [
                            ['@babel/plugin-transform-runtime']
                        ]
                    }
                }
            }
        ]
    }
}