/*eslint-disable*/
import { Paper } from "@material-ui/core";
import React  from "react";
import { Form, Formik } from "formik";
import { UseRegister } from "../hooks/useForm";
import From1 from "./From1";
import From2 from "./From2";
import { useStyles } from "../hooks/Styles";
import Error from "./Error";

function FormRegister(props) {
  const { RegsiterSchema, registerValues,pageId,fetchEmail,onReturn,alertMail,onSubmit } = UseRegister();
  const classes = useStyles();

  /**
   * Récupération du contenu de page selon le numéro de page
   * page 0 : nom,prénom... mot de passe
   * page 1 : organisation
   * @returns {*}
   */

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
            // fetchEmail(value.email)
            onSubmit()
            formikAction.setSubmitting(false);
            formikAction.resetForm();
          }, 3000);
        }}
      >
        {(formik) => {
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
