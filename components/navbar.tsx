import { Switch } from "@headlessui/react";
import Link from "next/link";
import { useContext } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { ThemeContext } from "../common/context";

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
    const { theme, setTheme } = useContext(ThemeContext);
    const checked = theme === "LIGHT";
    return (
        <div className="flex justify-between items-center bg-nord-100 dark:bg-neutral-900 text-white p-4">
            <p className="font-bold text-2xl text-red-500">
                Blog
            </p>

            <div className="flex space-x-1 md:space-x-4 lg:space-x-8 font-semibold">
                { navbarItems.map(item => <NavbarItem text={item.text} href={item.href} selected={item.text.toLowerCase() === selected} />)}
            </div>

            <div className="flex space-x-2 md:space-x-4 items-center">
                <MoonIcon className="h-4 w-4 md:h-5 md:w-5 text-xl"/>
                <div>
                    <Switch
                        checked={checked}
                        onChange={(enabled: boolean) => {setTheme(enabled ? "LIGHT" : "DARK");}}
                        className={`${checked ? "bg-blue-500" : "bg-nord-400"} relative inline-flex h-6 w-11 items-center rounded-full transition`}
                    >
                        <span className="sr-only">Toggle dark mode</span>
                    <span
                            className={`${checked ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                    </Switch>
                </div>
                <SunIcon className="h-5 w-5 md:h-5 md:w-5 text-xl"/>
            </div>
        </div>
    );
}

export default Navbar;
