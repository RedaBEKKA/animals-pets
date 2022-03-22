import { Box, TextField } from "@material-ui/core";
import { Field } from "formik";
import React from "react";
import PlacesAutocomplete from "react-places-autocomplete/dist/PlacesAutocomplete";
import { colors } from "../../../../../themes/colors";
import { useStyles } from "./styles";

function Inputs({ formik }) {
  const classes = useStyles();
  return (
    <Box className={classes.inputBox}>
      <Field
        variant="outlined"
        required
        fullWidth
        id="nomentreprise"
        label="Nom de l'enseigne"
        name="nomentreprise"
        as={TextField}
        className={classes.Field}
        error={
          formik.errors.nomentreprise && formik.touched.nomentreprise
            ? true
            : false
        }
      />
      <PlacesAutocomplete
      // value={adresse}
      // onChange={setAdresse}
      // onSelect={handleAddressSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <>
            <Field
              variant="outlined"
              required
              fullWidth
              id="Addresses"
              label="Addresses"
              name="Addresses"
              as={TextField}
              error={
                formik.errors.Addresses && formik.touched.Addresses
                  ? true
                  : false
              }
              // {...getInputProps({
              //   label: "Adresse",
              //   placeholder: "Entrez l'adresse",
              // })}
            />
            <div>
              {loading ? <div>Chargement...</div> : null}

              {suggestions.map((suggestion, i) => {
                const style = {
                  backgroundColor: suggestion.active ? colors.brown : "#fafafa",
                };
                return (
                  <div
                    key={i}
                    {...getSuggestionItemProps(suggestion, { style })}
                  >
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </PlacesAutocomplete>
    </Box>
  );
}

export default Inputs;
