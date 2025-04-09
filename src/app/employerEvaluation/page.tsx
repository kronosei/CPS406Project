"use client";

import { FormEvent, useEffect, useState } from "react";
import { getStudentUID, updateUserEmployerEval } from "../../../func";
import Layout from "../../components/Layout";
import { doc, setDoc, getDocs, collection, query, where } from "firebase/firestore";
import {auth, firestore} from "../../../index";

export default function EmployerEvaluation() {
  const [inputEmployer, setEmployer] = useState("");
  const [inputStudentName, setStudentName] = useState("");
  const [inputStudentID, setStudentID] = useState("");
  const [inputGrade, setGrade] = useState("");
	const [inputBehaviour, setBehaviour] = useState("");
	const [inputSkills, setSkills] = useState("");
	const [inputKnowledge, setKnowledge] = useState("");
	const [inputAttitude, setAttitude] = useState("");
  const [sucess, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [userUID, setUID] = useState("");
  
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUID(user.uid);
        console.log("User UID: ", userUID);
            } else {
                console.log("Cannot get User UID!");
            }
        })
    }, []);

  async function uploadEmployerEvaluation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const studentUID = await getStudentUID(inputStudentID);
		if (studentUID=="") {
			setError(true);
		} else {
			const status = await updateUserEmployerEval(studentUID, userUID, inputEmployer, inputStudentName, inputStudentID, inputGrade, inputBehaviour, inputSkills, inputKnowledge, inputAttitude);
			if (status==true) {
				setSuccess(true);
			} else {
				setError(true);
			}
		}
  }

  return (
    <>
      <Layout />
      <div className="relative flex flex-col h-auto sm:w-2/5 md:w-2/5 lg:w-3/7 xl:w-2/5 2xl:w-2/6 w-3/4 bg-white rounded-4xl mx-auto top-30 mb-20 p-10">
        <span className="text-black self-center text-5xl font-bold text-center p-5">
          How to submit an emloyer evaluation
        </span>
        <span className="text-black text-2xl pt-10 pl-15 pr-15">
            To submit an employer evaluation, please input the following necessary information into the form below.
        </span>
        <span className="text-black text-2xl pl-15 pr-15">
            Items include:
        </span>
        <ul className="list-disc text-black text-2xl pl-22 pr-15">
            <li>Employer Name</li>
            <li>Student ID</li>
            <li>Grade</li>
        </ul>
      </div>
      <span 
        className={
            error
            ? "text-red-500 self-center text-lg p-10 font-bold"
            : "self-center text-lg p-10 invisible"
        }>
        Student ID is not valid
      </span>
      <div className="relative flex flex-col h-auto sm:w-2/5 md:w-2/5 lg:w-3/7 xl:w-2/5 2xl:w-2/6 w-3/4 bg-white rounded-4xl mx-auto top-25">
        <span className="text-black self-center text-5xl font-bold text-center pt-32">
          Submit an Employer Evaluation
        </span>

        <div className="flex flex-col">
          <form
            onSubmit={uploadEmployerEvaluation}
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
              value={inputStudentID}
              onChange={(e) => setStudentID(e.target.value)}
              id="studentID"
              placeholder="Student ID"
              onFocus={(_) => {
                setError(false);
                setStudentID("");
              }}
              className={`w-full border-b-2 mr-5 my-5 pt-5 outline-0 ${
                !error
                  ? "border-b-gray-400 placeholder:text-gray-400 text-black"
                  : "border-b-red-500 placeholder:text-red-500 text-red-300"
              }`}
            />

            <input
              type="text"
              value={inputStudentName}
              onChange={(e) => setStudentName(e.target.value)}
              id="studentName"
              placeholder="Student Name"
              onFocus={(_) => {
                setError(false);
                setStudentName("");
              }}
              className={`w-full border-b-2 mr-5 my-5 pt-5 outline-0 ${
                !error
                  ? "border-b-gray-400 placeholder:text-gray-400 text-black"
                  : "border-b-red-500 placeholder:text-red-500 text-red-300"
              }`}
            />

            <input
              type="text"
              value={inputGrade}
              onChange={(e) => setGrade(e.target.value)}
              id="grade"
              placeholder="Grade"
              onFocus={(_) => {
                setError(false);
                setGrade("");
              }}
              className={`w-full border-b-2 mr-5 my-5 pt-5 outline-0 ${
                !error
                  ? "border-b-gray-400 placeholder:text-gray-400 text-black"
                  : "border-b-red-500 placeholder:text-red-500 text-red-300"
              }`}
            />
						
            <input
              type="text"
              value={inputBehaviour}
              onChange={(e) => setBehaviour(e.target.value)}
              id="behaviour"
              placeholder="Behaviour"
              onFocus={(_) => {
                setError(false);
                setBehaviour("");
              }}
              className={`w-full border-b-2 mr-5 my-5 pt-5 outline-0 ${
                !error
                  ? "border-b-gray-400 placeholder:text-gray-400 text-black"
                  : "border-b-red-500 placeholder:text-red-500 text-red-300"
              }`}
            />
						
            <input
              type="text"
              value={inputSkills}
              onChange={(e) => setSkills(e.target.value)}
              id="skills"
              placeholder="Skills"
              onFocus={(_) => {
                setError(false);
                setSkills("");
              }}
              className={`w-full border-b-2 mr-5 my-5 pt-5 outline-0 ${
                !error
                  ? "border-b-gray-400 placeholder:text-gray-400 text-black"
                  : "border-b-red-500 placeholder:text-red-500 text-red-300"
              }`}
            />
						
            <input
              type="text"
              value={inputKnowledge}
              onChange={(e) => setKnowledge(e.target.value)}
              id="knowledge"
              placeholder="Knowledge"
              onFocus={(_) => {
                setError(false);
                setKnowledge("");
              }}
              className={`w-full border-b-2 mr-5 my-5 pt-5 outline-0 ${
                !error
                  ? "border-b-gray-400 placeholder:text-gray-400 text-black"
                  : "border-b-red-500 placeholder:text-red-500 text-red-300"
              }`}
            />
						
            <input
              type="text"
              value={inputAttitude}
              onChange={(e) => setAttitude(e.target.value)}
              id="attitude"
              placeholder="Attitude"
              onFocus={(_) => {
                setError(false);
                setAttitude("");
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
        Employer Evaluation Submitted Sucessfully
        </span>
      </div>
    </>
  );
}
