const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const banner = require('./build_helper/license');
const isDev = process.env.NODE_ENV === "development";
const externalReact = require('webpack-external-react');
const webpack = require("webpack");
const SmartBannerPlugin = require('smart-banner-webpack-plugin');

const libraryTarget = [{
    type: "var",
    name: isDev ? 'godam-react.js' : 'godam-react.min.js'
},
{
    type: "commonjs2",
    name: isDev ? 'godam-react.commonjs2.js' : 'godam-react.commonjs2.min.js'
},
{
    type: "umd",
    name: isDev ? 'godam-react.umd.js' : 'godam-react.umd.min.js'
}
];

function getConfig(target) {
    const baseConfig = {
        entry: './src/index.ts',
        devtool: 'source-map',
        mode: process.env.NODE_ENV,
        module: {
            noParse: externalReact.noParse,
            rules: [{
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }, {
                test: /\.css?$/,
                use: 'css-loader',
                exclude: /node_modules/
            }]
        },
        externals: {
            react: {
                root: 'React',
                commonjs2: 'react',
                commonjs: 'react',
                amd: 'react'
            },
            'react-dom': {
                root: 'ReactDOM',
                commonjs2: 'react-dom',
                commonjs: 'react-dom',
                amd: 'react-dom'
            }
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            // alias: {
            //     "react": "react",
            //     "React": "react"
            // }
            alias: {
                react: path.resolve(__dirname, "node_modules/react")
            }

        },
        output: {
            path: path.resolve(__dirname, 'dist/'),
            filename: target.name,
            library: 'ReactGodam',
            libraryTarget: target.type
        },
        plugins: [
            new webpack.ProvidePlugin({
                React: "React", react: "React", "window.react": "React", "window.React": "React"
            }),
            new SmartBannerPlugin(banner),
            // new CopyPlugin({
            //     patterns: [
            //         { from: 'src/middleware.js', to: '' },
            //     ],
            // }),
        ]
    };

    return baseConfig;
}

var configs = [];
libraryTarget.forEach(function (target) {
    configs.push(getConfig(target));
})
module.exports = configs;