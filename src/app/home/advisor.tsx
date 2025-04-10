"use client";

import { FormEvent, useEffect, useState } from "react";
import { auth, firestore } from "../../../index";
import { useRouter } from "next/navigation";
import Layout from "../../components/Layout";
import { getFilterCollection } from "../../../func";
import { collection, query, where } from "firebase/firestore";
import Modal from "./modal";

interface report {
  workTerm: string;
  description: string;
}

interface evaluation {
  studentName: string;
  grade: string;
  behaviour: string;
  skills: string;
  knowledge: string;
  attitude: string;
}

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
  evaluation: evaluation | null;
  report: report[] | [];
}

export default function Advisor() {
  const [filtering, setFiltering] = useState(0);
  const [searchID, setSearchID] = useState("");
  useEffect(() => {
    searchAndFilter();
  }, []);

  const [userInfo, setUserInfo] = useState<User[]>([]);
  const [modal, setModal] = useState(false);
  const [dataIndex, setDataIndex] = useState(-1);

  const router = useRouter();
  async function searchAndFilter() {
    const data = await getFilterCollection(filtering, searchID);
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
        className="relative flex flex-col h-3/4 w-3/4  bg-black transform-[translate(-50%,-50%)] top-1/2 left-1/2 row-span-2 overflow-auto no-scrollbar"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="w-full my-5">
          <div className="flex items-center rounded-xl overflow-hidden shadow-sm bg-white border border-gray-300">
            <input
              id="searchInput"
              type="text"
              placeholder="Search by Student ID..."
              className="flex-grow px-4 py-2 text-gray-700 focus:outline-none"
              value={searchID || ""}
              onChange={(e) => setSearchID(e.target.value)}
            />
            <select
              id="filterSelect"
              className="h-12 px-3 bg-white border border-gray-300 shadow-sm text-gray-700 cursor-pointer"
              value={
                filtering === 0
                  ? ""
                  : filtering === 1
                  ? "submitted"
                  : "not_submitted"
              }
              onChange={(e) => {
                const value = e.target.value;
                if (value === "submitted") {
                  setFiltering(1);
                } else if (value === "not_submitted") {
                  setFiltering(-1);
                } else {
                  setFiltering(0);
                }
              }}
            >
              <option className="cursor-pointer" value="">All</option>
              <option className="cursor-pointer" value="submitted">Submitted</option>
              <option className="cursor-pointer" value="not_submitted">Not Submitted</option>
            </select>
            <button
              onClick={() => {
                searchAndFilter();
              }}
              className="w-12 h-12 flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103 10.5a7.5 7.5 0 0013.15 6.15z"
                />
              </svg>
            </button>
          </div>
        </div>
        <table className="table-auto w-auto">
          <thead className="[&>*]:bg-black">
            <tr className="[&>*]:border-2 [&>*]:border-gray-800 [&>*]:text-center">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Student ID</th>
              <th className="p-2">Employer</th>
              <th className="p-2 pl-10 pr-10">Evaluation</th>
              <th className="p-2">Report</th>
            </tr>
          </thead>
          <tbody className="[&>*]:bg-black">
            {userInfo.map((user, i) => (
              <tr
                key={i}
                className="[&>*]:border-2 [&>*]:border-gray-800"
                onClick={() => {
                  setDataIndex(i);
                  setModal(true);
                }}
              >
                {user.name != null ? (
                  <td className="text-center p-2">{user.name}</td>
                ) : (
                  <td className="text-center">N/A</td>
                )}
                <td className="text-center p-2">{user.email}</td>
                {(user.id!=null) ? <td className="text-center p-2">{user.id}</td>:<td className="text-center">N/A</td>}
                {(user.employer!=="") ? <td className="text-center p-2">{user.employer}</td>:<td className="text-center">N/A</td>}
                {(user.evaluation!=null) ? <td className="p-2">{`Grade: ${user.evaluation.grade}`}<br/><br/>{`Behaviour: ${user.evaluation.behaviour}`}<br/><br/>{`Skills: ${user.evaluation.skills}`}<br/><br/>{`Knowledge: ${user.evaluation.knowledge}`}<br/><br/>{`Attitude: ${user.evaluation.attitude}`}</td>:<td className="text-center">N/A</td>}
                {Array.isArray(user.report) ? user.report.map((report, j) => (
                  <td key={-j} className="p-2">{`Work Term: ${report.workTerm}`}<br/><br/>{`Description: ${report.description}`}</td>
                )) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
