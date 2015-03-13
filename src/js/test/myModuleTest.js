var assert = require('chai').assert,
    myModule = require('../lib/myModule');

describe('myModule.js', function () {
    describe('bar', function () {
        it('should return true', function () {
            assert.isTrue(myModule.bar(), 'dummy test');
        });
    });
});