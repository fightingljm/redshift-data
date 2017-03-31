# 「红移科技」前端面试题

## Installation

```
$ git clone git@github.com:fightingljm/redshift-data.git ljm-DatePicker
$ cd ljm-DatePicker
$ npm install
$ npm start
$ open http://localhost:3000
```

### Step 1: 安装nodejs

- [My MarkDown](https://fightingljm.github.io/linux/9-install-node.html)

node 装好之后,新建 index.js ,并添加如下代码,实现在本地启动 http://localhost:3000 可以返回基本界面,显示 Hello World

```js
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

命令行执行 `node index.js` ,打开 http://localhost:3000 ,页面显示成功 Hello World

### Step 2: 安装reactjs

这里的小目标是打开 http://localhost:3000，用react的模式返回基本页面，如Hello World。

首先把目标文件初始化成一个 node 项目

```
$ npm init -y
```

然后搭建 react-webpack 环境

创建一个 index.html ,将来组件内的内容可以渲染到这个页面

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <div id="root"></div>
  <script src="/dist/bundle.js"></script>
</body>
</html>
```

然后把所有需要安装的包补充到 package.json 内(如babel的,webpack的,react的,css及image加载,热加载模块的等),方便安装

```json
{
  "name": "redshift-data",
  "version": "1.0.0",
  "description": "Interview",
  "main": "index.js",
  "scripts": {

  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/fightingljm/redshift-data.git"
  },
  "author": "Jinmeng Liu",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/fightingljm/redshift-data/issues"
  },
  "homepage": "https://github.com/fightingljm/redshift-data#readme",
  "devDependencies": {
    "autoprefixer-loader": "^3.2.0",
    "babel-core": "^6.14.0",
    "babel-eslint": "^5.0.0-beta4",
    "babel-loader": "^6.2.5",
    "babel-preset-es2015": "^6.14.0",
    "babel-preset-react": "^6.11.1",
    "babel-preset-react-hmre": "^1.0.0",
    "css-loader": "^0.24.0",
    "eslint": "^1.10.3",
    "eslint-plugin-babel": "^3.0.0",
    "eslint-plugin-react": "^3.11.3",
    "eventsource-polyfill": "^0.9.6",
    "express": "^4.13.3",
    "file-loader": "^0.9.0",
    "rimraf": "^2.4.3",
    "style-loader": "^0.13.1",
    "url-loader": "^0.5.7",
    "webpack": "^1.13.2",
    "webpack-dev-middleware": "^1.4.0",
    "webpack-hot-middleware": "^2.6.0"
  },
  "dependencies": {
    "react": "^15.3.1",
    "react-dom": "^15.3.1"
  }
}
```

命令行执行

```
$ npm i
```

装完包我们就需要给这些包书写相应的配置文件了,在这之前还应该想到

`.gitignore` 文件,在里面写入不需要加入版本管理的文件

```
.DS_Store
node_modules
npm-debug.log
dist
```

`Babel` 是一个广泛使用的转码器，可以将ES6代码转为ES5代码，从而在现有环境执行。

.babel

```
{
  "presets": ["react", "es2015"],
  "env": {
    "development": {
      "presets": ["react-hmre"]
    }
  }
}
```

`EsLint` 帮助我们检查Javascript编程时的语法错误

```json
{
  "ecmaFeatures": {
    "jsx": true,
    "modules": true
  },
  "env": {
    "browser": true,
    "node": true
  },
  "parser": "babel-eslint",
  "rules": {
    "quotes": [2, "single"],
    "strict": [2, "never"],
    "babel/generator-star-spacing": 1,
    "babel/new-cap": 1,
    "babel/object-shorthand": 1,
    "babel/arrow-parens": 1,
    "babel/no-await-in-loop": 1,
    "react/jsx-uses-react": 2,
    "react/jsx-uses-vars": 2,
    "react/react-in-jsx-scope": 2
  },
  "plugins": [
    "babel",
    "react"
  ]
}
```

webpack.config.dev.js(开发环境配置)

```js
var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    },
    {
      test: /\.css$/,
      loader: 'style!css!autoprefixer'
    },
    {
      test: /\.(jpe?g|png)$/,
      loader: 'file-loader'
    },
    {
      test: /\.(woff|woff2|ttf|svg|eot)(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000"
    }]
  }
};
```

webpack.config.prod.js(生产环境配置)

```js
var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: './dist/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    },
    {
      test: /\.css$/,
      loader: 'style!css!autoprefixer'
    },
    {
      test: /\.(jpe?g|png)$/,
      loader: 'file-loader'
    },
    {
      test: /\.(woff|woff2|ttf|svg|eot)(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000"
    }]
  }
};
```

我们把 node 代码放在 devServer.js 内,并书写 package.json 脚本

devServer.js(配合webpack启动开发服务，支持热更新)

```js
var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});
```

package.json 添加脚本

```diff
  "main": "index.js",
  "scripts": {
-   
+   "clean": "rimraf dist",
+   "build:webpack": "NODE_ENV=production webpack --config webpack.config.prod.js",
+   "build": "npm run clean && npm run build:webpack",
+   "start": "node devServer.js",
+   "lint": "eslint src"
  },
  "repository": {
    "type": "git",
```

这样命令行执行 `npm start` ,代码将跑在 3000 端口,打开 http://localhost:3000/ 就可以看到

### Step 3: 实现日期选择功能

- 小目标:把日期选择范围区间设为 当日 至 2017-08-31。

这里就涉及到 **Date 对象** 和 **ANT DESIGN UI库** 的使用

- [ANT DESIGN 参考](https://ant.design/components/date-picker/)
- [Date 英文参考 MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
- [Date 中文参考 MDN](https://msdn.microsoft.com/zh-cn/library/cd9w2te4(v=vs.94).aspx)
