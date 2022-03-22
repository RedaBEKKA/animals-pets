import React from "react";
import { Field } from "formik";
import { Box, FormControl, FormLabel } from "@material-ui/core";
import { useStyles } from "./styles";

function CheckboxGroup(props) {
  const { label, name, options, error } = props;
  const classes = useStyles();

  return (
    <Box className={classes.containercheckbox}>
      <FormControl error={error}>
        <FormLabel
          component="legend"
          style={{ fontWeight: "800", color: "#000", paddingBottom: 10 }}
        >
          {label}
        </FormLabel>

        {options.map((option) => {
          return (
            <Box className={classes.item}>
              <Field type="checkbox" name={name} value={option.value} />
              <FormLabel className={classes.textLabel}>
                {option.value}
              </FormLabel>
            </Box>
          );
        })}
      </FormControl>
    </Box>
  );
}

export default CheckboxGroup;
