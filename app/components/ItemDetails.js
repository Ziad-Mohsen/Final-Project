import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Alert,
  ScrollView,
  Dimensions,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { IconButton } from "react-native-paper";
import { db, auth } from "../../firebase/Config";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
const ItemDetails = () => {
  const { item } = useLocalSearchParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [info, setInfo] = useState("");
  const [url, setUrl] = useState("");
  const [isFav, setIsFav] = useState(true);
  const [id, setId] = useState("");
  const [orderId, setOrderId] = useState("");

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
          setOrderId(data.OrderId);
        } else {
          console.log("No data found for item:", item);
        }
      } catch (error) {
        console.error("Error fetching item details:", error);
      }
    });
    return () => unsubscribe();
  }, [item]);

  const handleFavoritePress = async () => {
    setIsFav(!isFav);
  };

  async function addToCart() {
    try {
      const cartRef = collection(db, `users/${auth.currentUser.uid}/cart`);
      const docRef = await addDoc(cartRef, {
        Name: name,
        Price: price,
        Info: info,
        Url: url,
        Id: id,
        newId: id,
        OrderId: orderId,
      });
      await updateDoc(docRef, { newId: docRef.id });
      Alert.alert("Success", "Item added to cart successfully!");
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: url }} style={styles.image} />
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.header}>{name}</Text>
            <Text style={styles.subHeader}>Book Overview</Text>
            <Text style={styles.description}>{info}</Text>
            <Text style={styles.price}>Price : {price}</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomButtonContainer}>
        <IconButton
          icon={isFav ? "cards-heart-outline" : "cards-heart"}
          size={Dimensions.get("window").width * 0.1}
          color="#f9b344"
          onPress={handleFavoritePress}
        />
        <Pressable style={styles.button} onPress={addToCart}>
          <Text style={styles.buttonText}>Add To Cart</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: 80,
  },
  imageContainer: {
    width: "100%",
    height: Dimensions.get("window").height * 0.5,
    backgroundColor: "#ddd",
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  detailsContainer: {
    width: "90%",
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#888",
  },
  description: {
    fontSize: 18,
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },

  bottomButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  button: {
    backgroundColor: "#f9b344",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginLeft: 10,
    width: "70%",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
});

export default ItemDetails;
