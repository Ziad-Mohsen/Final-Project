import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { TextInput } from "react-native-paper";
import { db } from "../../firebase/Config";
import { UpdateProdcutInDb } from "../../firebase/Products";
import { useLocalSearchParams } from "expo-router";
import { doc, onSnapshot } from "firebase/firestore";

export default function UpdateProdcut() {
  const { item } = useLocalSearchParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [info, setInfo] = useState("");
  const [url, setUrl] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "products", item), (docSnap) => {
      try {
        const data = docSnap.data();
        if (data) {
          setName(data.Name);
          setPrice(data.Price);
          setInfo(data.Info);
          setUrl(data.Url);
          setId(data.Id);
        } else {
          console.log("No data found for item:", item);
        }
      } catch (error) {
        console.error("Error fetching item details:", error);
      }
    });
    return () => unsubscribe();
  }, [item]);

  const save = async () => {
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
        Alert.alert("Error", "Please Enter a Valid Price format");
        return;
      }

      await UpdateProdcutInDb(name, info, url, price, id);
      Alert.alert("Success", "Product information updated successfully");
    } catch (error) {
      Alert.alert("Error", error.code);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.text}>Name:</Text>
        <TextInput
          style={styles.textInput}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Text style={styles.text}>Info:</Text>
        <TextInput
          style={styles.textInput}
          value={info}
          multiline={true}
          onChangeText={(text) => setInfo(text)}
        />
        <Text style={styles.text}>Price:</Text>
        <TextInput
          style={styles.textInput}
          value={price}
          onChangeText={(text) => setPrice(text)}
        />
        <Text style={styles.text}>ImageUrl:</Text>
        <TextInput
          style={styles.textInput}
          value={url}
          multiline={true}
          onChangeText={(text) => setUrl(text)}
        />
      </View>
      <Pressable style={styles.button} onPress={() => save()}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </Pressable>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    width: "100%",
  },
  innerContainer: {
    width: "95%",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  textInput: {
    width: "100%",
    fontSize: 18,
    backgroundColor: "#f9b344",
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  button: {
    backgroundColor: "#f9b344",
    marginTop: 15,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: "80%",
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "bold",
  },
});
