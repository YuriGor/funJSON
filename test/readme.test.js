import _ from 'lodash';
import chai from 'chai';
import { parse, stringify, stringifyToScript } from '../es/funJSON';
const expect = chai.expect;

const asserttype = require('chai-asserttype');
chai.use(asserttype);

describe('Readme Example', () => {
  var obj = {
    a: {
      a1: 'a1',
      fa: function(name) {
        //some comment here
        return 'fa Hello ' + name;
      },
    },
    b: {
      b1: 'b1',
    },
    f: (name) => {
      //some comment here
      return 'f Hello ' + name;
    },
  };
  it('stringify and parse', () => {
    var str = stringify(obj, null, 2);
    expect(str).equal(`{
  "a": {
    "a1": "a1",
    "fa": "function(name) {\\n        //some comment here\\n        return 'fa Hello ' + name;\\n      }"
  },
  "b": {
    "b1": "b1"
  },
  "f": "(name) => {\\n      //some comment here\\n      return 'f Hello ' + name;\\n    }"
}`);
    var obj2 = parse(str);
    expect(obj2.f('obj')).equal('f Hello obj');
    expect(obj2.a.fa('obj.a')).equal('fa Hello obj.a');
  });

  it('stringifyToScript', () => {
    let str = stringifyToScript(obj, null, 2);
    expect(str).equal(`{
  "a": {
    "a1": "a1",
    "fa": function(name) {
        //some comment here
        return 'fa Hello ' + name;
      }
  },
  "b": {
    "b1": "b1"
  },
  "f": (name) => {
      //some comment here
      return 'f Hello ' + name;
    }
}`);
    var obj2;
    eval('obj2 = ' + str);
    expect(obj2.f('obj')).equal('f Hello obj');
    expect(obj2.a.fa('obj.a')).equal('fa Hello obj.a');
  });
});
