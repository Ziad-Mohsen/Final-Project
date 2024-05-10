import { doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { auth } from "./Config";
import { db } from "./Config";

async function NewUser(name, email, password) {
  await setDoc(doc(db, "users", auth.currentUser.uid), {
    Name: name,
    Email: email,
    Password: password,
    id: Date.now().toString(),
    userId: auth.currentUser.uid,
  });
}
async function updateUser(name, email, password) {
  await updateDoc(doc(db, "users", auth.currentUser.uid), {
    Name: name,
    Email: email,
    Password: password,
    id: Date.now().toString(),
    userId: auth.currentUser.uid,
  });
}
async function updateUserInLogin(email, password) {
  await updateDoc(doc(db, "users", auth.currentUser.uid), {
    Email: email,
    Password: password,
    id: Date.now().toString(),
  });
}
async function Delete(id) {
  await deleteDoc(doc(db, "users", id));
}

export { NewUser, updateUser, updateUserInLogin, Delete };
