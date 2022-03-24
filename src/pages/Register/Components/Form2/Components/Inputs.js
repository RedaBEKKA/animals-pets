import { Box, TextField } from "@material-ui/core";
import { Field } from "formik";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { colors } from "../../../../../themes/colors";
import { useStyles } from "./styles";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { FormControl } from "@material-ui/core";

function Inputs({ formik, HandelValues }) {
  const classes = useStyles();
  const [adresse, setAdresse] = useState("");
  const [Valide, setValide] = useState(false);
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });

  // console.log("formik", formik, coordinates);
  const handleAddressSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAdresse(value);
    setCoordinates(latLng);
    setValide(true);
  };
  useLayoutEffect(() => {
    if (Valide) {
      HandelValues(adresse, coordinates);
      // setValide(false);
    }
  }, [Valide == true]);

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
        value={adresse}
        onChange={setAdresse}
        // onChange={(e, value) => setFieldValue("city_id", value)}
        onSelect={handleAddressSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
          {
          }
          return [
            <>
              <Field
                variant="outlined"
                required
                fullWidth
                id="Addresses"
                label="Addresses"
                as={TextField}
                value={adresse}
                error={
                  adresse?.length < 3 && adresse?.length !== 0 ? true : false
                }
                {...getInputProps({
                  label: "Adresse",
                  placeholder: "Entrez l'adresse",
                })}
              />
              <div>
                {loading ? <div>Chargement...</div> : null}

                {suggestions.map((suggestion, i) => {
                  const style = {
                    backgroundColor: suggestion.active
                      ? colors.brown
                      : "#fafafa",
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
            </>,
          ];
        }}
      </PlacesAutocomplete>
    </Box>
  );
}

export default Inputs;
