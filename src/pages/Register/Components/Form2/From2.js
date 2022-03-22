import {Box} from "@material-ui/core";
import React from "react";
import { useStyles } from "../../hooks/Styles";
import Buttons from "./Components/Buttons";
import Inputs from "./Components/Inputs";
import OfferCheckbox from "./Components/OfferCheckbox";

    
    function From2({ onReturn, TypeLenseigne,typeInscrire, formik,TypeOffre ,}) {
  const classes = useStyles();
  console.log(formik);
  return (
    <Box className={classes.ContainerForm2}>
      <Inputs formik={formik} />
      <OfferCheckbox
        formik={formik}
        TypeLenseigne={TypeLenseigne}
        TypeOffre={TypeOffre}
        typeInscrire={typeInscrire}
      />
        
      <Buttons  onReturn={onReturn} formik={formik}/>
    </Box>
  );
}

export default From2;

{
  /* {TypeLenseigne.map((option) => {
          return (
            <>
              <Field type='checkbox' name="TypeLenseigne" value={option.value} />
            </>
          );
        })} */
}
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
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: 48 * 4.5 + 8,
//       width: 400,
//     },
//   },
// };
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
{
  /* <FormControl
component="fieldset"
className={classes.formControl}
required={true}
>
<FormLabel
  component="legend"
  style={{ fontWeight: "800", color: "#000" }}
>
  Type de l'enseigne
</FormLabel>
<FormGroup>
  <FormControlLabel
    control={
      <Checkbox
        //   checked={estArtisan}
        //   onChange={(e) => setEstArtisan(e.target.checked)}
        name="estArtisan"
        color="default"
      />
    }
    label="Artisan"
  />
  <FormControlLabel
    control={
      <Checkbox
        //   checked={estMagasinSpe}
        //   onChange={(e) => setEstMagasinSpe(e.target.checked)}
        name="estMagasinSpe"
        color="default"
      />
    }
    label="Magasin spécialisé"
  />
  <FormControlLabel
    control={
      <Checkbox
        //   checked={estMagasinGen}
        //   onChange={(e) => setEstMagasinGen(e.target.checked)}
        name="estMagasinGen"
        color="default"
      />
    }
    label="Magasin généraliste"
  />
  <FormControlLabel
    control={
      <Checkbox
        //   checked={estAsso}
        //   onChange={(e) => setEstAsso(e.target.checked)}
        name="estAsso"
        color="default"
      />
    }
    label="Association"
  />
  <FormControlLabel
    control={
      <Checkbox
        //   checked={estMarque}
        //   onChange={(e) => setEstMarque(e.target.checked)}
        name="estMarque"
        color="default"
      />
    }
    label="Marque"
  />

  <FormControlLabel
    control={
      <Checkbox
        //   checked={estMarque}
        //   onChange={(e) => setEstMarque(e.target.checked)}
        name="MarketPlace"
        color="default"
      />
    }
    label="MarketPlace"
  />
</FormGroup>
</FormControl> */
}

{
  /* <Select
                  multiple
                  value={nomsServicesCHoisis}
                  onChange={handleChange}
                  input={<Input id="select-multiple-checkbox" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                > */
}
{
  /* {nomsServices.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox
                      checked={nomsServicesCHoisis.indexOf(name) > -1}
                    />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))} */
}
// </Select>
//
