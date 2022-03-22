import React from "react";
import { Field } from "formik";
import { Box, Button, Grid, TextField } from "@material-ui/core";
import { useStyles } from "./Styles";
import { colors } from "../../../../themes/colors";
import Alert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";

function From1({ formik, alertMail, onSubmit, ChampVide, ActivateAlert }) {
  const classes = useStyles();

  const NextPage = () => {
    if (
      formik?.values?.nom?.length &&
      formik?.errors.nom == null &&
      formik?.values.prenom.length &&
      formik?.errors.prenom == null &&
      formik?.values.email.length &&
      formik?.errors.email == null &&
      formik?.values.phone.length &&
      formik?.errors.phone == null &&
      formik?.values.password.length &&
      formik?.errors.password == null &&
      formik?.values.cfpassword.length &&
      formik?.errors.cfpassword == null &&
      formik?.errors.Addresses &&
      formik?.errors.nomentreprise
    ) {
      onSubmit();
    } else {
      ActivateAlert();
    }
  };
  const AlertItem = () => {
    return ChampVide ? (
      <Alert severity="error" fullwidth style={{ margin: "5px 0px 40px 0px" ,width:'100%',color:"#f00" }}>
        {ChampVide}
      </Alert>
    ) : (
      <></>
    );
  };
  const AlertMailItem = () => {
    return alertMail ? (
      <Alert severity="error" fullwidth>
        {alertMail}
      </Alert>
    ) : (
      <></>
    );
  };
  return (
    <Box className={classes.ContainerForm1}>
      <AlertItem />
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

      <AlertMailItem />

      <Box className={classes.containerButtons}>
        <Link to="/signIn" style={{paddingLeft:15}}> Déja un compte ? Se connecter</Link>
        <Button
          onClick={() => {
            NextPage();
          }}
          variant="contained"
          style={{
            backgroundColor: colors.brown,
            color: colors.white,
            fontWeight: "700",
          }}
          className={classes.btn}
          disabled={formik.isSubmitting ? true : false}
        >
          Suivant &gt;
        </Button>
      </Box>
    </Box>
  );
}

export default From1;
