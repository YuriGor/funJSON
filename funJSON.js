'use strict';

function reviver(key, value) {
  if (detect(key, value)) {
    try {
      value = eval('(' + value + ')');
    } catch (exc) {
      /* invalid js? leave as is */
    }
  }
  return value;
}

function detect(key, value) {
  return (
    typeof value == 'string' &&
    (/^\s*(async\s+)*function\s*\([\s\w$,_/*]*\)\s*\{[\s\S]*\}$/.test(value) ||
      /^\s*(async\s+)*\([\s\w$,_/*]*\)\s*=>\s*\{[\s\S]*\}$/.test(value))
  );
}

function replacer(key, value) {
  if (typeof value == 'function') { value = value.toString(); }
  return value;
}

function parse(text, extReviver) {
  return JSON.parse(text, extReviver || reviver);
}

function stringify(value, extReplacer, space) {
  return JSON.stringify(value, extReplacer || replacer, space);
}

function stringifyToScript(value, extReplacer, space) {
  var functions = [];
  var rp = function(key, value) {
    if (typeof value == 'function') {
      value = extReplacer ? extReplacer(key, value) : value.toString();
      functions.push(value);
    }
    return value;
  };
  var script = stringify(value, rp, space);
  for (var i = 0; i < functions.length; i++) {
    script = script.replace(stringify(functions[i], rp, space), functions[i]);
  }
  return script;
}

exports.parse = parse;
exports.stringify = stringify;
exports.stringifyToScript = stringifyToScript;
//# sourceMappingURL=funJSON.js.map
