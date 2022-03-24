import { Field } from "formik";
import React from "react";

import { Box, Button, Grid, TextField } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { colors } from "../../../../themes/colors";
import { useStyles } from "./styles";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Forgot2({ formik, alertMail, onSubmit }) {
  // console.log("formik", formik);
  const classes = useStyles();
  return (
    <>
      <Box style={{ paddingLeft: 15, fontWeight: "700" }}>
        Entrez votre nouveau mot de passe
      </Box>

      <Box className={classes.Container}>
        <Field
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="password"
          type="password"
          name="password"
          as={TextField}
          error={
            formik.errors.password && formik.touched.password ? true : false
          }
        />
        {formik.errors.password && formik.touched.password && (
          <Box className={classes.ErrorMes}>{formik.errors.password}</Box>
        )}
        <Field
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="password"
          name="cfpassword"
          id="cfpassword"
          as={TextField}
          error={
            formik.errors.cfpassword && formik.touched.cfpassword ? true : false
          }
        />
        {formik.errors.cfpassword && formik.touched.cfpassword && (
          <Box className={classes.ErrorMes}>{formik.errors.cfpassword}</Box>
        )}
        <Box mt={10} className={classes.ContainerButtons}>
          <Button
            onClick={() => {
              formik.handleSubmit();
            }}
            variant="contained"
            style={{ backgroundColor: colors.brown, color: colors.white }}
            className={classes.btn}
            disabled={formik.isSubmitting ? true : false}
          >
            Enregistrer
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

export default Forgot2;
