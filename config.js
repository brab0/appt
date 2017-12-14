module.exports = {
    enviroment : "dev",
    bodyParser: {
        json: {
            limit: '50mb', 
            type: 'application/json'
        }, 
        urlencoded: {
            limit: '50mb', 
            extended: true
        }
    },
    cors: [{
        route: "/*",
        header: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Authorization, Content-Type, Origin, Accept, X-Requested-With, Origin, Cache-Control, X-File-Name",
            "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS, DELETE"
        }
    }],
    paths : {
        schemes : [`**/scheme.js`, `**/schemes/*.js`],
        models : [`**/model.js`, `**/models/*.js`],
        controllers : [`**/controller.js`, `**/controllers/*.js`],
        routes : [`**/route.js`, `**/routes/*.js`]
    },
    statics : [],
    access: {}, 
    server:{
        host : "http://localhost",
        port : 3001
    }
}
