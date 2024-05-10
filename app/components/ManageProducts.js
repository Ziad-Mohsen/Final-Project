import {
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Alert,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { query, collection, orderBy, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { router, useFocusEffect } from "expo-router";
import { db } from "../../firebase/Config";
import Loading from "../components/Loading";
import { StatusBar } from "expo-status-bar";
import { IconButton } from "react-native-paper";
import { Delete } from "../../firebase/Products";
export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(1);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const productRef = collection(db, "products");
      const q = query(productRef, orderBy("OrderId", "desc"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const fetchedProducts = [];
        querySnapshot.forEach((doc) => {
          fetchedProducts.push({ id: doc.id, ...doc.data() });
        });
        setProducts(fetchedProducts);
        setIsLoading(false);
      });
      return unsubscribe;
    } catch (error) {
      setIsLoading(false);
      Alert.alert("Error", error.message);
    }
  };
  useEffect(() => {
    const unsubscribe = fetchData();
    return () => unsubscribe;
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );
  const handlePress = (item) => {
    router.push(`/components/UpdateProduct?item=${item.Id}`);
  };
  const deleteItem = async (item) => {
    try {
      await Delete(item.Id);
      setCount(count + 1);
    } catch (e) {
      console.log(e.code);
    }
  };
  return isLoading ? (
    <Loading />
  ) : (
    <View style={styles.container}>
      <TouchableOpacity style={styles.container}>
        <FlatList
          style={styles.list}
          data={products}
          renderItem={({ item }) => (
            <View style={styles.container2}>
              <Image source={{ uri: item.Url }} style={styles.image} />
              <Pressable style={styles.item} onPress={() => handlePress(item)}>
                <Text style={styles.itemText}>{item.Name}</Text>
              </Pressable>
              <IconButton
                icon="delete"
                style={styles.delete}
                iconColor="black"
                onPress={() => deleteItem(item)}
              />
            </View>
          )}
          keyExtractor={(item) => item.OrderId}
        />
        <StatusBar />
      </TouchableOpacity>
      <Pressable
        style={styles.addBtn}
        onPress={() => router.push("/components/NewProduct")}
      >
        <Text style={styles.addBtnText}>Add New Product</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  container2: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  container3: {
    flexDirection: "row",
    width: "100%",
    position: "relative",
  },
  list: {
    width: "100%",
  },
  image: {
    width: "15%",
    height: "100%",
  },
  item: {
    backgroundColor: "#f9b344",
    paddingVertical: 25,
    paddingHorizontal: 10,
    borderBottomWidth: 2,
    borderBottomColor: "black",
    width: "100%",
  },

  itemText: {
    fontSize: 18,
  },
  delete: {
    position: "absolute",
    top: "15%",
    right: "2%",
  },
  update: {
    position: "absolute",
    top: "15%",
    right: "13%",
  },
  addBtn: {
    margin: 5,
    marginBottom: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#f9b344",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  addBtnText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
