import * as React from 'react';

import { ImageList } from '../components/ImageList';
import { getSearchResults } from '../lib/api';
import { TStackScreenProps } from '../lib/types';

export const SearchScreen = ({
  route: {
    name,
    params: { query },
  },
}: TStackScreenProps<'Search'>) =>
  query ? (
    <ImageList
      numColumns={3}
      queryKey={[name, query]}
      queryFn={getSearchResults}
    />
  ) : null;
