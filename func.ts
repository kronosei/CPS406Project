import {
  deleteField,
  doc,
  FieldValue,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, firestore } from "./index";

//These functions can only be used in async functions!

export async function getData(uid: string){
  //Untested
  const docRef = doc(firestore, "users", uid);
  const docSnap = await getDoc(docRef);
  console.log(docSnap.data())
  return docSnap.data()
}

export async function getType(uid: string) {
  const docRef = doc(firestore, "users", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data()?.type;
}

export async function isAdmin(uid: string) {
  const docRef = doc(firestore, "users", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data()?.admin;
}

export async function isAccepted(uid: string) {
  const docRef = doc(firestore, "users", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data()?.accept;
}

export async function applied(uid: string) {
  const docRef = doc(firestore, "users", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data()?.applied;
}

export async function updateUser(
  uid: string,
  type: string,
  admin: boolean,
  id: string | null = null, 
  applied: boolean | null = null,
  accepted: boolean | null = null
) {
  const docRef = doc(firestore, "users", uid);
  if (type != "student") {
    updateDoc(docRef, { type: type, admin: admin });
  } else
    updateDoc(docRef, {
      type: type,
      admin: admin,
      id: id == null ? deleteField : id,
      applied: applied == null ? deleteField() : applied,
      accepted: accepted == null ? deleteField() : accepted,
    });
}
