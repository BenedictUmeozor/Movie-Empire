"use client";

import Headroom from "react-headroom";
import MobileHeader from "./MobileHeader";
import DesktopHeader from "./DesktopHeader";
import Nav from "./Nav";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Header = ({ term }: { term?: string }) => {
  const [navIsVisible, setNavIsVisible] = useState(false);
  const pathname = usePathname();

  const showNav = () => {
    setNavIsVisible(true);
  };

  const hideNav = () => {
    setNavIsVisible(false);
  };

  useEffect(() => {
    if (navIsVisible) {
      document.body.classList.add("fixed-layout");
    } else {
      document.body.classList.remove("fixed-layout");
    }
  }, [navIsVisible]);

  useEffect(() => {
    if (navIsVisible) {
      setNavIsVisible(false);
    }
  }, [pathname]);

  return (
    <>
      <Headroom className="z-[999] sticky top-0">
        <DesktopHeader term={term} />
        <MobileHeader term={term} showNav={showNav} />
      </Headroom>
      {navIsVisible && <Nav hideNav={hideNav} />}
    </>
  );
};
export default Header;
