let http = require('http');
let fs = require('fs');
let path = require('path');
let mime = require('mime');
let Log = require('./Log');

let log = new Log();

//json格式
http.ServerResponse.prototype.json = function (url) {
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

//其他
http.ServerResponse.prototype.render = function (url) {
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