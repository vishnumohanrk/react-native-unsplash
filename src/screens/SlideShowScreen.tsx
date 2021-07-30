import * as React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useQuery } from 'react-query';

import { FallBack } from '../components/Fallback';
import { SlideShowList } from '../components/SlideShowList';
import { getSearchResults } from '../lib/api';
import { TPhoto, TStackScreenProps } from '../lib/types';

export const SlideShowScreen = ({
  route: {
    name,
    params: { tag, queryKey },
  },
}: TStackScreenProps<'SlideShow'>) => {
  const opacity = React.useRef(new Animated.Value(1)).current;
  const [slide, setSlide] = React.useState(0);

  const { data: cacheData, status } = useQuery<TPhoto[]>(queryKey);
  const { data: newData } = useQuery([name, tag], () => getSearchResults(tag));

  const clickedPhoto = cacheData?.find(i => i.altDesc === tag);

  if (!newData || !clickedPhoto) return <FallBack status={status} />;

  const data = [clickedPhoto, ...newData];

  const onSnapEnd = (val: number) => {
    if (val !== slide) {
      Animated.timing(opacity, {
        toValue: 0,
        useNativeDriver: true,
      }).start(() => {
        setSlide(val);
      });
    }
  };

  const fadeOut = () => {
    Animated.timing(opacity, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
      <Animated.Image
        blurRadius={12}
        resizeMode="cover"
        onLoadEnd={fadeOut}
        source={{ uri: data[slide].urls.regular }}
        style={[StyleSheet.absoluteFill, { opacity }]}
      />
      <SlideShowList data={data} onSnapEnd={onSnapEnd} />
    </>
  );
};
