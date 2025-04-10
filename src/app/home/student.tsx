"use client";

import { FormEvent, useEffect, useState } from "react";
import { auth, firestore } from "../../../index";
import { updateProfile, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import Layout from "../../components/Layout";
import { applied, getData, isAccepted, updateUser } from "../../../func";
import { arrayUnion, collection, doc, updateDoc } from "firebase/firestore";

export default function Student() {
  const [inputID, setID] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  let acc: User | null = null;
  const [appStatus, setAppStatus] = useState(false);
  const [submittedForm, setSubmittedForm] = useState("")
  const [formData, setFormData] = useState({
    workTerm: "",
    description: "",
  });
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      acc = user;
      if (await isAccepted(acc.uid)) {
        router.replace("/submit");
      }
      if (await applied(acc.uid)) {
        setAppStatus(true);
      }
    } else {
      router.replace("/");
    }
  });

  function checkUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (acc) {
      if (inputID) {
        updateUser(acc.uid, "student", false, inputID, null, null, null, true, false);
        router.refresh();
      } else {
        setError("You must include both your name and student ID!");
      }
    }
  }

  async function submitWorkReport(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if(formData.workTerm && formData.description){
      const docRef = doc(firestore, "users", acc!.uid);
      updateDoc(docRef, { report: arrayUnion(formData) });
      const data = await getData(acc!!.uid);
      setSubmittedForm("Submitted Form!")
      console.log(submittedForm)
    } else{
      setError("Fill In All Fields!")
    }
  }
  return (
    <>
      <Layout />
      {!appStatus && (
        <div className="relative flex flex-col min-h-3/4 sm:w-1/2 md:w-1/2 lg:w-2/5 xl:w-1/3 2xl:w-1/4 w-3/4 bg-white rounded-4xl transform-[translate(-50%,-50%)] top-1/2 left-1/2">
          <span className="text-black self-center text-3xl md:text-2xl font-bold pt-32 text-center">
            Apply to join the co-op program
          </span>
          <span
            className={
              error
                ? "text-red-500 self-center text-lg text-center p-10 font-bold"
                : "self-center text-lg p-10 invisible"
            }
          >
            {error}
          </span>
          <div className="flex flex-col">
            <form
              onSubmit={checkUser}
              className="[&>*]:block rounded-sm h-1/4 w-3/4 justify-center self-center content-center"
            >
              <input
                type="text"
                value={inputID}
                onChange={(e) => setID(e.target.value)}
                id="text"
                placeholder="Student ID"
                onFocus={(_) => {
                  setError("");
                  setID("");
                }}
                className={`w-full border-b-2 mr-5 my-5 pt-5 outline-0 ${
                  !error
                    ? "border-b-gray-400 placeholder:text-gray-400 text-black"
                    : "border-b-red-500 placeholder:text-red-500 text-red-300"
                }`}
              />
              <button type="submit" className="bg-gray-800 p-5 mt-16 w-full hover:bg-gray-700">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {appStatus && (
        <div className="relative flex flex-col min-h-3/4 sm:w-1/2 md:w-1/2 lg:w-2/5 xl:w-1/3 2xl:w-1/4 w-3/4 bg-white rounded-4xl transform-[translate(-50%,-50%)] top-1/2 left-1/2">
          <span className="text-black self-center text-3xl md:text-2xl font-bold pt-32 text-center">
            Submit A Work Term Report
          </span>
          <span
            className={
              error
                ? "text-red-500 self-center text-lg text-center p-10 font-bold"
                : submittedForm ? "text-green-500 self-center text-lg text-center p-10 font-bold" : "self-center text-lg p-10 invisible"
            }
          >
            {error ? error : submittedForm ? submittedForm : null}
          </span>
          <div className="flex flex-col">
            <form
              onSubmit={submitWorkReport}
              className="[&>*]:block rounded-sm h-1/4 w-3/4 justify-center self-center content-center"
            >
              <input
                type="text"
                value={formData.workTerm}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, workTerm: e.target.value }))
                }
                id="text"
                placeholder="Work Term"
                onFocus={(_) => {
                  setError("");
                  setSubmittedForm("")
                }}
                className="w-full border-b-2 mr-5 my-5 pt-5 outline-0 border-b-gray-400 placeholder:text-gray-400 text-black"
              />
              <input
                type="text"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                id="text"
                placeholder="Description"
                onFocus={(_) => {
                  setError("");
                  setSubmittedForm("")
                }}
                className="w-full border-b-2 mr-5 my-5 pt-5 outline-0 border-b-gray-400 placeholder:text-gray-400 text-black"
              />
              <button type="submit" className="bg-gray-800 p-5 mt-16 w-full hover:bg-gray-700">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
