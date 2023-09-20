# Getting Started with Next Level Learning

This GitHub repo is used to build the Next Level Learning site.

Add content to the site by uploading json files to /src/content/json

Create your conent using the following components.

```json
[
  {
    "Type": "Title",
    "Value": "Review recommendations"
  },
  {
    "Type": "Description",
    "Value": "Navigate to https://security.microsoft.com/security-recommendations ..."
  },
  {
    "Type": "Image",
    "Value": "/images/nll/oracle/VulnerabilityManagement-Recommendations.png."
  },
  {
    "Type": "Note",
    "Value": "The portal will take some time to update depending on how often the agent reports..."
  },
  {
    "Type": "Code",
    "Value": "sudo uname -r"
  }
]
```

Example content json

```json
{
    "file": "MDELinuxCentosSetup",
    "path": "./json/MDELinuxCentosSetup.json",
    "data": {
      "title": "Centos Setup",
      "path": "mde/linux-setup-centos",
      "section": "MDE",
      "subSection": "Linux",
      "data": [
        {
          "section": 1,
          "title": "Checking Existing Install",
          "description": "What do we have already?",
          "tasks": [
            {
              "step": 1,
              "title": "",
              "userActivity": [
                {
                  "Type": "Title",
                  "Value": "Get Distro Version"
                },
                {
                  "Type": "Description",
                  "Value": "This exercie assumes you have a Linux VM setup and running Centos."
                },
                {
                  "Type": "Code",
                  "Value": "cat /etc/os-release"
                }
              ],
              "backgroundActivity": [
                {
                  "Type": "Title",
                  "Value": "Example output"
                },
                {
                  "Type": "Code",
                  "Value": "NAME=\"CentOS Linux\"\n  VERSION=\"8\"\n  ID=\"centos\"\n  ID_LIKE=\"rhel fedora\"\n  VERSION_ID=\"8\"\n  PLATFORM_ID=\"platform:el8\"\n  PRETTY_NAME=\"CentOS Linux 8\"\n  ANSI_COLOR=\"0;31\"\n  CPE_NAME=\"cpe:/o:centos:centos:8\"\n  HOME_URL=\"https://centos.org/\"\n  BUG_REPORT_URL=\"https://bugs.centos.org/\"\n  CENTOS_MANTISBT_PROJECT=\"CentOS-8\"\n  CENTOS_MANTISBT_PROJECT_VERSION=\"8\""
                }
              ]
            },
            {
              "step": 2,
              "title": "Has MDATP already been installed?",
              "userActivity": [
                {
                  "Type": "Title",
                  "Value": "Check if MDATP is installed"
                },
                {
                  "Type": "Code",
                  "Value": "which mdatp"
                }
              ],
              "backgroundActivity": [
                {
                  "Type": "Title",
                  "Value": "Sample output"
                },
                {
                  "Type": "Code",
                  "Value": "/bin/mdatp"
                }
              ]
            },
            {
              "step": 3,
              "title": "What's the status of the daemon?",
              "userActivity": [
                {
                  "Type": "Title",
                  "Value": "Check daemon status"
                },
                {
                  "Type": "Code",
                  "Value": "service mdatp status"
                },
                {
                  "Type": "Description",
                  "Value": "The above command will only work if the daemon is installed and running."
                }
              ],
              "backgroundActivity": [
                {
                  "Type": "Title",
                  "Value": "Sample output"
                },
                {
                  "Type": "Code",
                  "Value": "● mdatp.service - Microsoft Defender\n              Loaded: loaded (/usr/lib/systemd/system/mdatp.service; enabled; vendor preset: disabled)\n              Active: active (running) since Wed 2023-09-13 19:57:32 UTC; 1h 16min ago\n            Main PID: 4802 (wdavdaemon)\n               Tasks: 159 (limit: 12024)\n              Memory: 322.6M\n              CGroup: /system.slice/mdatp.service\n                      ├─4802 /opt/microsoft/mdatp/sbin/wdavdaemon\n                      ├─4836 /opt/microsoft/mdatp/sbin/wdavdaemon edr 12 11 --log_level info\n                      ├─4923 /opt/microsoft/mdatp/sbin/telemetryd_v2 33\"\n                      └─5504 /opt/microsoft/mdatp/sbin/wdavdaemon unprivileged 265 270 287 289 259 --log_level info"
                }
              ]
            }
          ]
        },
        {
          "section": 2,
          "title": "Envrionment Setup",
          "description": "Getting the environment ready for MDE for Linux on Centos",
          "tasks": [
            {
              "step": 1,
              "title": "Update packages and repos",
              "userActivity": [
                ...
              ],
              "backgroundActivity": [
                ...
              ]
            },
          ]
        },
      ]
    }
}

```

More coming soon...
