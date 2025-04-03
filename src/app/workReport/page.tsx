"use client";

import { FormEvent, useEffect, useState } from "react";
import { auth } from "../../../index";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import Layout from "../../components/Layout";

export default function WorkReport() {
  const [inputEmployer, setEmployer] = useState("");
  const [inputStudent, setStudent] = useState("");
  const [inputReport, setReport] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();
  //Checks if the user is signed in.
    auth.onAuthStateChanged((user) => {
      if (user) {
        router.replace("/home", {scroll: false});
      } else {
        console.log("not signed in");
      }
    });
  function submitReport(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }
  return (
    <>
      <Layout />
      <div className="relative flex flex-col h-3/4 sm:w-1/2 md:w-1/2 lg:w-2/5 xl:w-1/3 2xl:w-1/4 w-3/4 bg-white rounded-4xl transform-[translate(-50%,-50%)] top-1/2 left-1/2">
        <span className="text-black self-center text-4xl font-bold pt-32">
          Submit a report
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
            onSubmit={submitReport}
            className="[&>*]:block rounded-sm h-1/4 w-3/4 justify-center self-center content-center"
          >
            <input
              type="text"
              value={inputEmployer}
              onChange={(e) => setEmployer(e.target.value)}
              id="employer"
              placeholder="Employer Name"
              onFocus={(_) => {
                setError(false);
                setEmployer("");
              }}
              className={`w-full border-b-2 mr-5 my-5 outline-0 ${
                !error
                  ? "border-b-gray-400 placeholder:text-gray-400 text-black"
                  : "border-b-red-500 placeholder:text-red-500 text-red-300"
              }`}
            />
            <input
              type="text"
              value={inputStudent}
              onChange={(e) => setStudent(e.target.value)}
              id="student"
              placeholder="Student Name"
              onFocus={(_) => {
                setError(false);
                setStudent("");
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
      </div>
    </>
  );
}
