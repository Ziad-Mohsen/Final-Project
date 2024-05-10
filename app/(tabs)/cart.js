import {
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Alert,
  TouchableOpacity,
  View,
  Image,
  Pressable,
  Modal,
} from "react-native";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { db, auth } from "../../firebase/Config";
import Loading from "../components/Loading";
import { IconButton } from "react-native-paper";
import { Delete } from "../../firebase/Products";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const productRef = collection(db, `users/${auth.currentUser.uid}/cart`);
      const q = query(productRef, orderBy("OrderId", "desc"));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const fetchedProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
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

  const handlePress = (item) => {
    router.push(`/components/ItemDetails?item=${item.Id}`);
  };

  const deleteItem = async (itemId) => {
    try {
      await Delete(itemId);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.newId !== itemId)
      );
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };
  const checkOut = async () => {
    try {
      let total = 0;
      for (let i = 0; i < products.length; i++) {
        const price = parseFloat(products[i].Price.replace("$", ""));
        total += price;
      }
      for (let i = 0; i < products.length; i++)
        await deleteDoc(
          doc(db, `users/${auth.currentUser.uid}/cart`, products[i].newId)
        );
      setTotalPrice(`${total}$`);
      setProducts([]);
      setIsModalVisible(true);
    } catch (e) {
      Alert.alert("Error", e.code);
    }
  };
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.Url }} style={styles.image} />
      <TouchableOpacity
        style={styles.productDetails}
        onPress={() => handlePress(item)}
      >
        <Text style={styles.itemText}>{item.Name}</Text>
        <Text style={styles.itemText}>{item.Price}</Text>
      </TouchableOpacity>
      <IconButton
        icon="delete"
        iconColor="black"
        size={25}
        onPress={() => deleteItem(item.newId)}
        style={styles.deleteButton}
      />
    </View>
  );

  return isLoading ? (
    <Loading />
  ) : (
    <SafeAreaView style={styles.container}>
      {products.length === 0 ? (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatListContainer}
        />
      )}
      <Pressable style={styles.btn} onPress={() => checkOut()}>
        <Text style={styles.btnText}>CheckOut</Text>
      </Pressable>
      {isModalVisible ? (
        <Modal style={styles.modal} animationType="slide">
          <View style={styles.modalContent}>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <Text style={styles.total}>Total Price: </Text>
              <Text style={styles.total}>{totalPrice}</Text>
            </View>
            <Text style={styles.total}>
              The Number Of The Order Is : {Date.now().toString().substring(8)}
            </Text>
            <Pressable
              style={styles.close}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.closeText}>close</Text>
            </Pressable>
          </View>
        </Modal>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ddd",
    alignItems: "center",
  },
  flatListContainer: {
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 15,
    // width: "100%",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#f9b344",
  },
  image: {
    width: 80,
    height: 120,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
  },
  itemText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modal: {
    height: "50%",
    width: "90%",
  },
  modalContent: {
    flex: 1,
    width: "100%",
    height: "20%",
    backgroundColor: "#f9b344",
    justifyContent: "center",
    alignItems: "center",
  },
  total: {
    fontSize: 22,
    fontWeight: "bold",
  },
  deleteButton: {
    marginLeft: "auto",
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyCartText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  close: {
    backgroundColor: "red",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  closeText: {
    fontWeight: "bold",
    fontSize: 17,
    color: "white",
  },
  btn: {
    backgroundColor: "#f9b344",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 13,
  },
  btnText: {
    fontSize: 17,
    fontWeight: "bold",
  },
});
