"use client";
import { Box, Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  Body2,
  Title1,
  makeStyles,
  shorthands,
  tokens,
  Image,
  TabValue,
  SelectTabEvent,
  SelectTabData,
  TabList,
  Tab,
  Divider,
  Card,
  CardHeader,
  CardPreview,
} from "@fluentui/react-components";
import nllDataFiles from "../content/nllDataFiles.json";
import { useContext, useEffect, useState } from "react";
import { PageInfoContext } from "../providers";
import Link from "next/link";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

// Material Icons
import GitHubIcon from "@mui/icons-material/GitHub";
import { useRouter } from "next/navigation";

const useStyles = makeStyles({
  container: {
    ...shorthands.gap("16px"),
    display: "flex",
    flexDirection: "column",
    alignItems: "baseline",
  },
  card: {
    borderTopLeftRadius: "16px",
    borderTopRightRadius: "16px",
    borderBottomLeftRadius: "16px",
    borderBottomRightRadius: "16px",
    width: "300px",
    "&:hover": {
      boxShadow: "none",
    },
  },
  cardBack: {
    paddingLeft: "3px",
    paddingRight: "3px",
    paddingBottom: "3px",
    paddingTop: "3px",
    boxShadow: "none",
    cursor: "pointer",
    borderTopLeftRadius: "16px",
    borderTopRightRadius: "16px",
    borderBottomLeftRadius: "16px",
    borderBottomRightRadius: "16px",
    backgroundColor: "unset",
    "&:hover": {
      backgroundImage:
        "linear-gradient(90deg, rgb(0, 120, 212) 0%, rgb(0, 120, 212) 22.92%, rgb(169, 211, 242) 68.75%, rgb(218, 126, 208) 100%)",
    },
  },
  cardPreview: {
    paddingTop: "0px",
    paddingLeft: "15px",
    paddingRight: "15px",
    paddingBottom: "15px",
  },
  cardHeader: {
    fontWeight: tokens.fontWeightBold,
  },
});

const Home = () => {
  const styles = useStyles();
  const { pageInfo, setPageInfo } = useContext(PageInfoContext);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const router = useRouter();

  const replaceAll = (str: any, find: any, replace: any) => {
    return str.replace(new RegExp(find, "g"), replace);
  };

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

  uniqueSections.sort((a: any, b: any) => {
    let titlea = a.toLowerCase(),
      titleb = b.toLowerCase();

    if (titlea < titleb) {
      return -1;
    }
    if (titlea > titleb) {
      return 1;
    }
    return 0;
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

  // Tabs
  const [selectedValue, setSelectedValue] = useState<TabValue>(
    uniqueSections[0]
  );

  const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    setSelectedValue(data.value);
  };

  const handleCardClick = (path: string) => {
    router.push(path);
  };

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Box
      p={matches ? 0 : 2}
      style={{ minHeight: matches ? "calc(100vh - 47px)" : "unset" }}
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
          accompanied by example tasks a user would typically perform with the
          additional insight into the underlying actions that take place either
          on the device or in the cloud.
        </Body2>
        <Body2>
          The layout is designed to clearly display two types of activities.
          &apos;User Activity&apos; represents the actions performed by a user
          when deploying or making changes. &apos;Background Activity&apos;
          illustrates the modifications made to a service or configuration.”
        </Body2>
        <Body2>
          Background activities may include: Logs, API Calls, Cloud service
          changes, and configuration changes.
        </Body2>
        {/* <Box pl={3}>
          <ul>
            <li>Logs</li>
            <li>API Calls</li>
            <li>Cloud service changes</li>
            <li>Configurations</li>
          </ul>
        </Box> */}
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
      <Divider />

      <Grid container minHeight={"400px"}>
        {isClient ? (
          <Grid item xs={2} spacing={2} mt={2} mb={matches ? 0 : "66px"}>
            <Box display={"flex"}>
              <TabList
                defaultSelectedValue={selectedValue}
                selectedValue={selectedValue}
                onTabSelect={onTabSelect}
                vertical
                appearance="subtle"
              >
                {uniqueSections.map((section: string) => {
                  const title = replaceAll(section, "/", " > ");
                  return (
                    <Tab key={section} id={section} value={section}>
                      {section}
                    </Tab>
                  );
                })}
              </TabList>
            </Box>
          </Grid>
        ) : null}
        <Grid item xs={9}>
          <Grid container gap={2} pt={2}>
            {nllDataFiles.map((file) =>
              file.data.path.split("/").slice(0, -1).join("/") ===
              selectedValue ? (
                <Card
                  key={file.data.path}
                  className={styles.cardBack}
                  onClick={() => handleCardClick(file.data.path)}
                >
                  <Card className={styles.card}>
                    <CardHeader
                      className={styles.cardHeader}
                      header={file.data.title}
                    ></CardHeader>
                    <CardPreview className={styles.cardPreview}>
                      {file.data.description}
                    </CardPreview>
                  </Card>
                </Card>
              ) : null
            )}
          </Grid>
        </Grid>
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
