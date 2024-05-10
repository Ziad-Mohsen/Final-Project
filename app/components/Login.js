import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  Alert,
} from "react-native";
import Loading from "./Loading";
import { router } from "expo-router";
import { IconButton } from "react-native-paper";
import { logIn } from "../../firebase/auth";
import { updateUserInLogin } from "../../firebase/users";
import { StatusBar } from "expo-status-bar";

const Login = () => {
  const [secure, setSecure] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handlePress = async () => {
    try {
      await logIn(email, password);
      await updateUserInLogin(email, password);
      router.replace("(tabs)/Home");
    } catch (error) {
      console.log("Error", JSON.stringify(error));
      let errorMessage = error.code;
      if (errorMessage.startsWith("auth/")) {
        errorMessage = errorMessage.substring("auth/".length);
        setError(errorMessage);
        Alert.alert("Error", errorMessage);
      }
    }
  };

  const handleSecure = () => {
    setSecure(!secure);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/Logo (2).png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Login</Text>
        <TextInput
          placeholder="Enter Your Email"
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
      </View>
      <View style={styles.header2}>
        <TextInput
          placeholder="Enter Your Password"
          style={styles.input}
          secureTextEntry={secure}
          onChangeText={(pass) => setPassword(pass)}
          value={password}
        />
        <IconButton
          icon={secure ? "eye" : "eye-off"}
          style={styles.eye}
          onPress={handleSecure}
        />
      </View>
      <View style={styles.forgetPassContainer}>
        <Pressable onPress={() => router.replace("components/ForgetPassword")}>
          <Text style={styles.forgetPassText}>Forget Password?</Text>
        </Pressable>
      </View>
      <Pressable style={styles.loginButton} onPress={handlePress}>
        <Text style={styles.loginText}>Login</Text>
      </Pressable>
      <View style={styles.signUpContainer}>
        <Text style={styles.member}>Not a Member?</Text>
        <Pressable onPress={() => router.replace("components/Register")}>
          <Text style={styles.signUp}> SignUp</Text>
        </Pressable>
      </View>
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
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
  },
  header2: {
    alignItems: "center",
    position: "relative",
    width: "100%",
  },
  input: {
    width: "90%",
    height: 50,
    padding: 10,
    borderWidth: 3,
    borderColor: "black",
    fontSize: 18,
    borderRadius: 15,
    backgroundColor: "#f9b344",
    marginBottom: 20,
  },
  loginButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9b344",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: "black",
    width: "90%",
    marginBottom: 20,
  },
  loginText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  forgetPassContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  forgetPassText: {
    fontSize: 16,
    textDecorationLine: "underline",
  },
  signUpContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  member: {
    fontSize: 18,
  },
  signUp: {
    color: "red",
    fontSize: 18,
    marginLeft: 5,
  },
  eye: {
    position: "absolute",
    top: "5%",
    right: "6%",
  },
});

export default Login;
