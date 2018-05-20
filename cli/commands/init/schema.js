const controller = require('./controller');

require('schemium-api')
    .command({
        name: 'init',
        abbrev: 'i',
        main: controller.init,
        description : "Creates a new Appt's project",
        options : [{
            name: 'path',
            abbrev: 'path',
            type : String,
            description : "Project's path",
        }]
    });
