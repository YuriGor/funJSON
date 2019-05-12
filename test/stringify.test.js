import chai from 'chai';
import { stringify } from '../es/funJSON';
const expect = chai.expect;

const asserttype = require('chai-asserttype');
chai.use(asserttype);

describe('Stringify', () => {
  it('function', () => {
    expect(stringify({ f: function() {} })).to.equal('{"f":"function() {}"}');
  });
  it('function with args', () => {
    expect(stringify({ f: function(a, b, c) {} })).to.equal(
      '{"f":"function(a, b, c) {}"}'
    );
  });
  it('function with comments', () => {
    expect(
      stringify({
        f: function(a, b, c /*, d */) {},
      })
    ).to.equal('{"f":"function(a, b, c /*, d */) {}"}');
  });
  it('arrow function', () => {
    expect(stringify({ f: () => {} })).to.equal('{"f":"() => {}"}');
  });
  it('arrow function with args', () => {
    expect(stringify({ f: (a, b, c) => {} })).to.equal(
      '{"f":"(a, b, c) => {}"}'
    );
  });
  it('arrow function with args', () => {
    expect(stringify({ f: (a, b, c /*, d */) => {} })).to.equal(
      '{"f":"(a, b, c /*, d */) => {}"}'
    );
  });
});
