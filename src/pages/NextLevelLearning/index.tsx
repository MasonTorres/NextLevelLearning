import {
  Divider,
  Tab,
  TabList,
  makeStyles,
  shorthands,
} from "@fluentui/react-components";
import { Typography, Grid, Box } from "@mui/material";
import { Fragment, SetStateAction, useEffect, useRef, useState } from "react";
import Scroll from "react-scroll";
import UserActivity from "./components/UserActivity";
import BackgroundActivity from "./components/BackgroundActivity";
import { IContent } from "../../types/types";

var Link = Scroll.Link;
var Element = Scroll.Element;
var Events = Scroll.Events;
var scroll = Scroll.animateScroll;
var scrollSpy = Scroll.scrollSpy;
var scroller = Scroll.scroller;

const useStyles = makeStyles({
  root: {
    position: "sticky",
    top: "30px",

    // textAlign: "start",
    // justifyItems: "left",
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
}: {
  content: IContent[];
}) {
  const styles = useStyles();
  const [selectedTab, setSelectedTab] = useState(1);

  let isChangingTab = useRef(false);

  const handleSelectedTab = (e: any, value: SetStateAction<any>) => {
    const stepToChangeTo = Number(e.toString().replace("step", ""));

    if (value === "scroll" && isChangingTab.current === false) {
      setSelectedTab(stepToChangeTo);
    } else if (value !== "scroll") {
      isChangingTab.current = true;
      setSelectedTab(value);
      scroller.scrollTo(`step${value.toString()}`, {
        duration: 1000,
        // delay: 50,
        smooth: true,
        // containerId: "ContainerElementID",
        offset: -65, // Scrolls to element + 50 pixels down the page
      });
      const timer = setTimeout(() => {
        isChangingTab.current = false;
      }, 1000);
    }
  };

  useEffect(() => {
    // Scroll to the top of the page when the component loads
    setSelectedTab(1);
    handleSelectedTab("", 1);
  }, [content]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {/* Section Selector */}
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
                <Tab value={step.section} key={`step${step.section}`}>
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

        {/* User and Background Activity */}
        <Grid item xs={10} md={10} mt={4}>
          {content.map((step) => (
            <Grid container item spacing={2} key={step.section} xs={12}>
              <Grid item xs={12} md={12}>
                <Element
                  id={`step${step.section.toString()}`}
                  name={`step${step.section.toString()}`}
                >
                  <Typography variant="h5">
                    {step.section}. {step.title}
                  </Typography>
                  <Typography pl={1} variant="body2" mb={1}>
                    {step.description}
                  </Typography>
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
                    mb={2}
                    pb={3}
                    sx={{ borderRadius: "15px 0px 0px 15px" }}
                  >
                    <Box px={2}>
                      <Typography variant="subtitle1" mb={1}>
                        User Activity {index + 1}
                      </Typography>

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
                    sx={{ borderRadius: "0px 15px 15px 0px" }}
                  >
                    <Box px={1}>
                      <Typography variant="subtitle1" mb={1}>
                        Background Activity {index + 1}
                      </Typography>

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
