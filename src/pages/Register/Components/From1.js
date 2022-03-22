import React from "react";
import { Field } from "formik";
import { Box, Button, Grid, TextField } from "@material-ui/core";
import { useStyles } from "../hooks/Styles";
import { colors } from "../../../themes/colors";
import Alert from "@material-ui/lab/Alert";

function From1({ formik, alertMail, onSubmit, ChampVide, ActivateAlert }) {
  const classes = useStyles();
  return (
    <div style={{ marginTop: "0px", padding: 20 }}>
          {ChampVide ? (
        <Alert severity="error" fullwidth style={{margin:'5px 0px 40px 0px'}}>
          {ChampVide}
        </Alert>
      ) : (
        <></>
      )}
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
            onClick={() => {
              // formik.handleSubmit()
              // onSubmit()
              console.log(formik);
              // if (formik?.errors.Addresses && formik?.errors.nomentreprise) {
              // }
              if (
                formik?.values?.nom?.length  &&
                formik?.errors.nom == null &&
                formik?.values.prenom.length  &&
                formik?.errors.prenom == null &&
                formik?.values.email.length  &&
                formik?.errors.email == null &&
                formik?.values.phone.length  &&
                formik?.errors.phone == null &&
                formik?.values.password.length  &&
                formik?.errors.password == null &&
                formik?.values.cfpassword.length  &&
                formik?.errors.cfpassword == null &&
                formik?.errors.Addresses &&
                formik?.errors.nomentreprise
              ) {
                onSubmit();
              } else {
                ActivateAlert();
              }
            }}
            variant="contained"
            style={{ backgroundColor: colors.brown }}
            className={classes.btn}
            disabled={formik.isSubmitting ? true : false}
          >
            Suivant &gt;
          </Button>
        </Grid>
      </Box>
      {alertMail ? (
        <Alert severity="error" fullwidth>
          {alertMail}
        </Alert>
      ) : (
        <></>
      )}

    </div>
  );
}

export default From1;

//  formik?.touched.prenom == true &&
//     !formik?.errors.prenom &&
//     formik?.touched.email == true &&
//     !formik?.errors.email &&
//     formik?.touched.phone == true &&
//     !formik?.errors.phone &&
//     formik?.touched.password == true &&
//     !formik?.errors.password &&
//     formik?.touched.cfpassword == true &&
//     !formik?.errors.cfpassword
