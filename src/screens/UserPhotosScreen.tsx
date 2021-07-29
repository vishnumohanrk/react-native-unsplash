import * as React from 'react';
import {
  Animated,
  NativeScrollEvent,
  StatusBar,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

import { ImageList } from '../components/ImageList';
import { getUserPhotos } from '../lib/api';
import { appTheme } from '../lib/constants';
import { TStackScreenProps } from '../lib/types';

const shrunkHeaderHt = 56;
const fullHeaderHt = shrunkHeaderHt * 3.5;
const avatarSize = shrunkHeaderHt * 2;
const avatarRadius = avatarSize / 2;

export const UserPhotosScreen = ({ route }: TStackScreenProps<'User'>) => {
  const { avatar, userName } = route.params;
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const { width: winWidth } = useWindowDimensions();

  const animate = (outputRange: [number, number]) =>
    scrollY.interpolate({
      extrapolate: 'clamp',
      inputRange: [0, fullHeaderHt],
      outputRange,
    });

  const ListHeader = () => (
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

  return (
    <ImageList
      numColumns={2}
      queryFn={getUserPhotos}
      scrollEventThrottle={16}
      stickyHeaderIndices={[0]}
      ListHeaderComponent={ListHeader}
      queryKey={[route.name, userName]}
      contentContainerStyle={styles.root}
      onScroll={Animated.event<NativeScrollEvent>(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
      )}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    marginTop: StatusBar.currentHeight,
    padding: 0,
  },
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
