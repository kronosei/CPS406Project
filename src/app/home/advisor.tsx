"use client";

import { FormEvent, useEffect, useState } from "react";
import { auth, firestore } from "../../../index";
import { useRouter } from "next/navigation";
import Layout from "../../components/Layout";
import { applied, getCollection, getType, isAccepted, isAdmin, updateUser, getReportCollection } from "../../../func";
import { collection, doc, getDocs } from "firebase/firestore";
import Modal from "./modal";

interface User {
  uid: string,
  accepted: boolean | null;
  admin: boolean | null;
  applied: boolean | null;
  id: string | null;
  name: string | null;
  email: string | null;
  type: string | null;
}

interface Report {
  EmployerUID: string | null;
  Employer: string | null;
  Student: string | null;
  Report: string;
}

export default function Advisor() {
  const [userInfo, setUserInfo] = useState<User[]>([])
  
  const [reportInfo, setReportInfo] = useState<Report[]>([])
  const [modal, setModal] = useState(false)
  const [dataIndex, setDataIndex] = useState(-1)

  const router = useRouter()
  async function collect(){
    const data = await getCollection()
    setUserInfo(data)
    console.log(data)
  }

  async function collect2(){
    const data = await getReportCollection()
    setReportInfo(data)
    console.log(data)
  }

  return (
    <>
    {modal ? 
    <Modal uid={userInfo[dataIndex].uid} id={userInfo[dataIndex].id!!} type={userInfo[dataIndex].type!!} email={userInfo[dataIndex].email!!} name={userInfo[dataIndex].name!!} accepted={userInfo[dataIndex].accepted!!} admin={userInfo[dataIndex].admin!!} toggle={setModal}/>
    : null}
      <Layout />
      <div className="relative flex flex-col min-h-3/4 w-3/4  bg-white rounded-4xl transform-[translate(-50%,-50%)] top-1/2 left-1/2 row-span-2 overflow-hidden">
        <button className="bg-red-500" onClick={(_) => collect()}>Refresh</button>
        <table>
          <thead className="[&>*]:bg-black">
          <tr className="[&>*]:border-2 [&>*]:border-gray-800 [&>*]:p-2 [&>*]:text-left">
            <th>Email</th>
            <th>Admin</th>
            <th>Type</th>
          </tr>
          </thead>
          <tbody className="[&>*]:bg-black">
            {userInfo.map((user, i) => 
            <tr key={i} className="[&>*]:border-2 [&>*]:border-gray-800 [&>*]:p-2 [&>*]:text-left" onClick={() => {
              setDataIndex(i)
              setModal(true)
            }}>
              <td>{user.email}</td>
              <td>{user.admin?.toString()}</td>
              <td>{user.type}</td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
      <br></br>
      <div className="relative flex flex-col min-h-3/4 w-3/4  bg-white rounded-4xl transform-[translate(-50%,-50%)] top-1/2 left-1/2 row-span-2 overflow-hidden">
        <button className="bg-red-500" onClick={(_) => collect2()}>Refresh</button>
        <table>
          <thead className="[&>*]:bg-black">
          <tr className="[&>*]:border-2 [&>*]:border-gray-800 [&>*]:p-2 [&>*]:text-left">
            <th>Employer Name</th>
            <th>Student Name</th>
            <th>Work Report Link</th>
          </tr>
          </thead>
          <tbody className="[&>*]:bg-black">
            {reportInfo.map((report, i) => 
            <tr key={i} className="[&>*]:border-2 [&>*]:border-gray-800 [&>*]:p-2 [&>*]:text-left">
              <td>{report.Employer}</td>
              <td>{report.Student}</td>
              <td><a key={i} href={report.Report} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{report.Report}</a></td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}
