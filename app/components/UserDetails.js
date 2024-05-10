import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
export default function UserDetails({ name, email }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Name: </Text>
      <Text style={styles.text2}>{name} </Text>
      <Text style={styles.text}>Email: </Text>
      <Text style={styles.text2}> {email}</Text>
      <StatusBar />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "105%",
    height: "90%",
    backgroundColor: "#f0b75e",
    borderRadius: 20,
    justifyContent: "center",
    padding: 10,
  },
  text: {
    fontSize: 22,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  text2: {
    fontSize: 22,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    backgroundColor: "#ddd",
    borderRadius: 10,
    padding: 10,
  },
});
