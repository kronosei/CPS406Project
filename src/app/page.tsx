"use client";

import Layout from "../components/Layout"
import Link from 'next/link';
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../index";

export default function Home() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(firestore, "Users"));
      const usersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        Type: doc.data().Type
      }));
      setData(usersData);
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <div>
        <header><h1>Welcome to the Generic Co-op Page</h1></header>
        <section>Press below to sign up or log in</section>
        <section id="link"><Link href="/login">To Login/Sign up page</Link></section>
        <h1>Life Firestore Data</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </Layout>
  );
}
