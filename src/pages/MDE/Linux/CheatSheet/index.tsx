import {
  Body1,
  Button,
  Caption1,
  Card,
  CardFooter,
  CardHeader,
  CardPreview,
  Text,
  makeStyles,
  shorthands,
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionToggleEventHandler,
} from "@fluentui/react-components";
import BlogCodeBlock from "../../../../components/code-block";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import Scroll from "react-scroll";

const useStyles = makeStyles({
  card: {
    ...shorthands.margin("auto"),
    // width: "720px",
    maxWidth: "100%",
  },
});

const cheatsGeneral = [
  {
    title: "Kernal Version",
    description: "Check kernal version / system information",
    code: "uname -a",
  },
  {
    title: "Process ID",
    description: "Check process id",
    code: "ps aux | grep mdatp",
  },
  {
    title: "Kill Process",
    description: "Kill process",
    code: "kill -9 9112",
  },
  {
    title: "Display Linux processes",
    description: "Display Linux processes",
    code: "top",
  },
  {
    title: "List of open files",
    description: "List of open files",
    code: "lsof | grep mdatp",
  },
  {
    title: "Display CPU information",
    description: "Display CPU information",
    code: "cat /proc/cpuinfo",
  },
  {
    title: "CPU free memory",
    description: "Display amount of free and used memory in the system",
    code: "free -h",
  },
  {
    title: "Find file by name",
    description: "",
    code: "find /home/labmin -name M*",
  },
  {
    title: "Find files by size",
    description: "",
    code: "find /home/labmin -size +8k\nfind /home/labmin -size +100M",
  },
  {
    title: "Compare two files",
    description: "",
    code: "diff MicrosoftDefenderATPOnboardingLinuxServer.py  MicrosoftDefenderATPOnboardingLinuxServerOld.py",
  },
  {
    title: "Compress files",
    description: "",
    code: `tar cf [compressed_file.tar] [file_name]
tar czf [compressed_file.tar.gz]`,
  },
  {
    title: "Uncompress files",
    description: "",
    code: `tar czf [compressed_file.tar.gz]
gzip [file_name]`,
  },
  {
    title: "Check disk space",
    description: "",
    code: "df -h",
  },
  {
    title: "Check disk space for a specific folder",
    description: "",
    code: "du -sh /home/labmin",
  },
  {
    title: "Shell",
    description: "What shell are we using?",
    code: "echo $SHELL",
  },
];

const cheatsInstall = [
  {
    title: "Get Distro version",
    description: "",
    code: "cat /etc/os-release",
  },
  {
    title: "Check if MDATP is installed",
    description: "",
    code: "which mdatp",
  },
  {
    title: "Check daemon status",
    description: "",
    code: "service mdatp status",
  },
  {
    title: "Fedora",
    description:
      "Had to install pcre because the libpcre.so.1 module could not be found",
    code: `yum update
yum install yum-utils
yum-config-manager --add-repo=https://packages.microsoft.com/config/fedora/38/prod.repo
rpm --import http://packages.microsoft.com/keys/microsoft.asc
yum install mdatp
yum install pcre`,
  },
  {
    title: "Oracle",
    description: "",
    code: `yum update
yum install yum-utils
yum-config-manager --add-repo=https://packages.microsoft.com/config/rhel/8/prod.repo
rpm --import http://packages.microsoft.com/keys/microsoft.asc
yum install mdatp`,
  },
  {
    title: "RHEL via Puppet",
    description: "",
    code: `yum update
yum install puppet-agent
yum install yum-utils
rpm -U http://yum.puppet.com/puppet6-release-el-9.noarch.rpm
yum install puppet-agent
puppet agent -t

#On Puppet server
/opt/puppetlabs/bin/puppetserver ca sign --all`,
  },
  {
    title: "SUSE",
    description: "",
    code: `zypper update
rpm --import http://packages.microsoft.com/keys/microsoft.asc
zypper install mdatp`,
  },
  {
    title: "Ubuntu",
    description: "",
    code: `apt-get install update
apt-get install libplist-utils
apt-get install curl
curl -o microsoft.list https://packages.microsoft.com/config/ubuntu/20.04/prod.list
mv ./microsoft.list /etc/apt/sources.list.d/microsoft-prod.list
apt-get install gpg
curl -sSL https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/microsoft.gpg > /dev/null
apt-get install apt-transport-https
apt-get update
apt-get install mdatp`,
  },
];

const cheatsSSH = [
  {
    title: "Get RSA from PEM",
    description: "",
    code: `openssl rsa -in linkp.pem -out key.key`,
  },
  {
    title: "Copy file from Windows to Linux with SCP",
    description: "",
    code: `scp -i C:\\Users\\masontorres\\.ssh\\id_rsa\\linkp.key 'C:\\Users\\masontorres\\Downloads\\WindowsDefenderATPOnboardingPackage.zip' labmin@10.5.1.4:~`,
  },
];

const cheatsMDATP = [
  {
    title: "Check license",
    description: "",
    code: `mdatp health --field org_id`,
  },
  {
    title: "Check health",
    description: "",
    code: `mdatp health --field healthy`,
  },
  {
    title: "Check Service",
    description: "Check service status",
    code: `service auditd status `,
  },
  {
    title: "Real Time Protection - Enable",
    description: "",
    code: `mdatp config real-time-protection --value enabled`,
  },
  {
    title: "Real Time Protection - Disable",
    description: "",
    code: `mdatp config real-time-protection --value disabled`,
  },
  {
    title: "Potentially Unwanted Applications PAU - off",
    description: "",
    code: `mdatp threat policy set --type potentially_unwanted_application --action off`,
  },
  {
    title: "Potentially Unwanted Applications PAU - audit",
    description: "",
    code: `mdatp threat policy set --type potentially_unwanted_application --action audit`,
  },
  {
    title: "Potentially Unwanted Applications PAU - block",
    description: "",
    code: `mdatp threat policy set --type potentially_unwanted_application --action block`,
  },
  {
    title: "eBPF sensor (Extended Berkley Packet Filter) - enable",
    description: "",
    code: `mdatp config ebpf-supplementary-event-provider --value enabled`,
  },
  {
    title: "eBPF sensor (Extended Berkley Packet Filter) - disable",
    description: "",
    code: `mdatp config ebpf-supplementary-event-provider --value disabled`,
  },
];

const cheatsRepos = [
  {
    title: "Debian - Ubunutu",
    description: "",
    code: `apt-cache policy | grep microsoft
or
suOdo grep -Erh ^deb /etc/apt/sources.list* | grep microsoft`,
  },
  {
    title: "RPM - RedHat, Fedora, Oracle",
    description: "",
    code: `sudo dnf repolist | grep microsoft
or
yum repolist | grep microsoft`,
  },
  {
    title: "SUSE, openSUSE",
    description: "",
    code: `zypper lr | grep microsoft`,
  },
  {
    title: "Arch Linux, EndeavourOS and Manjaro Linux",
    description: "",
    code: ``,
  },
];

const cheatsLogs = [
  {
    title: "Log location",
    description: "",
    code: `/var/log/microsoft/mdatp`,
  },
  {
    title: "Please run the below commands to check permissions:",
    description: "",
    code: `stat /var
stat /var/log
stat /var/log/microsoft`,
  },
  {
    title:
      "The 'Access' should show permissions matching: (0755/drwxr-xr-x) If they do not match, update them with the below commands",
    description: "",
    code: `chmod 755 /var
chmod 755 /var/log
chmod 755 /var/log/microsoft

sudo journalctl --no-pager | grep 'microsoft-mdatp' > installon.log
sudo journalctl --no-pager | grep 'postinstall end' > installon.log`,
  },
];

const MDELinuxCheatSeet = () => {
  const styles = useStyles();
  const [openItems, setOpenItems] = React.useState(["1"]);
  const handleToggle: AccordionToggleEventHandler<string> = (event, data) => {
    setOpenItems(data.openItems);
  };
  let scroll = Scroll.animateScroll;

  useEffect(() => {
    // Scroll to the top of the page when the component loads
    scroll.scrollToTop();
  }, []);

  return (
    // <div>
    //     <h1>MDE Linux Cheat Sheet</h1>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Box pt={2}>
            <Typography variant="body2" component="div" gutterBottom>
              Use this cheat sheet when you know what you need to do but can't
              remember that one command to do it.
            </Typography>
          </Box>
          <Accordion
            openItems={openItems}
            onToggle={handleToggle}
            multiple
            collapsible
          >
            <AccordionItem value="1">
              <AccordionHeader>General</AccordionHeader>
              <AccordionPanel>
                <Stack spacing={2}>
                  {cheatsGeneral.map((cheat) => {
                    return (
                      <Card className={styles.card} key={cheat.title}>
                        <CardHeader
                          header={
                            <Typography variant="body1">
                              {cheat.title}
                            </Typography>
                          }
                          // description={<Caption1>5h ago · About us - Overview</Caption1>}
                        />

                        <CardPreview>
                          <Stack>
                            <Box px={3} pb={1}>
                              <Text>{cheat.description}</Text>
                            </Box>
                          </Stack>
                          <Stack>
                            <Box pl={3} pr={3}>
                              <BlogCodeBlock
                                code={cheat.code}
                                showLineNumbers={true}
                                language={"shell"}
                                startingLineNumber={1}
                              />
                            </Box>
                          </Stack>
                        </CardPreview>

                        <CardFooter>
                          {/* <Button icon={<ArrowReplyRegular fontSize={16} />}>Reply</Button>
                                  <Button icon={<ShareRegular fontSize={16} />}>Share</Button> */}
                        </CardFooter>
                      </Card>
                    );
                  })}
                </Stack>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem value="2">
              <AccordionHeader>Install</AccordionHeader>
              <AccordionPanel>
                <Stack spacing={2}>
                  {cheatsInstall.map((cheat) => {
                    return (
                      <Card className={styles.card} key={cheat.title}>
                        <CardHeader header={<Body1>{cheat.title}</Body1>} />

                        <CardPreview>
                          <Stack>
                            <Box px={3} pb={1}>
                              <Text>{cheat.description}</Text>
                            </Box>
                          </Stack>
                          <Stack>
                            <Box pl={3} pr={3}>
                              <BlogCodeBlock
                                code={cheat.code}
                                showLineNumbers={true}
                                language={"shell"}
                                startingLineNumber={1}
                              />
                            </Box>
                          </Stack>
                        </CardPreview>

                        <CardFooter></CardFooter>
                      </Card>
                    );
                  })}
                </Stack>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem value="3">
              <AccordionHeader>SSH</AccordionHeader>
              <AccordionPanel>
                <Stack spacing={2}>
                  {cheatsSSH.map((cheat) => {
                    return (
                      <Card className={styles.card} key={cheat.title}>
                        <CardHeader header={<Body1>{cheat.title}</Body1>} />

                        <CardPreview>
                          <Stack>
                            <Box px={3} pb={1}>
                              <Text>{cheat.description}</Text>
                            </Box>
                          </Stack>
                          <Stack>
                            <Box pl={3} pr={3}>
                              <BlogCodeBlock
                                code={cheat.code}
                                showLineNumbers={true}
                                language={"shell"}
                                startingLineNumber={1}
                              />
                            </Box>
                          </Stack>
                        </CardPreview>

                        <CardFooter></CardFooter>
                      </Card>
                    );
                  })}
                </Stack>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem value="4">
              <AccordionHeader>Repositories</AccordionHeader>
              <AccordionPanel>
                <Stack spacing={2}>
                  {cheatsRepos.map((cheat) => {
                    return (
                      <Card className={styles.card} key={cheat.title}>
                        <CardHeader header={<Body1>{cheat.title}</Body1>} />

                        <CardPreview>
                          <Stack>
                            <Box px={3} pb={1}>
                              <Text>{cheat.description}</Text>
                            </Box>
                          </Stack>
                          <Stack>
                            <Box pl={3} pr={3}>
                              <BlogCodeBlock
                                code={cheat.code}
                                showLineNumbers={true}
                                language={"shell"}
                                startingLineNumber={1}
                              />
                            </Box>
                          </Stack>
                        </CardPreview>

                        <CardFooter></CardFooter>
                      </Card>
                    );
                  })}
                </Stack>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem value="5">
              <AccordionHeader>MDATP</AccordionHeader>
              <AccordionPanel>
                <Stack spacing={2}>
                  {cheatsMDATP.map((cheat) => {
                    return (
                      <Card className={styles.card} key={cheat.title}>
                        <CardHeader header={<Body1>{cheat.title}</Body1>} />

                        <CardPreview>
                          <Stack>
                            <Box px={3} pb={1}>
                              <Text>{cheat.description}</Text>
                            </Box>
                          </Stack>
                          <Stack>
                            <Box pl={3} pr={3}>
                              <BlogCodeBlock
                                code={cheat.code}
                                showLineNumbers={true}
                                language={"shell"}
                                startingLineNumber={1}
                              />
                            </Box>
                          </Stack>
                        </CardPreview>

                        <CardFooter></CardFooter>
                      </Card>
                    );
                  })}
                </Stack>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem value="6">
              <AccordionHeader>Logs</AccordionHeader>
              <AccordionPanel>
                <Stack spacing={2}>
                  {cheatsLogs.map((cheat) => {
                    return (
                      <Card className={styles.card} key={cheat.title}>
                        <CardHeader header={<Body1>{cheat.title}</Body1>} />

                        <CardPreview>
                          <Stack>
                            <Box px={3} pb={1}>
                              <Text>{cheat.description}</Text>
                            </Box>
                          </Stack>
                          <Stack>
                            <Box pl={3} pr={3}>
                              <BlogCodeBlock
                                code={cheat.code}
                                showLineNumbers={true}
                                language={"shell"}
                                startingLineNumber={1}
                              />
                            </Box>
                          </Stack>
                        </CardPreview>

                        <CardFooter></CardFooter>
                      </Card>
                    );
                  })}
                </Stack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={8}></Grid>
      </Grid>
    </Box>
    // </div>
  );
};

export default MDELinuxCheatSeet;
