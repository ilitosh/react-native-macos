/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow
 */

/* eslint-env node */

'use strict';

const babelRegisterOnly = require('metro-babel-register');
const createCacheKeyFunction = require('@jest/create-cache-key-function')
  .default;

const {transformSync: babelTransformSync} = require('@babel/core');
const generate = require('@babel/generator').default;

const nodeFiles = new RegExp(
  [
    '/metro(?:-[^/]*)?/', // metro, metro-core, metro-source-map, metro-etc.
  ].join('|'),
);
const nodeOptions = babelRegisterOnly.config([nodeFiles]);

babelRegisterOnly([]);

const transformer = require('metro-react-native-babel-transformer');
module.exports = {
  process(src /*: string */, file /*: string */) /*: string */ {
    if (nodeFiles.test(file)) {
      // node specific transforms only
      return babelTransformSync(src, {
        filename: file,
        sourceType: 'script',
        ...nodeOptions,
        ast: false,
      }).code;
    }

    const {ast} = transformer.transform({
      filename: file,
      options: {
        ast: true, // needed for open source (?) https://github.com/facebook/react-native/commit/f8d6b97140cffe8d18b2558f94570c8d1b410d5c#r28647044
        dev: true,
        enableBabelRuntime: false,
        experimentalImportSupport: false,
        globalPrefix: '',
        hot: false,
        inlineRequires: true,
        minify: false,
        platform: '',
        projectRoot: '',
        publicPath: '/assets',
        retainLines: true,
        sourceType: 'unambiguous', // b7 required. detects module vs script mode
      },
      src,
      plugins: [
        [require('@babel/plugin-transform-block-scoping')],
        // the flow strip types plugin must go BEFORE class properties!
        // there'll be a test case that fails if you don't.
        [require('@babel/plugin-transform-flow-strip-types')],
        [
          require('@babel/plugin-proposal-class-properties'),
          // use `this.foo = bar` instead of `this.defineProperty('foo', ...)`
          {loose: true},
        ],
        [require('@babel/plugin-transform-computed-properties')],
        [require('@babel/plugin-transform-destructuring')],
        [require('@babel/plugin-transform-function-name')],
        [require('@babel/plugin-transform-literals')],
        [require('@babel/plugin-transform-parameters')],
        [require('@babel/plugin-transform-shorthand-properties')],
        [require('@babel/plugin-transform-react-jsx')],
        [require('@babel/plugin-transform-regenerator')],
        [require('@babel/plugin-transform-sticky-regex')],
        [require('@babel/plugin-transform-unicode-regex')],
        [
          require('@babel/plugin-transform-modules-commonjs'),
          {strict: false, allowTopLevelThis: true},
        ],
        [require('@babel/plugin-transform-classes')],
        [require('@babel/plugin-transform-arrow-functions')],
        [require('@babel/plugin-transform-spread')],
        [require('@babel/plugin-proposal-object-rest-spread')],
        [
          require('@babel/plugin-transform-template-literals'),
          {loose: true}, // dont 'a'.concat('b'), just use 'a'+'b'
        ],
        [require('@babel/plugin-transform-exponentiation-operator')],
        [require('@babel/plugin-transform-object-assign')],
        [require('@babel/plugin-transform-for-of'), {loose: true}],
        [require('@babel/plugin-transform-react-display-name')],
        [require('@babel/plugin-transform-react-jsx-source')],
      ],
    });

    return generate(
      ast,
      // $FlowFixMe[prop-missing] Error found when improving flow typing for libs
      {
        code: true,
        comments: false,
        compact: false,
        filename: file,
        retainLines: true,
        sourceFileName: file,
        sourceMaps: true,
      },
      src,
    ).code;
  },

  getCacheKey: (createCacheKeyFunction([
    __filename,
    require.resolve('metro-react-native-babel-transformer'),
    require.resolve('@babel/core/package.json'),
  ]) /*: any */),
};
