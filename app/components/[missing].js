import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function NotFoundPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>This Page Not Found !!</Text>
      <Pressable
        onPress={() => router.replace("components/Login")}
        style={styles.btn}
      >
        <Text style={styles.btn_text}>Go To The Home Page</Text>
      </Pressable>
      <StatusBar />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f4e4cb",
    width: "100%",
  },
  label: {
    fontSize: 25,
    fontWeight: "bold",
    width: "90%",
    textAlign: "center",
  },
  btn: {
    width: "60%",
    padding: 10,
    marginTop: 10,
    backgroundColor: "#ddd",
    borderRadius: 20,
  },

  btn_text: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
});
