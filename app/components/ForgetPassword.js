import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
  Text,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import { forgetPass } from "../../firebase/auth";
import { Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const handlePress = async () => {
    try {
      await forgetPass(email);
      Alert.alert(
        "Password Reset Email Sent",
        "Please check your email to reset your password."
      );
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        Alert.alert(
          "User Not Found",
          "The email address provided does not exist in our system."
        );
      } else {
        Alert.alert("Error", "An error occurred. Please try again later.");
      }
    }
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/mobile-password-forgot.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Forget Password</Text>

        <TextInput
          placeholder="Enter Your Email"
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <Pressable style={styles.send} onPress={handlePress}>
        <Text style={styles.send_text}>Send Email</Text>
      </Pressable>
      <Pressable
        style={styles.back}
        onPress={() => router.replace("components/Login")}
      >
        <Text style={styles.back_text}>Back to Login</Text>
      </Pressable>
      <StatusBar />
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ddd",
    width: "100%",
  },
  logo: {
    width: 100,
    height: 100,
  },
  header: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
  },
  input: {
    width: "90%",
    height: 50,
    marginTop: 20,
    padding: 10,
    borderWidth: 3,
    borderColor: "black",
    fontSize: 18,
    borderRadius: 15,
    backgroundColor: "#f9b344",
  },
  send: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9b344",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
    borderRadius: 15,
    width: "90%",
    borderWidth: 3,
    borderColor: "black",
  },
  send_text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  back: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9b344",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
    borderRadius: 15,
    width: "90%",
    borderWidth: 3,
    borderColor: "black",
  },
  back_text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
export default ForgetPassword;
