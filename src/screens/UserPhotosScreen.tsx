import * as React from 'react';
import {
  Animated,
  NativeScrollEvent,
  StatusBar,
  StyleSheet,
} from 'react-native';

import { ImageList } from '../components/ImageList';
import { getUserPhotos } from '../lib/api';
import { appTheme } from '../lib/constants';
import { TStackScreenProps } from '../lib/types';

const headerHt = 196;

export const UserPhotosScreen = ({ route }: TStackScreenProps<'User'>) => {
  const { avatar, userName } = route.params;
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const animate = (outputRange: [number, number]) =>
    scrollY.interpolate({
      extrapolate: 'clamp',
      inputRange: [0, headerHt],
      outputRange,
    });

  const ListHeader = () => (
    <Animated.View
      style={[
        styles.header,
        {
          transform: [{ translateY: animate([0, -headerHt + 56]) }],
        },
      ]}
    >
      <Animated.Image
        resizeMode="cover"
        style={[styles.image, { opacity: animate([1, 0]) }]}
        source={{ uri: avatar }}
      />
      <Animated.Text
        style={[
          styles.text,
          {
            transform: [
              { translateY: animate([0, 69]) },
              { translateX: animate([0, -80]) },
            ],
          },
        ]}
        numberOfLines={1}
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: appTheme.colors.card,
    height: headerHt,
    paddingLeft: 20,
    elevation: 4,
  },
  image: {
    width: 112,
    height: 112,
    borderRadius: 9999,
    marginRight: 12,
  },
  text: {
    flex: 1,
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
});
