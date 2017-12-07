# cking-web-server

## 安装

```bash
npm install cking-web-server --save
```

## 简介
前端测试，用来模拟后台接口实现，实现规则如下：

1. 若与定义的路由匹配，则自定义返回内容（自定义路由支持：response.text,response.json,response.jsonUrl,response.renderUrl）
2. 若没有匹配的路由规则，如果请求地址带后缀，则根据后缀返回相应格式的文件内容
3. 若没有匹配的路由规则，如果请求地址不带后缀，则会返回json格式的文件内容（需提前准备，不然404）

## 使用

```javascript
let webServer = require('cking-web-server');

let server = webServer.create({
    port: 8181,             //服务器端口
    root: './root',         //根目录
    test: '/json'           //测试json存放目录，相对于root，可为空
});

//服务器开始工作
server.start();

//用默认浏览器打开指定页面,第二个参数可以指定浏览器打开 eg:{app: 'firefox'}
server.open('index.html');
```
