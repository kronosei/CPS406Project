"use client";

import { FormEvent, useEffect, useState } from "react";
import { auth, firestore } from "../../../index";
import { useRouter } from "next/navigation";
import Layout from "../../components/Layout";
import {
  applied,
  getCollection,
  getType,
  isAccepted,
  isAdmin,
  updateUser,
} from "../../../func";
import { collection, query, where } from "firebase/firestore";
import Modal from "./modal";

interface User {
  uid: string;
  accepted: boolean | null;
  admin: boolean | null;
  applied: boolean | null;
  id: string | null;
  name: string | null;
  email: string | null;
  type: string | null;
  employer: string | null;
  evaluation: string | null;
  report: string | null;
}

interface Report {
  EmployerUID: string | null;
  Employer: string | null;
  Student: string | null;
  Report: string;
}

export default function Advisor() {
  useEffect(() => {
    collect();
  }, []);

  const [userInfo, setUserInfo] = useState<User[]>([]);
  const [reportInfo, setReportInfo] = useState<Report[]>([]);
  const [modal, setModal] = useState(false);
  const [dataIndex, setDataIndex] = useState(-1);

  const router = useRouter();
  async function collect() {
    const data = await getCollection();
    setUserInfo(data);
    console.log(data);
  }
  
  return (
    <>
      {modal ? (
        <Modal
          uid={userInfo[dataIndex].uid}
          id={userInfo[dataIndex].id!!}
          type={userInfo[dataIndex].type!!}
          email={userInfo[dataIndex].email!!}
          name={userInfo[dataIndex].name!!}
          accepted={userInfo[dataIndex].accepted!!}
          admin={userInfo[dataIndex].admin!!}
          toggle={setModal}
        />
      ) : null}
      <Layout />
      <div
        className="relative flex flex-col h-3/4 w-3/4  bg-white rounded-4xl transform-[translate(-50%,-50%)] top-1/2 left-1/2 row-span-2 overflow-y-auto no-scrollbar"
        style={{ scrollbarWidth: "none" }}
      >
        <button className="bg-red-500" onClick={(_) => collect()}>
          Refresh
        </button>
        <table>
          <thead className="[&>*]:bg-black">
            <tr className="[&>*]:border-2 [&>*]:border-gray-800 [&>*]:p-2 [&>*]:text-left">
              <th>Name</th>
              <th>Email</th>
              <th>Student ID</th>
              <th>Employer</th>
              <th>Evaluation</th>
              <th>Report</th>
            </tr>
          </thead>
          <tbody className="[&>*]:bg-black">
            {userInfo.map((user, i) => (
              <tr
                key={i}
                className="[&>*]:border-2 [&>*]:border-gray-800 [&>*]:p-2 [&>*]:text-left"
                onClick={() => {
                  setDataIndex(i);
                  setModal(true);
                }}
              >
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.id}</td>
                <td>{user.employer}</td>
                <td>{user.evaluation}</td>
                <td>{user.report}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
