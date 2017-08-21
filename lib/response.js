let http = require('http');
let fs = require('fs');
let path = require('path');
let mime = require('mime');
let Log = require('./log');

let log = new Log();

//text文本
http.ServerResponse.prototype.text = function (text) {
    this.setHeader('Content-Type','text/plain');
    this.end(text);
}

//json
http.ServerResponse.prototype.json = function (jsonObject) {
    this.setHeader('Content-Type','application/json; charset=utf-8');
    this.end(JSON.stringify(jsonObject));
}

//url: json格式
http.ServerResponse.prototype.jsonUrl = function (url) {
    url = url.lastIndexOf('/') === url.length - 1 ? url.slice(0,url.length - 1) : url;
    url = path.join(this.__server_config.root,this.__server_config.test || '/',url + '.json');
    this.setHeader('Content-Type',mime.lookup(url));
    try{
        this.end(fs.readFileSync(path.resolve(url)));
        log.info('加载资源成功', url);
    }catch (e){
        this.statusCode = 404;
        log.error('加载资源失败', url);
    }finally {
        this.end();
    }
}

//url: 其他
http.ServerResponse.prototype.renderUrl = function (url) {
    url = path.join(this.__server_config.root,url);
    this.setHeader('Content-Type',mime.lookup(url));
    try{
        this.end(fs.readFileSync(path.resolve(url)));
        log.info('加载资源成功', url);
    }catch (e){
        this.statusCode = 404;
        log.error('加载资源失败', url);
    }finally {
        this.end();
    }
}