import * as React from 'react';

import { ImageList } from '../components/ImageList';
import { getUserPhotos } from '../lib/api';
import { TStackScreenProps } from '../lib/types';

export const UserPhotosScreen = ({ route }: TStackScreenProps<'User'>) => (
  <ImageList
    numColumns={2}
    queryFn={getUserPhotos}
    queryKey={[route.name, route.params.userName]}
  />
);
