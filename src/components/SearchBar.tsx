import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { rippleColor } from '../lib/constants';
import { TUseRootStackNav } from '../lib/types';

export const SearchBar = () => {
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef<TextInput>(null);
  const navigation = useNavigation<TUseRootStackNav<'Search'>>();

  const clearInput = () => {
    inputRef.current?.focus();
    setValue('');
  };

  const handleSubmit = () => {
    if (value) {
      navigation.setParams({ query: value });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        ref={inputRef}
        style={styles.input}
        placeholder="Search"
        returnKeyType="search"
        onChangeText={setValue}
        onSubmitEditing={handleSubmit}
        placeholderTextColor={rippleColor}
      />
      {value ? (
        <Pressable
          onPress={clearInput}
          style={styles.clearButton}
          accessibilityLabel="Clear"
        >
          <MaterialIcons color="white" size={22} name="clear" />
        </Pressable>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  input: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
    paddingVertical: 4,
    paddingLeft: 1,
    borderRadius: 2,
    borderBottomWidth: 0.5,
    borderBottomColor: 'white',
  },
  clearButton: {
    top: 4,
    right: 0,
    position: 'absolute',
  },
});
