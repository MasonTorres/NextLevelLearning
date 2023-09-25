import React, { useContext } from "react";
import { Link } from "react-router-dom";

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

  const handleClick = () => {
    setOpenMenu(!openMenu);
  };

  const handleClickButton = (newTitle: string) => {
    setPageInfo({ ...pageInfo, home: newTitle });
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
                  selected={pageInfo.home === nestedLink.title}
                  component={Link}
                  onClick={() => handleClickButton(nestedLink.title)}
                  to={nestedLink.to}
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
