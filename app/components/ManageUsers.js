import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  Pressable,
} from "react-native";
import { query, collection, getDocs, limit, orderBy } from "firebase/firestore";
import { db } from "../../firebase/Config";
import Loading from "../components/Loading";
import { StatusBar } from "expo-status-bar";
import UserDetails from "./UserDetails";
import { IconButton } from "react-native-paper";
import { Delete } from "../../firebase/users";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [count, setCount] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(false);
      const usersRef = collection(db, "users");
      const q = query(usersRef, orderBy("id", "desc"), limit());
      const querySnapshot = await getDocs(q);
      let fetchedUsers = [];
      querySnapshot.forEach((doc) => {
        const UserData = doc.data();
        fetchedUsers.push(UserData);
      });
      setUsers(fetchedUsers);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Alert.alert("Error", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [count]);

  const handlePress = (user) => {
    try {
      setSelectedUser(user);
      setModalVisible(true);
    } catch (e) {
      Alert.alert("Error", e.code);
    }
  };

  const deleteItem = async (item) => {
    try {
      await Delete(item.userId);
      setCount(count + 1);
    } catch (e) {
      console.log(e.code);
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={users}
        renderItem={({ item }) => (
          <View style={styles.innerContainer}>
            <Pressable style={styles.item} onPress={() => handlePress(item)}>
              <Text style={styles.itemText}>{item.Name}</Text>
            </Pressable>
            <IconButton
              icon="delete"
              style={styles.delete}
              onPress={() => deleteItem(item)}
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <StatusBar />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
            <UserDetails
              name={selectedUser?.Name}
              email={selectedUser?.Email}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    position: "relative",
  },
  innerContainer: {
    position: "relative",
  },
  list: {
    width: "100%",
  },
  item: {
    backgroundColor: "#f9b344",
    paddingVertical: 25,
    paddingHorizontal: 10,
    borderBottomWidth: 2,
    borderBottomColor: "black",
  },
  itemText: {
    fontSize: 18,
  },
  delete: {
    position: "absolute",
    top: "15%",
    right: "2%",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "95%",
    alignItems: "center",
    height: "40%",
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "blue",
  },
});
