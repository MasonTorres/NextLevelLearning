import React, {
  Component,
  ReactComponentElement,
  useContext,
  useEffect,
} from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  DrawerInline,
} from "@fluentui/react-components/unstable";
import { useMotion } from "@fluentui/react-motion-preview";

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
import { Link as LinkReactDom } from "react-router-dom";

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
  Dismiss24Regular,
} from "@fluentui/react-icons";

import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Button,
  makeStyles,
  mergeClasses,
  shorthands,
  tokens,
} from "@fluentui/react-components";
import NavItem from "./NavItem";

import nllDataFiles from "../content/nllDataFiles.json";
import { Link } from "react-scroll";
const drawerWidth = 280;

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

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
// }));

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

const visibleKeyframe = {
  ...shorthands.borderRadius(0),
  opacity: 1,
  transform: "translate3D(0, 0, 0) scale(1)",
};

const hiddenKeyframe = {
  ...shorthands.borderRadius("36px"),
  opacity: 0,
  transform: "translate3D(-100%, 0, 0) scale(0.5)",
};

const useStyles = makeStyles({
  root: {
    // ...shorthands.border("2px", "solid", "#ccc"),
    // ...shorthands.overflow("hidden"),
    display: "flex",
    height: "100vh",
    position: "fixed",
    backgroundColor: "#fff",
  },

  drawer: {
    animationDuration: tokens.durationGentle,
    willChange: "opacity, transform, border-radius",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    width: drawerWidth + "px",
    // padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    // ...theme.mixins.toolbar,
    backgroudColor: tokens.colorNeutralBackgroundStatic,
    // marginTop: "-47px",
  },

  drawerEntering: {
    animationTimingFunction: tokens.curveDecelerateMid,
    animationName: {
      from: hiddenKeyframe,
      to: visibleKeyframe,
    },
  },

  drawerExiting: {
    animationTimingFunction: tokens.curveAccelerateMin,
    animationName: {
      from: visibleKeyframe,
      to: hiddenKeyframe,
    },
  },

  content: {
    ...shorthands.flex(1),
    ...shorthands.padding("16px"),

    boxSizing: "border-box",
    position: "relative",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    transitionDuration: tokens.durationGentle,
    transitionProperty: "transform, background-color",
    willChange: "transform, background-color",
    overflowY: "unset",
    overflowX: "unset",
    backgroundColor: tokens.colorNeutralBackground4,
    // marginTop: "47px",
  },
  contentActive: {
    transform: `translate3D(${drawerWidth}px, 0, 0)`,
    backgroundColor: tokens.colorNeutralBackground4,
    position: "relative",
  },
  contentEntering: {
    transitionTimingFunction: tokens.curveDecelerateMid,
  },
  contentExiting: {
    transitionTimingFunction: tokens.curveAccelerateMin,
  },
  contentIdle: {
    width: `calc(100% - ${drawerWidth}px)`,
  },
});

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   whiteSpace: "nowrap",
//   boxSizing: "border-box",
//   ...(open && {
//     ...openedMixin(theme),
//     "& .MuiDrawer-paper": openedMixin(theme),
//   }),
//   ...(!open && {
//     ...closedMixin(theme),
//     "& .MuiDrawer-paper": closedMixin(theme),
//   }),
// }));

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
      icon: (
        <Icon
          icon={lineEndIcon}
          fontSize={20}
          color={tokens.colorNeutralBackgroundInverted}
        />
      ),
      to: `${file.data.path}`,
      title: `${file.data.title}`,
    });
  }
);

// Nav links
const links = [
  {
    icon: <Home28Filled color={tokens.colorNeutralBackgroundInverted} />,
    title: "Home",
    items: [],
    to: "/home",
  },
  {
    icon: <Shield28Filled color={tokens.colorNeutralBackgroundInverted} />,
    title: "MDE",
    items: [
      {
        title: "Linux",
        icon: (
          <Icon
            icon={linuxIcon}
            fontSize={20}
            color={tokens.colorNeutralBackgroundInverted}
          />
        ),
        items: [...linuxmde],
      },
      {
        title: "Apple",
        icon: (
          <AppleIcon sx={{ color: tokens.colorNeutralBackgroundInverted }} />
        ),
        items: [
          {
            icon: (
              <Icon
                icon={lineEndIcon}
                fontSize={20}
                color={tokens.colorNeutralBackgroundInverted}
              />
            ),
            to: "/mde/mac",
            title: "MDE Mac",
          },
        ],
      },
    ],
  },
];

export default function NavSideBar({ link }: any) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const [open, setOpen] = React.useState(true);
  const motion = useMotion<HTMLDivElement>(open);

  const styles = useStyles();

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
    <div>
      {matches ? (
        <>
          <AppBar
            position="fixed"
            sx={{
              backgroundColor: tokens.colorNeutralBackgroundStatic,
            }}
            open={open}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: "none" }),
                  backgroundColor: "#486e9f",
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                {pageInfo.home}
              </Typography>
            </Toolbar>
          </AppBar>
          <div className={styles.root}>
            {/* <Drawer variant="permanent" anchor="left" open={open}> */}
            <DrawerInline
              open={open}
              separator
              className={mergeClasses(
                styles.drawer,
                motion.type === "entering" && styles.drawerEntering,
                motion.type === "exiting" && styles.drawerExiting
              )}
            >
              <DrawerHeader>
                <DrawerHeaderTitle
                  action={
                    <Button
                      appearance="subtle"
                      aria-label="Close"
                      icon={<Dismiss24Regular />}
                      onClick={() => handleDrawerClose()}
                    />
                  }
                >
                  Menu
                </DrawerHeaderTitle>
              </DrawerHeader>
              <Divider />
              <DrawerBody style={{ minWidth: "100%", padding: 0 }}>
                <List>
                  {links.map((link) =>
                    link.items.length === 0 ? (
                      <div key={link.title}>
                        <ListItemButton
                          component={LinkReactDom}
                          to={link.to ? link.to : ""}
                        >
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
                              <NavItem
                                key={nestedLink.title}
                                link={nestedLink}
                              />
                            ))}
                          </List>
                        </Collapse>
                      </div>
                    )
                  )}
                </List>
                <List
                  style={{ position: "absolute", bottom: "0", width: "100%" }}
                >
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
              </DrawerBody>
            </DrawerInline>
          </div>
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
            <ListItemButton
              component={LinkReactDom}
              to="/home"
              sx={{ justifyContent: "center" }}
            >
              <ListItemIcon>
                <Home28Filled />
              </ListItemIcon>
            </ListItemButton>

            <ListItemButton
              target="_blank"
              href="https://forms.microsoft.com/r/fbCnRuRQwq"
              sx={{ justifyContent: "center" }}
            >
              <ListItemIcon>
                <PersonFeedback28Filled />
              </ListItemIcon>
            </ListItemButton>
          </BottomNavigation>
        </Paper>
      )}

      <div
        className={
          matches
            ? mergeClasses(
                styles.content,
                motion.active && styles.contentActive,
                motion.type === "entering" && styles.contentEntering,
                motion.type === "exiting" && styles.contentExiting,
                motion.type === "idle" && styles.contentIdle
              )
            : mergeClasses(styles.content)
        }
        style={{
          width: matches ? "" : "100%",
        }}
      >
        <main
          style={{
            // padding: matches ? "15px" : "0",
            // position: "absolute",
            width: "100%",
            paddingTop: "15px",
          }}
        >
          {/* <StyledEngineProvider injectFirst> */}
          <Router />
          {/* </StyledEngineProvider> */}
        </main>
      </div>
    </div>
  );
}
