"use client";

import { FormEvent, useEffect, useState } from "react";
import { auth, firestore } from "../../../index";
import { useRouter } from "next/navigation";
import Layout from "../../components/Layout";
import { applied, getCollection, getType, isAccepted, isAdmin, updateUser } from "../../../func";
import { collection, doc, getDocs } from "firebase/firestore";

interface User {
  accepted: boolean | null;
  admin: boolean | null;
  applied: boolean | null;
  id: string | null;
  name: string | null;
  email: string | null;
  type: string | null;
}

export default function Advisor() {
  const [userInfo, setUserInfo] = useState<User[]>([])

  const router = useRouter()
  async function collect(){
    const data = await getCollection()
    setUserInfo(data)
    console.log(data)
  }

  return (
    <>
      <Layout />
      <div className="relative flex flex-col min-h-3/4 w-3/4  bg-white rounded-4xl transform-[translate(-50%,-50%)] top-1/2 left-1/2">
        <button className="h-32 bg-red-500" onClick={(_) => collect()}>Click to get data</button>
        <table>
          <thead className="[&>*]:bg-black">
          <tr>
            <th>Email</th>
            <th>Admin</th>
            <th>Type</th>
          </tr>
          </thead>
          <tbody className="[&>*]:bg-black">
            {userInfo.map((user, i) => 
            <tr key={i}>
              <td>{user.email}</td>
              <td>{user.admin?.valueOf()}</td>
              <td>{user.type}</td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}
