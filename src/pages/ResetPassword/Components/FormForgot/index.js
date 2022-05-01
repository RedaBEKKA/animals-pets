/*eslint-disable*/
import { Paper } from "@material-ui/core";
import React from "react";
import { Form, Formik } from "formik";
import { useStyles } from "./styles";
import Forgot2 from "../Form2";
import { useHistory } from "react-router-dom";
import { useForgot } from "../../Hooks/useForgot";

function FormForgot(props) {
  const { RegsiterSchema, ForgotValues, onReturn } = useForgot();
  const classes = useStyles();
  const history = useHistory();

  return (
    <Paper className={classes.IndexPanier} elevation={0}>
      <Formik
        initialValues={ForgotValues}
        validationSchema={RegsiterSchema}
        onSubmit={(value, formikAction) => {
          setTimeout(() => {
            // fetchEmail(value.email)
            // console.log(value)
            formikAction.setSubmitting(false);
            formikAction.resetForm();
            history.push("/signIn");
          }, 3000);
        }}
      >
        {(formik) => {
          return [
            <Form autoComplete="on" name="hotel">
              <Forgot2 formik={formik} onReturn={onReturn}  />
            </Form>,
          ];
        }}
      </Formik>
    </Paper>
  );
}

export default FormForgot;
