import { MenuIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { config } from "@/constants";
import Link from "../common/Link";

type Props = {};

const MobileMenu = (props: Props) => {
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);
  const { logo, navigations, siteName } = config;
  return (
    <div className="block md:hidden">
      <Button size="icon" onClick={() => setMobileMenu(true)}>
        <MenuIcon />
      </Button>
      <Sheet open={mobileMenu} onOpenChange={setMobileMenu}>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>{siteName}</SheetTitle>
          </SheetHeader>
          <nav className="">
            <ul className="flex flex-col items-center  text-md">
              {navigations.map((nav) => (
                <li
                  key={nav.title}
                  className="flex items-center text-left h-12 w-full px-2  hover:text-white hover:bg-primary/60 border-l-4 border-primary"
                >
                  <Link
                    className="transition no-underline text-md text-primary"
                    href={nav.url}
                  >
                    {nav.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
