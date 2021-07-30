import * as React from 'react';
import {
  Animated,
  NativeScrollEvent,
  StatusBar,
  StyleSheet,
} from 'react-native';

import { ImageList } from '../components/ImageList';
import { UserHeader } from '../components/UserHeader';
import { getUserPhotos } from '../lib/api';
import { fullHeaderHt, shrunkHeaderHt } from '../lib/constants';
import { TStackScreenProps } from '../lib/types';

export const UserPhotosScreen = ({ route }: TStackScreenProps<'User'>) => {
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const ListHeader = () => <UserHeader scrollY={scrollY} {...route.params} />;

  const translateY = scrollY.interpolate({
    inputRange: [0, fullHeaderHt],
    outputRange: [4, shrunkHeaderHt + 4], // 4 -> paddingTop
    extrapolate: 'clamp',
  });

  return (
    <ImageList
      numColumns={2}
      queryFn={getUserPhotos}
      scrollEventThrottle={16}
      stickyHeaderIndices={[0]}
      ListHeaderComponent={ListHeader}
      contentContainerStyle={styles.root}
      itemStyles={{ transform: [{ translateY }] }}
      queryKey={[route.name, route.params.userName]}
      onScroll={Animated.event<NativeScrollEvent>(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
      )}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 0,
    marginTop: StatusBar.currentHeight,
  },
});
