"use client";
import nllDataFiles from "../../content/nllDataFiles.json";
import { ReactComponentElement, useEffect, useState } from "react";
// Iconify Icons
import { Icon } from "@iconify/react";
import lineEndIcon from "@iconify/icons-material-symbols/line-end";
// Fluent UI
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionToggleEventHandler,
  SelectTabData,
  SelectTabEvent,
  Tab,
  TabList,
  TabValue,
  makeStyles,
  shorthands,
  tokens,
  typographyStyles,
  Text,
  Subtitle2,
} from "@fluentui/react-components";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import NavSubMenu from "./NavSubMenu";

nllDataFiles.sort((a, b) => {
  let titlea = a.data.title.toLowerCase(),
    titleb = b.data.title.toLowerCase();

  if (titlea < titleb) {
    return -1;
  }
  if (titlea > titleb) {
    return 1;
  }
  return 0;
});

let linuxmde: {
  icon: ReactComponentElement<typeof Icon>;
  to: string;
  title: string;
}[] = [];

// loop through the json file and create the links
nllDataFiles.forEach(
  (file: {
    data: {
      title: any;
      path: any;
      data: any;
    };
  }) => {
    linuxmde.push({
      icon: (
        <Icon
          icon={lineEndIcon}
          fontSize={20}
          color={tokens.colorNeutralBackgroundInverted}
        />
      ),
      to: `/${file.data.path}`,
      title: `${file.data.title}`,
    });
  }
);

function createHierarchy(data: any[]) {
  let hierarchy: any = {};

  data.forEach((item) => {
    let parts = item.to.split("/");
    let currentLevel = hierarchy;

    for (let i = 1; i < parts.length; i++) {
      if (!currentLevel[parts[i]]) {
        currentLevel[parts[i]] = {};
      }
      currentLevel = currentLevel[parts[i]];
    }

    currentLevel["title"] = item.title;
    currentLevel["to"] = item.to;
  });

  return hierarchy;
}
let hierarchy = createHierarchy(linuxmde);

const useStyles = makeStyles({
  root: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    ...shorthands.padding("5px", "0px"),
    // rowGap: "20px",
    backgroundColor: tokens.colorNeutralBackground1,
  },
  text: typographyStyles.subtitle2,
  tabList: {
    width: "100%",
  },
});

const GetDefaultOpenItemsFromPath = (path: string) => {
  let openItems: string[] = [];
  let parts = path.split("/");
  let currentLevel = hierarchy;

  for (let i = 1; i < parts.length - 1; i++) {
    if (currentLevel[parts[i]]) {
      const existingOpenItemsAsString = parts.slice(0, i).join("");
      openItems.push(existingOpenItemsAsString + parts[i]);
      currentLevel = currentLevel[parts[i]];
    }
  }

  return openItems;
};

export default function SideBar({ title, to }: any) {
  const pathname = usePathname();
  const router = useRouter();
  const handleClick = (to: string) => {
    setSelectedValue(to);
  };

  const styles = useStyles();

  const [selectedValue, setSelectedValue] = useState<TabValue>(pathname);
  const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    router.push(data.value as string);
    setSelectedValue(data.value);
  };

  const [openItems, setOpenItems] = useState(
    GetDefaultOpenItemsFromPath(pathname)
  );

  useEffect(() => {
    setOpenItems(GetDefaultOpenItemsFromPath(pathname));
    setSelectedValue(pathname);
  }, [pathname]);

  const handleToggle: AccordionToggleEventHandler<string> = (event, data) => {
    setOpenItems(data.openItems);
  };

  const Menu = (hierarchy: any, handleClick: any, active: string) => {
    let menuItems = Object.keys(hierarchy).map((key1, index1) => {
      //
      // Check top level Menu
      //

      if (key1 !== "title" && key1 !== "to") {
        let l2 = Object.keys(hierarchy[key1]).map((key2, index2) => {
          //
          // Check 2nd level Menu
          //

          if (!hierarchy[key1][key2].hasOwnProperty("title")) {
            let l3 = Object.keys(hierarchy[key1][key2]).map((key3, index3) => {
              //
              // Check 3rd level Menu
              //

              if (!hierarchy[key1][key2][key3].hasOwnProperty("title")) {
                let l4 = Object.keys(hierarchy[key1][key2][key3]).map(
                  (key4, index4) => {
                    //
                    // Check 4th level Menu
                    //

                    if (hierarchy[key1][key2][key3][key4].title !== undefined) {
                      return (
                        <Tab
                          key={key4}
                          style={{ textAlign: "left" }}
                          value={hierarchy[key1][key2][key3][key4].to}
                        >
                          {hierarchy[key1][key2][key3][key4].title}
                        </Tab>
                      );
                    }
                  }
                );

                return (
                  <Accordion
                    key={key3}
                    openItems={openItems}
                    onToggle={handleToggle}
                    multiple
                    collapsible
                  >
                    <AccordionItem value={key1 + key2 + key3}>
                      <AccordionHeader as="h3" expandIconPosition="end">
                        {(selectedValue as string).startsWith(
                          "/" + key1 + "/" + key2 + "/" + key3
                        ) ? (
                          <Subtitle2>
                            {key3.charAt(0).toUpperCase() + key3.slice(1)}
                          </Subtitle2>
                        ) : (
                          <Text>
                            {key3.charAt(0).toUpperCase() + key3.slice(1)}
                          </Text>
                        )}
                      </AccordionHeader>
                      <AccordionPanel>
                        <div className={styles.root}>
                          <TabList
                            defaultSelectedValue={selectedValue}
                            onTabSelect={onTabSelect}
                            selectedValue={selectedValue}
                            vertical
                            appearance="subtle"
                            className={styles.tabList}
                          >
                            {l4}
                          </TabList>
                        </div>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                );
              } else {
                return (
                  <Tab
                    key={key3}
                    style={{ textAlign: "left" }}
                    value={hierarchy[key1][key2][key3].to}
                  >
                    {hierarchy[key1][key2][key3].title}
                  </Tab>
                );
              }
            });
            return (
              <Accordion
                key={key2}
                openItems={openItems}
                onToggle={handleToggle}
                multiple
                collapsible
              >
                <AccordionItem value={key1 + key2} style={{ width: "100%" }}>
                  <AccordionHeader as="h2" expandIconPosition="end">
                    {(selectedValue as string).startsWith(
                      "/" + key1 + "/" + key2
                    ) ? (
                      <Subtitle2>
                        {key2.charAt(0).toUpperCase() + key2.slice(1)}
                      </Subtitle2>
                    ) : (
                      <Text>
                        {key2.charAt(0).toUpperCase() + key2.slice(1)}
                      </Text>
                    )}
                  </AccordionHeader>
                  <AccordionPanel>
                    <div className={styles.root}>
                      <TabList
                        defaultSelectedValue={selectedValue}
                        onTabSelect={onTabSelect}
                        selectedValue={selectedValue}
                        vertical
                        appearance="subtle"
                        className={styles.tabList}
                      >
                        {l3}
                      </TabList>
                    </div>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            );
          } else {
            return (
              <Tab
                key={key2}
                style={{ textAlign: "left", width: "auto" }}
                value={hierarchy[key1][key2].to}
              >
                {hierarchy[key1][key2].title}
              </Tab>
            );
          }
        });
        return (
          <Accordion
            key={key1}
            openItems={openItems}
            onToggle={handleToggle}
            multiple
            collapsible
          >
            <AccordionItem value={key1}>
              <AccordionHeader
                // as="div"
                // size="large"
                className={styles.text}
                expandIconPosition="end"
                style={{ fontWeight: 600 }}
              >
                {(selectedValue as string).startsWith("/" + key1) ? (
                  <Subtitle2>
                    {key1.charAt(0).toUpperCase() + key1.slice(1)}
                  </Subtitle2>
                ) : (
                  <Text>{key1.charAt(0).toUpperCase() + key1.slice(1)}</Text>
                )}
              </AccordionHeader>
              <AccordionPanel>
                <div className={styles.root}>
                  <TabList
                    defaultSelectedValue={selectedValue}
                    onTabSelect={onTabSelect}
                    selectedValue={selectedValue}
                    vertical
                    appearance="subtle"
                    className={styles.tabList}
                  >
                    {l2}
                  </TabList>
                </div>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        );
      } else {
        return (
          <Tab
            key={key1}
            style={{ textAlign: "left" }}
            value={hierarchy[key1].to}
          >
            {hierarchy[key1].title}
          </Tab>
        );
      }
    });

    return menuItems;
  };

  return (
    <div className={styles.root}>
      <TabList
        defaultSelectedValue={selectedValue}
        onTabSelect={onTabSelect}
        selectedValue={selectedValue}
        vertical
        appearance="subtle"
        className={styles.tabList}
      >
        <Tab
          style={{ textAlign: "left" }}
          value={"/home"}
          onClick={() => handleClick("/home")}
        >
          Home
        </Tab>
        {Menu(hierarchy, handleClick, pathname)}
      </TabList>
    </div>
  );
}
