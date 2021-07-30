import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Image, StyleSheet } from 'react-native';

import {
  AppListProps,
  TAnimatedViewStyle,
  TImageListScreens,
  TPhoto,
  TUseRootStackNav,
} from '../lib/types';
import { AppList } from './AppList';
import { TouchableRipple } from './TouchableRipple';

type ImageListProps = Omit<AppListProps<TPhoto>, 'renderItem'> & {
  itemStyles?: TAnimatedViewStyle;
};

export const ImageList = ({
  queryKey,
  numColumns,
  itemStyles,
  ...rest
}: ImageListProps) => {
  const navigation = useNavigation<TUseRootStackNav<TImageListScreens>>();

  return (
    <AppList<TPhoto>
      {...rest}
      queryKey={queryKey}
      numColumns={numColumns}
      renderItem={({ item }) => (
        <TouchableRipple
          style={[
            itemStyles,
            {
              aspectRatio: 1 / 2.12,
              width: `${(numColumns === 2 ? 99 : 98) / numColumns}%`,
            },
          ]}
          onTap={() =>
            navigation.push('SlideShow', { queryKey, tag: item.altDesc })
          }
        >
          <Image
            resizeMode="cover"
            source={{ uri: item.urls.small }}
            accessibilityLabel={item.altDesc}
            style={[styles.image, { backgroundColor: `${item.color}80` }]}
          />
        </TouchableRipple>
      )}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});
