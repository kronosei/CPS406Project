"use client";

import Layout from "../components/Layout"
import Link from 'next/link';
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { auth, firestore } from "../../index";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  const logout = () => {
    auth.signOut()
    router.push('/login')
  }

  return (
    <>
    <Layout/>
    <button className="h-32 w-32 bg-red-500" onClick={logout}></button>
    </>
  );
}
