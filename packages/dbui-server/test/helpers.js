const { describe, it, beforeEach, afterEach } = require('mocha');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const package = require('../');
const { expect } = chai;

chai.use(chaiAsPromised);

Object.assign(exports, {
  package, describe, it, beforeEach, afterEach, expect
});