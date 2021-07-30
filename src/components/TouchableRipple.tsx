import * as React from 'react';
import { Animated, StyleSheet, TouchableNativeFeedback } from 'react-native';

import { rippleConfig } from '../lib/constants';
import { TAnimatedViewStyle } from '../lib/types';

type TouchableRippleProps = {
  onTap: () => void;
  children: React.ReactNode;
  style: TAnimatedViewStyle;
};

export const TouchableRipple = ({
  onTap,
  style,
  children,
}: TouchableRippleProps) => (
  <TouchableNativeFeedback
    useForeground
    onPress={onTap}
    background={rippleConfig}
    touchSoundDisabled={false}
  >
    <Animated.View style={[style, styles.container]}>{children}</Animated.View>
  </TouchableNativeFeedback>
);

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    overflow: 'hidden',
  },
});
