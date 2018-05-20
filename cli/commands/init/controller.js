const model = require('./model');

module.exports.init = options => {   
   console.log("\nThis utility will walk you through creating an Appt's project.\nPress ^C at any time to quit.\n");
   
   model.setProjectsRoot(options.path)
      .then(projectsPath => model.checkProjectsRoot(projectsPath))
      .then(projectsPath => model.getGitInfo(projectsPath))
      .then(gitInfo => model.setPackageJson(gitInfo))
      .then(projectsPath => model.getSeedProject(projectsPath))
      .then(projectsPath => model.installDependencies(projectsPath))   
      .then(() => console.log('Your project is ready!\n'))
      .catch(ex => console.log(ex));
}