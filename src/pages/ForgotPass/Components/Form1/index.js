import { Field } from "formik";
import React from "react";

import { Box, Button, CircularProgress, TextField } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useStyles } from "./styles";
import { useHistory } from "react-router-dom";
import { colors } from "../../../../themes/colors";

function Form1({ formik, alertMail, AlertInfo }) {
  const classes = useStyles();
  const history = useHistory();
  return (
    <>
      <Box style={{ paddingLeft: 15 }}>
        Un lien de réinitialisation de mot de passe sera envoyé a cette adresse
      </Box>
      {AlertInfo ? (
        <Alert severity="info" fullwidth style={{ marginTop: 15 }}>
          {AlertInfo}
        </Alert>
      ) : (
        <></>
      )}
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
              history.push("/signIn");
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
            variant="contained"
            style={{ backgroundColor: colors.brown }}
            className={classes.btn}
            disabled={formik.isSubmitting ? true : false}
            type="submit"
          >
            Envoyer
            {formik.isSubmitting && (
              <CircularProgress
                color={colors.white}
                size={18}
                style={{ marginLeft: 10 }}
              />
            )}
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

export default Form1;
