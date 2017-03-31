import React from 'react';
import ReactDOM from 'react-dom';

import moment from 'moment';

// 推荐在入口文件全局设置 locale
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

import App from './App'
import 'antd/dist/antd.css';

ReactDOM.render(
  <App/> ,document.getElementById('root')
)
