import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
  ScrollView,
  Platform,
} from "react-native";
import { newProduct } from "../../firebase/Products";

export default function NewProduct() {
  const [name, setName] = useState("");
  const [info, setInfo] = useState("");
  const [price, setPrice] = useState("");
  const [url, setUrl] = useState("");

  const handlePress = async () => {
    try {
      if (
        name.trim() === "" ||
        info.trim() === "" ||
        price.trim() === "" ||
        url.trim() === ""
      ) {
        Alert.alert("Error", "Please fill all the fields");
        return;
      }
      if (!price.endsWith("$")) {
        Alert.alert("Error", "Please Enter a Valid Price ending with '$'");
        return;
      }

      await newProduct(name, info, url, price);
      Alert.alert("Success", "The product has been added successfully");
      setName("");
      setInfo("");
      setPrice("");
      setUrl("");
    } catch (error) {
      Alert.alert("Error", error.code);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.innerContainer2}>
        <Text style={styles.label}>Product Name:</Text>
        <TextInput
          placeholder="Name"
          style={styles.input}
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <Text style={styles.label}>Product Info:</Text>
        <TextInput
          placeholder="Info"
          style={[styles.input, styles.multilineInput]}
          onChangeText={(text) => setInfo(text)}
          value={info}
          multiline={true}
        />
        <Text style={styles.label}>Product Price:</Text>
        <TextInput
          placeholder="Price"
          style={styles.input}
          onChangeText={(text) => setPrice(text)}
          value={price}
        />
        <Text style={styles.label}>Product Photo Url:</Text>
        <TextInput
          placeholder="Url"
          style={[styles.input, styles.multilineInput]}
          onChangeText={(text) => setUrl(text)}
          value={url}
          multiline={true}
        />
      </View>
      <Pressable style={styles.addBtn} onPress={() => handlePress()}>
        <Text style={styles.addBtnText}>Add New Product</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#ddd",
  },
  innerContainer2: {
    width: "100%",
    borderRadius: 10,
    minHeight: 300,
    backgroundColor: "#f9b344",
    padding: 20,
  },
  label: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 10,
  },
  input: {
    backgroundColor: "#ddd",
    width: "100%",
    borderRadius: 10,
    fontSize: 16,
    padding: 10,
    marginTop: 7,
  },

  addBtn: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#f9b344",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  addBtnText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
