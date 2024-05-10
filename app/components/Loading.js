import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#f1bf70" />
      <Text>Loading...</Text>
      <StatusBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loading;
