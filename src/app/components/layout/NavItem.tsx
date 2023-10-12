import React, { useContext, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import nllDataFiles from "../../content/nllDataFiles.json";

export default function NavItem({ link }: any) {
  const pathname = usePathname();

  const [openMenu, setOpenMenu] = React.useState(true);

  const handleClick = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <>
      <div key={link.title}>
        <ListItem button onClick={() => handleClick()}>
          <ListItemIcon>{link.icon}</ListItemIcon>
          <ListItemText primary={link.title} />
          {openMenu ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openMenu} timeout="auto">
          <List component="div" disablePadding>
            {link.items.map((nestedLink: any) => (
              <div key={nestedLink.title}>
                <ListItemButton
                  selected={
                    nllDataFiles.filter(
                      (file) => file.data.path === pathname?.substring(1)
                    )[0]?.data.title === nestedLink.title
                  }
                  component={Link}
                  href={nestedLink.to}
                >
                  <ListItemIcon>{nestedLink.icon}</ListItemIcon>
                  <ListItemText disableTypography primary={nestedLink.title} />
                </ListItemButton>
              </div>
            ))}
          </List>
        </Collapse>
      </div>
    </>
  );
}
