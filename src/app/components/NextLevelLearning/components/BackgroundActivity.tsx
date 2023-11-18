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
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Link,
} from "@fluentui/react-components";
import { Box, Stack, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Linkify from "react-linkify";
import { IBackgroundActivity } from "../../../types/types";
import BlogCodeBlock from "../../../components/code-block";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import { SetStateAction, useState } from "react";

import Scroll from "react-scroll";
var Element = Scroll.Element;

type Props = {
  backgroundActivity: IBackgroundActivity[];
};

const replaceAll = (str: any, find: any, replace: any) => {
  return str.replace(new RegExp(find, "g"), replace);
};

export default function BackgroundActivity({ backgroundActivity }: Props) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const [imageOpen, setImageOpen] = useState(false);
  const [image, setImage] = useState("");

  const [codeBlockOpen, setCodeBlockOpen] = useState(false);
  const [codeBlock, setCodeBlock] = useState("");

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
              <Link href={decoratedHref} target="_blank">
                {decoratedText}
                <OpenInNewIcon sx={{ fontSize: "10px", ml: "2px" }} />
              </Link>
            )}
          >
            <Box px={2} pb={1}>
              {backgroundActivity.map((activity) => {
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
                      {activity.Value.split("\r\n").map((item, i) => {
                        return (
                          <Box py={0.5} key={item}>
                            <Body1>{item}</Body1>
                          </Box>
                        );
                      })}
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
