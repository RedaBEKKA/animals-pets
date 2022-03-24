import { Box } from "@material-ui/core";
import React, { useState } from "react";
import { useStyles } from "../../hooks/Styles";
import Buttons from "./Components/Buttons";
import Inputs from "./Components/Inputs";
import OfferCheckbox from "./Components/OfferCheckbox";

function From2({
  onReturn,
  TypeLenseigne,
  typeInscrire,
  formik,
  TypeOffre,
  HandelValues,
  Adresses
}) {
  const classes = useStyles();
  // console.log(formik);
  return (
    <Box className={classes.ContainerForm2}>
      <Inputs
        formik={formik}
        HandelValues={HandelValues}
      />
      <OfferCheckbox
        formik={formik}
        TypeLenseigne={TypeLenseigne}
        TypeOffre={TypeOffre}
        typeInscrire={typeInscrire}
      />
      <Buttons onReturn={onReturn} formik={formik} Adresses={Adresses} />
    </Box>
  );
}

export default From2;

{
  /* <Box className={classes.inputBox}>
<Select
  id="Addresses"
  label="Adresses"
  name="Addresses"
  options={AddressesOption}
  errorMsg={Error}
/>
</Box> */
}

// <PlacesAutocomplete
// //   value={adresse}
// //   onChange={setAdresse}
// //   onSelect={handleAddressSelect}
// >
//   {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
//     <div>
//       <Field
//         variant="outlined"
//         required
//         fullWidth
//         {...getInputProps({
//           label: "Adresse",
//           placeholder: "Entrez l'adresse",
//         })}
//         as={TextField}
//       />
//       <div>
//         {loading ? <div>Chargement...</div> : null}

//         {suggestions.map((suggestion, i) => {
//           const style = {
//             backgroundColor: suggestion.active ? colors.brown : "#fafafa",
//           };
//           return (
//             <div
//               key={i}
//               {...getSuggestionItemProps(suggestion, { style })}
//             >
//               {suggestion.description}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   )}
// </PlacesAutocomplete>
