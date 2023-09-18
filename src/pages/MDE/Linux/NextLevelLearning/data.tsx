export const MDELinuxCentosSetup = {
  title: "Centos Setup",
  path: "mde/linux-setup-centos",
  data: [
    {
      section: 1,
      title: "Checking Existing Install",
      description: "What do we have already?",
      tasks: [
        {
          step: 1,
          title: "",
          userActivity: [
            {
              Type: "Title",
              Value: "Get Distro Version",
            },
            {
              Type: "Description",
              Value:
                "This exercie assumes you have a Linux VM setup and running Centos.",
            },
            {
              Type: "Code",
              Value: `cat /etc/os-release`,
            },
          ],
          backgroundActivity: [
            {
              Type: "Title",
              Value: "Example output",
            },
            {
              Type: "Code",
              Value: `NAME="CentOS Linux"
  VERSION="8"
  ID="centos"
  ID_LIKE="rhel fedora"
  VERSION_ID="8"
  PLATFORM_ID="platform:el8"
  PRETTY_NAME="CentOS Linux 8"
  ANSI_COLOR="0;31"
  CPE_NAME="cpe:/o:centos:centos:8"
  HOME_URL="https://centos.org/"
  BUG_REPORT_URL="https://bugs.centos.org/"
  CENTOS_MANTISBT_PROJECT="CentOS-8"
  CENTOS_MANTISBT_PROJECT_VERSION="8"`,
            },
          ],
        },
        {
          step: 2,
          title: "Has MDATP already been installed?",
          userActivity: [
            {
              Type: "Title",
              Value: `Check if MDATP is installed`,
            },
            {
              Type: "Code",
              Value: `which mdatp`,
            },
          ],
          backgroundActivity: [
            {
              Type: "Title",
              Value: "Sample output",
            },
            {
              Type: "Code",
              Value: `/bin/mdatp`,
            },
          ],
        },
        {
          step: 3,
          title: "What's the status of the daemon?",
          userActivity: [
            {
              Type: "Title",
              Value: `Check daemon status`,
            },
            {
              Type: "Code",
              Value: `service mdatp status`,
            },
            {
              Type: "Description",
              Value: `The above command will only work if the daemon is installed and running.`,
            },
          ],
          backgroundActivity: [
            {
              Type: "Title",
              Value: "Sample output",
            },
            {
              Type: "Code",
              Value: `● mdatp.service - Microsoft Defender
              Loaded: loaded (/usr/lib/systemd/system/mdatp.service; enabled; vendor preset: disabled)
              Active: active (running) since Wed 2023-09-13 19:57:32 UTC; 1h 16min ago
            Main PID: 4802 (wdavdaemon)
               Tasks: 159 (limit: 12024)
              Memory: 322.6M
              CGroup: /system.slice/mdatp.service
                      ├─4802 /opt/microsoft/mdatp/sbin/wdavdaemon
                      ├─4836 /opt/microsoft/mdatp/sbin/wdavdaemon edr 12 11 --log_level info
                      ├─4923 /opt/microsoft/mdatp/sbin/telemetryd_v2 33"
                      └─5504 /opt/microsoft/mdatp/sbin/wdavdaemon unprivileged 265 270 287 289 259 --log_level info`,
            },
          ],
        },
      ],
    },
    {
      section: 2,
      title: "Envrionment Setup",
      description: "Getting the environment ready for MDE for Linux on Centos",
      tasks: [
        {
          step: 1,
          title: "Update packages and repos",
          userActivity: [
            {
              Type: "Title",
              Value: "Update system packages",
            },
            {
              Type: "Description",
              Value: "Update packages using the yum package manager",
            },
            {
              Type: "Code",
              Value: `yum update`,
            },
            {
              Type: "Note",
              Value: `Each Linux distrobution has a different package manager. For example, Ubuntu uses apt-get, while Centos uses yum.`,
            },
          ],
          backgroundActivity: [
            {
              Type: "Title",
              Value: "Sample output",
            },
            {
              Type: "Image",
              Value: `/images/nll/CentosYumUpdate.png`,
            },
          ],
        },
        {
          step: 2,
          title: "Update packages and repos",
          userActivity: [
            {
              Type: "Title",
              Value: `Add the Microsoft repo to isntall MDE`,
            },
            {
              Type: "Code",
              Value: `rpm -Uvh https://packages.microsoft.com/config/rhel/8/prod.repo`,
            },
          ],
          backgroundActivity: [
            {
              Type: "Title",
              Value: "Sample yum update output",
            },
            {
              Type: "Description",
              Value: `The RPM package repository will be added to the system. This will allow you to install MDE using yum.`,
            },
            {
              Type: "Description",
              Value: `The output below shows the RPM package being added to the system.`,
            },
            {
              Type: "Code",
              Value: `sudo dnf repolist | grep microsoft`,
            },
            {
              Type: "Code",
              Value: `yum repolist | grep microsoft`,
            },
          ],
        },
        {
          step: 3,
          title: "Update packages and repos",
          userActivity: [
            {
              Type: "Title",
              Value: `We can check the respoiory list to see if the Microsoft repo has been added`,
            },
            {
              Type: "Code",
              Value: `sudo dnf repolist | grep microsoft`,
            },
            {
              Type: "Description",
              Value: `OR`,
            },
            {
              Type: "Code",
              Value: `yum repolist | grep microsoft`,
            },
          ],
          backgroundActivity: [
            {
              Type: "Title",
              Value: "Sample yum update output",
            },
            {
              Type: "Code",
              Value: `microsoftpackages         packages-microsoft-com-prod-insiders-fast`,
            },
          ],
        },
      ],
    },
    {
      section: 3,
      title: "Install MDE for Linux",
      description: "Steps to install the MDE for Linux agent on Centos",
      tasks: [
        {
          step: 1,
          title: "Install the MDE package.",
          userActivity: [
            {
              Type: "Title",
              Value: "Install MDE",
            },
            {
              Type: "Code",
              Value: `sudo yum install mdatp`,
            },
          ],
          backgroundActivity: [
            {
              Type: "Title",
              Value:
                "We can view the logs for this installation in /var/log/microsoft/mdatp/install.log",
            },
            {
              Type: "Code",
              Value: `cat /var/log/microsoft/mdatp/install.log`,
            },
            {
              Type: "Note",
              Value: `The 'cat' command will print the file to the screen. You can also use 'less' to view the file.`,
            },
            {
              Type: "Code",
              Value: `preinstall
  Arguments passed to the preinstall script: 1
  preinstall begin [2023-08-28 16:25:28OURCE +0000] 59060
  correlation id=574704c0-1a70-4b4c-9ca7-7c4df70e3bf8
  Generation installation id
  is_new_install=1, bundle_version=101.23072.0021, branch=release/linux/2307-2
  File /opt/microsoft/mdatp/conf/BuildInfo not found
  NAME="CentOS Linux"
  VERSION="8"
  ID="centos"
  ID_LIKE="rhel fedora"
  VERSION_ID="8"
  PLATFORM_ID="platform:el8"
  PRETTY_NAME="CentOS Linux 8"
  ANSI_COLOR="0;31"
  CPE_NAME="cpe:/o:centos:centos:8"
  HOME_URL="https://centos.org/"
  BUG_REPORT_URL="https://bugs.centos.org/"
  CENTOS_MANTISBT_PROJECT="CentOS-8"
  CENTOS_MANTISBT_PROJECT_VERSION="8"
  DISTRO: centos
  DISTRO_VERSION: 8.5
  DISTRO_FAMILY: redhat
  Installed kernel version: 4.18.0-348.7.1.el8_5.x86_64
  Not a Redhat-7 distribution
  Scenario= Install
  Machine Guid: 488afa59-53f8-3b4c-a537-c9a97144172d
  Creating daemon user
  Daemon user (mdatp) created successfully
  Logging pending telemetry
  [LogTelemetry] Submitting {
          "client": {
              "appVersion": "101.23072.0021",
              "hostname": "centos-01",
              "platform": "Linux",
              "machineGuid": "488afa59-53f8-3b4c-a537-c9a97144172d",
              "orgId": "",
              "productGuid":"c65eac3e-401e-4a0c-82e3-f106f693222f"
          },
          "reports":[
              {
                  "$type":"installationReport",
                  "correlation_id": "574704c0-1a70-4b4c-9ca7-7c4df70e3bf8",
                  "version": "101.23072.0021",
                  "severity": "W",
                  "code":"FileNotExist",
                  "text":"File /opt/microsoft/mdatp/conf/BuildInfo not found"
              }
          ]
      }
  Telemetry Submitted
  [LogTelemetry] result=0
  [LogTelemetry] Submitting {
          "client": {
              "appVersion": "101.23072.0021",
              "hostname": "centos-01",
              "platform": "Linux",
              "machineGuid": "488afa59-53f8-3b4c-a537-c9a97144172d",
              "orgId": "",
              "productGuid":"c65eac3e-401e-4a0c-82e3-f106f693222f"
          },
          "reports":[
              {
                  "$type":"installationReport",
                  "correlation_id": "574704c0-1a70-4b4c-9ca7-7c4df70e3bf8",
                  "version": "101.23072.0021",
                  "severity": "I",
                  "code":"InstallStarted",
                  "text":"is_new_install='1', bundle_version='101.23072.0021', branch='release/linux/2307-2', package=''"
              }
          ]
      }
  Telemetry Submitted
  [LogTelemetry] result=0
  preinstall end [2023-08-28 16:25:29OURCE +0000] 59060
  postinstall
  `,
            },
          ],
        },
      ],
    },
    {
      section: 4,
      title: "Explore the MDATP application",
      description: "Let's check the configuration of the MDE for Linux agent",
      tasks: [
        {
          step: 1,
          title: "Health cehck",
          userActivity: [
            {
              Type: "Title",
              Value: "Health cehck",
            },
            {
              Type: "Code",
              Value: `mdatp health`,
            },
            {
              Type: "Note",
              Value: `The 'mdatp health' command will show the health of the MDE for Linux agent. This will show if the agent is healthy, if there are any health issues, if the agent is licensed, and configurations values.`,
            },
          ],
          backgroundActivity: [
            {
              Type: "Title",
              Value: "Sample output",
            },
            {
              Type: "Code",
              Value: `healthy                                     : true
  health_issues                               : []
  licensed                                    : true
  engine_version                              : "1.1.23080.2007"
  app_version                                 : "101.23082.0006"
  org_id                                      : "e1fb4f0a-1fbe-4181-b3e3-180f6e6ac31f"
  log_level                                   : "info"
  machine_guid                                : "488afa59-53f8-3b4c-a537-c9a97144172d"
  release_ring                                : "InsiderFast"
  product_expiration                          : May 29, 2024 at 04:26:26 AM
  cloud_enabled                               : true
  cloud_automatic_sample_submission_consent   : "safe"
  cloud_diagnostic_enabled                    : false
  passive_mode_enabled                        : false
  behavior_monitoring                         : "disabled"
  real_time_protection_enabled                : true
  real_time_protection_available              : true
  real_time_protection_subsystem              : "fanotify"
  supplementary_events_subsystem              : "ebpf"
  tamper_protection                           : "disabled"
  automatic_definition_update_enabled         : true
  definitions_updated                         : Sep 13, 2023 at 07:57:47 PM
  definitions_updated_minutes_ago             : 114
  definitions_version                         : "1.397.911.0"
  definitions_status                          : "up_to_date"
  edr_early_preview_enabled                   : "disabled"
  edr_device_tags                             : []
  edr_group_ids                               : ""
  edr_configuration_version                   : "30.199999.main.2023.09.12.17-C66E94972A44477D660E4B10FE61A2673B9201934B5797BEF69B78B21746A58B"
  edr_machine_id                              : "138fb85fae1f265d23f2ba51597d3dad830ff411"
  conflicting_applications                    : []
  network_protection_status                   : "stopped"
  network_protection_enforcement_level        : "disabled"
  troubleshooting_mode                        : false`,
            },
          ],
        },
      ],
    },
  ],
};

export const MDELinuxOracleKernelUpdate = {
  title: "Oracle Kernel Update",
  path: "mde/linux-oracle-kernel-update",
  data: [
    {
      section: 1,
      title: "View recommendations",
      description:
        "View recommendations from the Microsoft 365 Defender portal",
      tasks: [
        {
          step: 1,
          title: "",
          userActivity: [
            {
              Type: "Title",
              Value: "Review recommendations",
            },
            {
              Type: "Description",
              Value:
                "Navigate to https://security.microsoft.com/security-recommendations and review the recommendations for your environment.",
            },
            {
              Type: "Image",
              Value: `/images/nll/oracle/VulnerabilityManagement-Recommendations.png`,
            },
          ],
          backgroundActivity: [
            {
              Type: "Title",
              Value: "What is the security portal doing?",
            },
            {
              Type: "Description",
              Value: `The Microsoft 365 Defender portal is analyzing your environment and providing recommendations based on the security posture of your environment.`,
            },
          ],
        },
        {
          step: 2,
          title: "Select a recommendation to review",
          userActivity: [
            {
              Type: "Title",
              Value: `Select a recommendation to review`,
            },
            {
              Type: "Description",
              Value: `In this scenario we are reviewing teh Update Oracle Kernel-uek for Linux`,
            },
            {
              Type: "Image",
              Value: `/images/nll/oracle/VulnerabilityManagement-Recommendations-OracleKernel.png`,
            },
          ],
          backgroundActivity: [
            {
              Type: "Title",
              Value: "What's does the portal show us?",
            },
            {
              Type: "Description",
              Value:
                "The portal advises us to update the kerel, it shows the list of exposed/installed devices, and any associated CVEs related to this vulnerability.",
            },
            {
              Type: "Image",
              Value: `/images/nll/oracle/VulnerabilityManagement-Recommendations-OracleCVE-1.png`,
            },
            {
              Type: "Description",
              Value:
                "We can also see the list of CVEs associated with this vulnerability.",
            },
          ],
        },
      ],
    },
    {
      section: 2,
      title: "Update the kernel",
      description: "Update the kernel on the Oracle Linux server",
      tasks: [
        {
          step: 1,
          title: "What's the current kernel version?",
          userActivity: [
            {
              Type: "Title",
              Value: `Check the current kernel version`,
            },
            {
              Type: "Code",
              Value: `sudo uname -r`,
            },
          ],
          backgroundActivity: [
            {
              Type: "Title",
              Value: "Sample output",
            },
            {
              Type: "Code",
              Value: `5.4.16-2136.322.6.2.el8uek.x86_64`,
            },
          ],
        },
        {
          step: 2,
          title: "How do we fix this?",
          userActivity: [
            {
              Type: "Title",
              Value: `Update the Oracle Kernel`,
            },
            {
              Type: "Description",
              Value:
                "One method is to update the kernel using uptrack. This allows us to update the kernel without rebooting the server.",
            },
            {
              Type: "Code",
              Value: `uptrack-upgrade -y`,
            },
          ],
          backgroundActivity: [
            {
              Type: "Title",
              Value: "Sample output",
            },
            {
              Type: "Image",
              Value: `/images/nll/oracle/VulnerabilityManagement-Recommendations-OracleCVE-2.png`,
            },
            {
              Type: "Description",
              Value:
                "The output shows the kernel being updated. It displays CVE that are being addressed, and the kernel version being installed.",
            },
          ],
        },
        {
          step: 3,
          title: "Confirm the kernel version",
          userActivity: [
            {
              Type: "Title",
              Value: `Check the new kernel version`,
            },
            {
              Type: "Code",
              Value: `sudo uname -r`,
            },
          ],
          backgroundActivity: [
            {
              Type: "Title",
              Value: "Sample output",
            },
            {
              Type: "Code",
              Value: `5.4.17-2136.322.6.2.el8uek.x86_64`,
            },
          ],
        },
      ],
    },
    {
      section: 3,
      title: "Check the Security Portal",
      description: "Check the Microsoft 365 Defender portal for updates",
      tasks: [
        {
          step: 1,
          title: "Check the Security Portal",
          userActivity: [
            {
              Type: "Title",
              Value: `Check the Security Portal`,
            },
            {
              Type: "Description",
              Value: `Navigate back to the Microsoft 365 Defender portal and review the recommendations.`,
            },
            {
              Type: "Note",
              Value: `The portal will take some time to update depending on how often the agent reports back to the MDE service.`,
            },
            {
              Type: "Image",
              Value: `/images/nll/oracle/VulnerabilityManagement-Recommendations-OracleCVE-3.png`,
            },
          ],
          backgroundActivity: [
            {
              Type: "Title",
              Value: "What's does the portal show us?",
            },

            {
              Type: "Description",
              Value:
                "The portal shows that the Oracle Kernel has been updated, and the CVEs have been addressed.",
            },
          ],
        },
      ],
    },
  ],
};
