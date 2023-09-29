import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
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
} from "@fluentui/react-components";
import nllDataFiles from "../../content/nllDataFiles.json";
import { useContext } from "react";
import { PageInfoContext } from "../../appContext";
import { Link } from "react-router-dom";
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

const Home = () => {
  const styles = useStyles();
  const { pageInfo, setPageInfo } = useContext(PageInfoContext);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  // Get unique sections from source json
  let uniqueSections: any = [];
  nllDataFiles.filter(function (item: { data: any }) {
    var i = uniqueSections.findIndex((x: any) => x === item.data.section);
    if (i <= -1) {
      uniqueSections.push(item.data.section);
    }
    return null;
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
        style={{ paddingTop: matches ? "42px" : "0px" }}
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
      </div>
      <Grid container spacing={2} mt={2} mb={matches ? 0 : "66px"}>
        {uniqueSections.map((section: string) => {
          return (
            <Grid item xs={12} lg={3} key={section}>
              <Card>
                <CardHeader
                  title={section}
                  header={<Title2>{section}</Title2>}
                />
                <CardPreview>
                  <List>
                    {nllDataFiles.map((file) =>
                      file.data.section === section ? (
                        <ListItem disablePadding key={file.data.path}>
                          <ListItemButton
                            component={Link}
                            to={file.data.path}
                            onClick={() =>
                              setPageInfo({
                                ...pageInfo,
                                home: file.data.title,
                              })
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
        <Link to="https://github.com/MasonTorres" target="_blank">
          <GitHubIcon fontSize="small" />
        </Link>
        <Link to="https://www.linkedin.com/in/mason-torres" target="_blank">
          <LinkedInIcon fontSize="small" />
        </Link>
      </Box>
    </Box>
  );
};

export default Home;
