module.exports = {    
    paths : {
        projectName: process.cwd().split('/').pop(),
        projectRoot: process.cwd(),
        cliRoot: __dirname,
        templates : __dirname + '/templates/'
    }
}