"use client";

import { FormEvent, useEffect, useState } from "react";
import { auth, firestore } from "../../../index";
import { useRouter } from "next/navigation";
import Layout from "../../components/Layout";
import {getFilteredReportCollection} from "../../../func";
import { collection, doc, getDocs } from "firebase/firestore";
import Modal from "./modal";

interface Report {
    studentName: string;
    grade: string;
    behaviour: string;
    skills: string;
    knowledge: string;
    attitude: string;
}

export default function Employer() {
  const [reportInfo, setReportInfo] = useState<Report[]>([])
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

  const router = useRouter()
  async function collect(){
    const data = await getFilteredReportCollection(userUID)
    setReportInfo(data)
    console.log(data)
  }

  return (
    <>
      <Layout />
      <div className="relative flex flex-col min-h-3/4 w-3/4  bg-white rounded-4xl transform-[translate(-50%,-50%)] top-1/2 left-1/2 row-span-2 overflow-hidden">
        <button className="bg-red-500" onClick={(_) => collect()}>Refresh</button>
        <table>
          <thead className="[&>*]:bg-black">
          <tr className="[&>*]:border-2 [&>*]:border-gray-800 [&>*]:p-2 [&>*]:text-left">
            <th>Student Name</th>
            <th>Grade</th>
            <th>Behaviour</th>
            <th>Skills</th>
            <th>Knowledge</th>
            <th>Attitude</th>
          </tr>
          </thead>
          <tbody className="[&>*]:bg-black">
            {reportInfo.map((report, i) => 
            <tr key={i} className="[&>*]:border-2 [&>*]:border-gray-800 [&>*]:p-2 [&>*]:text-left">
              <td>{report.studentName}</td>
              <td>{report.grade}</td>
              <td>{report.behaviour}</td>
              <td>{report.skills}</td>
              <td>{report.knowledge}</td>
              <td>{report.attitude}</td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}
