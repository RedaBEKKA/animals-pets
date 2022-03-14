import React from "react";
import { Field } from "formik";
import { Box, Button, Grid, TextField } from "@material-ui/core";
import { useStyles } from "../hooks/Styles";
import { colors } from "../../../themes/colors";
import Alert from "@material-ui/lab/Alert";

function From1({ formik ,alertMail}) {
  const classes = useStyles();
  console.log("formik", formik);
  return (
    <div style={{ marginTop: "50px" }}>
      <Grid container justify="space-between">
        <Field
          variant="outlined"
          required
          name="nom"
          label="Nom"
          type="text"
          id="nom"
          className={classes.formText}
          as={TextField}
          error={formik.errors.nom && formik.touched.nom ? true : false}
        />
        <Field
          variant="outlined"
          required
          name="prenom"
          label="Prénom"
          type="text"
          id="prenom"
          className={classes.formText}
          as={TextField}
          error={formik.errors.prenom && formik.touched.prenom ? true : false}
        />
      </Grid>
      <Field
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email"
        type="email"
        name="email"
        as={TextField}
        error={formik.errors.email && formik.touched.email ? true : false}
      />
      <Field
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="phone"
        label="Téléphone"
        type="tel"
        name="phone"
        as={TextField}
        error={formik.errors.phone && formik.touched.phone ? true : false}
      />
      <Field
        variant="outlined"
        margin="normal"
        required
        fullWidth
        type="password"
        name="password"
        id="password"
        label="Mot de passe"
        as={TextField}
        error={formik.errors.password && formik.touched.password ? true : false}
      />
      <Field
        variant="outlined"
        margin="normal"
        required
        fullWidth
        type="password"
        name="cfpassword"
        id="cfpassword"
        label="Valider le mot de passe"
        as={TextField}
        error={
          formik.errors.cfpassword && formik.touched.cfpassword ? true : false
        }
      />

      <Box mt={10} style={{ width: "93%" }}>
        <Grid container spacing={10} justify="flex-end" mr={15}>
          <Button
            onClick={() => {formik.handleSubmit() }}
            variant="contained"
            style={{ backgroundColor: colors.brown }}
            className={classes.btn}
            disabled={formik.isSubmitting ?  true: false}
          >
            Suivant &gt;
          </Button>
        </Grid>
      </Box>
      {alertMail ? <Alert severity="error" fullwidth>{alertMail}</Alert> : <></>}

    </div>
  );
}

export default From1;
