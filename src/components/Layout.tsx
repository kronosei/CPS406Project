"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { auth } from "../../index";
import { useRouter } from "next/navigation";
import { applied, getType, isAccepted, updateUser } from "../../func";

function Layout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState("");
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUserType(await getType(user.uid));
      } else {
        setIsAuthenticated(false);
      }
    });
  }, []);

  const router = useRouter();
  const logout = () => {
    auth.signOut();
    router.push("/");
  };
  return (
    <div className="absolute w-screen">
      <div className="grid grid-cols-12 bg-black p-5 mx-auto">
        <div className="col-span-4 sm:col-span-8 xl:col-span-10"></div>
        <nav className="col-span-8 grid grid-cols-4 sm:col-span-4 xl:col-span-3">
          {isAuthenticated && (
            <>
              <Link
                className="col-span-1 hover:font-bold transition-all delay-0 duration-300"
                href="/"
              >
                Home
              </Link>
            </>
          )}
          {!isAuthenticated && (
            <>
              <Link
                className="col-span-1 hover:font-bold transition-all delay-0 duration-300"
                href="/"
              >
                Home
              </Link>
              <Link
                className="col-span-1 hover:font-bold transition-all delay-0 duration-300"
                href="/login"
              >
                Login
              </Link>
              <Link
                className="col-span-1 hover:font-bold transition-all delay-0 duration-300"
                href="/register"
              >
                Register
              </Link>
            </>
          )}
          {isAuthenticated && (
            <>
              <Link
                className="col-span-1 hover:font-bold transition-all delay-0 duration-300"
                href="/"
                onClick={logout}
              >
                Log out
              </Link>
            </>
          )}

          {isAuthenticated && userType == "employer" && (
            <>
              <Link
                className="col-span-2 hover:font-bold transition-all delay-0 duration-300"
                href="/employerEvaluation"
              >
                Submit an Employer Evaluation
              </Link>
            </>
          )}
        </nav>
      </div>
    </div>
  );
}

export default Layout;
