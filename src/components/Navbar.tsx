"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Switch } from "@headlessui/react";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { useContext } from "react";
import { Theme, ThemeContext } from "./ThemeProvider";

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
    text: string;
    selected: boolean;
    href: string;
}

function NavbarItem({ text, selected, href }: NavbarItemProps) {
    return (
        <Link
            href={href}
            className={`text-white px-4 rounded-sm py-1 ${
                selected ? "bg-frost-200" : ""
            }`}
        >
            {text}
        </Link>
    );
}

function Navbar() {
    const pathname = usePathname();
    const themeContext = useContext(ThemeContext);
    const checked = themeContext.theme === Theme.Light;
    return (
        <div className="flex justify-between items-center bg-nord-100 dark:bg-neutral-900 text-white p-4">
            <p className="font-bold text-2xl">Blog</p>

            <div className="flex space-x-1 md:space-x-4 lg:space-x-8 font-semibold">
                {navbarItems.map((item) => (
                    <NavbarItem
                        text={item.text}
                        href={item.href}
                        selected={item.href === pathname}
                        key={`NAVBAR-${item.text}`}
                    />
                ))}
            </div>

            <div className="flex space-x-2 md:space-x-4 items-center">
                <BsMoonFill className="h-4 w-4 md:h-5 md:w-5 text-xl" />
                <div>
                    <Switch
                        checked={checked}
                        onChange={(enabled: boolean) => {
                            themeContext.setTheme(
                                enabled ? Theme.Light : Theme.Dark,
                            );
                        }}
                        className={`${
                            checked ? "bg-blue-500" : "bg-nord-400"
                        } relative inline-flex h-6 w-11 items-center rounded-full transition`}
                    >
                        <span className="sr-only">Toggle dark mode</span>
                        <span
                            className={`${
                                checked ? "translate-x-6" : "translate-x-1"
                            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                        />
                    </Switch>
                </div>
                <BsMoonFill className="h-5 w-5 md:h-5 md:w-5 text-xl" />
            </div>
        </div>
    );
}

export default Navbar;
