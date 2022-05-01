import * as Yup from "yup";
import { fr } from "yup-locales";
import { setLocale } from "yup";
import { useState } from "react";
// import { useHistory } from "react-router-dom";

setLocale(fr);

export function useForgot() {
  const [pageId, setPageId] = useState(0); //numéro de page du formulaire d'inscription (0,1,2)
  const [alerPassowrd, setAlerPassowrd] = useState(""); //message d'alerte au niveau de l'adresse mail
  // const history = useHistory();

  const ForgotValues = {
    password: "",
    cfpassword: "",
  };

  const lowercaseRegEx = /(?=.*[a-z])/;
  const uppercaseRegEx = /(?=.*[A-Z])/;
  const numericRegEx = /(?=.*[0-9])/;
  const specialsRegEx = /[^A-Za-z 0-9]/g;

  let RegsiterSchema = Yup.object().shape({
  
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
    // history.push("/signIn");

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
