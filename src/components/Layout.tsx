import React, { ReactNode } from "react";
import Link from 'next/link';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <nav>
                <Link href="/">Home</Link> | <Link href="/Login">Login</Link>
            </nav>
            <main>{children}</main>
        </div>
    )
}

export default Layout;