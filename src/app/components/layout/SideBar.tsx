"use client";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import nllDataFiles from "../../content/nllDataFiles.json";
import { ReactComponentElement, useState } from "react";
// Iconify Icons
import { Icon } from "@iconify/react";
import lineEndIcon from "@iconify/icons-material-symbols/line-end";
// Fluent UI
import { tokens } from "@fluentui/react-components";
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
console.log("hierarchy", hierarchy);
const MenuT = (hierarchy: any, handleClick: any, active: string) => {
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
                      <MenuItem
                        key={hierarchy[key1][key2][key3][key4].to}
                        onClick={() =>
                          handleClick(hierarchy[key1][key2][key3][key4].to)
                        }
                        active={active === hierarchy[key1][key2][key3][key4].to}
                        component={
                          <Link href={hierarchy[key1][key2][key3][key4].to} />
                        }
                      >
                        {hierarchy[key1][key2][key3][key4].title}
                      </MenuItem>
                    );
                  }
                }
              );

              return (
                <>
                  <NavSubMenu
                    key={key3}
                    level="3"
                    path={"/" + key1 + "/" + key2 + "/" + key3}
                    label={key3.charAt(0).toUpperCase() + key3.slice(1)}
                    active={active}
                  >
                    {l4}
                  </NavSubMenu>
                </>
              );
            } else {
              return (
                <MenuItem
                  key={hierarchy[key1][key2][key3].to}
                  onClick={() => handleClick(hierarchy[key1][key2][key3].to)}
                  active={active === hierarchy[key1][key2][key3].to}
                  component={<Link href={hierarchy[key1][key2][key3].to} />}
                >
                  {hierarchy[key1][key2][key3].title}
                </MenuItem>
              );
            }
          });
          return (
            <>
              <NavSubMenu
                key={key2}
                level="2"
                path={"/" + key1 + "/" + key2}
                label={key2.charAt(0).toUpperCase() + key2.slice(1)}
                active={active}
              >
                {l3}
              </NavSubMenu>
            </>
          );
        } else {
          return (
            <MenuItem
              key={hierarchy[key1][key2].to}
              onClick={() => handleClick(hierarchy[key1][key2].to)}
              active={active === hierarchy[key1][key2].to}
              component={<Link href={hierarchy[key1][key2].to} />}
            >
              {hierarchy[key1][key2].title}
            </MenuItem>
          );
        }
      });
      return (
        <>
          <NavSubMenu
            key={key1}
            level="1"
            path={"/" + key1}
            label={key1.charAt(0).toUpperCase() + key1.slice(1)}
            active={active}
          >
            {l2}
          </NavSubMenu>
        </>
      );
    } else {
      return (
        <MenuItem
          key={hierarchy[key1].to}
          onClick={() => handleClick(hierarchy[key1].to)}
          active={active === hierarchy[key1].to}
          title={hierarchy[key1].title}
          component={<Link href={hierarchy[key1].to} />}
        >
          {hierarchy[key1].title}
        </MenuItem>
      );
    }
  });

  return menuItems;
};

export default function SideBar({ title, to }: any) {
  const pathname = usePathname();
  const router = useRouter();
  const [active, setActive] = useState(pathname);
  const handleClick = (to: string) => {
    console.log("to", to);
    setActive(to);
  };

  return (
    <Sidebar
      width="100%"
      rootStyles={{
        border: "none",
      }}
    >
      <Menu
        menuItemStyles={{
          button: ({ level, active, disabled }) => {
            return {
              backgroundColor: active
                ? tokens.colorNeutralStroke3
                : tokens.colorNeutralBackground1,
              "&:hover": {
                backgroundColor: tokens.colorSubtleBackgroundHover,
              },
            };
          },
          label: {
            // apply / override styles of all menu item labels
            whiteSpace: "unset",
          },
        }}
      >
        <MenuItem
          onClick={() => handleClick("/home")}
          active={active === "/home"}
          component={<Link href="/home" />}
        >
          Home
        </MenuItem>
        {MenuT(hierarchy, handleClick, pathname)}
      </Menu>
    </Sidebar>
  );
}
