/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow strict-local
 */

'use strict';

import type {HostComponent} from '../Renderer/shims/ReactNativeTypes';
import type {ViewProps} from '../Components/View/ViewPropTypes';
import type {ImageResizeMode} from './ImageResizeMode';
import * as NativeComponentRegistry from '../NativeComponent/NativeComponentRegistry';
import type {ColorValue} from '../StyleSheet/StyleSheet';

type NativeProps = $ReadOnly<{
  ...ViewProps,
  resizeMode?: ?ImageResizeMode,
  src?: ?$ReadOnlyArray<?$ReadOnly<{uri: string, ...}>>,
  tintColor?: ?ColorValue,
  headers?: ?{[string]: string},
}>;

const TextInlineImage: HostComponent<NativeProps> = NativeComponentRegistry.get<NativeProps>(
  'RCTTextInlineImage',
  () => ({
    uiViewClassName: 'RCTTextInlineImage',
    bubblingEventTypes: {},
    directEventTypes: {},
    validAttributes: {
      resizeMode: true,
      src: true,
      tintColor: {
        process: require('../StyleSheet/processColor'),
      },
      headers: true,
    },
  }),
);

module.exports = TextInlineImage;
