module.exports = {
  root: true,

  env: {
    node: true,
  },

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
  },

  // parserOptions: {
  //   parser: 'typescript-eslint-parser',
  // },

  extends: ['plugin:vue/essential', '@vue/prettier'],
};
