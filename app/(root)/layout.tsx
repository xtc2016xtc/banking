import Sidebar from "@/components/left/Sidebar";
import {logoIcon} from "@/utils";
import Image from "next/image";
import MobileNav from "@/components/Header/MobileNav";
export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const loggedIn = {firstName: '熊先生',lastName:'bear'}


    return (
        <main className="flex h-screen w-full font-inter">
            {/*@ts-ignore*/}
            <Sidebar user={loggedIn} />
            <div className="flex size-full flex-col">
                <div className="root-layout">
                    <Image
                        src={logoIcon}
                        width={30}
                        height={30}
                        alt="logo"
                    />
                    <div>
                        {/*@ts-ignore*/}
                        <MobileNav user={loggedIn} />
                    </div>
                </div>
                {children}
            </div>
        </main>
    );
}

