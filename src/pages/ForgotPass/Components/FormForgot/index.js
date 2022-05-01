/*eslint-disable*/
import { Paper } from "@material-ui/core";
import React from "react";
import { Form, Formik } from "formik";
import { useStyles } from "./styles";
import { useForgot } from "../../Hooks/useForgot";
import Form1 from "../Form1/index";

function FormForgot(props) {
  const { RegsiterSchema, ForgotValues, alertMail, onSubmit,AlertInfo } = useForgot();
  const classes = useStyles();

  return (
    <Paper className={classes.IndexPanier} elevation={0}>
      <Formik
        initialValues={ForgotValues}
        validationSchema={RegsiterSchema}
        onSubmit={(value, formikAction) => {
          setTimeout(() => {
            formikAction.setSubmitting(false);
            formikAction.resetForm();
            onSubmit(value.email);
          }, 3000);
        }}
      >
        {(formik) => {
          return [
            <Form autoComplete="on" name="hotel">
              <Form1 formik={formik} alertMail={alertMail}  AlertInfo={AlertInfo} />
            </Form>,
          ];
        }}
      </Formik>
    </Paper>
  );
}

export default FormForgot;
