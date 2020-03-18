import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import AddPurchaseScreen from '../screens/AddPurchaseScreen';
import ViewAllPurchasesScreen from '../screens/ViewAllPurchasesScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { Ionicons } from '@expo/vector-icons';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-home" />,
        }}
      />
      <BottomTab.Screen
        name="AddPurchase"
        component={AddPurchaseScreen}
        options={{
        title: 'Add Purchase',
        tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-add" />,
      }}
      />
      <BottomTab.Screen
        name="ViewAllPurchases"
        component={ViewAllPurchasesScreen}
        initialParams={{ description: '' }}
        options={{
          title: 'All Purchases',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-pricetag" />,
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-settings" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'Home';
    case 'AddPurchase':
      return 'Add Purchase';
    case 'ViewAllPurchases':
      return 'All Purchases';
    case 'Settings':
      return 'Settings';
  }
}
