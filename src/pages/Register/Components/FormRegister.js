/*eslint-disable*/
import { Box, Paper } from "@material-ui/core";
import React, { useState } from "react";

import { Form, Formik } from "formik";
import { UseRegister } from "../hooks/useForm";
import From1 from "./From1";
import From2 from "./From2";
import { useStyles } from "../hooks/Styles";
import Error from "./Error";

function FormRegister(props) {
  const { RegsiterSchema, registerValues,pageId,fetchEmail,onReturn,alertMail } = UseRegister();
  const classes = useStyles();
console.log('pageId', pageId)
  const GetFormContent = ({ formik,onReturn,alertMail }) => {
    switch (pageId) {
      case 0:
        return <From1 formik={formik} alertMail={alertMail}  />;
      case 1:
        return <From2 formik={formik}  onReturn={onReturn}/>;

      default:
        break;
    }
  };

  return (
    <Paper className={classes.IndexPanier} elevation={0}>
      <Formik
        className={classes.Form}
        initialValues={registerValues}
        validationSchema={RegsiterSchema}
        onSubmit={(value,formikAction) => {
          setTimeout(() => {
            // console.log('value', value.email,formikAction);
            fetchEmail(value.email)
            formikAction.setSubmitting(false);
            formikAction.resetForm();
          }, 3000);
        }}
      >
        {(formik) => {
          console.log("formik---------", formik.errors);

          return [
            <Form autoComplete="on" name="hotel">
              {formik.errors.password && formik.touched.password && <Error />}
              {formik.errors.cfpassword &&formik.touched.cfpassword && <Error />}
              <GetFormContent formik={formik} onReturn={onReturn} alertMail={alertMail} />
            </Form>,
          ];
        }}
      </Formik>
    </Paper>
  );
}

export default FormRegister;
