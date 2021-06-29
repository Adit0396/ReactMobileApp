import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBarIcon from "../components/TabBarIcon";
import StocksScreen from "../screens/StocksScreen";
import SearchScreen from "../screens/SearchScreen";
import ChartScreen from "../screens/chat";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import SignUp from "../screens/login";
import { createStackNavigator } from '@react-navigation/stack'
const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Search";

const HomeStack = createStackNavigator();

    function HomeStackScreen() {
      return (
        <HomeStack.Navigator
        screenOptions={{
          headerShown: false
        }}>
          <HomeStack.Screen name="SearchStocks" component={SearchScreen} />
          <HomeStack.Screen name="ChartScreen" component={ChartScreen} />
        </HomeStack.Navigator>
      );
    }
export default function BottomTabNavigator({ navigation, route }) {
  // useEffect(() => {
  //   navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  // }, [navigation, route]);

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
      screenOptions={{
        headerShown: false
      }}
        name="Stocks"
        component={StocksScreen}
        options={{
          title: "Stocks",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-trending-up" />
          ),
        }}
      />
      <BottomTab.Screen 
        name="Search"
        component={HomeStackScreen}
        options={{
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-search" />
          ),
        }}
      />
    </BottomTab.Navigator>
    
  );
}
function getHeaderTitle(route) {
  return getFocusedRouteNameFromRoute(route) ?? INITIAL_ROUTE_NAME;
}
