import * as Yup from 'yup';
import {fr} from 'yup-locales';
import {setLocale} from 'yup';
import {useState} from 'react';

setLocale(fr);

export function UseRegister() {
  const [isSelected, setSelection] = useState(false);
  const [hidePass, setHidePass] = useState(false);
  const hadelChnageCheck = () => {
    setSelection(!isSelected);
  };

  
  const registerValues = {
    nom: '',
    prenom: '',
    email: '',
    phone: '',
    nom: '',
    password: '',
    cfpassword: '',

  };
  let configHead = {
    headers: {
      // method: 'POST',
      'Content-Type': 'application/json',
      'Accept-Language': 'fr',
      // Authorization: 'Bearer ' + token,
    },
  };

  
  const onSubmit = async (values) => {
    //  await dispatchLogin(dispatch, configHead, values,isLogged,loading)
  };
  const HandlehidePass = () => {
    setHidePass(!hidePass);
  };


  const lowercaseRegEx = /(?=.*[a-z])/;
  const uppercaseRegEx = /(?=.*[A-Z])/;
  const numericRegEx = /(?=.*[0-9])/;
  const specialsRegEx = /[^A-Za-z 0-9]/g;
  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    const phoneRegex =
    /(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/g;



  let RegsiterSchema = Yup.object().shape({
    nom: Yup.string()
      .max(
        15,
        'nom est trop long - doit être de 15 caractères maximum.',
      )
      .required('nom est requis')
      .min(
        4,
        'nom est trop court - doit comporter au moins 4 caractères.',
      ),
      prenom: Yup.string()
      .max(
        15,
        'prenom est trop long - doit être de 15 caractères maximum.',
      )
      .required('prenom est requis')
      .min(
        4,
        'prenom est trop court - doit comporter au moins 4 caractères.',
      ),
      email: Yup.string()
      .matches(emailRegex, "Doit être un email valide !")

      .max(
        25,
        'email est trop long - doit être de 15 caractères maximum.',
      )
      .required('email est requis')
      .min(
        4,
        'email est trop court - doit comporter au moins 4 caractères.',
      ),
      phone: Yup.string()
      .min(10, "Numéro téléphone is too short - should be 10 number Minimum.")
      .matches(phoneRegex, "Doit être un numéro valide !")
      .required("Numéro téléphone est requis"),

      password: Yup.string()
      .max(
        15,
        'Le mot de passe est trop long - doit être de 15 caractères maximum.',
      )
      .min(
        4,
        'Le mot de passe est trop court - doit comporter au moins 4 caractères.',
      )
      .required('Mot de passe requis'),

      cfpassword: Yup.string()
    .required("Confirme mot de passe est requis")
    .oneOf([Yup.ref("password")], "Les mots de passe ne correspondent pas"),
  });

  return {
    registerValues,
    RegsiterSchema
  };
}
