import {
  Card,
  CardFooter,
  CardHeader,
  CardPreview,
  Text,
  Image,
} from "@fluentui/react-components";
import { Typography, Box, Stack } from "@mui/material";

import intuneSetupError1 from "../../../../images/intuneSetupError1.png";
import { IBackgroundActivity } from "../../../types/types";
import BlogCodeBlock from "../../../components/code-block";

type Props = {
  backgroundActivity: IBackgroundActivity[];
};

export default function BackgroundActivity({ backgroundActivity }: Props) {
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
          <Box px={2} pb={1}>
            {backgroundActivity.map((activity) => {
              if (activity.Type === "Title") {
                return (
                  <div key={activity.Value}>
                    <Box py={1}>
                      <Typography variant="body1">{activity.Value}</Typography>
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
                      />
                    </Box>
                  </div>
                );
              } else if (activity.Type === "Description") {
                return (
                  <div key={activity.Value}>
                    <Box py={1}>
                      <Text>{activity.Value}</Text>
                    </Box>
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
