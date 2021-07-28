import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as React from 'react';

import { tabBarOptions } from '../../lib/navOptions';
import { HomeTab } from './HomeTab';
import { TopicsTab } from './TopicsTab';

const Tab = createMaterialTopTabNavigator();

export const HomeScreen = () => (
  <Tab.Navigator tabBarOptions={tabBarOptions}>
    <Tab.Screen name="Home" component={HomeTab} />
    <Tab.Screen name="Topics" component={TopicsTab} />
  </Tab.Navigator>
);
