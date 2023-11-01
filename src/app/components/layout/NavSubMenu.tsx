"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SubMenu } from "react-pro-sidebar";

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
  const [open, toggleOpen] = useState(false);
  const handleMenuToggle = () => {
    toggleOpen(!open);
  };

  return (
    <SubMenu
      key={path}
      defaultOpen={pathname.startsWith(path) ? true : undefined}
      open={open}
      onClick={() => handleMenuToggle()}
      label={label}
    >
      {children}
    </SubMenu>
  );
}
