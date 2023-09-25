import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  Body2,
  Subtitle2,
  Title1,
  makeStyles,
  shorthands,
} from "@fluentui/react-components";
import nllDataFiles from "../../content/nllDataFiles.json";
import { useContext } from "react";
import { PageInfoContext } from "../../appContext";

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

  return (
    <Box mt={3}>
      <div className={styles.container}>
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
        <Subtitle2>Linux Microsoft Defender for Endpoint</Subtitle2>
      </div>
      <List>
        {nllDataFiles.map((file) => (
          <ListItem disablePadding key={file.data.path}>
            <ListItemButton
              component="a"
              href={file.data.path}
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
        ))}
      </List>
    </Box>
  );
};

export default Home;
