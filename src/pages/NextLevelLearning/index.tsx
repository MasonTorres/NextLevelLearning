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
} from "@fluentui/react-components";
import { Grid, Box, useTheme, useMediaQuery, Container } from "@mui/material";
import { Fragment, SetStateAction, useEffect, useRef, useState } from "react";
import Scroll from "react-scroll";
import UserActivity from "./components/UserActivity";
import BackgroundActivity from "./components/BackgroundActivity";
import { IContent } from "../../types/types";

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
});

export default function NextLevelLearning({
  content,
  description,
}: {
  content: IContent[];
  description: string;
}) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const styles = useStyles();
  const [selectedTab, setSelectedTab] = useState(1);

  let isChangingTab = useRef(false);

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
    } else if (value !== "scroll") {
      isChangingTab.current = true;
      setSelectedTab(value);
      scroller.scrollTo(`step${value.toString()}`, {
        duration: 1000,
        // delay: 50,
        smooth: numTasks < 15 ? true : false,
        // containerId: "ContainerElementID",
        offset: -70, // Scrolls to element + 50 pixels down the page
      });
      const timer = setTimeout(() => {
        isChangingTab.current = false;
      }, 1000);
    }
  };

  useEffect(() => {
    // Scroll to the top of the page when the component loads
    setSelectedTab(1);
    handleSelectedTab("", "pageLoad");
  }, [content]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={matches ? { maxWidth: "calc(100vw - 120px)" } : null}
    >
      <Grid container spacing={2}>
        {/* Section Selector */}
        {matches ? (
          <Grid item xs={2} md={2}>
            <div className={styles.root}>
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
            </div>
          </Grid>
        ) : null}

        {/* User and Background Activity */}
        <Grid item xs={matches ? 10 : 12} md={matches ? 10 : 12} mt={4}>
          <Grid item xs={12} md={12} p={matches ? 0 : 1}>
            <Body1>{description}</Body1>
          </Grid>
          {content.map((step) => (
            <Grid
              container={matches ? true : false}
              spacing={2}
              key={step.section}
              xs={12}
              p={matches ? 0 : 1}
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
                    md={6}
                    style={{ backgroundColor: "#486e9f" }}
                    color={"white"}
                    mb={matches ? 2 : 0}
                    pb={3}
                    sx={
                      matches
                        ? { borderRadius: "15px 0px 0px 15px" }
                        : { borderRadius: "15px 15px 0px 0px" }
                    }
                  >
                    <Box px={matches ? 2 : 0.5}>
                      <Box p={matches ? 0 : 2} pb={matches ? 2 : 0}>
                        <Subtitle2>User Activity {index + 1}</Subtitle2>
                      </Box>
                      {/* Load the User Activity component */}
                      <Box px={2}>
                        <UserActivity userActivity={task.userActivity} />
                      </Box>
                    </Box>
                  </Grid>

                  {/* Background Activity */}
                  <Grid
                    item
                    xs={12}
                    md={6}
                    style={{ backgroundColor: "#6f89b2" }}
                    // style={{ backgroundColor: "#0f548c" }}
                    color={"white"}
                    mb={2}
                    pb={3}
                    sx={
                      matches
                        ? { borderRadius: "0px 15px 15px 0px" }
                        : { borderRadius: "0px 0px 15px 15px" }
                    }
                  >
                    <Box px={matches ? 2 : 0.5}>
                      <Box p={matches ? 0 : 2} pb={matches ? 2 : 0}>
                        <Subtitle2>Background Activity {index + 1}</Subtitle2>
                      </Box>

                      {/* Load the Background Activity component */}
                      {/* <Box pr={2}>{task.backgroundActivity}</Box> */}
                      <Box px={2} mb={2}>
                        <BackgroundActivity
                          backgroundActivity={task.backgroundActivity}
                        />
                      </Box>
                    </Box>
                  </Grid>
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
    </Box>
  );
}
