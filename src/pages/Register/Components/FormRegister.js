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
  const { RegsiterSchema, registerValues } = UseRegister();
  const [pageId, setPageId] = useState(0); //numéro de page du formulaire d'inscription (0,1,2)
  const classes = useStyles();

  const GetFormContent = ({ formik }) => {
    switch (pageId) {
      case 0:
        return <From1 formik={formik} />;
      case 1:
        return <From2 formik={formik} />;

      default:
        break;
    }
  };
  const onSubmit = ()=>{
    setPageId(pageId +1)
  }

  return (
    <Paper className={classes.IndexPanier} elevation={0}>
      <Formik
        className={classes.Form}
        initialValues={registerValues}
        validationSchema={RegsiterSchema}
        onSubmit={(value,formikAction) => {
          setTimeout(() => {
            // console.log('value', value,formikAction);
             onSubmit(value)
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
              <GetFormContent formik={formik} />
            </Form>,
          ];
        }}
      </Formik>
    </Paper>
  );
}

export default FormRegister;
