import { config } from "@/constants";
import { Button } from "../ui/button";
import Link from "../common/Link";
import { ThemeToggler } from "../common/ThemeToggler";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import MobileMenu from "./MobileMenu";
const Header = () => {
  const { logo, navigations, siteName } = config;

  return (
    <header className=" bg-primary/20 mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 items-center justify-between">
        <div className="flex-1 md:flex md:items-center md:gap-12">
          <a className="block text-teal-600" href="/">
            <span className="sr-only">Home</span>
            <img className="w-16 h-16" src={logo} alt="logo" />
          </a>
        </div>

        <div className="md:flex md:items-center md:gap-12">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              {navigations.map((nav) => (
                <li key={nav.title}>
                  <Link
                    className="transition no-underline text-md"
                    href={nav.url}
                  >
                    {nav.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggler />
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
