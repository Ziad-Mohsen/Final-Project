import React, { useState } from "react";
import { Tabs } from "expo-router";
import { IconButton, Icon } from "react-native-paper";
export default function _layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
          tabBarLabelStyle: {
            fontSize: 18,
          },
          headerShown: false,
          tabBarIcon: () => (
            <IconButton icon="home" iconColor="#f9b344" size={30} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarLabelStyle: {
            fontSize: 18,
          },
          headerShown: false,
          tabBarIcon: () => (
            <IconButton icon="cart-outline" size={30} iconColor="#f9b344" />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          tabBarLabelStyle: {
            fontSize: 18,
          },
          headerShown: false,
          tabBarIcon: () => <Icon source="account" color="#f9b344" size={30} />,
        }}
      />
    </Tabs>
  );
}
