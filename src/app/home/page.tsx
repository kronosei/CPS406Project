"use client";

import { FormEvent, useEffect, useState } from "react";
import { auth } from "../../../index";
import { updateProfile, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import Layout from "../../components/Layout";
import { applied, getType, isAccepted, updateUser } from "../../../func";
import Student from "./student";
import Advisor from "./advisor";
import Modal from "./modal";

export default function Home() {
  const router = useRouter();
  let acc : User | null = null
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userType, setUserType] = useState("")
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
        if (user) {
              setLoading(false)
              setIsAuthenticated(true)
              acc = user
              setUserType(await getType(acc.uid))
          } else{
              setIsAuthenticated(false)
              router.replace("/")
          }
      });
  }, [])
    
  return (
    <>
    {!loading && userType == "student" && <Student/>}
    {!loading && userType == "advisor" && <Advisor/>}
    </>
  )
}
