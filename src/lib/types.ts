import { StackScreenProps } from '@react-navigation/stack';
import { Animated, FlatListProps } from 'react-native';

export type TUser = {
  id: string;
  avatar: {
    medium: string;
    large: string;
  };
  userName: string;
};

export type TPhoto = {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  color: string;
  altDesc: string;
  blurhash: string;
  author: TUser;
};

export type TTopic = {
  id: string;
  slug: string;
  blurhash: string;
  coverPhoto: string;
};

type TQueryKey = string | [string, string];

export type TRootStackParams = {
  Photos: undefined; // HomePage with tabs
  Search: { query: string | null };
  SlideShow: { queryKey: TQueryKey; tag: string };
  User: { userName: string; avatar: string };
  Topic: { slug: string };
};

export type TImageListScreens = Exclude<keyof TRootStackParams, 'SlideShow'>;

export type TStackScreenProps<T extends keyof TRootStackParams> =
  StackScreenProps<TRootStackParams, T>;

export type TUseRootStackNav<T extends keyof TRootStackParams> =
  TStackScreenProps<T>['navigation'];

export type AppListProps<T extends TTopic | TPhoto> = Omit<
  Animated.AnimatedProps<FlatListProps<T>>,
  | 'data'
  | 'numColumns'
  | 'keyExtractor'
  | 'columnWrapperStyle'
  | 'ItemSeparatorComponent'
> & {
  queryKey: TQueryKey;
  numColumns: T extends TTopic ? 2 : 2 | 3;
  queryFn: (val: string) => Promise<TTopic[] | TPhoto[]>;
};
