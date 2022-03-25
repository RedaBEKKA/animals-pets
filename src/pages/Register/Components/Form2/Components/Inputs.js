import { Box, TextField } from "@material-ui/core";
import { Field } from "formik";
import React, { useLayoutEffect, useState } from "react";
import { colors } from "../../../../../themes/colors";
import { useStyles } from "./styles";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import {
  GET_ADDRESS,
  GET_CORDINATES,
  GET_DEL_ADDRESS_CORDINATES,
} from "../../../../../Redux/Types";
import { useDispatch, useSelector } from "react-redux";
import { Close } from "@material-ui/icons";

function Inputs({ formik }) {
  const classes = useStyles();
  const [adresse, setAdresse] = useState("");
  // const [Valide, setValide] = useState(false);
  // const [coordinates, setCoordinates] = useState({
  //   lat: null,
  //   lng: null,
  // });

  const Address = useSelector((state) => state.Address);
  const { Adresses, check } = Address;
  const dispatch = useDispatch();
  const handleAddressSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    dispatch({ type: GET_ADDRESS, payload: value });
    dispatch({ type: GET_CORDINATES, payload: latLng });
    // setAdresse(value);
    // setCoordinates(latLng);
    // console.log("adresse", value);

    // setValide(true);
  };
  // useLayoutEffect(() => {
  //   if (Valide && adresse.length > 3) {
  //     dispatch({ type: GET_ADDRESS, payload: adresse });
  //     dispatch({ type: GET_CORDINATES, payload: coordinates });
  //     // setValide(false);
  //   } else {
  //     console.log("Valide", Valide);
  //   }

  //   // if ( adresse.length == 0 && check ) {
  //   //   dispatch({ type: GET_DEL_ADDRESS_CORDINATES });
  //   // }
  // }, [Valide]);
console.log('formik', formik)
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

      {!Adresses && (
        <PlacesAutocomplete
          value={adresse}
          onChange={setAdresse}
          onSelect={handleAddressSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => {
            {
            }
            return [
              <>
                <Field
                  variant="outlined"
                  required
                  fullWidth
                  as={TextField}
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
      )}
      <Box style={{display:'flex',alignItems:'center',position:'relative'}}>
        {Adresses && (
          <Field
            as={TextField}
            fullWidth
            variant="outlined"
            id="Addresses"
            value={Adresses}
            name="Addresses"
          />
        )}
        {Adresses && (
          <Close
            onClick={() => {
              dispatch({ type: GET_DEL_ADDRESS_CORDINATES });
            }}
            style={{position:'absolute', right:15}} 
          />
        )}
      </Box>
    </Box>
  );
}

export default Inputs;
