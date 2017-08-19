const http = require('http');
const path = require('path');
const Log = require('./log');

let log = new Log();

//web Server
function Server(config) {
    this.config = config;
    this.root = config.root;
    this.server = null;
}


Server.prototype = {

    //启动服务器
    start () {
        let config = this.config;
        this.server = http.createServer(serverHandler(this.router, config));
        this.server.listen(config.port, (error) => {
           if(error){
                log.error('启动服务器失败', error);
           }else {
                log.info('启动服务器成功');
           }
        });
        return this;
    }
}

//server handler
function serverHandler(router, config){

    return (request, response) => {
        response.__server_config = config;
        let extname = path.extname(request.url);
        if(extname){
            response.render(request.url);
        }else{
            response.json(request.url);
        }
    }
}

//创建服务器
exports.create = (config) => new Server(config);
