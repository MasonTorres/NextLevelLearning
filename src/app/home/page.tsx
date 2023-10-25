"use client";
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  Body2,
  Card,
  CardHeader,
  CardPreview,
  Subtitle2,
  Title1,
  Title2,
  makeStyles,
  shorthands,
  tokens,
  Image,
  Body1,
  Title3,
} from "@fluentui/react-components";
import nllDataFiles from "../content/nllDataFiles.json";
import { useContext } from "react";
import { PageInfoContext } from "../providers";
import Link from "next/link";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

// Material Icons
import GitHubIcon from "@mui/icons-material/GitHub";

const useStyles = makeStyles({
  container: {
    ...shorthands.gap("16px"),
    display: "flex",
    flexDirection: "column",
    alignItems: "baseline",
  },
});

const replaceAll = (str: any, find: any, replace: any) => {
  return str.replace(new RegExp(find, "g"), replace);
};

const Home = () => {
  const styles = useStyles();
  const { pageInfo, setPageInfo } = useContext(PageInfoContext);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  // Get unique sections from source json
  let uniqueSections: any = [];
  nllDataFiles.filter(function (item: { data: any }) {
    var i = uniqueSections.findIndex(
      (x: any) => x === item.data.path.split("/").slice(0, -1).join("/")
    );
    if (i <= -1) {
      uniqueSections.push(item.data.path.split("/").slice(0, -1).join("/"));
    }
    return null;
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

  return (
    <Box
      p={matches ? 0 : 2}
      style={{ minHeight: matches ? "calc(100vh - 47px)" : "unset" }}
      // height={"calc(100vh - 47px)"}
      // sx={{ overflowY: "hidden" }}
    >
      <div
        className={styles.container}
        style={{
          paddingTop: matches ? "48px" : "0px",
          paddingLeft: matches ? "12px" : "0px",
        }}
      >
        <Title1>Next Level Learning</Title1>
        <Body2>
          Welcome to the Next Level Learning experience! Check out some of the
          available content below.
        </Body2>
        <Body2>
          The objective of this website is to offer users a collection of
          deployment and troubleshooting scenarios. These scenarios are
          accompanied by task examples that users would typically perform.
          Additionally, the website provides insights into the underlying
          actions that take place either on the device or in the cloud.
        </Body2>
        <Body2>
          The site layout is designed to clearly display two types of
          activities. &apos;User Activity&apos; represents the actions performed
          by a user when deploying or making changes. &apos;Background
          Activity&apos; illustrates the modifications made to a service or
          configuration.”
        </Body2>
        <Body2>Activities may include:</Body2>
        <Box pl={3}>
          <ul>
            <li>Logs</li>
            <li>API Calls</li>
            <li>Cloud service changes</li>
            <li>Configurations</li>
          </ul>
        </Box>
        <Box sx={{ maxWidth: "1000px" }}>
          {pageInfo.theme === "light" ? (
            <Image src="/images/philosophy-01.png" alt="Philosophy" block />
          ) : (
            <Image
              src="/images/philosophy-01-dark.png"
              alt="Philosophy"
              block
            />
          )}
        </Box>
      </div>
      <Grid container spacing={2} mt={2} mb={matches ? 0 : "66px"}>
        {uniqueSections.map((section: string) => {
          return (
            <Grid item xs={12} lg={3} key={section}>
              <Card>
                <CardHeader
                  title={replaceAll("section", "/", " > ")}
                  header={<Title3>{replaceAll(section, "/", " > ")}</Title3>}
                />
                <CardPreview>
                  <List>
                    {nllDataFiles.map((file) =>
                      file.data.path.split("/").slice(0, -1).join("/") ===
                      section ? (
                        <ListItem disablePadding key={file.data.path}>
                          <ListItemButton
                            component={Link}
                            href={file.data.path}
                            onClick={() =>
                              //   setPageInfo({
                              //     ...pageInfo,
                              //     home: file.data.title,
                              //   })
                              null
                            }
                          >
                            <ListItemText primary={file.data.title} />
                          </ListItemButton>
                        </ListItem>
                      ) : null
                    )}
                  </List>
                </CardPreview>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Box
        sx={{
          position: matches ? "absolute" : "relative",
          bottom: matches ? 10 : "52px",
          minHeight: matches ? "15px" : "unset",
          pb: matches ? 0 : 2,
        }}
      >
        Proudly brought to you by Mason Torres{" "}
        <Link href="https://github.com/MasonTorres" target="_blank">
          <GitHubIcon
            fontSize="small"
            sx={{ color: tokens.colorNeutralBackgroundInverted }}
          />
        </Link>
        <Link href="https://www.linkedin.com/in/mason-torres" target="_blank">
          <LinkedInIcon
            fontSize="small"
            sx={{ color: tokens.colorNeutralBackgroundInverted }}
          />
        </Link>
      </Box>
    </Box>
  );
};

export default Home;
