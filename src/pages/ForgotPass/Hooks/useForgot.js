import * as Yup from "yup";
import { fr } from "yup-locales";
import { setLocale } from "yup";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GET_VALIDATION } from "../../../Redux/Types";

setLocale(fr);

export function useForgot() {
  const [pageId, setPageId] = useState(0); //numéro de page du formulaire d'inscription (0,1,2)
  const [alerPassowrd, setAlerPassowrd] = useState(""); //message d'alerte au niveau de l'adresse mail

  const [AlertInfo, setAlertInfo] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();

  const ForgotValues = {
    email: "",
  };

  const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  let RegsiterSchema = Yup.object().shape({
    email: Yup.string()
      .matches(emailRegex, "Doit être un email valide !")
      .max(35, "email est trop long - doit être de 35 caractères maximum.")
      .required("email est requis")
      .min(4, "email est trop court - doit comporter au moins 4 caractères."),
  });

  const onSubmit = (value) => {
    // console.log('onSubmit value', value)
    dispatch({ type: GET_VALIDATION }); // to activate ProtectedRoute
     
    
    setAlertInfo("Vérifiez votre e-mail"); // activate Alert info
    setTimeout(() => {
      setAlertInfo(null);
      history.push("/reset-password", { data:value }); // passe email to password screen
    }, 5000);
  };
  const onReturn = () => {
    history.push("/forgot");
  };
  return {
    ForgotValues,
    RegsiterSchema,
    alerPassowrd,
    pageId,
    onReturn,
    onSubmit,
    AlertInfo,
  };
}
