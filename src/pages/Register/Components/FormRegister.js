/*eslint-disable*/
import { Paper } from "@material-ui/core";
import React, { useState } from "react";
import { Form, Formik } from "formik";
import { UseRegister } from "../hooks/useForm";
import From1 from "./Form1/From1";
import From2 from "./Form2/From2";
import { useStyles } from "../hooks/Styles";
import Error from "./Form1/Components/Error";
import { useHistory } from "react-router-dom";

function FormRegister(props) {
  const {
    RegsiterSchema,
    registerValues,
    pageId,
    TypeLenseigne,
    onReturn,
    alertMail,
    onSubmit,
    AddressesOption,
    TypeOffre,
    typeInscrire,
    ChampVide,
    ActivateAlert,
    Validate,
    ValidateRegister
  } = UseRegister();
  const classes = useStyles();
  const history = useHistory();
  /**
   * Récupération du contenu de page selon le numéro de page
   * page 0 : nom,prénom... mot de passe
   * page 1 : organisation
   * @returns {*}
   */




  const GetFormContent = ({
    formik,
    onReturn,
    alertMail,
    TypeLenseigne,
    AddressesOption,
    typeInscrire,
    ChampVide,
    ActivateAlert,
    ValidateRegister,

  }) => {
    switch (pageId) {
      case 0:
        return (
          <From1
            formik={formik}
            alertMail={alertMail}
            onSubmit={onSubmit}
            ChampVide={ChampVide}
            ActivateAlert={ActivateAlert}
          />
        );
      case 1:
        return (
          <From2
            formik={formik}
            AddressesOption={AddressesOption}
            onReturn={onReturn}
            TypeLenseigne={TypeLenseigne}
            TypeOffre={TypeOffre}
            typeInscrire={typeInscrire}
         
          />
        );
      default:
        break;
    }
  };
  return (
    <Paper elevation={0}>
      <Formik
        className={classes.Form}
        initialValues={registerValues}
        validationSchema={RegsiterSchema}
        onSubmit={(value, formikAction) => {
          setTimeout(() => {
            // console.log(value);
            // ValidateRegister(value)
            Validate(value)
            history.push("signIn");
            formikAction.setSubmitting(false);
            formikAction.resetForm();
          }, 3000);
        }}
      >
        {(formik) => {
          return [
            <Form autoComplete="on" name="hotel">
              {formik.errors.password && formik.touched.password && <Error />}
              {formik.errors.cfpassword && formik.touched.cfpassword && (
                <Error />
              )}
              <GetFormContent
                formik={formik}
                AddressesOption={AddressesOption}
                onReturn={onReturn}
                alertMail={alertMail}
                TypeLenseigne={TypeLenseigne}
                typeInscrire={typeInscrire}
                onSubmit={onSubmit}
                ChampVide={ChampVide}
                ActivateAlert={ActivateAlert}
               
              />
            </Form>,
          ];
        }}
      </Formik>
    </Paper>
  );
}

export default FormRegister;
