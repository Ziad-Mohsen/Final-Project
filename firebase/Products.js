import {
  doc,
  deleteDoc,
  updateDoc,
  addDoc,
  collection,
} from "firebase/firestore";
import { db } from "./Config";
import { auth } from "./Config";
async function newProduct(name, info, url, price) {
  const docRef = await addDoc(collection(db, "products"), {
    Name: name,
    Info: info,
    Url: url,
    Price: price,
    OrderId: Date.now().toString(),
    Id: Date.now().toString(),
  });
  await updateDoc(docRef, { Id: docRef.id });
}
async function newProductWithoutDetails(data) {
  const docRef = await addDoc(collection(db, "products"), data);
  await updateDoc(docRef, { Id: docRef.id });
}
async function UpdateProdcutInDb(name, info, url, price, Id) {
  await updateDoc(doc(db, "products", Id), {
    Name: name,
    Info: info,
    Url: url,
    Price: price,
  });
}
async function Delete(id) {
  await deleteDoc(doc(db, `users/${auth.currentUser.uid}/cart`, id));
}

export { newProduct, newProductWithoutDetails, Delete, UpdateProdcutInDb };
