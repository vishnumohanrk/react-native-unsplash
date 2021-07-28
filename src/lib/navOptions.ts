import { MaterialTopTabBarOptions } from '@react-navigation/material-top-tabs';
import {
  StackNavigationOptions,
  TransitionPresets,
} from '@react-navigation/stack';

import { SearchBar } from '../components/SearchBar';
import { SearchButton } from '../components/SearchButton';
import { TRootStackParams, TStackScreenProps } from './types';

export const tabBarOptions: MaterialTopTabBarOptions = {
  labelStyle: {
    fontWeight: 'bold',
  },
  tabStyle: {
    height: 52,
  },
};

export const stackScreenOptions: (
  props: TStackScreenProps<keyof TRootStackParams>
) => StackNavigationOptions = ({ route }) => {
  switch (route.name) {
    case 'Photos':
      return {
        headerStyle: {
          elevation: 0,
        },
        headerRight: SearchButton,
      };
    case 'Topic':
      return {
        title: (route.params as TRootStackParams['Topic']).slug,
        headerTitleStyle: {
          textTransform: 'capitalize',
        },
      };
    case 'SlideShow':
      return {
        title: '',
        headerTransparent: true,
      };
    case 'User':
      return {
        title: `@${(route.params as TRootStackParams['User']).userName}`,
      };
    case 'Search':
      return {
        ...TransitionPresets.SlideFromRightIOS,
        headerTitle: SearchBar,
      };
    default:
      return {};
  }
};
