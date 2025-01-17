/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+react_native
 * @format
 */

'use strict';

const ESLintTester = require('./eslint-tester.js');

const rule = require('../platform-colors.js');

const eslintTester = new ESLintTester();

eslintTester.run('../platform-colors', rule, {
  valid: [
    "const color = PlatformColor('labelColor');",
    "const color = PlatformColor('controlAccentColor', 'controlColor');",
    "const color = DynamicColorIOS({light: 'black', dark: 'white'});",
    "const color = DynamicColorIOS({light: PlatformColor('black'), dark: PlatformColor('white')});",
  ],
  invalid: [
    {
      code: 'const color = PlatformColor();',
      errors: [{message: rule.meta.messages.platformColorArgsLength}],
    },
    {
      code:
        "const labelColor = 'labelColor'; const color = PlatformColor(labelColor);",
      errors: [{message: rule.meta.messages.platformColorArgTypes}],
    },
    {
      code:
        "const tuple = {light: 'black', dark: 'white'}; const color = DynamicColorIOS(tuple);",
      errors: [{message: rule.meta.messages.dynamicColorIOSArg}],
    },
    {
      code:
        "const black = 'black'; const color = DynamicColorIOS({light: black, dark: 'white'});",
      errors: [{message: rule.meta.messages.dynamicColorIOSLight}],
    },
    {
      code:
        "const white = 'white'; const color = DynamicColorIOS({light: 'black', dark: white});",
      errors: [{message: rule.meta.messages.dynamicColorIOSDark}],
    },
  ],
});
