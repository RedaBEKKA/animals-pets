import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Input, InputLabel, Select, TextField } from '@material-ui/core';
import React from 'react'
import PlacesAutocomplete from 'react-places-autocomplete';
import { Field } from "formik";
import { colors } from '../../../themes/colors';
import { useStyles } from '../hooks/Styles';

function From2() {
    const classes = useStyles();
    const MenuProps = {
        PaperProps: {
          style: {
            maxHeight: 48 * 4.5 + 8,
            width: 400,
          },
        },
      };
  return (
    <>
    <Box mb={2}>
      <Field
        variant="outlined"
        required
        fullWidth
        id="enseigne"
        label="Nom de l'enseigne"
        name="enseigne"
        // value={companyName}
        // onChange={(e) => setCompanyName(e.target.value)}
      />
    </Box>
    <PlacesAutocomplete
    //   value={adresse}
    //   onChange={setAdresse}
    //   onSelect={handleAddressSelect}
    >
      {({
        getInputProps,
        suggestions,
        getSuggestionItemProps,
        loading,
      }) => (
        <div>
          <Field
            variant="outlined"
            required
            fullWidth
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
        </div>
      )}
    </PlacesAutocomplete>
    <Grid container>
      <Grid container item xs={12} sm={6} md={6}>
        <FormControl
          component="fieldset"
          className={classes.formControl}
          required={true}
        >
          <FormLabel component="legend">Type de l'enseigne</FormLabel>
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
          </FormGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <FormControl
          required
          component="fieldset"
          className={classes.formControl}
        >
          <FormLabel component="legend">Type de l'offre</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                //   checked={estAlim}
                //   onChange={(e) => setEstAlim(e.target.checked)}
                  name="Alimentation"
                  color="default"
                />
              }
              label="Alimentation"
            />
            <FormControlLabel
              control={
                <Checkbox
                //   checked={estAccess}
                //   onChange={(e) => setEstAccess(e.target.checked)}
                  name="Accessoire"
                  color="default"
                />
              }
              label="Accessoire"
            />
            <FormControl>
              <InputLabel>Services</InputLabel>
              <Select
                multiple
                // value={nomsServicesCHoisis}
                // onChange={handleChange}
                input={<Input id="select-multiple-checkbox" />}
                // renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {/* {nomsServices.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox
                      checked={nomsServicesCHoisis.indexOf(name) > -1}
                    />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))} */}
              </Select>
            </FormControl>
          </FormGroup>
        </FormControl>
      </Grid>
    </Grid>

    <Box mt={10}>
      <Grid container spacing={10} justify="space-around">
        <Button
          variant="contained"
          style={{ backgroundColor: colors.red }}
          className={classes.btn}
        //   onClick={() => setPageId(pageId - 1)}
        >
          Précédent
        </Button>
        <Button
          type="submit"
          variant="contained"
          style={{ backgroundColor: colors.red }}
          className={classes.btn}
        >
          Suivant &gt;
        </Button>
      </Grid>
    </Box>
  </>
  )
}

export default From2