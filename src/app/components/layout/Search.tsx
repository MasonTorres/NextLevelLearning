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
      activityTitle: string;
      path: string;
      description: string;
      userActivity: string;
      backgroundActivity: string;
      title: string;
      query: string;
    }[] = [];
    const results = nllDataFiles.filter((file) => {
      let dropDown = {
        activityTitle: "",
        path: "",
        description: "",
        userActivity: "",
        backgroundActivity: "",
        title: "",
        query: "",
      };
      let searchFoundInData = file.data.data.find((item) => {
        let section =
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.tasks.find((task) => {
            let userActivity = null;
            let searchFoundInActivity =
              task.title.toLowerCase().includes(query.toLowerCase()) ||
              task.userActivity.find((value) => {
                let searchFoundInUserActivity =
                  value.Value.toLowerCase().includes(query.toLowerCase());
                if (searchFoundInUserActivity) {
                  dropDown.userActivity = value.Value;
                }
                return searchFoundInUserActivity;
              }) ||
              task.backgroundActivity.find((value) => {
                let searchFoundInBackgroundActivity =
                  value.Value.toLowerCase().includes(query.toLowerCase());
                if (searchFoundInBackgroundActivity) {
                  dropDown.backgroundActivity = value.Value;
                }
                return searchFoundInBackgroundActivity;
              });
            if (searchFoundInActivity) {
              dropDown.activityTitle = task.title;
            }
            return searchFoundInActivity;
          });
        return section;
      });
      if (searchFoundInData) {
        dropDown.path = file.data.path;
        dropDown.title = file.data.title;
        dropDown.query = query;
        dropDownItems.push(dropDown);
      }
      return searchFoundInData;
    });
    const title = results.filter((result) => result.data.data === query);
    let searchResults = results.map((result) => result.data);
    if (dropDownItems.length === 0) {
      dropDownItems = [
        {
          title: "No results found.",
          activityTitle: "",
          path: "",
          description: "",
          userActivity: "",
          backgroundActivity: "",
          query: "",
        },
      ];
    }
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
    let index = str.toLocaleLowerCase().indexOf(searchTerm.toLowerCase());
    if (index === -1) {
      return <></>;
    } else {
      let start = Math.max(0, index - 50);
      let end = Math.min(str.length, index + searchTerm.length + 50);
      let result = (
        <Caption1>
          {elipsis ? "..." : null} {str.substring(start, index)}
          <Body1Stronger
            style={{ color: tokens.colorPaletteGrapeBorderActive }}
          >
            {searchTerm}
          </Body1Stronger>
          {str.substring(index + searchTerm.length, end)}
          {elipsis ? "..." : null}
        </Caption1>
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
              (option: {
                activityTitle: string;
                path: string;
                description: string;
                userActivity: string;
                backgroundActivity: string;
                title: string;
                query: string;
              }) => (
                <ListItemButton
                  key={option.path}
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
                        <Subtitle2Stronger>{option.title}</Subtitle2Stronger>
                        {option.activityTitle ? (
                          <>
                            <br />

                            <Caption1Stronger
                              style={{
                                color: tokens.colorPaletteRoyalBlueForeground2,
                              }}
                            >
                              Title{" "}
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
