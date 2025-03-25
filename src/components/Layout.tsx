import React, { ReactNode } from "react";
import Image from 'next/image';
import logo from '@/assets/cps406logo.png';
import style from "./Layout.module.css";
import Button from "./Button";

function Layout() {
    return (
        <div className="fixed w-screen">
            <div className="grid grid-cols-12 bg-black p-5 mx-auto">
                <div className="col-span-4 sm:col-span-8 xl:col-span-10"></div>
                <nav className="col-span-8 grid grid-cols-3 sm:col-span-4 xl:col-span-2">
                    <a className="col-span-1 hover:font-bold transition-all delay-0 duration-300" href="/">Home</a>
                    <a className="col-span-1 hover:font-bold transition-all delay-0 duration-300" href="/login">Login</a>
                    <a className="col-span-1 hover:font-bold transition-all delay-0 duration-300" href="/register">Register</a>
                </nav>
            </div>
        </div>
    )
}

export default Layout;