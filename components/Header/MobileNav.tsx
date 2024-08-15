import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image"
import {hamburgerIcon} from "@/utils";


const MobileNav = ({user}:MobileNavProps) => {
    return (
        <section className="w-full max-w-[264px]">
            <Sheet>
                <SheetTrigger>
                    <Image
                        src={hamburgerIcon}
                        width={30}
                        height={30}
                        alt="menu"
                        className="cursor-pointer"
                    />
                </SheetTrigger>
                <SheetContent side="left">
                    {user.firstName}
                </SheetContent>
            </Sheet>
        </section>
    )
}

export default MobileNav