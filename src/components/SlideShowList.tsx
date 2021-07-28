import * as React from 'react';
import {
  Animated,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';

import { SlideShowImageAuthor } from '../components/SlideShowImageAuthor';
import { TPhoto } from '../lib/types';

type SlideShowListProps = {
  data: TPhoto[];
  onSnapEnd: (n: number) => void;
};

export const SlideShowList = ({ data, onSnapEnd }: SlideShowListProps) => {
  const { width: winWidth } = useWindowDimensions();
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const gap = 0.78;
  const width = gap * winWidth;

  const StartEndGap = () => (
    <View style={{ width: winWidth * ((1 - gap) / 2) }} />
  );

  const handleSnapEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    onSnapEnd(Math.round(e.nativeEvent.contentOffset.x / width));
  };

  return (
    <Animated.FlatList
      horizontal
      data={data}
      snapToInterval={width}
      decelerationRate="fast"
      snapToAlignment="center"
      scrollEventThrottle={16}
      keyExtractor={i => i.id}
      ListHeaderComponent={StartEndGap}
      ListFooterComponent={StartEndGap}
      onMomentumScrollEnd={handleSnapEnd}
      showsHorizontalScrollIndicator={false}
      onScroll={Animated.event<NativeScrollEvent>(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: true }
      )}
      renderItem={({ index, item }) => (
        <Animated.View
          style={[
            styles.container,
            {
              width,
              transform: [
                { perspective: 1000 },
                {
                  scale: scrollX.interpolate({
                    inputRange: [
                      (index - 1) * width,
                      index * width,
                      (index + 1) * width,
                    ],
                    outputRange: [0.9, 1, 0.9],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}
        >
          <SlideShowImageAuthor {...item.author} />
          <Image
            resizeMode="cover"
            style={styles.image}
            source={{ uri: item.urls.regular }}
            accessibilityLabel={item.altDesc}
          />
        </Animated.View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
  },
  image: {
    height: '75%',
    borderRadius: 5,
  },
});
