import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet } from 'react-native';

import { TUseRootStackNav } from '../lib/types';
import { TouchableRipple } from './TouchableRipple';

export const SearchButton = () => {
  const navigation = useNavigation<TUseRootStackNav<'Photos'>>();

  const handlePress = () => {
    navigation.push('Search', { query: null });
  };

  return (
    <TouchableRipple onTap={handlePress} style={styles.container}>
      <MaterialIcons name="search" color="white" size={26} />
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 14,
    overflow: 'hidden',
    borderRadius: 9999,
  },
});
