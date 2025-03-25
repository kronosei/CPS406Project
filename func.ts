import {
  deleteField,
  doc,
  FieldValue,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, firestore } from "./index";

//These functions can only be used in async functions!

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

export async function updateUser(
  uid: string,
  type: string,
  admin: boolean,
  accept: boolean | null = null
) {
  const docRef = doc(firestore, "users", uid);
  if (type != "student") {
    updateDoc(docRef, { type: type, admin: admin });
  } else
    updateDoc(docRef, {
      type: type,
      admin: admin,
      accept: accept == null ? deleteField() : accept,
    });
}
