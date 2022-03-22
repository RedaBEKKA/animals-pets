import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "../../TextError";
import { useStyles } from "../../../hooks/Styles";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

function SelectMui(props) {
  const classes = useStyles();

  const { label, name, options,errorMsg, ...rest } = props;
//   console.log('errorMsg', errorMsg)
  return (
    <FormControl
      fullWidth
      variant="outlined"
      error={errorMsg ? true : false }
    >
      <InputLabel id="demo-simple-select-label">Adresse</InputLabel>
      <Select
        as="select"
        id={name}
        name={name}
        {...rest}
        className={classes.selected}
        labelId={name}
      >
        {options.map((option) => {
          return (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          );
        })}
      </Select>
      {/* <ErrorMessage component={TextError} name={name} /> */}
    </FormControl>
  );
}

export default SelectMui;
