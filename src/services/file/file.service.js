// Initializes the `file` service on path `/file`
const { File } = require('./file.class');
const createModel = require('../../models/file.model');
const hooks = require('./file.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/file', new File(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('file');

  service.hooks(hooks);
};
