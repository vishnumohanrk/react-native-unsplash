import * as React from 'react';

import { ImageList } from '../../components/ImageList';
import { getLatestPhotos } from '../../lib/api';

export const HomeTab = () => (
  <ImageList numColumns={3} queryFn={getLatestPhotos} queryKey="Photos" />
);
