import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Image, Pressable, StyleSheet, Text } from 'react-native';

import { TUser, TUseRootStackNav } from '../lib/types';

export const SlideShowImageAuthor = ({ avatar, userName }: TUser) => {
  const navigation = useNavigation<TUseRootStackNav<'SlideShow'>>();

  const handlePress = () => {
    navigation.push('User', { userName });
  };

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <Image
        resizeMode="cover"
        style={styles.avatar}
        source={{ uri: avatar }}
        accessibilityLabel={userName}
      />
      <Text numberOfLines={1} style={styles.userName}>
        @{userName}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    width: '75%',
    fontSize: 18,
    marginLeft: 8,
    color: 'white',
    fontWeight: '500',
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 9999,
  },
});
