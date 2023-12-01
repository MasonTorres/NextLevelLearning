"use client";

import * as React from "react";
import { SearchBox } from "@fluentui/react-search-preview";
import {
  Body1,
  Body1Strong,
  Body1Stronger,
  Caption1,
  Caption1Strong,
  Caption1Stronger,
  Card,
  Field,
  Subtitle2Stronger,
  tokens,
  CompoundButton,
} from "@fluentui/react-components";
import type { SearchBoxProps } from "@fluentui/react-search-preview";
import { usePathname, useRouter } from "next/navigation";

import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import nllDataFiles from "../../content/nllDataFiles.json";

export const Search = (props: SearchBoxProps) => {
  const [options, setOptions] = React.useState<any>([]);
  const [showSearchResults, setShowSearchResults] =
    React.useState<boolean>(false);
  const routerNav = useRouter();

  const pathname = usePathname();

  const handleSearchQuery = (event: { target: { value: any } }) => {
    const query = event.target.value;

    if (query.length < 3) {
      setShowSearchResults(false);
      let dropDownItems = [
        {
          foundIn: "",
          title: "3 characters or more required.",
          activityTitle: "",
          activityDescription: "",
          path: "",
          currentPage: false,
          description: "",
          userActivity: "",
          backgroundActivity: "",
          query: "3 characters or more required.",
        },
      ];

      setOptions(dropDownItems);
      setShowSearchResults(true);
      return;
    }

    let dropDownItems: {
      foundIn: string;
      activityTitle: string;
      activityDescription: string;
      path: string;
      currentPage: boolean;
      description: string;
      userActivity: string;
      backgroundActivity: string;
      title: string;
      query: string;
    }[] = [];

    // Search Page Titles
    const pageResults = nllDataFiles.filter((file) => {
      let dropDown = {
        foundIn: "title",
        activityTitle: "",
        activityDescription: "",
        path: "",
        currentPage: false,
        description: "",
        userActivity: "",
        backgroundActivity: "",
        title: "",
        query: "",
      };

      let searchFoundInTitle = file.data.title
        .toLowerCase()
        .includes(query.toLowerCase());
      if (searchFoundInTitle) {
        dropDown.path = file.data.path;
        if (pathname === "/" + file.data.path) {
          dropDown.currentPage = true;
        }
        dropDown.title = file.data.title;
        dropDown.description = file.data.description;
        dropDown.query = query;
        dropDownItems.push(dropDown);
      }
      return searchFoundInTitle;
    });

    // Search Page Descriptions
    const descriptionResults = nllDataFiles.filter((file) => {
      let dropDown = {
        foundIn: "description",
        activityTitle: "",
        activityDescription: "",
        path: "",
        currentPage: false,
        description: "",
        userActivity: "",
        backgroundActivity: "",
        title: "",
        query: "",
      };

      let searchFoundInDescription = file.data.description
        .toLowerCase()
        .includes(query.toLowerCase());

      if (searchFoundInDescription) {
        dropDown.path = file.data.path;
        if (pathname === "/" + file.data.path) {
          dropDown.currentPage = true;
        }
        dropDown.title = file.data.title;
        dropDown.description = file.data.description;
        dropDown.query = query;
        dropDownItems.push(dropDown);
      }
      return searchFoundInDescription;
    });

    // Search Sections
    const sectionResults = nllDataFiles.filter((file) => {
      let searchFoundInSecionDescription = file.data.data.filter((section) => {
        return section.description.toLowerCase().includes(query.toLowerCase());
      });

      searchFoundInSecionDescription.forEach((section) => {
        let dropDown = {
          foundIn: "section",
          activityTitle: "",
          activityDescription: "",
          path: "",
          currentPage: false,
          description: "",
          userActivity: "",
          backgroundActivity: "",
          title: "",
          query: "",
        };

        dropDown.path = file.data.path;
        if (pathname === "/" + file.data.path) {
          dropDown.currentPage = true;
        }
        dropDown.title = file.data.title;
        dropDown.description = file.data.description;
        dropDown.activityTitle = section.title;
        dropDown.activityDescription = section.description;
        dropDown.query = query;
        dropDownItems.push(dropDown);
      });

      return searchFoundInSecionDescription;
    });

    // Search Page Tasks
    const tasksResults = nllDataFiles.filter((file) => {
      let searchFoundInTasks = file.data.data.filter((item) => {
        // Search in title
        if (item.title.toLowerCase().includes(query.toLowerCase())) {
          let dropDown = {
            foundIn: "tasks",
            activityTitle: "",
            activityDescription: "",
            path: "",
            currentPage: false,
            description: "",
            userActivity: "",
            backgroundActivity: "",
            title: "",
            query: "",
          };

          if (pathname === "/" + file.data.path) {
            dropDown.currentPage = true;
          }
          dropDown.description = item.description;
          dropDown.path = file.data.path;
          dropDown.title = file.data.title;
          dropDown.query = query;
          dropDownItems.push(dropDown);
        }

        // Search in user activity
        let userAct = item.tasks.filter((task) => {
          let searchFoundInUserActivity = task.userActivity.filter((value) => {
            let dropDown = {
              foundIn: "tasks",
              activityTitle: "",
              activityDescription: "",
              path: "",
              currentPage: false,
              description: "",
              userActivity: "",
              backgroundActivity: "",
              title: "",
              query: "",
            };

            let searchFoundInUserActivity = value.Value.toLowerCase().includes(
              query.toLowerCase()
            );
            if (searchFoundInUserActivity) {
              if (pathname === "/" + file.data.path) {
                dropDown.currentPage = true;
              }
              dropDown.activityTitle = task.title
                ? task.title
                : task.userActivity.filter((value) => value.Type === "Title")[0]
                    ?.Value;
              dropDown.userActivity = value.Value;
              dropDown.description = item.description;
              dropDown.path = file.data.path;
              dropDown.title = file.data.title;
              dropDown.query = query;
              dropDownItems.push(dropDown);
            }
            return searchFoundInUserActivity;
          });
          return searchFoundInUserActivity;
        });

        // Search in background activity
        let backAct = item.tasks.filter((task) => {
          let userActivity = null;
          let searchFoundInBackgroundActivity = task.backgroundActivity.filter(
            (value) => {
              let dropDown = {
                foundIn: "tasks",
                activityTitle: "",
                activityDescription: "",
                path: "",
                currentPage: false,
                description: "",
                userActivity: "",
                backgroundActivity: "",
                title: "",
                query: "",
              };

              let searchFoundInUserActivity =
                value.Value.toLowerCase().includes(query.toLowerCase());
              if (searchFoundInUserActivity) {
                if (pathname === "/" + file.data.path) {
                  dropDown.currentPage = true;
                }
                dropDown.activityTitle = task.title
                  ? task.title
                  : task.backgroundActivity.filter(
                      (value) => value.Type === "Title"
                    )[0]?.Value;
                dropDown.description = item.description;
                dropDown.backgroundActivity = value.Value;
                dropDown.path = file.data.path;
                dropDown.title = file.data.title;
                dropDown.query = query;
                dropDownItems.push(dropDown);
              }
              return searchFoundInUserActivity;
            }
          );
          return searchFoundInBackgroundActivity;
        });
      });

      return searchFoundInTasks;
    });

    // Return a message if no results are found
    if (dropDownItems.length === 0) {
      dropDownItems = [
        {
          foundIn: "",
          title: "No results found.",
          activityTitle: "",
          activityDescription: "",
          path: "",
          currentPage: false,
          description: "",
          userActivity: "",
          backgroundActivity: "",
          query: "",
        },
      ];
    }

    // Remove any duplicates
    // This occurs if the search terms are in both the title and description etc.
    dropDownItems = dropDownItems.filter(
      (item, index, self) =>
        index ===
        self.findIndex(
          (t) =>
            t.title === item.title &&
            t.activityTitle === item.activityTitle &&
            t.activityDescription === item.activityDescription &&
            t.path === item.path &&
            t.description === item.description &&
            t.userActivity === item.userActivity &&
            t.backgroundActivity === item.backgroundActivity
        )
    );

    // Sort so any content on the current page is at the top
    dropDownItems.sort((a) => {
      return a.currentPage === true ? -1 : 1;
    });

    setOptions(dropDownItems);
    setShowSearchResults(true);
  };

  const handleClickAway = (path: string) => {
    setShowSearchResults(false);

    if (path !== "") {
      routerNav.push(path, { scroll: false });
    }
  };

  const replaceAll = (str: any, find: any, replace: any) => {
    return str.replace(new RegExp(find, "g"), replace);
  };

  const sampleSearchText = (
    str: string,
    searchTerm: string,
    elipsis = true
  ) => {
    let index = str.toLocaleLowerCase().indexOf(searchTerm.toLowerCase());
    if (index === -1) {
      return str;
    } else {
      let regex = new RegExp(searchTerm, "i");
      let position = str.search(regex);
      let start = str.substring(0, position);
      let foundTerm = str.substring(position, position + searchTerm.length);
      let end = str.substring(position + searchTerm.length);

      // Last 5 words of end - so we don't cut a word in half.
      let endLastWordIndex = 0;
      const endSplit = end.split(" ");
      let count = 0;
      if (endSplit.length > 5) {
        while (count <= 5) {
          if (endSplit[count] != "") {
            endLastWordIndex += endSplit[count].length;
          }
          count++;
        }
      } else {
        endLastWordIndex = end.length;
      }

      let result;
      result = (
        <>
          {/* {elipsis ? "..." : null}  */}
          {start.length > 50 ? start.substring(start.length - 50) : start}
          <Body1Stronger
            style={{ color: tokens.colorPaletteGrapeBorderActive }}
          >
            {foundTerm}
          </Body1Stronger>
          {end.length > 50 ? end.substring(0, endLastWordIndex + count) : end}
          {elipsis ? "..." : null}
        </>
      );

      return result;
    }
  };

  const sampleSearchTitle = (
    str: string,
    searchTerm: string,
    elipsis = true
  ) => {
    let index = str.toLocaleLowerCase().indexOf(searchTerm.toLowerCase());
    if (index === -1) {
      return str;
    } else {
      let regex = new RegExp(searchTerm, "i");
      let position = str.search(regex);
      let start = str.substring(0, position);
      let foundTerm = str.substring(position, position + searchTerm.length);
      let end = str.substring(position + searchTerm.length);
      let result;
      result = (
        <>
          {elipsis ? "..." : null} {start}
          <Subtitle2Stronger
            style={{ color: tokens.colorPaletteGrapeBorderActive }}
          >
            {foundTerm}
          </Subtitle2Stronger>
          {end}
          {elipsis ? "..." : null}
        </>
      );

      return result;
    }
  };

  return (
    <div style={{ width: "400px" }}>
      <Field>
        <SearchBox
          {...props}
          onChange={(event: any) => handleSearchQuery(event)}
          placeholder="Search"
          aria-label="Search 3 characters or more required."
        />
        {/*  position: "absolute", marginTop: "32px",  */}
      </Field>
      <ClickAwayListener onClickAway={() => handleClickAway("")}>
        <div
          style={
            showSearchResults
              ? {
                  display: "block",
                  position: "absolute",
                  marginTop: "8px",
                  height: "calc(100vh - 60px)",
                  overflowY: "auto",
                }
              : {
                  display: "none",
                }
          }
        >
          <Card style={{ borderRadius: "unset" }}>
            {options.map(
              (
                option: {
                  foundIn: string;
                  activityTitle: string;
                  activityDescription: string;
                  path: string;
                  currentPage: boolean;
                  description: string;
                  userActivity: string;
                  backgroundActivity: string;
                  title: string;
                  query: string;
                },
                index: string
              ) => (
                <CompoundButton
                  key={option.path + index}
                  style={{ maxWidth: "470px" }}
                  onClick={() =>
                    handleClickAway(
                      "/" +
                        option.path +
                        "#" +
                        replaceAll(option.activityTitle, " ", "-")
                    )
                  }
                  // divider
                  as={"a"}
                  secondaryContent={
                    <div style={{ width: "100%" }}>
                      {/* <br />
                      <Subtitle2Stronger>
                        FOUND ID: {option.foundIn}
                      </Subtitle2Stronger> */}
                      {option.description ? (
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                          }}
                        >
                          <Caption1Stronger
                            style={{
                              color: tokens.colorPaletteRoyalBlueForeground2,
                              paddingRight: "5px",
                            }}
                          >
                            Description{" "}
                          </Caption1Stronger>
                          <Caption1>
                            {sampleSearchText(
                              option.description,
                              option.query,
                              false
                            )}
                          </Caption1>
                        </div>
                      ) : null}
                      {option.activityTitle ? (
                        <div>
                          <Caption1Stronger
                            style={{
                              color: tokens.colorPaletteRoyalBlueForeground2,
                              paddingRight: "5px",
                            }}
                          >
                            Activity Title{" "}
                          </Caption1Stronger>
                          <Caption1>
                            {sampleSearchText(
                              option.activityTitle,
                              option.query,
                              false
                            )}
                          </Caption1>
                        </div>
                      ) : null}
                      {option.activityDescription ? (
                        <div>
                          <Caption1Stronger
                            style={{
                              color: tokens.colorPaletteRoyalBlueForeground2,
                            }}
                          >
                            Activity Description{" "}
                          </Caption1Stronger>
                          <Caption1>
                            {sampleSearchText(
                              option.activityDescription,
                              option.query,
                              false
                            )}
                          </Caption1>
                        </div>
                      ) : null}
                      {option.userActivity.length > 0 ||
                      option.backgroundActivity.length > 0 ? (
                        <></>
                      ) : null}
                      {option.userActivity ? (
                        <>
                          <div>
                            <Caption1Stronger
                              style={{
                                color: tokens.colorPaletteRoyalBlueForeground2,
                              }}
                            >
                              User Activity{" "}
                            </Caption1Stronger>
                            <Caption1>{option.activityTitle}</Caption1>
                          </div>
                          <div>
                            <Caption1Stronger
                              style={{
                                color: tokens.colorPaletteRoyalBlueForeground2,
                              }}
                            >
                              Content{" "}
                            </Caption1Stronger>
                            <Caption1>
                              {sampleSearchText(
                                option.userActivity,
                                option.query
                              )}
                            </Caption1>
                          </div>
                        </>
                      ) : null}
                      {option.backgroundActivity && option.userActivity ? (
                        <></>
                      ) : null}
                      {option.backgroundActivity ? (
                        <>
                          <div>
                            <Caption1Stronger
                              style={{
                                color: tokens.colorPaletteRoyalBlueForeground2,
                              }}
                            >
                              Background Activity{" "}
                            </Caption1Stronger>
                            <Caption1>{option.activityTitle}</Caption1>
                          </div>
                          <div>
                            <Caption1Stronger
                              style={{
                                color: tokens.colorPaletteRoyalBlueForeground2,
                              }}
                            >
                              Content{" "}
                            </Caption1Stronger>
                            <Caption1>
                              {sampleSearchText(
                                option.backgroundActivity,
                                option.query
                              )}
                            </Caption1>
                          </div>
                        </>
                      ) : null}
                    </div>
                  }
                >
                  <div
                    style={{
                      maxWidth: "450px",
                      minWidth: "450px",
                      display: "flex",
                    }}
                  >
                    <Subtitle2Stronger style={{ width: "100%" }}>
                      {sampleSearchTitle(option.title, option.query, false)}
                    </Subtitle2Stronger>
                    {option.currentPage ? (
                      <Caption1 align="end" style={{ width: "100%" }}>
                        On this Page
                      </Caption1>
                    ) : null}
                  </div>
                </CompoundButton>
              )
            )}
          </Card>
        </div>
      </ClickAwayListener>
    </div>
  );
};
