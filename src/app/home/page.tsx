"use client";

import { FormEvent, useEffect, useState } from "react";
import { auth } from "../../../index";
import { updateProfile, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import Layout from "../../components/Layout";
import { applied, getType, isAccepted, updateUser } from "../../../func";
import Student from "./student";
import Advisor from "./advisor";

export default function Home() {
  const router = useRouter();
  let acc : User | null = null
  const [userType, setUserType] = useState("")
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
        if (user) {
              setLoading(false)
              acc = user
              setUserType(await getType(acc.uid))
          } else{
              router.replace("/")
          }
      });
  })
    
  return (
    <>
    {!loading && userType == "student" && <Student/>}
    {!loading && userType == "advisor" && <Advisor/>}
    </>
  )
}
