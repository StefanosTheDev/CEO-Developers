const util = require('../../backend/utils/utils');

describe('validateStringField', () => {
  test('should pass for a valid string without options', () => {
    expect(() => {
      util.validateStringField('Valid String', 'Test Field');
    }).not.toThrow();
  });
});
