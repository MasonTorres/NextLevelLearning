import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import nllDataFiles from "../../content/nllDataFiles.json";

const Home = () => {
  return (
    <Box mt={3}>
      <h1>Next Level Learning</h1>
      <Typography variant="h5" mb={1} mt={2}>
        Welcome to the Next Level Learning experience! Check out some of the
        available content below.
      </Typography>
      <List>
        {nllDataFiles.map((file) => (
          <ListItem disablePadding key={file.data.path}>
            <ListItemButton component="a" href={"#" + file.data.path}>
              <ListItemText primary={file.data.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Home;
