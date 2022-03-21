import * as Yup from "yup";
import { fr } from "yup-locales";
import { setLocale } from "yup";
import { useState } from "react";
import misterCoockyApi from "../../../constante/apiUrl";

setLocale(fr);

export function useForgot() {
  const [pageId, setPageId] = useState(0); //numéro de page du formulaire d'inscription (0,1,2)
  const [alerPassowrd, setAlerPassowrd] = useState(""); //message d'alerte au niveau de l'adresse mail

  const ForgotValues = {
    email: "",
    password: "",
    cfpassword: "",
  };

  const lowercaseRegEx = /(?=.*[a-z])/;
  const uppercaseRegEx = /(?=.*[A-Z])/;
  const numericRegEx = /(?=.*[0-9])/;
  const specialsRegEx = /[^A-Za-z 0-9]/g;
  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  let RegsiterSchema = Yup.object().shape({
    email: Yup.string()
      .matches(emailRegex, "Doit être un email valide !")
      .max(35, "email est trop long - doit être de 35 caractères maximum.")
      .required("email est requis")
      .min(4, "email est trop court - doit comporter au moins 4 caractères."),
    password: Yup.string()
      .max(
        15,
        "Le mot de passe est trop long - doit être de 15 caractères maximum."
      )
      .min(
        4,
        "Le mot de passe est trop court - doit comporter au moins 4 caractères."
      )
      .matches(lowercaseRegEx, "Doit contenir des lettres minuscules !")
      .matches(uppercaseRegEx, "Doit contenir des lettres majuscule !")
      .matches(numericRegEx, "Doit contenir des chiffres !")
      .matches(specialsRegEx, "Doit contenir un caractère spécial !")

      .required("Mot de passe requis"),
    cfpassword: Yup.string()
      .required("Confirme mot de passe est requis")
      .oneOf([Yup.ref("password")], "Les mots de passe ne correspondent pas"),
  });

  const onSubmit = () => {
    setPageId(pageId + 1);
  };
  const onReturn = () => {
    setPageId(pageId - 1);
  };
  return {
    ForgotValues,
    RegsiterSchema,
    alerPassowrd,
    pageId,
    onReturn,
    onSubmit,
  };
}
