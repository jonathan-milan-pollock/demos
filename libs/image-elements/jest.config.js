module.exports = {
  displayName: 'image-elements',
  testRunner: 'jasmine2',
  preset: '@stencil/core/testing',
  globals: {
    'ts-jest': { tsconfig: '<rootDir>/tsconfig.spec.json' },
  },
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/image-elements',
};
