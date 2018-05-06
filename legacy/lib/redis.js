module.exports = config => {
    if(config){
        const mongoose = require('mongoose');
        const cachegoose = require('cachegoose');
    
        return cachegoose(mongoose, Object.assign({
            engine: 'redis'
        }, config));
    } else {
        return new Promise(resolve => resolve())
    }
}
