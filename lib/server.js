const http = require('http');
const path = require('path');
const url = require('url');
const Log = require('./log');
const opn = require('opn');

let log = new Log();

//web Server
function Server(config) {
    this.config = config;
    this.root = config.root;
    this.server = null;
}


Server.prototype = {

    setRouter (rules) {
        let paths = [];
        let temp = null;
        for(let rule in rules){
            temp = rule.trim();
            temp = temp.replace(/\./g, '\\.').replace(/\*/g, '.*');
            if (temp.indexOf('/') === 0) {
                temp = '^' + temp;
            }
            if (!temp.match(/\$$/)) {
                temp += '(/|$)';
            }
            paths.push([new RegExp(temp), rules[rule]]);
        }
        this.router = paths;
        return this;
    },

    //启动服务器
    start () {
        let config = this.config;
        this.server = http.createServer(serverHandler(this.router, config));
        this.server.listen(config.port, (error) => {
           if(error){
                log.error('启动服务器失败', error);
           }else {
                log.info('启动服务器成功，端口：', config.port);
           }
        });
        return this;
    },

    open (url, options) {
        let config = this.config;
        opn('http://localhost:' + config.port + '/' + url, options || {});
    }

}

//server handler
function serverHandler(router, config){

    return (request, response) => {
        response.__server_config = config;
        let requrl = url.parse(request.url).pathname;
        if(router && router.length){
            let temp;
            for(let rule in router){
                temp = router[rule];
                if(temp[0].test(requrl)){
                    temp[1](request, response, config);
                    log.info('路由地址',request.url);
                    return false;
                }
            }
        }
        let extname = path.extname(requrl);
        if(extname){
            response.renderUrl(requrl);
        }else{
            response.jsonUrl(requrl);
        }
    }
}

//创建服务器
exports.create = (config) => new Server(config);
