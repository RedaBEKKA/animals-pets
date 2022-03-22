import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import logo from "../../images/logo.svg";
import { useStyles } from "./hooks/Styles";
import FormRegister from "./Components/FormRegister";

export default function Register() {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={6} md={6} className={classes.image} />
      <Grid item xs={12} sm={6} md={6}>
        <div className={classes.paper}>
          <Grid>
            <img
              alt="Logo Mister Coocky"
              src={logo}
              style={{ height: 200, width:300 }}
            />
          </Grid>
          <FormRegister />
        </div>
      </Grid>
    </Grid>
  );
}
























// const nomsServices = ["Cession d'animaux(don, échange, vente)"];

// import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
// import misterCoockyApi from "../../constante/apiUrl";

{
  /* <form className={classes.form} onSubmit={handleSubmit}>
            {getFormContent()}
          </form> */
}

// case 2:
//     return <div style={{ marginTop: '50px' }} >
//         <TextField variant="outlined" margin="normal" required fullWidth type="password" name="pass1"
//             id="password1" label="Mot de passe" onChange={e => setPassword1(e.target.value)}
//             value={password1} />
//         <TextField variant="outlined" margin="normal" required fullWidth type="password" name="pass2"
//             id="password2" label="Valider le mot de passe"
//             onChange={e => setPassword2(e.target.value)} value={password2} />
//         {alert ? <Alert severity="error">{alert}</Alert> : <></>}
//         <Box mt={10}>
//             <Grid container spacing={10} justify="space-around">
//                 <Button variant="contained" style={{ backgroundColor: colors.red }} className={classes.btn}
//                     onClick={() => (setPageId(pageId - 1))}>
//                     Précédent
//                 </Button>
//                 <Button type="submit" variant="contained" style={{ backgroundColor: colors.brown }}
//                     className={classes.btn}>
//                     S'inscrire
//                 </Button>
//             </Grid>
//         </Box>
//     </div>

// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: 48 * 4.5 + 8,
//       width: 400,
//     },
//   },
// };

// const handleChange = (event) => {
//   setNomsServicesCHoisis(event.target.value);
// };

// /**
//  *  Envoi du formulaire d'inscription
//  */
// function sendForm() {
//   let typesOrga = [];
//   if (estArtisan === true) {
//     typesOrga.push("Artisan");
//   }
//   if (estMagasinSpe === true) {
//     typesOrga.push("Magasin spécialisé");
//   }
//   if (estMagasinGen === true) {
//     typesOrga.push("Magasin généraliste");
//   }
//   if (estAsso === true) {
//     typesOrga.push("Association");
//   }
//   if (estMarque === true) {
//     typesOrga.push("Marque");
//   }
//   let typeOffre = [];
//   if (estAlim === true) {
//     typeOffre.push("Alimentation");
//   }
//   if (estAccess === true) {
//     typeOffre.push("Accessoire");
//   }
//   typeOffre = typeOffre.concat(nomsServicesCHoisis);
//   fetch(`${misterCoockyApi.misterCoockyApi}/graphql`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       query: `
//                   mutation($organization: OrganizationInput!, $adress:AdressInput!, $user:UserIntput!){
//                       registerUserPro( organization: $organization,  adress:$adress, user:$user)
//                       {​​​​​​
//                           id
//                           organization{
//                               id
//                               supplier{
//                                   id
//                               }
//                           }
//                       }​​​​​​​
//                   }`,
//       variables: {
//         organization: {
//           name: companyName,
//           orgas: typesOrga,
//           offers: typeOffre,
//         },
//         adress: {
//           street: adresse,
//           geoLocation: {
//             latitude: coordinates.lat,
//             longitude: coordinates.lng,
//           },
//         },
//         user: {
//           name: nom + " " + prenom,
//           email: email,
//           phone: phone,
//           password: password1,
//         },
//       },
//     }),
//   })
//     .then((res) => res.json())
//     .then(function (result) {
//       if (result.data.registerUserPro !== []) {
//         localStorage.setItem("userId", result.data.registerUserPro.id);
//         localStorage.setItem(
//           "organizationId",
//           result.data.registerUserPro.organization.id
//         );
//         localStorage.setItem(
//           "supplierId",
//           result.data.registerUserPro.organization.supplier.id
//         );

//         window.location.href = "/home";
//       }
//     });
//   return {
//     nom: nom,
//     prenom: prenom,
//     email: email,
//     phone: phone,
//     companyName: companyName,
//     estArtisan: estArtisan,
//     estMagasinSpe: estMagasinSpe,
//     estMagasinGen: estMagasinGen,
//     estAsso: estAsso,
//     estMarque: estMarque,
//     estAlim: estAlim,
//     estAccess: estAccess,
//     estCession: estCession,
//     password: password1,
//     adresse: adresse,
//     coordinates: coordinates,
//   };
// }

// /**
//  * Lors de la sélectoin d'une adresse
//  * @param value
//  * @returns {Promise<void>}
//  */
// const handleAddressSelect = async (value) => {
//   const results = await geocodeByAddress(value);
//   const latLng = await getLatLng(results[0]);
//   setAdresse(value);
//   setCoordinates(latLng);
//   setValidAdresse(true);
// };

// /**
//  * Gestion des pages du formulaire d'inscription et envoi du formulaire
//  * @param event
//  */
// function handleSubmit(event) {
//   event.preventDefault();
//   let tmpPage = pageId;
//   switch (tmpPage) {
//     case 0: //page 0→1
//       // fetch(`${misterCoockyApi.misterCoockyApi}/graphql`, {
//       //     method: 'POST',
//       //     headers: {
//       //         'Content-Type': 'application/json',
//       //     },
//       //     body: JSON.stringify({
//       //         query: `
//       //     query{​​​​​​​
//       //         getMail(mail:"${email}"){​​​​​​​
//       //             id
//       //         }​​​​​​​
//       //     }`,
//       //     }),
//       // })
//       //     .then((res) => res.json())
//       //     .then(function (result) {
//       //         if (result.data.getMail !== null) {
//       //             setAlertMail("email déjà utilisé!");
//       //         } else {
//       //             setPageId(tmpPage + 1);
//       //         }
//       //     });
//       if (password1 === password2 && password1.length >= 5) {
//         // sendForm()
//         setPageId(tmpPage + 1);
//       } else if (password1.length < 5) {
//         setAlert("La longueur des mots de passe doit excéder 5 caractères");
//       } else if (password1 !== password2) {
//         setAlert("Mots de passe différents.");
//       }
//       break;
//       setPageId(tmpPage + 1);
//       break;
//     case 1: //page 1→2
//       setSubmited(true);
//       if (validAdresse === true) {
//         fetch(`${misterCoockyApi.misterCoockyApi}/graphql`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             query: `
//                   query{​​​​​​​
//                       existsOrganizationByName(name:"${companyName}")​​​​​​​
//                   }`,
//           }),
//         })
//           .then((res) => res.json())
//           .then(function (result) {
//             if (result.data.existsOrganizationByName === false) {
//               setPageId(tmpPage + 1);
//             } else {
//               setAlertOrganization("Nom d'organisation déjà utilisé!");
//             }
//           });
//       }
//       break;
//     // case 2: //envoi formulaire
//     //     if (password1 === password2 && password1.length >= 5) {   //envoi du formulaire d'inscription
//     //         sendForm()
//     //     } else if (password1.length < 5) {
//     //         setAlert("La longueur des mots de passe doit excéder 5 caractères")
//     //     } else if (password1 !== password2) {
//     //         setAlert("Mots de passe différents.")
//     //     }
//     //     break;
//     default:
//       break;
//   }
// }
// const [pageId, setPageId] = useState(0); //numéro de page du formulaire d'inscription (0,1,2)
// const [alert, setAlert] = useState(""); //message d'alerte au niveau du mot de passe
// const [alertMail, setAlertMail] = useState(""); //message d'alerte au niveau de l'adresse mail
// const [alertOrganization, setAlertOrganization] = useState(""); //message d'alerte au niveau de l'organisation

// const [nom, setNom] = useState(""); //champs première page
// const [prenom, setPrenom] = useState("");
// const [email, setEmail] = useState("");
// const [phone, setPhone] = useState("");

// const [companyName, setCompanyName] = useState(""); //champs seconde page
// const [estArtisan, setEstArtisan] = useState(false);
// const [estMagasinSpe, setEstMagasinSpe] = useState(false);
// const [estMagasinGen, setEstMagasinGen] = useState(false);
// const [estAsso, setEstAsso] = useState(false);
// const [estMarque, setEstMarque] = useState(false);
// const [estAlim, setEstAlim] = useState(false);
// const [estAccess, setEstAccess] = useState(false);
// const [estCession, setEstCession] = useState(false);
// const [nomsServicesCHoisis, setNomsServicesCHoisis] = useState([]);

// const [password1, setPassword1] = useState(""); //champs troisième page
// const [password2, setPassword2] = useState("");
// const [adresse, setAdresse] = React.useState("");
// const [validAdresse, setValidAdresse] = useState(false);
// const [submited, setSubmited] = useState(false);
// const [coordinates, setCoordinates] = React.useState({
//   lat: null,
//   lng: null,
// });
