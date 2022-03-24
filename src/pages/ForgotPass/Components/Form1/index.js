import { Field } from "formik";
import React from "react";

import { Box, Button, Grid, TextField } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { colors } from "../../../../themes/colors";
import { useStyles } from "./styles";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Forgot1({ formik, alertMail, onSubmit }) {
  // console.log("formik", formik);
  const classes = useStyles();
 const history = useHistory()
  return (
    <>
      <Box style={{ paddingLeft: 15 }}>
        Un lien de réinitialisation de mot de passe sera envoyé a cette adresse
      </Box>

      <Box className={classes.Container}>
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
        {formik.errors.email && formik.touched.email && (
          <Box className={classes.ErrorMes}>{formik.errors.email}</Box>
        )}
        <Box mt={10} className={classes.ContainerButtons}>
          <Button
            onClick={() => {
              history.push("/signIn")
            }}
            variant="contained"
            style={{
              backgroundColor: colors.white,
              color: colors.black,
              border: `1px solid ${colors.brown}`,
            }}
            className={classes.btn}
          >
            Précedent
          </Button>
            
          <Button
            onClick={() => {
              if (!formik?.errors.email) {
                formik.submitForm();
              } 
               if (formik?.touched.email == true && !formik?.errors.email) {
                onSubmit();
              }
            }}
            variant="contained"
            style={{ backgroundColor: colors.brown }}
            className={classes.btn}
            disabled={formik.isSubmitting ? true : false}
          >
            Envoyer
          </Button>
        </Box>

        {alertMail ? (
          <Alert severity="error" fullwidth>
            {alertMail}
          </Alert>
        ) : (
          <></>
        )}
      </Box>
    </>
  );
}

export default Forgot1;
