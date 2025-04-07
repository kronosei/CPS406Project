"use client";

import { auth } from "@/components/firebase/firebaseConfig";
import Layout from "../components/Layout";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
      <div className="relative flex flex-col h-auto w-5/6 sm:w-4/5 md:w-4/5 lg:w-4/7 xl:w-3/5 2xl:w-1/2 bg-white rounded-4xl mx-auto top-30 p-10">
        <span className="text-black self-center text-xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-5xl font-bold text-center mt-0.5 mb-5">
          Welcome to the Generic Co-op Page
        </span>
        <span className="text-black self-center text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-3xl">
          This is a co-op portal and management site. If log in to your account, please click this link to head to the
          <span> <Link className="text-blue-700 font-bold underline" href="/login">Login Page.</Link> </span>
          If you do not have an account, click this link to head to the
          <span> <Link className="text-blue-700 font-bold underline" href="/register">Register Page.</Link> </span>
        </span>
      </div>
    </>
  );
}
