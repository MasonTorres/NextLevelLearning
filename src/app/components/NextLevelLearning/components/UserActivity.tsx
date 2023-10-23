import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  CardPreview,
  Image,
  Subtitle1,
  Body1,
  Text,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
} from "@fluentui/react-components";
import { Box, Stack, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Linkify from "react-linkify";

import { IUserActivity } from "../../../types/types";
import BlogCodeBlock from "../../../components/code-block";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import { ReactNode, SetStateAction, useEffect, useState } from "react";

import Scroll from "react-scroll";
var Element = Scroll.Element;

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

const replaceAll = (str: any, find: any, replace: any) => {
  return str.replace(new RegExp(find, "g"), replace);
};

export default function UserActivity({ userActivity }: Props) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const [imageOpen, setImageOpen] = useState(false);
  const [image, setImage] = useState("");

  const [codeBlockOpen, setCodeBlockOpen] = useState(false);
  const [codeBlock, setCodeBlock] = useState<ReactNode>("");

  const handleImageOpen = (imageUrl: SetStateAction<string>) => {
    setImageOpen(true);
    setImage(imageUrl);
  };
  const handleImageClose = () => setImageOpen(false);

  const handleCodeBlockOpen = (codeBlock: SetStateAction<any>) => {
    setCodeBlock(codeBlock);
    setCodeBlockOpen(true);
  };

  const handleCodeBlockClose = () => setCodeBlockOpen(false);

  return (
    <Card>
      <CardHeader />

      <CardPreview>
        <Stack>
          <Linkify
            componentDecorator={(decoratedHref, decoratedText, key) => (
              <a target="blank" href={decoratedHref} key={key} color="red">
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
                        <Element
                          id={replaceAll(activity.Value, " ", "-")}
                          name={activity.Value}
                        >
                          <Subtitle1>{activity.Value}</Subtitle1>
                        </Element>
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
                          onClick={() => handleImageOpen(activity.Value)}
                          title="Expand Image"
                        />
                      </div>
                      <Box py={1}>
                        <Image
                          alt=""
                          src={activity.Value}
                          width={"100%"}
                          onClick={() => handleImageOpen(activity.Value)}
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
            </Box>
            {/* Image dialog */}
            <Dialog
              open={imageOpen}
              onOpenChange={handleImageClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <DialogSurface
                style={{
                  maxWidth: "fit-content",
                  minWidth: matches ? "500px" : "unset",
                }}
              >
                <DialogBody>
                  <DialogTitle></DialogTitle>
                  <DialogContent>
                    <Box>
                      <Image
                        alt=""
                        src={image}
                        fit="default"
                        shape="rounded"
                        bordered={false}
                        block={true}
                        style={{ maxHeight: "calc(100vh - 114px)" }}
                      />
                    </Box>
                  </DialogContent>
                  <DialogActions>
                    <DialogTrigger disableButtonEnhancement>
                      <Button appearance="primary">Close</Button>
                    </DialogTrigger>
                  </DialogActions>
                </DialogBody>
              </DialogSurface>
            </Dialog>
            {/* Code Block dialog */}
            <Dialog
              open={codeBlockOpen}
              onOpenChange={handleCodeBlockClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <DialogSurface
                style={{
                  maxWidth: "fit-content",
                  minWidth: matches ? "500px" : "unset",
                }}
              >
                <DialogBody>
                  <DialogTitle></DialogTitle>
                  <DialogContent>
                    <Box>{codeBlock}</Box>
                  </DialogContent>
                  <DialogActions>
                    <DialogTrigger disableButtonEnhancement>
                      <Button appearance="primary">Close</Button>
                    </DialogTrigger>
                  </DialogActions>
                </DialogBody>
              </DialogSurface>
            </Dialog>
          </Linkify>
        </Stack>
        <Stack>
          <Box pl={3} pr={3}></Box>
        </Stack>
      </CardPreview>

      <CardFooter />
    </Card>
  );
}
