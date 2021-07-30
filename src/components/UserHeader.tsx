import * as React from 'react';
import { Animated, StyleSheet, useWindowDimensions } from 'react-native';

import {
  appTheme,
  avatarRadius,
  avatarSize,
  fullHeaderHt,
  shrunkHeaderHt,
} from '../lib/constants';

type UserHeaderProps = {
  avatar: string;
  userName: string;
  scrollY: Animated.Value;
};

export const UserHeader = ({ avatar, scrollY, userName }: UserHeaderProps) => {
  const { width: winWidth } = useWindowDimensions();

  const animate = (outputRange: [number, number]) =>
    scrollY.interpolate({
      extrapolate: 'clamp',
      inputRange: [0, fullHeaderHt],
      outputRange,
    });

  return (
    <Animated.View
      style={[
        styles.header,
        {
          transform: [
            { translateY: animate([0, -fullHeaderHt + shrunkHeaderHt]) },
          ],
        },
      ]}
    >
      <Animated.Image
        resizeMode="cover"
        source={{ uri: avatar }}
        accessibilityLabel={userName}
        style={[
          styles.image,
          {
            transform: [
              { translateX: animate([20, winWidth - avatarSize - 8]) }, // 20@initPosition -> marginLeft, 8@afterTransform -> marginRight
              {
                translateY: animate([
                  0,
                  fullHeaderHt / 2 - avatarRadius - shrunkHeaderHt / 10,
                ]), // (shrunkHeaderHt / 10)@afterTransform -> marginVertical
              },
              { translateY: animate([0, avatarRadius]) },
              { translateX: animate([0, avatarRadius]) },
              { scale: animate([1, 0.4]) }, // origin -> `bottom right`
              { translateX: animate([0, -avatarRadius]) },
              { translateY: animate([0, -avatarRadius]) },
            ],
          },
        ]}
      />
      <Animated.Text
        numberOfLines={1}
        style={[
          styles.text,
          {
            transform: [
              { translateY: animate([0, shrunkHeaderHt * 1.23]) }, // -> center, NOTE: headerBackButton part of ReactNavigation stack header
              { translateX: animate([32, -avatarSize + 64]) }, // 32@initPosition -> 12 marginLeft + 20 imageMarginLeft, 64@afterTransform -> compensate headerBackButton
            ],
          },
        ]}
      >
        @{userName}
      </Animated.Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
    height: fullHeaderHt,
    backgroundColor: appTheme.colors.card,
  },
  image: {
    zIndex: 2,
    borderRadius: 9999,
    width: avatarSize,
    height: avatarSize,
  },
  text: {
    flex: 1,
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
});
