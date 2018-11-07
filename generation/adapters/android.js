const generator = require('../core/generator');
const { callGlobal } = require('../helpers');

const { isNumber, isString, isBoolean, isArray, isDefined } = require('../core/type-checks');

const typeCheckInterfaces = {
  'ArrayList<String>': isArray,
  'Matcher<View>': null, // isOfClass('Matcher') would be better,
  boolean: isBoolean,
  Double: isNumber,
  Integer: isNumber,
  String: isString,
  ViewAction: null, // there are optional view actions
  ViewInteraction: null // there are optional view actions
};

const contentSanitizersForFunction = {
  scrollInDirection: {
    argumentName: 'direction',
    newType: 'String',
    name: 'sanitize_android_direction',
    value: callGlobal('sanitize_android_direction')
  },
  swipeInDirection: {
    argumentName: 'direction',
    newType: 'String',
    name: 'sanitize_android_direction',
    value: callGlobal('sanitize_android_direction')
  },
  scrollToEdge: {
    argumentName: 'edge',
    newType: 'String',
    name: 'sanitize_android_edge',
    value: callGlobal('sanitize_android_edge')
  }
};

const contentSanitizersForType = {
  'Matcher<View>': {
    type: null,
    name: 'sanitize_matcher',
    value: callGlobal('sanitize_matcher')
  }
};

module.exports = generator({
  typeCheckInterfaces,
  contentSanitizersForFunction,
  contentSanitizersForType,
  supportedTypes: [
    'ArrayList<String>',
    'boolean',
    'double',
    'Double',
    'int',
    'Integer',
    'Matcher<View>',
    'String',
    'ViewAction',
    'ViewInteraction'
  ],
  renameTypesMap: {
    int: 'Integer', // TODO: add test
    double: 'Double',
    ViewInteraction: 'Invocation'
  },
  classValue: ({ package: pkg, name }) => `${pkg}.${name}`
});
