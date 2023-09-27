import React, {
  Component,
  ReactComponentElement,
  useContext,
  useEffect,
} from "react";
import { PageInfoContext } from "../appContext";
import Router from "../pages/router";
import {
  CSSObject,
  StyledEngineProvider,
  Theme,
  styled,
  useTheme,
} from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";

// Iconify Icons
import { Icon } from "@iconify/react";
import linuxIcon from "@iconify/icons-cib/linux";
import lineEndIcon from "@iconify/icons-material-symbols/line-end";

import {
  BottomNavigation,
  BottomNavigationAction,
  Collapse,
  Container,
  IconButton,
  Paper,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AppleIcon from "@mui/icons-material/Apple";

// Fluent UI Icons
import {
  Home28Filled,
  Shield28Filled,
  PersonFeedback28Filled,
} from "@fluentui/react-icons";

import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { makeStyles } from "@fluentui/react-components";
import NavItem from "./NavItem";

import nllDataFiles from "../content/nllDataFiles.json";
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

let linuxmde: {
  icon: ReactComponentElement<typeof Icon>;
  to: string;
  title: string;
}[] = [];

// loop through the json file and create the links
nllDataFiles.forEach(
  (file: {
    data: {
      title: any;
      path: any;
      data: any;
    };
  }) => {
    linuxmde.push({
      icon: <Icon icon={lineEndIcon} fontSize={20} />,
      to: `${file.data.path}`,
      title: `${file.data.title}`,
    });
  }
);

// Nav links
const links = [
  {
    icon: <Home28Filled />,
    title: "Home",
    items: [],
    to: "/home",
  },
  {
    icon: <Shield28Filled />,
    title: "MDE",
    items: [
      {
        title: "Linux",
        icon: <Icon icon={linuxIcon} fontSize={20} />,
        items: [...linuxmde],
      },
      {
        title: "Apple",
        icon: <AppleIcon />,
        items: [
          {
            icon: <Icon icon={lineEndIcon} fontSize={20} />,
            to: "/mde/mac",
            title: "MDE Mac",
          },
        ],
      },
    ],
  },
];

interface Link {
  u: string;
  s: Link[];
}

interface Link {
  u: string;
  s: Link[];
}

export default function NavSideBar({ link }: any) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const [open, setOpen] = React.useState(true);
  const { pageInfo, setPageInfo } = useContext(PageInfoContext);

  const handleDrawerOpen = () => {
    setOpen(true);
    setPageInfo({ ...pageInfo, drawer: true });
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setPageInfo({ ...pageInfo, drawer: false });
  };

  const [openMenu, setOpenMenu] = React.useState(true);

  const handleClick = () => {
    setOpenMenu(!openMenu);
  };

  const [value, setValue] = React.useState("recents");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div style={{ display: "flex", height: "100%" }}>
      {matches ? (
        <>
          <AppBar position="fixed" open={open}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                {pageInfo.home}
              </Typography>
            </Toolbar>
          </AppBar>

          <Drawer variant="permanent" anchor="left" open={open}>
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
              {links.map((link) =>
                link.items.length === 0 ? (
                  <div key={link.title}>
                    <ListItemButton href={link.to ? link.to : ""}>
                      <ListItemIcon>{link.icon}</ListItemIcon>
                      <ListItemText primary={link.title} />
                    </ListItemButton>
                  </div>
                ) : (
                  <div key={link.title}>
                    <ListItemButton onClick={handleClick}>
                      <ListItemIcon>{link.icon}</ListItemIcon>
                      <ListItemText primary={link.title} />
                      {openMenu ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openMenu} timeout="auto">
                      <List component="div" disablePadding>
                        {link.items.map((nestedLink) => (
                          <NavItem key={nestedLink.title} link={nestedLink} />
                        ))}
                      </List>
                    </Collapse>
                  </div>
                )
              )}
            </List>
            <List style={{ position: "absolute", bottom: "0", width: "100%" }}>
              <ListItemButton
                target="_blank"
                href="https://forms.microsoft.com/r/fbCnRuRQwq"
              >
                <ListItemIcon>
                  <PersonFeedback28Filled />
                </ListItemIcon>
                <ListItemText primary={"Feedback"} />
              </ListItemButton>
            </List>
          </Drawer>
        </>
      ) : (
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100 }}
          elevation={3}
        >
          <BottomNavigation
            sx={{ width: "100%" }}
            value={value}
            onChange={handleChange}
          >
            <BottomNavigationAction
              label="Home"
              value="home"
              icon={
                <ListItemButton href="/home">
                  <ListItemIcon>
                    <Home28Filled />
                  </ListItemIcon>
                </ListItemButton>
              }
            />
            <BottomNavigationAction
              label="Feedback"
              value="feedback"
              icon={<PersonFeedback28Filled />}
            />
          </BottomNavigation>
        </Paper>
      )}

      <main
        style={{
          padding: matches ? "15px" : "0",
          width: "100%",
          paddingTop: "64px",
          // overflowX: "auto",
        }}
      >
        {/* <StyledEngineProvider injectFirst> */}
        <Router />
        {/* </StyledEngineProvider> */}
      </main>
    </div>
  );
}
