"use client";

import { FormEvent, useState } from "react";
import { auth, firestore } from "../../..";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { collection, doc, setDoc } from "firebase/firestore";
import Layout from "../../components/Layout";

export default function Login() {
  const [inputEmail, setEmail] = useState("");
  const [inputPass, setPass] = useState("");
  const [type, setType] = useState(-1);
  const [error, setError] = useState("");
  const router = useRouter();
  //Checks if the user is signed in.
  auth.onAuthStateChanged((user) => {
    if (user) {
      router.replace("/home", {scroll: false});
    }
  });
  async function checkUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const users = collection(firestore, "users");
    let id = "";
    await createUserWithEmailAndPassword(auth, inputEmail, inputPass)
      .then((userCredentials) => {
        id = userCredentials.user.uid;
      })
      .catch((e) => {
        console.error("Firebase error:", e.code, e.message);
        switch (e.code) {
          case "auth/email-already-in-use":
            setError("Email already in use!");
            break;
          case "auth/invalid-email":
            setError("Invalid email!");
            break;
        }
      });
    try{
      switch (type) {
        case 1:
          setDoc(doc(users, id), {
          type: "student",
          email: inputEmail,
          admin: false,
        });
        break;
        case 2:
          setDoc(doc(users, id), {
          type: "employer",
          email: inputEmail,
          admin: false,
        });
        break;
        case 3:
        setDoc(doc(users, id), {
          type: "advisor",
          email: inputEmail,
          admin: false,
        });
        break;
      default:
        setError("Select a user type!");
        return;
      }
    } catch{
      setError("Invalid email or password!")
    }
  }
  return (
    <>
      <Layout />
      <div className="relative flex flex-col min-h-3/4 sm:w-1/2 md:w-1/2 lg:w-2/5 xl:w-1/3 2xl:w-1/4 w-3/4 bg-white rounded-4xl transform-[translate(-50%,-50%)] top-1/2 left-1/2">
        <span className="text-black self-center text-4xl font-bold pt-32">
          Register
        </span>
        <span
          className={
            error
            ? "text-red-500 self-center text-lg p-5 font-bold"
            : "self-center text-lg p-5 invisible"
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
              value={inputEmail}
              onChange={(e) => setEmail(e.target.value)}
              id="username"
              placeholder="Email"
              onFocus={(_) => {
                setError("");
                setEmail("");
              }}
              className={`w-full border-b-2 mr-5 my-5 outline-0 ${
                !error
                  ? "border-b-gray-400 placeholder:text-gray-400 text-black"
                  : "border-b-red-500 placeholder:text-red-500 text-red-300"
              }`}
            />
            <input
              type="password"
              value={inputPass}
              onChange={(e) => setPass(e.target.value)}
              id="password"
              placeholder="Password"
              onFocus={(_) => {
                setError("");
                setPass("");
              }}
              className={`w-full border-b-2 mr-5 my-5 pt-5 outline-0 ${
                !error
                  ? "border-b-gray-400 placeholder:text-gray-400 text-black"
                  : "border-b-red-500 placeholder:text-red-500 text-red-300"
              }`}
            />
            <div id="type" className="pt-5 w-full" style={{ display: "flex" }}>
              <div className="flex-1 bg-gray-800 mr-1 py-8 text-center relative hover:bg-gray-700 focus-within:bg-gray-600">
                <input
                  type="radio"
                  name="type"
                  id=""
                  onChange={(_) => setType(1)}
                  className="absolute appearance-none transform-[translate(-50%,-50%)] top-1/2 left-1/2 w-full h-full"
                />
                Student
              </div>
              <div className="flex-1 bg-gray-800 mr-1 py-8 text-center relative hover:bg-gray-700 focus-within:bg-gray-600">
                <input
                  type="radio"
                  name="type"
                  id=""
                  onChange={(_) => setType(2)}
                  className="absolute appearance-none transform-[translate(-50%,-50%)] top-1/2 left-1/2 w-full h-full"
                  checked
                />
                Employer
              </div>
              <div className="flex-1 bg-gray-800 mr-1 py-8 text-center relative hover:bg-gray-700 focus-within:bg-gray-600">
                <input
                  type="radio"
                  name="type"
                  id=""
                  onChange={(_) => setType(3)}
                  className="absolute appearance-none transform-[translate(-50%,-50%)] top-1/2 left-1/2 w-full h-full"
                />
                Advisor
              </div>
            </div>
            <button type="submit" className="bg-gray-800 p-5 mt-10 w-full hover:bg-gray-700">
              Submit
            </button>
          </form>
        </div>
        <div className="p-10 self-center text-center">
          <span
            className="text-gray-500 cursor-default hover:underline"
            onClick={(_) => router.replace("/login")}
          >
            Already have an account? Click here!
          </span>
        </div>
      </div>
    </>
  );
}
