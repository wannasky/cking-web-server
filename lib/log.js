const colors = require('colors');

//设置主题
colors.setTheme({
    info: 'green',
    warn: 'yellow',
    debug: 'blue',
    error: 'red'
});

//日志
function Log(config) {
    this.config = config || {};
}

Log.prototype = {

    info (msg) {
        print('info', this.config, arguments);
    },

    warn (msg) {
        print('warn', this.config, arguments);
    },

    debug (msg) {
        print('debug', this.config, arguments);
    },

    error (msg) {
        print('error', this.config, arguments);
    }
}

//时间
function getTime() {
    let dd = new Date();
    let H = dd.getHours();
    let i = dd.getMinutes();
    let s = dd.getSeconds();
    H = H > 9 ? H : '0' + H;
    i = i > 9 ? i : '0' + i;
    s = s > 9 ? s : '0' + s;
    return '[' + H + ':' + i + ':' + s + ']';
}

//打印主体控制方法
function print(level, config, args) {
    let levels = config.level || '';
    levels = levels.split(',').filter((item) => item);
    if(levels.length && levels.indexOf(level) === -1) return false;
    Array.prototype.unshift.apply(args, ['[webServer]'[level], getTime()[level], level.toUpperCase()[level]]);
    console.log.apply(console, args);
}

module.exports = Log;