import * as React from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableNativeFeedback,
  View,
  ViewStyle,
} from 'react-native';

import { rippleConfig } from '../lib/constants';

type TouchableRippleProps = {
  onTap: () => void;
  children: React.ReactNode;
  style: StyleProp<ViewStyle>;
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
    <View style={[styles.container, style]}>{children}</View>
  </TouchableNativeFeedback>
);

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    overflow: 'hidden',
  },
});
