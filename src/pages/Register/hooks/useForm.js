import * as Yup from "yup";
import { fr } from "yup-locales";
import { setLocale } from "yup";
import { useState } from "react";
import misterCoockyApi from "../../../constante/apiUrl";
import { useSelector } from "react-redux";

setLocale(fr);

export function UseRegister() {
  const [pageId, setPageId] = useState(0); //numéro de page du formulaire d'inscription (0,1,2)
  const [alertMail, setAlertMail] = useState(""); //message d'alerte au niveau de l'adresse mail
  const [ChampVide, setChampVide] = useState(""); //message d'alerte au niveau chmpvide
  const TypeLenseigne = [
    { key: "1", value: "Artisan" },
    { key: "2", value: "Magasin spécialisé" },
    { key: "3", value: "Magasin généraliste" },
    { key: "4", value: "Association" },
    { key: "5", value: "Marque" },
    { key: "6", value: "Marquetplace" },
  ];

  const TypeOffre = [
    { key: "1", value: "Alimentation" },
    { key: "2", value: "Accessoire" },
    { key: "3", value: "Services" },
  ];
  const typeInscrire = [
    { key: "1", value: "Je souhaite souscrire au label Sain,Main,Responsable" },
  ];
  const AddressesOption = [
    { key: "Select an option", value: "" },
    { key: "Option 1", value: "option1" },
    { key: "Option 2", value: "option2" },
    { key: "Option 3", value: "option3" },
  ];
  const registerValues = {
    nom: "",
    prenom: "",
    email: "",
    phone: "",
    password: "",
    cfpassword: "",
    TypeLenseigne: [],
    nomentreprise: "",
    // Addresses: "",
    offre: [],
    inscrire: [],
  };
  const Address = useSelector((state) => state.Address);
  const { Adresses ,Cordinates} = Address;
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
      .max(15, "nom est trop long - doit être de 15 caractères maximum.")
      .required("nom est requis")
      .min(4, "nom est trop court - doit comporter au moins 4 caractères."),
    prenom: Yup.string()
      .max(15, "prenom est trop long - doit être de 15 caractères maximum.")
      .required("prenom est requis")
      .min(4, "prenom est trop court - doit comporter au moins 4 caractères."),
    email: Yup.string()
      .matches(emailRegex, "Doit être un email valide !")
      .max(25, "email est trop long - doit être de 15 caractères maximum.")
      .required("email est requis")
      .min(4, "email est trop court - doit comporter au moins 4 caractères."),
    phone: Yup.string()
      .min(10, "Numéro téléphone is too short - should be 10 number Minimum.")
      .matches(phoneRegex, "Doit être un numéro valide !")
      .required("Numéro téléphone est requis"),
    nomentreprise: Yup.string()
      .max(
        15,
        "nom entreprise est trop long - doit être de 15 caractères maximum."
      )
      .required("nom entreprise est requis")
      .min(
        4,
        "nom entreprise est trop court - doit comporter au moins 4 caractères."
      ),
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
    TypeLenseigne: Yup.array().required("Type L'enseigne requis"),
    offre: Yup.array().required("Type offre requis"),
    // Addresses: Yup.string().required("Addresses requis"),
  });

  const fetchEmail = (email) => {
    fetch(`${misterCoockyApi.misterCoockyApi}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
            query{​​​​​​​
                getMail(mail:"${email}"){​​​​​​​
                    id
                }​​​​​​​
            }`,
      }),
    })
      .then((res) => res.json())
      .then(function (result) {
        if (result.data.getMail !== null) {
          setAlertMail("email déjà utilisé!");
        } else {
          setPageId(pageId + 1);
        }
      });
  };
  const onSubmit = () => {
    setPageId(pageId + 1);
  };
  const onReturn = () => {
    setPageId(pageId - 1);
  };

  const ActivateAlert = () => {
    setChampVide("Champ vide ou non valide !");
  };

  const ValidateRegister = (value) => {
    let URL = `${misterCoockyApi.misterCoockyApi}/graphql`;
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
                  mutation($organization: OrganizationInput!, $adress:AdressInput!, $user:UserIntput!){
                      registerUserPro( organization: $organization,  adress:$adress, user:$user)
                      {​​​​​​
                          id
                          organization{
                              id
                              supplier{
                                  id
                              }
                          }
                      }​​​​​​​
                  }`,
        variables: {
          organization: {
            name: value.nomentreprise,
            orgas: value.typesOrga,
            offers: value.offre,
          },
          adress: {
            street: Adresses,
            geoLocation: {
              latitude: Cordinates.lat,
              longitude: Cordinates.lng,
            },
          },
          user: {
            name: value.nom + " " + value.prenom,
            email: value.email,
            phone: value.phone,
            password: value.password,
          },
        },
      }),
    })
    .then((res) => res.json())
    .then(function (result) {
      // if (result.data.registerUserPro !== []) {
      //   localStorage.setItem("userId", result.data.registerUserPro.id);
      //   localStorage.setItem(
      //     "organizationId",
      //     result.data.registerUserPro.organization.id
      //   );
      //   localStorage.setItem(
      //     "supplierId",
      //     result.data.registerUserPro.organization.supplier.id
      //   );

      //   window.location.href = "/home";
      // }
      console.log('result', result)
    });


  };

  const Validate=(value)=>{
    console.log('FromUSR', Adresses ,Cordinates)
    console.log('value', value)

  }
  return {
    registerValues,
    RegsiterSchema,
    fetchEmail,
    alertMail,
    pageId,
    onReturn,
    onSubmit,
    TypeLenseigne,
    AddressesOption,
    TypeOffre,
    typeInscrire,
    ChampVide,
    ActivateAlert,
    ValidateRegister,
    Validate
  };
}
