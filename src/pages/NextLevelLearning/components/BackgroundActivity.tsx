import {
  Card,
  CardFooter,
  CardHeader,
  CardPreview,
  Image,
  Button,
  Subtitle1,
  Body1,
  Text,
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
import { IBackgroundActivity } from "../../../types/types";
import BlogCodeBlock from "../../../components/code-block";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import { SetStateAction, useState } from "react";
import React from "react";

type Props = {
  backgroundActivity: IBackgroundActivity[];
};

export default function BackgroundActivity({ backgroundActivity }: Props) {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");

  const [codeBlockOpen, setCodeBlockOpen] = useState(false);
  const [codeBlock, setCodeBlock] = useState("");

  const [maxWidth, setMaxWidth] = React.useState<DialogProps["maxWidth"]>("lg");
  const handleOpen = (imageUrl: SetStateAction<string>) => {
    setOpen(true);
    setImage(imageUrl);
  };
  const handleClose = () => setOpen(false);

  const handleCodeBlockOpen = (codeBlock: SetStateAction<any>) => {
    console.log("codeBlock", codeBlock);
    setCodeBlock(codeBlock);
    setCodeBlockOpen(true);
  };

  const handleCodeBlockClose = () => setCodeBlockOpen(false);

  return (
    <Card>
      <CardHeader
      // header={
      //   <Typography variant="body1">
      //     Install MDE for Linux on Centos manually
      //   </Typography>
      // }
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
              {backgroundActivity.map((activity) => {
                if (activity.Type === "Title") {
                  return (
                    <div key={activity.Value}>
                      <Box py={1}>
                        <Subtitle1>{activity.Value}</Subtitle1>
                      </Box>
                    </div>
                  );
                } else if (activity.Type === "Code") {
                  return (
                    <div key={activity.Value}>
                      <Box py={1} maxWidth={"1200px"}>
                        <div style={{ display: "flex" }}>
                          <Button
                            style={{ marginLeft: "auto", marginBottom: "5px" }}
                            size="small"
                            icon={<AspectRatioIcon fontSize="small" />}
                            onClick={() =>
                              handleCodeBlockOpen(
                                <BlogCodeBlock
                                  code={activity.Value}
                                  showLineNumbers={true}
                                  language={"shell"}
                                  startingLineNumber={1}
                                />
                              )
                            }
                            title="Expand Code Block"
                          />
                        </div>
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
                      <div style={{ display: "flex" }}>
                        <Button
                          style={{ marginLeft: "auto", marginBottom: "5px" }}
                          size="small"
                          icon={<AspectRatioIcon fontSize="small" />}
                          onClick={() =>
                            handleOpen(process.env.PUBLIC_URL + activity.Value)
                          }
                          title="Expand Image"
                        />
                      </div>
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
                      <Box py={1}>
                        <Body1>{activity.Value}</Body1>
                      </Box>
                    </div>
                  );
                } else if (activity.Type === "Note") {
                  return (
                    <div key={activity.Value}>
                      <Box py={1}>
                        <Text italic>{activity.Value}</Text>
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
            {/* Image dialog */}
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
            {/* Code Block dialog */}
            <Dialog
              open={codeBlockOpen}
              maxWidth={maxWidth}
              onClose={handleCodeBlockClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Paper
                elevation={3}
                sx={{
                  p: 1,
                  minWidth: { lg: "600px", xs: "100vw" },
                }}
              >
                {codeBlock}
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
