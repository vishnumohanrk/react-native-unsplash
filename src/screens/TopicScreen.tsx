import * as React from 'react';

import { ImageList } from '../components/ImageList';
import { getTopicPhotos } from '../lib/api';
import { TStackScreenProps } from '../lib/types';

export const TopicScreen = ({ route }: TStackScreenProps<'Topic'>) => (
  <ImageList
    numColumns={3}
    queryFn={getTopicPhotos}
    queryKey={[route.name, route.params.slug]}
  />
);
