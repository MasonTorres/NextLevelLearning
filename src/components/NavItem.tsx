import React, { useContext } from "react";
import { PageInfoContext } from "../appContext";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

export default function NavItem({ link }: any) {
  const { pageInfo, setPageInfo } = useContext(PageInfoContext);

  const [openMenu, setOpenMenu] = React.useState(false);

  const handleClick = (newTitle: string) => {
    setOpenMenu(!openMenu);
    console.log("newTitle", newTitle);
    setPageInfo({ ...pageInfo, home: newTitle });
  };

  const handleClickButton = (newTitle: string) => {
    setPageInfo({ ...pageInfo, home: newTitle });
  };

  return (
    <>
      <div key={link.title}>
        <ListItem button onClick={() => handleClick(link.title)}>
          <ListItemIcon>{link.icon}</ListItemIcon>
          <ListItemText primary={link.title} />
          {openMenu ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openMenu} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {link.items.map((nestedLink: any) => (
              <div key={nestedLink.title}>
                <ListItemButton
                  onClick={() => handleClickButton(nestedLink.title)}
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
