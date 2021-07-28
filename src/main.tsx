import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { appTheme } from './lib/constants';
import { stackScreenOptions } from './lib/navOptions';
import { TRootStackParams } from './lib/types';
import { HomeScreen } from './screens/HomeScreen';
import { SearchScreen } from './screens/SearchScreen';
import { SlideShowScreen } from './screens/SlideShowScreen';
import { TopicScreen } from './screens/TopicScreen';
import { UserPhotosScreen } from './screens/UserPhotosScreen';

const Stack = createStackNavigator<TRootStackParams>();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export const AppMain = () => (
  <NavigationContainer theme={appTheme}>
    <QueryClientProvider client={queryClient}>
      <Stack.Navigator screenOptions={stackScreenOptions}>
        <Stack.Screen name="Photos" component={HomeScreen} />
        <Stack.Screen name="Topic" component={TopicScreen} />
        <Stack.Screen name="SlideShow" component={SlideShowScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="User" component={UserPhotosScreen} />
      </Stack.Navigator>
    </QueryClientProvider>
  </NavigationContainer>
);
