import * as React from "react";
// import { ArgTypes } from "@storybook/api";
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
} from "@fluentui/react-components";
import type { SearchBoxProps } from "@fluentui/react-search-preview";
import {
  Dropdown,
  makeStyles,
  Option,
  shorthands,
  useId,
} from "@fluentui/react-components";

// Material
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import nllDataFiles from "../../content/nllDataFiles.json";
import { Box, ListItemButton, ListItemText } from "@mui/material";
import Link from "next/link";

import type { INLLDataFile } from "../../types/types";

export const Search = (props: SearchBoxProps) => {
  const dropdownId = useId("dropdown-default");
  const [options, setOptions] = React.useState<any>([]);
  const [showSearchResults, setShowSearchResults] =
    React.useState<boolean>(false);
  //   let options = [
  //     "Cat",
  //     "Caterpillar",
  //     "Corgi",
  //     "Chupacabra",
  //     "Dog",
  //     "Ferret",
  //     "Fish",
  //     "Fox",
  //     "Hamster",
  //     "Snake",
  //   ];

  const handleSearchQuery = (event: { target: { value: any } }) => {
    const query = event.target.value;
    // Get the title from the filtered data so we can link to it
    let dropDownItems: {
      foundIn: string;
      activityTitle: string;
      activityDescription: string;
      path: string;
      description: string;
      userActivity: string;
      backgroundActivity: string;
      title: string;
      query: string;
    }[] = [];
    // const results = nllDataFiles.filter((file) => {
    //   let dropDown = {
    //     foundIn: "search",
    //     activityTitle: "",
    //     path: "",
    //     description: "",
    //     userActivity: "",
    //     backgroundActivity: "",
    //     title: "",
    //     query: "",
    //   };

    //   // Search Data
    //   let searchFoundInData = file.data.data.find((item) => {
    //     let section =
    //       item.title.toLowerCase().includes(query.toLowerCase()) ||
    //       item.description.toLowerCase().includes(query.toLowerCase()) ||
    //       item.tasks.find((task) => {
    //         let userActivity = null;
    //         let searchFoundInActivity =
    //           task.title.toLowerCase().includes(query.toLowerCase()) ||
    //           task.userActivity.find((value) => {
    //             let searchFoundInUserActivity =
    //               value.Value.toLowerCase().includes(query.toLowerCase());
    //             if (searchFoundInUserActivity) {
    //               dropDown.userActivity = value.Value;
    //             }
    //             return searchFoundInUserActivity;
    //           }) ||
    //           task.backgroundActivity.find((value) => {
    //             let searchFoundInBackgroundActivity =
    //               value.Value.toLowerCase().includes(query.toLowerCase());
    //             if (searchFoundInBackgroundActivity) {
    //               dropDown.backgroundActivity = value.Value;
    //             }
    //             return searchFoundInBackgroundActivity;
    //           });
    //         if (searchFoundInActivity) {
    //           dropDown.activityTitle = task.title;
    //         }
    //         return searchFoundInActivity;
    //       });
    //     return section;
    //   });

    //   if (searchFoundInData) {
    //     dropDown.path = file.data.path;
    //     dropDown.title = file.data.title;
    //     dropDown.query = query;
    //     dropDownItems.push(dropDown);
    //   }

    //   return searchFoundInData;
    // });

    // Search Page Titles
    const pageResults = nllDataFiles.filter((file) => {
      let dropDown = {
        foundIn: "title",
        activityTitle: "",
        activityDescription: "",
        path: "",
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
          description: "",
          userActivity: "",
          backgroundActivity: "",
          title: "",
          query: "",
        };

        dropDown.path = file.data.path;
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
      let dropDown = {
        foundIn: "tasks",
        activityTitle: "",
        activityDescription: "",
        path: "",
        description: "",
        userActivity: "",
        backgroundActivity: "",
        title: "",
        query: "",
      };

      let searchFoundInTasks = file.data.data.filter((item) => {
        // return item.tasks.filter((tasks) => {
        //   return tasks.userActivity.filter((userActivity) => {
        //     return userActivity.Value.toLowerCase().includes(
        //       query.toLowerCase()
        //     );
        //   });
        // });
        return item.tasks.find((task) => {
          let userActivity = null;
          let searchFoundInActivity =
            task.title.toLowerCase().includes(query.toLowerCase()) ||
            task.userActivity.find((value) => {
              let searchFoundInUserActivity =
                value.Value.toLowerCase().includes(query.toLowerCase());
              if (searchFoundInUserActivity) {
                dropDown.userActivity = value.Value;
                dropDown.description = item.description;
              }
              return searchFoundInUserActivity;
            }) ||
            task.backgroundActivity.find((value) => {
              let searchFoundInBackgroundActivity =
                value.Value.toLowerCase().includes(query.toLowerCase());
              if (searchFoundInBackgroundActivity) {
                dropDown.backgroundActivity = value.Value;
                dropDown.description = item.description;
              }
              return searchFoundInBackgroundActivity;
            });
          if (searchFoundInActivity) {
            dropDown.activityTitle = task.title;
            dropDown.activityDescription = item.description;
          }
          return searchFoundInActivity;
        });
      });

      if (searchFoundInTasks.length > 0) {
        dropDown.path = file.data.path;
        dropDown.title = file.data.title;
        dropDown.query = query;
        dropDownItems.push(dropDown);
      }
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

    setOptions(dropDownItems);
    setShowSearchResults(true);
  };

  const handleClickAway = () => {
    setShowSearchResults(false);
  };

  const replaceAll = (str: any, find: any, replace: any) => {
    return str.replace(new RegExp(find, "g"), replace);
  };

  const sampleSearchText = (
    str: string,
    searchTerm: string,
    elipsis = true
  ) => {
    // let index = str.toLocaleLowerCase().indexOf(searchTerm.toLowerCase());
    // if (index === -1) {
    //   return str;
    // } else {
    //   let start = Math.max(0, index - 50);
    //   let end = Math.min(str.length, index + searchTerm.length + 50);
    //   let result = (
    //     <Caption1>
    //       {elipsis ? "..." : null} {str.substring(start, index)}
    //       <Body1Stronger
    //         style={{ color: tokens.colorPaletteGrapeBorderActive }}
    //       >
    //         {searchTerm}
    //       </Body1Stronger>
    //       {str.substring(index + searchTerm.length, end)}
    //       {elipsis ? "..." : null}
    //     </Caption1>
    //   );
    //   return result;
    // }
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
        />
        {/*  position: "absolute", marginTop: "32px",  */}
      </Field>
      <ClickAwayListener onClickAway={handleClickAway}>
        <Box
          sx={
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
                  description: string;
                  userActivity: string;
                  backgroundActivity: string;
                  title: string;
                  query: string;
                },
                index: string
              ) => (
                <ListItemButton
                  key={option.path + index}
                  component={Link}
                  href={
                    "/" +
                    option.path +
                    "#" +
                    replaceAll(option.activityTitle, " ", "-")
                  }
                  onClick={handleClickAway}
                  divider
                >
                  <ListItemText
                    primary={
                      <Box>
                        <Subtitle2Stronger>
                          {sampleSearchTitle(option.title, option.query, false)}
                        </Subtitle2Stronger>
                        {/* <br />
                        <Subtitle2Stronger>
                          FOUND ID: {option.foundIn}
                        </Subtitle2Stronger> */}
                        {option.description ? (
                          <>
                            <br />

                            <Caption1Stronger
                              style={{
                                color: tokens.colorPaletteRoyalBlueForeground2,
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
                          </>
                        ) : null}
                        {option.activityTitle ? (
                          <>
                            <br />

                            <Caption1Stronger
                              style={{
                                color: tokens.colorPaletteRoyalBlueForeground2,
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
                          </>
                        ) : null}
                        {option.activityDescription ? (
                          <>
                            <br />

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
                          </>
                        ) : null}
                        {option.userActivity.length > 0 ||
                        option.backgroundActivity.length > 0 ? (
                          <br />
                        ) : null}
                        {option.userActivity ? (
                          <>
                            <Caption1Stronger
                              style={{
                                color: tokens.colorPaletteRoyalBlueForeground2,
                              }}
                            >
                              User Activity{" "}
                            </Caption1Stronger>
                            <Caption1>{option.activityTitle}</Caption1>
                            <br />
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
                          </>
                        ) : null}
                        {option.backgroundActivity && option.userActivity ? (
                          <br />
                        ) : null}
                        {option.backgroundActivity ? (
                          <>
                            <Caption1Stronger
                              style={{
                                color: tokens.colorPaletteRoyalBlueForeground2,
                              }}
                            >
                              Background Activity{" "}
                            </Caption1Stronger>
                            <Caption1>{option.activityTitle}</Caption1>
                            <br />
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
                          </>
                        ) : null}
                        <br />
                      </Box>
                    }
                  />
                </ListItemButton>
              )
            )}
          </Card>
        </Box>
      </ClickAwayListener>
    </div>
  );
};
