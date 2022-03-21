/*eslint-disable*/
import { Paper } from "@material-ui/core";
import React from "react";
import { Form, Formik } from "formik";
import { useStyles } from "./styles";
import { useForgot } from "../../Hooks/useForgot";
import Forgot1 from "../Form1";
import Forgot2 from "../Form2";

function FormForgot(props) {

  const {
    RegsiterSchema,
    ForgotValues,
    pageId,
    fetchEmail,
    onReturn,
    alertMail,
    onSubmit,
  } = useForgot();
  const classes = useStyles();

  /**
   * Récupération du contenu de page selon le numéro de page
   * page 0 : Eamil
   * page 1 : Password
   * @returns {*}
   */

  const GetFormContent = ({ formik, onReturn, alertMail,onSubmit }) => {
    switch (pageId) {
      case 0:
        return <Forgot1 formik={formik} alertMail={alertMail} onSubmit={onSubmit}/>;
      case 1:
        return <Forgot2 formik={formik} onReturn={onReturn} />;
      default:
        break;
    }
  };

  return (
    <Paper className={classes.IndexPanier} elevation={0}>
      <Formik
        className={classes.Form}
        initialValues={ForgotValues}
        validationSchema={RegsiterSchema}
        onSubmit={(value, formikAction) => {
          setTimeout(() => {
            // fetchEmail(value.email)
            console.log(value)
            formikAction.setSubmitting(false);
            formikAction.resetForm();
          }, 3000);
        }}
      >
        {(formik) => {
          return [
            <Form autoComplete="on" name="hotel">
              <GetFormContent
                formik={formik}
                onReturn={onReturn}
                alertMail={alertMail}
                onSubmit={onSubmit}
              />
            </Form>,
          ];
        }}
      </Formik>
    </Paper>
  );
}

export default FormForgot;
