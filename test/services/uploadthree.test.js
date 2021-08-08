const assert = require('assert');
const app = require('../../src/app');

describe('\'uploadthree\' service', () => {
  it('registered the service', () => {
    const service = app.service('uploadthree');

    assert.ok(service, 'Registered the service');
  });
});
