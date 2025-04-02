"use client";

import { auth } from "@/components/firebase/firebaseConfig";
import Layout from "../components/Layout";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  auth.onAuthStateChanged((user) => {
    if(user){
      router.replace("/home")
    }
  })
  return (
    <>
      <Layout />
    </>
  );
}
