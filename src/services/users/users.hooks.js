const { authenticate } = require('@feathersjs/authentication').hooks;

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

module.exports = {
  before: {
    all: [ ],
    find: [
     
    ],
    get: [ authenticate('jwt') ],
    create: [ hashPassword('password'), 
    async context => {
      let input = context.data;

      await context.service.find({
          query: {
                  email: input.email
                 }
          }).then((data) => {
              if (data.data.length) {
              throw new Error('Email sistemde mevcut!');
          }
      });
    }

    ],
    update: [ hashPassword('password'),  authenticate('jwt') ],
    patch:  [ hashPassword('password'),  authenticate('jwt') ],
    remove: [ authenticate('jwt') ]
  },

  after: {
    all: [ 


      protect('password'),
      // Make sure the password field is never sent to the client
      // Always must be the last hook
    
    ],
    find:[
      async context => {
        if (!context.arguments[0].authenticated) {
          context.result.data = {
            count : context.result.total
          }  
        
        }
        
      }
   
    ],
    get: [  protect('password') , async context => {
      context.app.local = context.result
      
    }
  ],
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
