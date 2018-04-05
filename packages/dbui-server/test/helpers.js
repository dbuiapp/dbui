const { describe, it, beforeEach } = require('mocha');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

exports.package = require('../');
exports.describe = describe;
exports.it = it;
exports.beforeEach = beforeEach;
exports.expect = chai.expect;