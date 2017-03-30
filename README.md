# 「红移科技」前端面试题

### Step 1: 安装nodejs

- [My MarkDown](https://fightingljm.github.io/linux/9-install-node.html)

node 装好之后,新建 index.js ,并添加如下代码,实现在本地启动 http://localhost:8080 可以返回基本界面,显示 Hello World

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

命令行执行 `node index.js` ,打开 http://localhost:8080 ,页面显示成功 Hello World
