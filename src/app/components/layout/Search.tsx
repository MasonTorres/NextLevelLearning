import * as React from "react";
// import { ArgTypes } from "@storybook/api";
import { SearchBox } from "@fluentui/react-search-preview";
import { Card, Field } from "@fluentui/react-components";
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
    console.log("handleSearchQuery", event.target.value);
    const query = event.target.value;
    const results = nllDataFiles.filter((file) => {
      return file.data.data.find(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.tasks.find(
            (Task) =>
              Task.title.toLowerCase().includes(query.toLowerCase()) ||
              Task.userActivity.includes(query.toLowerCase()) ||
              Task.backgroundActivity.includes(query.toLowerCase())
          )
      );
    });
    console.log("results", results);
    let searchResults = results.map((result) => result.data.path);
    if (searchResults.length === 0) {
      searchResults = ["No results found."];
    }
    setOptions(searchResults);
    setShowSearchResults(true);
    console.log("options", options);
  };

  const handleClickAway = () => {
    setShowSearchResults(false);
  };

  return (
    <Field>
      <SearchBox
        {...props}
        onChange={(event: any) => handleSearchQuery(event)}
      />
      {/*  position: "absolute", marginTop: "32px",  */}
      <ClickAwayListener onClickAway={handleClickAway}>
        <Box
          sx={
            showSearchResults
              ? { display: "block", position: "absolute", marginTop: "32px" }
              : { display: "none", position: "absolute", marginTop: "32px" }
          }
        >
          <Card>
            {options.map((option: string) => (
              <ListItemButton key={option} component={Link} href={"/" + option}>
                <ListItemText primary={option} />
              </ListItemButton>
            ))}
          </Card>
        </Box>
      </ClickAwayListener>
    </Field>
  );
};

// const argTypes: ArgTypes = {
//   // Add these native props to the props table and controls pane
//   placeholder: {
//     description:
//       "Placeholder text for the SearchBox. If using this instead of a label (which is " +
//       "not recommended), be sure to provide an `aria-label` for screen reader users.",
//     type: { name: "string", required: false }, // for inferring control type
//     table: { type: { summary: "string" } }, // for showing type in prop table
//   },
//   disabled: {
//     description: "Whether the SearchBox is disabled",
//     type: { name: "boolean", required: false },
//     table: { type: { summary: "boolean" } },
//   },
//   // Hide these from the props table and controls pane
//   children: { table: { disable: true } },
//   as: { table: { disable: true } },
// };
