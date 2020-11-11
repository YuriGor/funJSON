import _ from 'lodash';
import chai from 'chai';
import { parse } from '../es/funJSON';
const expect = chai.expect;

const asserttype = require('chai-asserttype');
chai.use(asserttype);

describe('Parse', () => {
  async function testFunction(source, result, reviver) {
    // test run! test this!
    let objSource = `{"f":"${source}", "hello":"world"}`;
    let obj = parse(objSource, reviver);
    expect(obj)
      .has.property('f')
      .and.is.a.function();
    expect(obj.f.toString()).equal(source);
    expect(await obj.f()).equal(result);
  }

  it('function', () => {
    testFunction('function() {}');
  });
  it('function with no args but comments', () => {
    testFunction('function(/*hello*/) {}');
  });
  it('function with args', () => {
    testFunction('function(a, b, c) {}');
  });
  it('function with args and comments', () => {
    testFunction('function(a, b, c /*, d */) {}');
  });

  it('async function', () => {
    testFunction('async function() {}');
  });
  it('async function with no args but comments', () => {
    testFunction('async function(/*hello*/) {}');
  });
  it('async function with args', () => {
    testFunction('async function(a, b, c) {}');
  });
  it('async function with args and comments', () => {
    testFunction('async function(a, b, c /*, d */) {}');
  });

  it('arrow function', () => {
    testFunction('() => {}');
  });
  it('arrow function with args', () => {
    testFunction('(a, b, c) => {}');
  });
  it('arrow function with args', () => {
    testFunction('(a, b, c /*, d */) => {}');
  });

  it('async arrow function', () => {
    testFunction('async () => {}');
  });
  it('async arrow function with args', () => {
    testFunction('async (a, b, c) => {}');
  });
  it('async arrow function with args', () => {
    testFunction('async (a, b, c /*, d */) => {}');
  });

  it('"this" is parent value', () => {
    testFunction('function() { return this.hello; }', 'world');
  });

  it('invalid js', () => {
    let source = 'function() { hello, I am invalid function }';
    let objSource = `{"f":"${source}" }`;
    let obj = parse(objSource);
    expect(obj.f)
      .is.a.string()
      .and.equals(source);
  });

  it('custom reviver', () => {
    testFunction(
      "function(/* It's a function! */) { return 'Yes! Yes! I am!' }",
      'Yes! Yes! I am!',
      (key, value) => {
        if (
          _.isString(value) &&
          _.startsWith(value, "function(/* It's a function! */")
        ) {
          value = eval('(' + value + ')');
        }
        return value;
      }
    );
  });
});
