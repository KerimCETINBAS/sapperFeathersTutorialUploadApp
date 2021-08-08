const { authenticate } = require('@feathersjs/authentication').hooks;

module.exports = {
  before: {
    all: [ ],
    find: [],
    get: [],
    create:[ authenticate('jwt'),
    async context => {
      let input = context.data;

      await context.service.find({
          query: {
                  text: input.text
                 }
          }).then((data) => {
              if (data.data.length) {
              throw new Error('Kategori sistemde mevcut!');
          }
      });
    }],
    update:[ authenticate('jwt')],
    patch: [ authenticate('jwt')],
    remove:[ authenticate('jwt')]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
