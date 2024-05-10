import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";
import React from "react";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function Admin() {
  return (
    <ImageBackground
      source={require("../../assets/images/background2.jpeg")}
      style={styles.container}
    >
      <View style={styles.container2}>
        <View style={styles.container3}>
          <Image
            source={require("../../assets/images/usersIcon.png")}
            style={styles.icons}
          />

          <Pressable
            style={styles.btn}
            onPress={() => router.push("/components/ManageUsers")}
          >
            <Text style={styles.btnText}>Manage Users</Text>
          </Pressable>
        </View>
        <View style={styles.container3}>
          <Image
            source={require("../../assets/images/productsIcon.png")}
            style={styles.icons}
          />
          <Pressable
            style={styles.btn}
            onPress={() => router.push("/components/ManageProducts")}
          >
            <Text style={styles.btnText}>Manage Products</Text>
          </Pressable>
        </View>
      </View>
      <StatusBar />
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#f4e4cb",
  },
  container2: {
    width: "90%",
    height: "30%",
    backgroundColor: "#dddddd80",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 20,
    padding: 20,
  },
  container3: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  btn: {
    backgroundColor: "#f9b344",
    width: "100%",
    padding: 20,
    borderRadius: 10,
  },
  btnText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  icons: {
    width: "20%",
    height: "100%",
    zIndex: 2,
    marginRight: "-20%",
  },
});
