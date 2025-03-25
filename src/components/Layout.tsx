import React, { useState } from "react";
import Link from "next/link";
import { auth } from "../../index";
import { useRouter } from "next/navigation";

function Layout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const logout = () => {
    auth.signOut();
    router.push("/login");
  };
  return (
    <div className="absolute w-screen">
      <div className="grid grid-cols-12 bg-black p-5 mx-auto">
        <div className="col-span-4 sm:col-span-8 xl:col-span-10"></div>
        <nav className="col-span-8 grid grid-cols-4 sm:col-span-4 xl:col-span-3">
          <Link
            className="col-span-1 hover:font-bold transition-all delay-0 duration-300"
            href="/"
          >
            Home
          </Link>
          {!isAuthenticated && (
            <>
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
          <Link
            className="col-span-1 hover:font-bold transition-all delay-0 duration-300"
            href="/"
            onClick={logout}
          >
            Log out
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default Layout;
