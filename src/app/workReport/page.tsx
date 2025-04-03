"use client";

import { FormEvent, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { doc, setDoc } from "firebase/firestore";
import {auth, firestore} from "../../../index";

export default function WorkReport() {
  const [inputEmployer, setEmployer] = useState("");
  const [inputStudent, setStudent] = useState("");
  const [inputReport, setReport] = useState("");
  const [sucess, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  //const router = useRouter();

  function uploadReport(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setDoc(doc(firestore, "Reports", "Report numberplaceholder"), {
        Employer: inputEmployer,
        Student: inputStudent,
        Report: inputReport,
    });
    setSuccess(true);
  }
  return (
    <>
      <Layout />
      <div className="relative flex flex-col h-1/2 sm:w-2/5 md:w-2/5 lg:w-3/7 xl:w-2/5 2xl:w-2/6 w-3/4 bg-white rounded-4xl transform-[translate(-50%,-75%)] top-1/2 left-1/2 mb-20">
        <span className="text-black self-center text-5xl font-bold pt-20">
          How to submit a report
        </span>
        <span className="text-black text-2xl pt-10 pl-15 pr-15">
            To submit a report, please input the following necessary information into the form below.
        </span>
        <span className="text-black text-2xl pl-15 pr-15">
            List Items include:
        </span>
        <ul className="list-disc text-black text-2xl pl-22 pr-15">
            <li>Employer Name</li>
            <li>Student Name</li>
            <li>Link to a google drive containing the report</li>
        </ul>
      </div>
      
      <div className="relative flex flex-col h-3/4 sm:w-2/5 md:w-2/5 lg:w-3/7 xl:w-2/5 2xl:w-2/6 w-3/4 bg-white rounded-4xl transform-[translate(-50%,-50%)] top-1/2 left-1/2">
        <span className="text-black self-center text-5xl font-bold pt-32">
          Submit a report
        </span>

        <div className="flex flex-col">
          <form
            onSubmit={uploadReport}
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
            <input
              type="text"
              value={inputReport}
              onChange={(e) => setReport(e.target.value)}
              id="report"
              placeholder="Report Link"
              onFocus={(_) => {
                setError(false);
                setReport("");
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
        <span 
        className={
            sucess
            ? "text-green-500 self-center text-lg p-10 font-bold"
            : "self-center text-lg p-10 invisible"
        }>
        Report Submitted Sucessfully
        </span>
      </div>
    </>
  );
}
