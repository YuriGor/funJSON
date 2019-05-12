import chai from 'chai';
import { stringifyToScript } from '../es/funJSON';
const expect = chai.expect;

const asserttype = require('chai-asserttype');
chai.use(asserttype);

describe('Stringify to script', () => {
  it('function', () => {
    expect(stringifyToScript({ f: function() {} })).to.equal(
      '{"f":function() {}}'
    );
  });
  it('function with args', () => {
    expect(stringifyToScript({ f: function(a, b, c) {} })).to.equal(
      '{"f":function(a, b, c) {}}'
    );
  });
  it('function with comments', () => {
    expect(
      stringifyToScript({
        f: function(a, b, c /*, d */) {},
      })
    ).to.equal('{"f":function(a, b, c /*, d */) {}}');
  });
  it('arrow function', () => {
    expect(stringifyToScript({ f: () => {} })).to.equal('{"f":() => {}}');
  });
  it('arrow function with args', () => {
    expect(stringifyToScript({ f: (a, b, c) => {} })).to.equal(
      '{"f":(a, b, c) => {}}'
    );
  });
  it('arrow function with args', () => {
    expect(stringifyToScript({ f: (a, b, c /*, d */) => {} })).to.equal(
      '{"f":(a, b, c /*, d */) => {}}'
    );
  });
  it('custom replacer', () => {
    expect(
      stringifyToScript(
        {
          f: function() {},
        },
        (key, value) => {
          return (
            'function(){ var wrapped=' +
            value.toString() +
            '; return wrapped();}'
          );
        }
      )
    ).to.equal(
      '{"f":function(){ var wrapped=function() {}; return wrapped();}}'
    );
  });
});
