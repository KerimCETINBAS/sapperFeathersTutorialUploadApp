const users = require('./users/users.service.js');
const uploadthree = require('./uploadthree/uploadthree.service.js');
const file = require('./file/file.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(uploadthree);
  app.configure(file);
};
