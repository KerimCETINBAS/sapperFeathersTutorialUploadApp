// Initializes the `uploadthree` service on path `/uploadthree`
const { Uploadthree } = require('./uploadthree.class');
const createModel = require('../../models/uploadthree.model');
const hooks = require('./uploadthree.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/uploadthree', new Uploadthree(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('uploadthree');

  service.hooks(hooks);
};
