import {
  collection,
  deleteField,
  doc,
  DocumentData,
  FieldValue,
  getDoc,
  getDocs,
  QueryDocumentSnapshot,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { auth, firestore } from "./index";
import User from "./src/app/home/advisor";

export async function getData(uid: string) {
  const docRef = doc(firestore, "users", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

export async function getCollection() {
  const q = query(collection(firestore, "users"), where("type", "!=", ""));
  const querySnapshot = await getDocs(q);

  const result = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      uid: doc.id,
      accepted: data.accepted,
      admin: data.admin,
      applied: data.applied,
      id: data.id,
      name: data.name,
      email: data.email,
      type: data.type,
      employer: data.employer,
      evaluation: data.evaluation,
      report: data.report,
    };
  });

  return result;
}

export async function getFilteredReportCollection(uid: string) {
  const reportCollection = collection(firestore, "reports");
  const filteredCollection = query(
    reportCollection,
    where("EmployerUID", "==", uid)
  );

  const result = (await getDocs(filteredCollection)).docs.map((doc) => {
    const data = doc.data();
    const info = {
      EmployerUID: data.EmployerUID,
      Employer: data.Employer,
      Student: data.Student,
      Report: data.Report,
    };
    return info;
  });
  return result;
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

export async function getStudentUID(studentID: string) {
  const users = collection(firestore, "users");
  const filteredCollection = query(
    users,
    where("id", "==", studentID)
  );

  let returnDocID = "";
  try {
    const querySnapshot = await getDocs(filteredCollection);
    if (!querySnapshot.empty) {
      const studentDoc = querySnapshot.docs[0];
      returnDocID = studentDoc.id;
    } else {
      console.log("No matching Documents");
    }
  } catch(error) {
    console.log("Error in finding a document");
    returnDocID = "";
  }
  return returnDocID;
}

export async function updateUserEmployerEval(studentUID: string, inputEmployer: string, inputStudentName: string, inputStudentID: string, inputGrade: string, inputBehaviour: string, inputSkills: string, inputKnowledge: string, inputAttitude: string) {
  const docRef = doc(firestore, "users", studentUID);

  try {
    await updateDoc(docRef, {
      employer: inputEmployer,
      employerEval: {
        studentName: inputStudentName,
        studentID: inputStudentID,
        grade: inputGrade,
        behaviour: inputBehaviour,
        skills: inputSkills,
        knowledge: inputKnowledge,
        attitude: inputAttitude,
      },
    });
    console.log("Document Uploaded Successfully");
    return true;
  } catch(error) {
    console.log("Error in updating document: ", error);
    return false;
  }

}

export async function updateUser(
  uid: string,
  type: string,
  admin: boolean,
  id: string | null,
  employer: string | null = null,
  evaluation: string | null = null,
  grade: string | null = null,
  applied: boolean | null = null,
  accepted: boolean | null = null
) {
  const docRef = doc(firestore, "users", uid);
  if (type != "student") {
    updateDoc(docRef, { type: type, admin: admin });
  } else {
    const data: [string, any][] = [];
    data.push(["type", type]);
    data.push(["admin", admin]);
    if (id != null) data.push(["id", id]);
    if (applied != null) data.push(["applied", applied]);
    if (accepted != null) data.push(["accepted", accepted]);
    updateDoc(docRef, Object.fromEntries(data));
  }
}
