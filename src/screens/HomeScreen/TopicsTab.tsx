import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Image, StyleSheet, Text } from 'react-native';

import { AppList } from '../../components/AppList';
import { TouchableRipple } from '../../components/TouchableRipple';
import { getTopics } from '../../lib/api';
import { TTopic, TUseRootStackNav } from '../../lib/types';

export const TopicsTab = () => {
  const navigation = useNavigation<TUseRootStackNav<'Photos'>>();

  return (
    <AppList<TTopic>
      numColumns={2}
      queryFn={getTopics}
      queryKey="topicsList"
      renderItem={({ item }) => (
        <TouchableRipple
          style={styles.container}
          onTap={() => navigation.push('Topic', { slug: item.slug })}
        >
          <>
            <Image
              blurRadius={12}
              style={styles.image}
              source={{ uri: item.coverPhoto }}
            />
            <Text style={styles.text}>{item.slug}</Text>
          </>
        </TouchableRipple>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: `${99 / 2}%`,
    aspectRatio: 1 / 0.6,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    opacity: 0.6,
    ...StyleSheet.absoluteFillObject,
  },
  text: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});
