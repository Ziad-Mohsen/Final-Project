import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { IconButton } from "react-native-paper";
import { router } from "expo-router";
import { register } from "../../firebase/auth";
import Loading from "./Loading";
import { NewUser } from "../../firebase/users";
import { StatusBar } from "expo-status-bar";

const Register = () => {
  const [secure, setsecure] = useState(true);
  const handleSecure = () => {
    setsecure(!secure);
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handlePress = async () => {
    try {
      setIsLoading(true);
      if (name.trim() === "") {
        setIsLoading(false);
        Alert.alert("Error", "Please enter your name");
        return;
      }
      if (password1 === password2) {
        await register(email, password1);
        await NewUser(name, email, password1);
        router.replace("(tabs)/Home");
      } else {
        setIsLoading(false);
        Alert.alert("Error", "Passwords do not match");
      }
    } catch (error) {
      setIsLoading(false);
      let errorMessage = error.code;
      if (errorMessage.startsWith("auth/")) {
        errorMessage = errorMessage.substring("auth/".length);
        Alert.alert("Error", errorMessage);
      }
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Sign Up</Text>
          <TextInput
            placeholder="User Name"
            style={styles.input}
            onChangeText={(text) => setName(text)}
            value={name}
          />
          <TextInput
            placeholder="Enter A Valid Email"
            style={styles.input}
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
        </View>
        <View style={styles.header2}>
          <TextInput
            placeholder="Enter A Strong Password"
            style={styles.input}
            secureTextEntry={secure}
            onChangeText={(pass) => setPassword1(pass)}
            value={password1}
          />
          <IconButton
            icon={secure ? "eye" : "eye-off"}
            style={styles.eye}
            onPress={handleSecure}
          />
        </View>
        <View style={styles.header2}>
          <TextInput
            placeholder="Confirm Password"
            style={styles.input}
            secureTextEntry={secure}
            onChangeText={(pass) => setPassword2(pass)}
            value={password2}
          />
          <IconButton
            icon={secure ? "eye" : "eye-off"}
            style={styles.eye}
            onPress={handleSecure}
          />
        </View>
        <View style={styles.memberContainer}>
          <Text style={styles.member}>Already Member?</Text>
          <Pressable onPress={() => router.replace("components/Login")}>
            <Text style={styles.login}> Login</Text>
          </Pressable>
        </View>
        <Pressable style={styles.signUp} onPress={handlePress}>
          <Text style={styles.signUp_text}>Sign Up</Text>
        </Pressable>
      </ScrollView>
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ddd",
    justifyContent: "center",
    width: "100%",
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "95%",
    paddingLeft: "5%",
  },
  header: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
  },
  header2: {
    width: "100%",
    alignItems: "center",
    position: "relative",
  },
  input: {
    width: "100%",
    height: 50,
    marginTop: 20,
    padding: 10,
    borderWidth: 3,
    borderColor: "black",
    fontSize: 18,
    borderRadius: 15,
    backgroundColor: "#f9b344",
  },
  signUp: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9b344",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
    borderRadius: 15,
    width: "100%",
    borderWidth: 3,
    borderColor: "black",
  },
  signUp_text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  eye: {
    position: "absolute",
    top: "30%",
    right: 25,
  },
  memberContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  member: {
    fontSize: 18,
  },
  login: {
    color: "red",
    fontSize: 18,
  },
});

export default Register;
