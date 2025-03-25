"use client";

import { FormEvent, useState } from "react";
import { auth } from "../../../index";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import Layout from "../../components/Layout";

export default function Login() {
  const [inputEmail, setEmail] = useState("");
  const [inputPass, setPass] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();
  //Checks if the user is signed in.
  auth.onAuthStateChanged((user) => {
    if (user) {
      router.push("/");
    } else {
      console.log("not signed in");
    }
  });
  function checkUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    signInWithEmailAndPassword(auth, inputEmail, inputPass)
      .then(() => {
        router.push("/");
      })
      .catch((e) => {
        setError(true);
      });
  }
  return (
    <>
      <Layout />
      <div className="relative flex flex-col h-3/4 sm:w-1/2 md:w-1/2 lg:w-2/5 xl:w-1/3 2xl:w-1/4 w-3/4 bg-white rounded-4xl transform-[translate(-50%,-50%)] top-1/2 left-1/2">
        <span className="text-black self-center text-4xl font-bold pt-32">
          Login
        </span>
        <span
          className={
            error
              ? "text-red-500 self-center text-lg p-10 font-bold"
              : "self-center text-lg p-10 invisible"
          }
        >
          Invalid username or password
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
                setError(false);
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
                setError(false);
                setPass("");
              }}
              className={`w-full border-b-2 mr-5 my-5 pt-5 outline-0 ${
                !error
                  ? "border-b-gray-400 placeholder:text-gray-400 text-black"
                  : "border-b-red-500 placeholder:text-red-500 text-red-300"
              }`}
            />
            <button type="submit" className="bg-gray-800 p-5 mt-16 w-full">
              Submit
            </button>
          </form>
        </div>
        <div className="p-10 self-center">
          <span
            className="text-gray-400"
            onClick={(_) => router.push("/register")}
          >
            Need an account? Click here!
          </span>
        </div>
      </div>
    </>
  );
}
