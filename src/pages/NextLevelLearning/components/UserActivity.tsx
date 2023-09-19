import {
  Card,
  CardFooter,
  CardHeader,
  CardPreview,
  Image,
} from "@fluentui/react-components";
import {
  Typography,
  Box,
  Stack,
  Dialog,
  DialogProps,
  Paper,
} from "@mui/material";
import Linkify from "react-linkify";

import { IUserActivity } from "../../../types/types";
import BlogCodeBlock from "../../../components/code-block";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { SetStateAction, useState } from "react";
import React from "react";

type Props = {
  userActivity: IUserActivity[];
};

const style = {
  position: "absolute" as "absolute",
  top: "40%",
  left: "40%",
  transform: "translate(-30%, -30%)",
  bgcolor: "background.paper",
  borderRadius: "16px",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

export default function UserActivity({ userActivity }: Props) {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");
  const [maxWidth, setMaxWidth] = React.useState<DialogProps["maxWidth"]>("lg");
  const handleOpen = (imageUrl: SetStateAction<string>) => {
    setOpen(true);
    setImage(imageUrl);
  };
  const handleClose = () => setOpen(false);

  return (
    <Card>
      <CardHeader
      // header={<Typography variant="body1">{title}</Typography>}
      // description={<Caption1>5h ago · About us - Overview</Caption1>}
      />

      <CardPreview>
        <Stack>
          <Linkify
            componentDecorator={(decoratedHref, decoratedText, key) => (
              <a target="blank" href={decoratedHref} key={key}>
                {decoratedText}
                <OpenInNewIcon sx={{ fontSize: "10px", ml: "1px" }} />
              </a>
            )}
          >
            <Box px={2} pb={1}>
              {userActivity.map((activity) => {
                if (activity.Type === "Title") {
                  return (
                    <div key={activity.Value}>
                      <Box py={1}>
                        <Typography variant="body1">
                          {activity.Value}
                        </Typography>
                      </Box>
                    </div>
                  );
                } else if (activity.Type === "Code") {
                  return (
                    <div key={activity.Value}>
                      <Box py={1}>
                        <BlogCodeBlock
                          code={activity.Value}
                          showLineNumbers={true}
                          language={"shell"}
                          startingLineNumber={1}
                        />
                      </Box>
                    </div>
                  );
                } else if (activity.Type === "Image") {
                  return (
                    <div key={activity.Value}>
                      <Box py={1}>
                        <Image
                          alt=""
                          src={process.env.PUBLIC_URL + activity.Value}
                          width={"100%"}
                          onClick={() =>
                            handleOpen(process.env.PUBLIC_URL + activity.Value)
                          }
                        />
                      </Box>
                    </div>
                  );
                } else if (activity.Type === "Description") {
                  return (
                    <div key={activity.Value}>
                      <Box py={1}>{activity.Value}</Box>
                    </div>
                  );
                } else if (activity.Type === "Note") {
                  return (
                    <div key={activity.Value}>
                      <Box py={1}>
                        <Typography
                          variant="caption"
                          sx={{ fontStyle: "italic" }}
                        >
                          {activity.Value}
                        </Typography>
                      </Box>
                    </div>
                  );
                }
              })}
              {/* <Text>Do some things</Text>
            <br></br>
            <Image
              alt="intuneSetupError1"
              src={intuneSetupError1}
              width={500}
            /> */}
            </Box>
            <Dialog
              open={open}
              maxWidth={maxWidth}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Paper elevation={3} sx={{ p: 1, pb: 0.5 }}>
                <Image
                  alt=""
                  src={image}
                  fit="default"
                  shape="rounded"
                  bordered={false}
                  block={true}
                />
              </Paper>
            </Dialog>
          </Linkify>
        </Stack>
        <Stack>
          <Box pl={3} pr={3}></Box>
        </Stack>
      </CardPreview>

      <CardFooter>
        {/* <Button icon={<ArrowReplyRegular fontSize={16} />}>Reply</Button>
                      <Button icon={<ShareRegular fontSize={16} />}>Share</Button> */}
      </CardFooter>
    </Card>
  );
}
