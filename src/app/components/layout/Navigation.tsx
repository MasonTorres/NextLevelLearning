"use client";
import React, { ReactComponentElement, useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Fluent UI
import {
  Button,
  makeStyles,
  mergeClasses,
  shorthands,
  tokens,
  Subtitle1,
} from "@fluentui/react-components";
import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  DrawerInline,
} from "@fluentui/react-components/unstable";
import { useMotion } from "@fluentui/react-motion-preview";

// Fluent UI Icons
import {
  Home28Filled,
  Shield28Filled,
  PersonFeedback28Filled,
  Dismiss24Regular,
  DarkTheme24Regular,
} from "@fluentui/react-icons";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

// Material UI
import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Collapse,
  IconButton,
  Paper,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AppleIcon from "@mui/icons-material/Apple";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

// Iconify Icons
import { Icon } from "@iconify/react";
import linuxIcon from "@iconify/icons-cib/linux";
import lineEndIcon from "@iconify/icons-material-symbols/line-end";

import NavItem from "./NavItem";
import { PageInfoContext } from "../../providers";

import nllDataFiles from "../../content/nllDataFiles.json";
const drawerWidth = 280;

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

nllDataFiles.sort((a, b) => {
  let titlea = a.data.title.toLowerCase(),
    titleb = b.data.title.toLowerCase();

  if (titlea < titleb) {
    return -1;
  }
  if (titlea > titleb) {
    return 1;
  }
  return 0;
});

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
      to: `/${file.data.path}`,
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

export default function Navigation({
  children,
}: {
  children: React.ReactNode;
}) {
  const { pageInfo, setPageInfo } = useContext(PageInfoContext);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const [open, setOpen] = React.useState(true);
  const motion = useMotion<HTMLDivElement>(open);

  const styles = useStyles();

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

  const handleThemeToggle = () => {
    setPageInfo({
      ...pageInfo,
      theme: pageInfo.theme === "light" ? "dark" : "light",
    });
  };

  const pathname = usePathname();
  let pageName;
  const pageCheck = nllDataFiles.filter(
    (file) => file.data.path === pathname?.substring(1)
  );
  if (pageCheck.length === 0 && pathname) {
    pageName =
      pathname?.split("/").slice(-1)[0].charAt(0).toUpperCase() +
      pathname?.split("/").slice(-1)[0].slice(1);
  } else {
    pageName = pageCheck[0].data.title;
  }

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
              <div>
                <Subtitle1 wrap={false}>{pageName}</Subtitle1>
                {/* <Subtitle1 wrap={false}>{pageInfo.home}</Subtitle1> */}
              </div>
              <Box
                sx={{ width: "100%", display: "flex", justifyContent: "end" }}
              >
                <IconButton
                  color="inherit"
                  onClick={handleThemeToggle}
                  edge="start"
                  sx={{
                    marginRight: 5,
                    // backgroundColor: "#486e9f",
                  }}
                >
                  <DarkTheme24Regular />
                </IconButton>
              </Box>
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
                          component={Link}
                          href={link.to ? link.to : ""}
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
                      <PersonFeedback28Filled
                        color={tokens.colorNeutralBackgroundInverted}
                      />
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
            <BottomNavigationAction
              component={Link}
              href="/home"
              icon={<Home28Filled />}
            />
            <BottomNavigationAction
              target="_blank"
              href="https://forms.microsoft.com/r/fbCnRuRQwq"
              icon={<PersonFeedback28Filled />}
            />
            <BottomNavigationAction
              onClick={handleThemeToggle}
              icon={<DarkTheme24Regular />}
            />
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
          {/* <Router /> */}
          {children}
          {/* </StyledEngineProvider> */}
        </main>
      </div>
    </div>
  );
}
