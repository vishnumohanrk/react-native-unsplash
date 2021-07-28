import { useScrollToTop } from '@react-navigation/native';
import * as React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useQuery } from 'react-query';

import { AppListProps, TPhoto, TTopic } from '../lib/types';
import { FallBack } from './Fallback';
import { ListDivider } from './ListDivider';

export const AppList = <T extends TTopic | TPhoto>({
  queryFn,
  queryKey,
  ...rest
}: AppListProps<T>) => {
  const listRef = React.useRef(null);
  useScrollToTop(listRef);

  const { data, status } = useQuery(queryKey, () =>
    typeof queryKey === 'string' ? queryFn('') : queryFn(queryKey[1])
  );

  if (!data) return <FallBack status={status} />;

  return (
    <FlatList
      {...rest}
      ref={listRef}
      keyExtractor={i => i.id}
      data={data as T[] | undefined}
      columnWrapperStyle={styles.column}
      ItemSeparatorComponent={ListDivider}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 4,
  },
  column: {
    justifyContent: 'space-between',
  },
});
