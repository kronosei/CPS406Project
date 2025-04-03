"use client";

import { FormEvent, useEffect, useState } from "react";
import { auth } from "../../../index";
import { updateProfile, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import Layout from "../../components/Layout";
import { applied, isAccepted, updateUser } from "../../../func";

export default function Advisor() {

  const router = useRouter();
  let acc : User | null = null
      auth.onAuthStateChanged(async (user) => {
         
        });
    
  return (
    <>
        <Layout />
        <div className="relative flex flex-col min-h-3/4 sm:w-1/2  bg-white rounded-4xl transform-[translate(-50%,-50%)] top-1/2 left-1/2">
        <span className="text-black self-center text-3xl md:text-2xl font-bold pt-32 text-center">
            Advisor
        </span>
      </div>
    </>
  )
}
