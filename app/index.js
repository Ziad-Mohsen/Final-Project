import { StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/Config";
export default function GetStart() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        router.replace("./(tabs)/Home");
      } else {
        router.replace("./components/Login");
      }
    });
    return unsubscribe;
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
