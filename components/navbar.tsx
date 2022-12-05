import Link from "next/link";

const navbarItems = [
    {
        text: "Home",
        href: "/",
    },
    {
        text: "About",
        href: "/about",
    },
];

interface NavbarItemProps {
    text: string,
    selected: boolean,
    href: string,
}

function NavbarItem({ text, selected, href }: NavbarItemProps) {
    return (
        <Link href={href} className={`text-white px-4 rounded-sm py-1 ${selected ? "bg-frost-200" : ""}`}>
            { text }
        </Link>
    );
}

interface NavbarProps {
    selected: string | null,
}

function Navbar({ selected }: NavbarProps) {
    return (
        <div className="flex justify-center items-center bg-nord-100 text-white p-4">
            <p className="font-bold text-2xl mr-auto">
                Blog
            </p>

            <div className="flex space-x-1 md:space-x-4 lg:space-x-8 font-semibold mr-auto">
                { navbarItems.map(item => <NavbarItem text={item.text} href={item.href} selected={item.text.toLowerCase() === selected} />)}
            </div>
        </div>
    );
}

export default Navbar;