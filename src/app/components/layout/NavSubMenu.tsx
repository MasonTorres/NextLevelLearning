"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SubMenu } from "react-pro-sidebar";
// Iconify Icons
import linuxIcon from "@iconify/icons-cib/linux";

export default function NavSubMenu({
  level,
  path,
  label,
  active,
  children,
}: {
  level: string;
  path: string;
  label: string;
  active: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [rand, setRand] = useState(0); // [rand, setRand
  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (pathname.startsWith(path) && open === false) {
      console.log("Settings open to true");
      setOpen(true);
      // New random number to force re-render
      setRand(Math.random());
    }
  }, [pathname]);

  return (
    <SubMenu
      key={path + rand}
      defaultOpen={pathname.startsWith(path) ? true : undefined}
      open={open}
      onClick={() => handleOpen()}
      label={label}
    >
      {children}
    </SubMenu>
  );
}
