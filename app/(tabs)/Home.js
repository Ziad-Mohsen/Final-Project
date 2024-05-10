import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import { db } from "../../firebase/Config";
import Loading from "../components/Loading";
import { limit, orderBy } from "firebase/firestore";
import { getDocs, query, collection } from "firebase/firestore";
import { IconButton } from "react-native-paper";
import { router } from "expo-router";
export default function TabOneScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const handlePress = (item) => {
    router.push(`/components/ItemDetails?item=${item.Id}`);
  };
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const productRef = collection(db, "products");
      const q = query(productRef, orderBy("OrderId", "desc"), limit());
      const querySnapshot = await getDocs(q);
      let fetchedProducts = [];
      querySnapshot.forEach((doc) => {
        const ProductData = doc.data();
        fetchedProducts.push(ProductData);
      });
      setProducts(fetchedProducts);
      setFilteredProducts(fetchedProducts);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Alert.alert("Error", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const searchUsers = (keyword) => {
    const lowercasedKeyword = keyword.toLowerCase();
    const results = products.filter((product) =>
      product.Name.toLowerCase().includes(lowercasedKeyword)
    );
    setFilteredProducts(results);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.style0}>
          <View style={styles.style1}>
            <Text style={styles.headText2}>White Whale BookStore</Text>
          </View>
          <View style={styles.searchSection}>
            <View style={styles.searchPallet}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search a Product"
                onChangeText={(text) => searchUsers(text)}
              />
            </View>
          </View>
        </View>
        <Text style={styles.headText}>Most Rented</Text>

        <ScrollView contentContainerStyle={styles.listContainer}>
          <TouchableOpacity>
            {isLoading ? (
              <Loading />
            ) : (
              filteredProducts.map((product, index) => (
                <TouchableOpacity
                  key={product.Id}
                  style={[styles.itemContainer]}
                  onPress={() => handlePress(product)}
                >
                  <Image
                    source={{ uri: product.Url }}
                    style={styles.userImage}
                  />
                  <View style={styles.itemInfo}>
                    <View>
                      <Text style={styles.item}>{product.Name}</Text>
                      <Text style={styles.item}>{product.Price} </Text>
                    </View>
                    <IconButton
                      icon="chevron-right"
                      size={30}
                      onPress={() => window.alert("Ok")}
                    />
                  </View>
                </TouchableOpacity>
              ))
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ddd",
  },
  listContainer: {
    padding: 10,
  },
  itemContainer: {
    flex: 1,
    backgroundColor: "#f9b344",
    borderRadius: 10,

    marginVertical: 8,
  },
  headText: {
    fontSize: 20,
    fontWeight: "bold",
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  headText2: {
    fontSize: 28,
    fontWeight: "bold",
  },
  itemInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  item: {
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  style0: {
    backgroundColor: "#f9b344",
    paddingHorizontal: 20,
    borderBottomLeftRadius: 100,
    borderBottomEndRadius: 100,
    padding: 40,
    alignItems: "center",
    width: "100%",
  },
  style1: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  style2: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
  },
  userImage: {
    height: 100,
    borderRadius: 10,
    marginBottom: 8,
  },
  magnifyingIconStyle: {
    width: 24,
    height: 24,
    marginRight: -10,
  },
  menu: {
    width: 24,
    height: 24,
    padding: 5,
    marginHorizontal: 5,
    paddingStart: 10,
  },
  searchSection: {
    marginTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    width: "100%",
    justifyContent: "center",
  },
  searchPallet: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    borderRadius: 8,
    width: "100%",
    height: 40,
    backgroundColor: "white",
  },
});
