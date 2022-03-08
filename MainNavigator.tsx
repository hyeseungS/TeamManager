import React, {useCallback} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import type {RouteProp, ParamListBase} from '@react-navigation/native';

import Home from './Home';
import AddPlan from './AddPlan';
import CheckCalendar from './CheckCalendar';
import {Colors} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';
import UpdatePlan from './UpdatePlan';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
type TabBarIconProps = {focused: boolean; color: string; size: number};
const icons: Record<string, string[]> = {
  Home: ['home', 'home-outline'],
  AddPlan: ['plus', 'plus'],
  CheckCalendar: ['calendar-check', 'calendar-check-outline'],
};
function BottomNavigator() {
  const screenOptions = useCallback(
    ({route}: {route: RouteProp<ParamListBase, string>}) => {
      const {name} = route;
      return {
        tabBarIcon: ({focused, color, size}: TabBarIconProps) => {
          const focusedSize = focused ? size + 3 : size;
          const focusedColor = focused ? '#584F8D' : color;
          const [icon, iconOutline] = icons[name];
          const iconName = focused ? icon : iconOutline;
          return (
            <Icon name={iconName} size={focusedSize} color={focusedColor} />
          );
        },
        tabBarOptions: {
          style: {
            height: 300,
          },
        },
        tabBarLabel: () => null,
      };
    },
    [],
  );
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Team Manager',
          headerTintColor: 'white',
          headerTitleStyle: {fontWeight: 'bold', fontSize: 24},
          headerStyle: {
            backgroundColor: '#584F8D',
            height: 65,
            borderBottomWidth: 3,
          },
          headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen
        name="AddPlan"
        component={AddPlan}
        options={{
          title: '회의 추가하기',
          headerTintColor: 'black',
          headerTitleStyle: {fontWeight: 'bold', fontSize: 20},
          headerStyle: {
            backgroundColor: Colors.white,
            height: 65,
            borderBottomWidth: 3,
          },
          headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen
        name="CheckCalendar"
        component={CheckCalendar}
        options={{
          title: '회의 일정',
          headerTintColor: 'black',
          headerTitleStyle: {fontWeight: 'bold', fontSize: 20},
          headerStyle: {
            backgroundColor: Colors.white,
            height: 65,
            borderBottomWidth: 3,
          },
          headerTitleAlign: 'center',
        }}
      />
    </Tab.Navigator>
  );
}

const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="bottom"
        component={BottomNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UpdatePlan"
        component={UpdatePlan}
        initialParams={{id: 0}}
        options={{
          title: '회의 수정하기',
          headerTintColor: 'black',
          headerTitleStyle: {fontWeight: 'bold', fontSize: 20},
          headerStyle: {
            backgroundColor: Colors.white,
            height: 65,
            borderBottomWidth: 3,
          },
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};
export default MainNavigator;
