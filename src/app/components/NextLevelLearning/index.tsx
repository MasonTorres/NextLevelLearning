// "use client";
import {
  Divider,
  Tab,
  TabList,
  makeStyles,
  shorthands,
  Text,
  Body1,
  Subtitle2,
  Body2,
  Title3,
  Card,
  tokens,
} from "@fluentui/react-components";
import { Grid, Box, useMediaQuery, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  Fragment,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Scroll from "react-scroll";
import UserActivity from "./components/UserActivity";
import BackgroundActivity from "./components/BackgroundActivity";
import { IContent } from "../../types/types";
import { usePathname, useSearchParams } from "next/navigation";

var Link = Scroll.Link;
var Element = Scroll.Element;
var scroller = Scroll.scroller;

const useStyles = makeStyles({
  root: {
    position: "sticky",
    top: "65px",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "left",
    justifyItems: "left",
    textAlign: "left",
    alignItems: "left",
    ...shorthands.padding("35px", "10px"),
    rowGap: "20px",
  },

  userActivity: {
    boxShadow: tokens.shadow8,
    backgroundColor: "#486e9f",
  },

  backgroundActivity: {
    boxShadow: tokens.shadow8,
    backgroundColor: "#6f89b2",
  },
});

const GenerateRadiusUserTask = (
  hasBackgroundTask: boolean,
  isNotMobile: boolean
) => {
  if (hasBackgroundTask) {
    if (isNotMobile) {
      return "15px 0px 0px 15px";
    } else {
      return "15px 15px 0px 0px";
    }
  } else {
    if (isNotMobile) {
      return "15px 15px 15px 15px";
    } else {
      return "15px 15px 15px 15px";
    }
  }
};
const GenerateRadiusBackgroundTask = (
  hasBackgroundTask: boolean,
  isNotMobile: boolean
) => {
  if (hasBackgroundTask) {
    if (isNotMobile) {
      return "0px 15px 15px 0px";
    } else {
      return "0px 0px 15px 15px";
    }
  } else {
    if (isNotMobile) {
      return "15px 15px 15px 15px";
    } else {
      return "15px 15px 0px 0px";
    }
  }
};

export default function NextLevelLearning({
  content,
  description,
}: {
  content: IContent[];
  description: string;
}) {
  const theme = useTheme();
  const isNotMobile = useMediaQuery(theme.breakpoints.up("md"));
  const styles = useStyles();
  const [selectedTab, setSelectedTab] = useState(1);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [anchor, setAnchor] = useState("");

  // const { pageInfo, setPageInfo } = useContext(PageInfoContext);

  let isChangingTab = useRef(false);

  // update the content width based on the drawer state
  const [contentWidth, setContentWidth] = useState("270px");
  // useEffect(() => {
  //   if (pageInfo.drawer) {
  //     setContentWidth("270px");
  //   } else {
  //     // setContentWidth("96px");
  //   }
  // }, [pageInfo.drawer]);

  const replaceAll = (str: any, find: any, replace: any) => {
    return str.replace(new RegExp(find, "g"), replace);
  };

  const handleSelectedTab = (e: any, value: SetStateAction<any>) => {
    const stepToChangeTo = Number(e.toString().replace("step", ""));

    let numTasks: number = 0;
    content.forEach((section) => {
      numTasks += section.tasks.length;
    });

    if (value === "scroll" && isChangingTab.current === false) {
      setSelectedTab(stepToChangeTo);
    } else if (value === "pageLoad") {
      isChangingTab.current = true;
      setSelectedTab(1);
      scroller.scrollTo(`step1`, {
        duration: 1000,
        // delay: 50,
        smooth: numTasks < 15 ? true : false,
        // containerId: "ContainerElementID",
        offset: -135, // Scrolls to element + 50 pixels down the page
      });
    } else if (value === "pageLoad2") {
      isChangingTab.current = true;
      setSelectedTab(1);
      scroller.scrollTo(`Update-system-packages`, {
        duration: 1000,
        // delay: 50,
        smooth: numTasks < 15 ? true : false,
        // containerId: "ContainerElementID",
        offset: -135, // Scrolls to element + 50 pixels down the page
      });
    } else if (value !== "scroll") {
      isChangingTab.current = true;
      setSelectedTab(value);
      scroller.scrollTo(`step${value.toString()}`, {
        duration: 1000,
        // delay: 50,
        smooth: numTasks < 15 ? true : false,
        // containerId: "ContainerElementID",
        offset: -65, // Scrolls to element + 50 pixels down the page
      });
      const timer = setTimeout(() => {
        isChangingTab.current = false;
      }, 1000);
    }
  };

  const handleScrollToAnchor = () => {
    // const anchor = window.location.hash;
    if (window.location.hash) {
      scroller.scrollTo(window.location.hash.substring(1), {
        duration: 1500,
        delay: 50,
        smooth: true,
        // containerId: "ContainerElementID",
        offset: -135, // Scrolls to element + 50 pixels down the page
      });
    }
  };

  useEffect(() => {
    // Scroll to the top of the page when the component loads
    setSelectedTab(1);
    handleSelectedTab("", "pageLoad");

    handleScrollToAnchor();
  }, []);

  useEffect(() => {
    handleScrollToAnchor();
    setAnchor(window.location.hash);
  }, [searchParams]);

  return (
    <Box component="ul" display="flex" flexDirection="column" py={3}>
      <Grid item xs={12} sm={12}>
        <Grid
          container
          spacing={2}
          // maxWidth={isNotMobile ? `calc(100vw - ${contentWidth})` : "inherit"}
        >
          {isNotMobile ? (
            <Grid item xs={2} sm={4} md={3} lg={2}>
              <Box
                sx={{
                  position: "sticky",
                  top: "65px",
                  marginTop: "15px",
                  alignSelf: "flex-start",
                  marginRight: "10px",
                  ...shorthands.padding("10px", "10px"),
                  padding: 1,
                }}
              >
                <Card>
                  <TabList
                    vertical
                    selectedValue={selectedTab}
                    onTabSelect={(event, value) =>
                      handleSelectedTab(event, value.value)
                    }
                    appearance="subtle"
                    as="div"
                    size="medium"
                    reserveSelectedTabSpace={false}
                  >
                    {content.map((step) => (
                      <Tab
                        value={step.section}
                        key={`step${step.section}`}
                        style={{ textAlign: "start" }}
                      >
                        {step.section}. {step.title}
                        <Link
                          activeClass="active"
                          to={`step${step.section}`}
                          spy={true}
                          smooth={true}
                          hashSpy={false}
                          // duration={100}
                          // delay={100}
                          isDynamic={true}
                          onSetActive={(e) => handleSelectedTab(e, "scroll")}
                          // onSetInactive={(e) => handleNavUpdateOnScroll(e)}
                          ignoreCancelEvents={false}
                          // spyThrottle={100}
                        />
                      </Tab>
                    ))}
                  </TabList>
                </Card>
              </Box>
            </Grid>
          ) : null}

          <Grid
            item
            xs={isNotMobile ? 10 : 12}
            sm={isNotMobile ? 9 : 12}
            md={isNotMobile ? 9 : 12}
            lg={isNotMobile ? 10 : 12}
            sx={{
              top: "65px",
              marginTop: "10px",
              // alignSelf: "flex-start",
              // marginRight: "15px",
              // ...shorthands.padding("10px", "10px"),
            }}
          >
            <Grid
              item
              xs={12}
              md={12}
              p={isNotMobile ? 0 : 0}
              pt={2}
              mt={isNotMobile ? 1 : -7}
            >
              <Body1>{description}</Body1>
            </Grid>
            {content.map((step) => (
              <Grid
                container={isNotMobile ? true : false}
                item
                spacing={isNotMobile ? 2 : undefined}
                key={step.section}
                xs={12}
                // p={isNotMobile ? 0 : 1}
              >
                <Grid item xs={12} md={12}>
                  <Element
                    id={`step${step.section.toString()}`}
                    name={`step${step.section.toString()}`}
                  >
                    <Box py={1}>
                      <Title3>
                        {step.section}. {step.title}
                      </Title3>
                    </Box>
                    <Box py={1}>
                      <Body1>{step.description}</Body1>
                    </Box>
                  </Element>
                </Grid>

                {step.tasks.map((task, index) => (
                  <Fragment key={`task${index + 1}`}>
                    {/* User Activity */}
                    <Grid
                      item
                      xs={12}
                      md={task.backgroundActivity.length === 0 ? 12 : 6}
                      className={styles.userActivity}
                      color={"white"}
                      mb={
                        isNotMobile
                          ? 2
                          : task.backgroundActivity.length === 0
                          ? 2
                          : 0
                      }
                      pb={3}
                      sx={
                        {
                          borderRadius: GenerateRadiusUserTask(
                            task.backgroundActivity.length > 0,
                            isNotMobile
                          ),
                        }
                        // isNotMobile
                        //   ? { borderRadius: "15px 0px 0px 15px" }
                        //   : { borderRadius: "15px 15px 0px 0px" }
                      }
                    >
                      <Box px={isNotMobile ? 2 : 0} pl={isNotMobile ? 0 : 0}>
                        <Box p={isNotMobile ? 0 : 2} pb={isNotMobile ? 2 : 2}>
                          <Element
                            id={replaceAll(task.title, " ", "-")}
                            name={replaceAll(task.title, " ", "-")}
                          />
                          <Subtitle2>
                            {step.section}.{index + 1} User Activity{" "}
                          </Subtitle2>
                        </Box>
                        {/* Load the User Activity component */}
                        <Box px={isNotMobile ? 0 : 1}>
                          <UserActivity userActivity={task.userActivity} />
                        </Box>
                      </Box>
                    </Grid>

                    {/* Background Activity */}
                    {task.backgroundActivity.length === 0 ? null : (
                      <Grid
                        item
                        xs={12}
                        md={6}
                        className={styles.backgroundActivity}
                        color={"white"}
                        mb={2}
                        pb={3}
                        sx={
                          {
                            borderRadius: GenerateRadiusBackgroundTask(
                              task.backgroundActivity.length > 0,
                              isNotMobile
                            ),
                          }
                          // isNotMobile
                          //   ? { borderRadius: "0px 15px 15px 0px" }
                          //   : { borderRadius: "0px 0px 15px 15px" }
                        }
                      >
                        <Box px={isNotMobile ? 2 : 0} pl={isNotMobile ? 0 : 0}>
                          <Box p={isNotMobile ? 0 : 2} pb={isNotMobile ? 2 : 2}>
                            <Subtitle2>
                              {step.section}.{index + 1} Background Activity
                            </Subtitle2>
                          </Box>

                          {/* Load the Background Activity component */}
                          {/* <Box pr={2}>{task.backgroundActivity}</Box> */}
                          <Box px={isNotMobile ? 0 : 1} mb={2}>
                            <BackgroundActivity
                              backgroundActivity={task.backgroundActivity}
                            />
                          </Box>
                        </Box>
                      </Grid>
                    )}
                  </Fragment>
                ))}
                <Grid item xs={12} md={12} ml={-1} mb={2}>
                  <Divider appearance="strong">
                    End Section {step.section} - {step.title}
                  </Divider>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
