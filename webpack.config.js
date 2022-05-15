const { entries, webpack } = require('serverless-webpack').lib
const path = require('path');

module.exports = {
    entry: entries,
    devtool: 'inline-cheap-module-source-map',
    target: 'node14',
    mode: webpack.isLocal ? 'development' : 'production',
    externals: webpack.isLocal ? [] : ['aws-sdk'],
    optimization: {
        minimize: true,
    },
    cache: {
        type: 'filesystem',
        compression: 'gzip'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                exclude: [
                    [
                        path.resolve(__dirname, 'node_modules'),
                        path.resolve(__dirname, '.serverless'),
                        path.resolve(__dirname, '.webpack'),
                        path.resolve(__dirname, 'jspm_packages')
                    ]
                ],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        targets: {
                                            node: '14'
                                        },
                                        useBuiltIns: 'usage', 
                                        corejs: 3 
                                    }
                                ]
                            ]
                        }
                    }
                ]
            }
        ]
    }
}