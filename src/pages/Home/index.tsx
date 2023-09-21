import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import nllDataFiles from "../../content/nllDataFiles.json";
import { useContext } from "react";
import { PageInfoContext } from "../../appContext";

const Home = () => {
  const { pageInfo, setPageInfo } = useContext(PageInfoContext);

  return (
    <Box mt={3}>
      <h1>Next Level Learning</h1>
      <Typography variant="h6" mb={2} mt={2}>
        Welcome to the Next Level Learning experience! Check out some of the
        available content below.
      </Typography>
      <Typography variant="h6" mb={1}>
        Linux Microsoft Defender for Endpoint
      </Typography>
      <List>
        {nllDataFiles.map((file) => (
          <ListItem disablePadding key={file.data.path}>
            <ListItemButton
              component="a"
              href={"#" + file.data.path}
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
