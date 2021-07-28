import * as React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { UseQueryResult } from 'react-query';

export const FallBack = ({ status }: { status: UseQueryResult['status'] }) => (
  <View style={styles.container}>
    {status === 'error' ? (
      <Text style={styles.errorInfo}>An Error Occured</Text>
    ) : (
      <ActivityIndicator color="white" size={56} />
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorInfo: {
    fontSize: 24,
    color: 'white',
  },
});
