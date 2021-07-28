import axios from 'axios';

import { TPhoto, TTopic } from './types';

const unsplash = axios.create({
  baseURL: 'https://api.unsplash.com',
  params: {
    per_page: 50,
    orientation: 'portrait',
  },
  headers: {
    Authorization: `Client-ID ${process.env.UNSPLASH_TOKEN}`,
  },
});

const getPhotos = async (
  path: string,
  params: Record<string, string | number> = {}
): Promise<TPhoto[]> => {
  const { data } = await unsplash.get(path, { params });

  return ((data.results || data) as any[]).map(i => ({
    id: i.id,
    urls: {
      regular: i.urls.regular,
      small: i.urls.small,
    },
    color: i.color,
    blurhash: i['blur_hash'],
    altDesc: i['alt_description'],
    author: {
      id: i.user.id,
      avatar: i.user['profile_image']['small'],
      userName: i.user.username,
    },
  }));
};

export const getTopics = async (): Promise<TTopic[]> => {
  const { data } = await unsplash.get('/topics');

  return (data as any[]).map(i => ({
    coverPhoto: i['cover_photo']['urls']['small'],
    blurhash: i['cover_photo']['blur_hash'],
    id: i.id,
    slug: i.slug,
  }));
};

export const getLatestPhotos = () => getPhotos('/photos');

export const getTopicPhotos = (slug: string) =>
  getPhotos(`/topics/${slug}/photos`);

export const getUserPhotos = (userName: string) =>
  getPhotos(`/users/${userName}/photos`);

export const getSearchResults = (query: string) =>
  getPhotos('/search/photos', { query });
