import React, { ReactNode } from "react";
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/cps406logo.png';
import style from "./Layout.module.css";
import Button from "./Button";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <div className={style.layoutMain} >
            <Image className={style.logo} src={logo} alt="Logo" width={100} height={100} />
            <nav className={style.navBar}>
                <Button text="HomePage" href="/"/> | <Button text="Login" href="/Login"/>
            </nav>
            </div>
            <div>
                <main>{children}</main>
            </div>
        </div>
    )
}

export default Layout;