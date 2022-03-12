import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import parrot from '../images/parrot.png'
import { colors } from "../themes/colors";
import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Alert } from '@material-ui/lab';
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import misterCoockyApi from '../constante/apiUrl'
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from "@material-ui/core/ListItemText";


const nomsServices = ['Cession d\'animaux(don, échange, vente)'];

const useStyles = makeStyles((theme) => ({
    MenuProps: {
        PaperProps: {
            style: {
                maxHeight: 300,
                maxWidth: 50
            }
        },
        // Show dropdow at bottom of select
        getContentAnchorEl: null,
        anchorOrigin: {
            vertical: "bottom",
            horizontal: "left"
        }
    },
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: `url(${parrot})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(5, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '90%',
        marginTop: "0px"
    },
    btn: {
        padding: theme.spacing(1),
        color: "#000",
        width: '30%',
    },
    formText: {
        width: '45%'
    },
    formControl: {
        width: 200,
        margin: theme.spacing(3),
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}));

export default function Register() {
    const classes = useStyles();
    const [pageId, setPageId] = useState(0);    //numéro de page du formulaire d'inscription (0,1,2)
    const [alert, setAlert] = useState("");    //message d'alerte au niveau du mot de passe
    const [alertMail, setAlertMail] = useState("");    //message d'alerte au niveau de l'adresse mail
    const [alertOrganization, setAlertOrganization] = useState("");    //message d'alerte au niveau de l'organisation

    const [nom, setNom] = useState(""); //champs première page
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const [companyName, setCompanyName] = useState(""); //champs seconde page
    const [estArtisan, setEstArtisan] = useState(false);
    const [estMagasinSpe, setEstMagasinSpe] = useState(false);
    const [estMagasinGen, setEstMagasinGen] = useState(false);
    const [estAsso, setEstAsso] = useState(false);
    const [estMarque, setEstMarque] = useState(false);
    const [estAlim, setEstAlim] = useState(false);
    const [estAccess, setEstAccess] = useState(false);
    const [estCession, setEstCession] = useState(false);
    const [nomsServicesCHoisis, setNomsServicesCHoisis] = useState([]);

    const [password1, setPassword1] = useState(""); //champs troisième page
    const [password2, setPassword2] = useState("");
    const [adresse, setAdresse] = React.useState("");
    const [validAdresse, setValidAdresse] = useState(false);
    const [submited, setSubmited] = useState(false);
    const [coordinates, setCoordinates] = React.useState({
        lat: null,
        lng: null
    });

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 48 * 4.5 + 8,
                width: 400,
            },
        },
    };

    const handleChange = (event) => {
        setNomsServicesCHoisis(event.target.value);
    };

    /**
     *  Envoi du formulaire d'inscription
     */
    function sendForm() {
        let typesOrga = [];
        if (estArtisan === true) {
            typesOrga.push("Artisan")
        }
        if (estMagasinSpe === true) {
            typesOrga.push("Magasin spécialisé")
        }
        if (estMagasinGen === true) {
            typesOrga.push("Magasin généraliste")
        }
        if (estAsso === true) {
            typesOrga.push("Association")
        }
        if (estMarque === true) {
            typesOrga.push("Marque")
        }
        let typeOffre = [];
        if (estAlim === true) {
            typeOffre.push("Alimentation")
        }
        if (estAccess === true) {
            typeOffre.push("Accessoire")
        }
        typeOffre = typeOffre.concat(nomsServicesCHoisis);
        fetch(`${misterCoockyApi.misterCoockyApi}/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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
                    "organization": {
                        "name": companyName,
                        "orgas": typesOrga,
                        "offers": typeOffre
                    },
                    "adress": {
                        "street": adresse,
                        "geoLocation": {
                            "latitude": coordinates.lat,
                            "longitude": coordinates.lng
                        }
                    },
                    "user": {
                        "name": nom + " " + prenom,
                        "email": email,
                        "phone": phone,
                        "password": password1
                    }
                },
            }),
        })
            .then((res) => res.json())
            .then(function (result) {
                if (result.data.registerUserPro !== []) {
                    localStorage.setItem('userId', result.data.registerUserPro.id);
                    localStorage.setItem('organizationId', result.data.registerUserPro.organization.id);
                    localStorage.setItem('supplierId', result.data.registerUserPro.organization.supplier.id);

                    window.location.href = '/home';

                }
            });
        return {
            nom: nom,
            prenom: prenom,
            email: email,
            phone: phone,
            companyName: companyName,
            estArtisan: estArtisan,
            estMagasinSpe: estMagasinSpe,
            estMagasinGen: estMagasinGen,
            estAsso: estAsso,
            estMarque: estMarque,
            estAlim: estAlim,
            estAccess: estAccess,
            estCession: estCession,
            password: password1,
            adresse: adresse,
            coordinates: coordinates,
        };
    }

    /**
     * Lors de la sélectoin d'une adresse
     * @param value
     * @returns {Promise<void>}
     */
    const handleAddressSelect = async value => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setAdresse(value);
        setCoordinates(latLng);
        setValidAdresse(true)
    };

    /**
     * Gestion des pages du formulaire d'inscription et envoi du formulaire
     * @param event
     */
    function handleSubmit(event) {
        event.preventDefault();
        let tmpPage = pageId;
        switch (tmpPage) {
            case 0: //page 0→1
                // fetch(`${misterCoockyApi.misterCoockyApi}/graphql`, {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                //     body: JSON.stringify({
                //         query: `
                //     query{​​​​​​​
                //         getMail(mail:"${email}"){​​​​​​​
                //             id
                //         }​​​​​​​
                //     }`,
                //     }),
                // })
                //     .then((res) => res.json())
                //     .then(function (result) {
                //         if (result.data.getMail !== null) {
                //             setAlertMail("email déjà utilisé!");
                //         } else {
                //             setPageId(tmpPage + 1);
                //         }
                //     });
                setPageId(tmpPage + 1);
                break;
            case 1: //page 1→2
                setSubmited(true);
                if (validAdresse === true) {
                    fetch(`${misterCoockyApi.misterCoockyApi}/graphql`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            query: `
                    query{​​​​​​​
                        existsOrganizationByName(name:"${companyName}")​​​​​​​
                    }`,
                        }),
                    })
                        .then((res) => res.json())
                        .then(function (result) {
                            if (result.data.existsOrganizationByName === false) {
                                setPageId(tmpPage + 1);
                            } else {
                                setAlertOrganization("Nom d'organisation déjà utilisé!");
                            }
                        });
                }
                break;
            case 2: //envoi formulaire
                if (password1 === password2 && password1.length >= 5) {   //envoi du formulaire d'inscription
                    sendForm()
                } else if (password1.length < 5) {
                    setAlert("La longueur des mots de passe doit excéder 5 caractères")
                } else if (password1 !== password2) {
                    setAlert("Mots de passe différents.")
                }
                break;
            default:
                break;
        }
    }


    /**
     * Récupération du contenu de page selon le numéro de page
     * page 0 : nom,prénom...
     * page 1 : organisation
     * page 2 : mot de passe
     * @returns {*}
     */
    function getFormContent() {
        switch (pageId) {
            case 0:
                return <div style={{ marginTop: '50px' }} >
                    <Grid container justify="space-between">
                        <TextField variant="outlined" required name="nom" label="Nom" type="text" id="nom"
                            className={classes.formText} onChange={e => setNom(e.target.value)} value={nom} />
                        <TextField variant="outlined" required name="prenom" label="Prénom" type="text" id="prenom"
                            className={classes.formText} onChange={e => setPrenom(e.target.value)}
                            value={prenom} />
                    </Grid>
                    <TextField variant="outlined" margin="normal" required fullWidth id="email" label="Email"
                        type="email"
                        name="email" onChange={e => setEmail(e.target.value)} value={email} />
                    <TextField variant="outlined" margin="normal" required fullWidth id="phone"
                        label="Téléphone" type="tel" name="phone"
                        onChange={e => setPhone(e.target.value)} value={phone} />
                    {alertMail ? <Alert severity="error">{alertMail}</Alert> : <></>}
                    <Box mt={10}>
                        <Grid container spacing={10} justify="space-around">
                            <Button onClick={(e) => handleSubmit(e)} variant="contained"
                                style={{ backgroundColor: colors.red }} className={classes.btn}>
                                Suivant &gt;
                            </Button>
                        </Grid>
                    </Box>
                </ div >;
            case 1:
                return <>
                    <Box mb={2}>
                        <TextField variant="outlined" required fullWidth id="enseigne" label="Nom de l'enseigne"
                            name="enseigne" value={companyName} onChange={e => setCompanyName(e.target.value)} />
                    </Box>
                    <PlacesAutocomplete
                        value={adresse}
                        onChange={setAdresse}
                        onSelect={handleAddressSelect}
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div>
                                <TextField variant="outlined" required fullWidth {...getInputProps({
                                    label: "Adresse",
                                    placeholder: "Entrez l'adresse"
                                })} />
                                <div>
                                    {loading ? <div>Chargement...</div> : null}

                                    {suggestions.map((suggestion, i) => {
                                        const style = {
                                            backgroundColor: suggestion.active ? colors.brown : "#fafafa"
                                        };
                                        return (
                                            <div key={i} {...getSuggestionItemProps(suggestion, { style })}>
                                                {suggestion.description}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </PlacesAutocomplete>
                    <Grid container>
                        <Grid container item xs={12} sm={6} md={6}>
                            <FormControl component="fieldset" className={classes.formControl} required={true}>
                                <FormLabel component="legend">Type de l'enseigne</FormLabel>
                                <FormGroup>

                                    <FormControlLabel
                                        control={<Checkbox checked={estArtisan}
                                            onChange={e => (setEstArtisan(e.target.checked))}
                                            name="estArtisan" color="default" />}
                                        label="Artisan"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={estMagasinSpe}
                                            onChange={e => (setEstMagasinSpe(e.target.checked))}
                                            name="estMagasinSpe" color="default" />}
                                        label="Magasin spécialisé"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={estMagasinGen}
                                            onChange={e => (setEstMagasinGen(e.target.checked))}
                                            name="estMagasinGen" color="default" />}
                                        label="Magasin généraliste"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={estAsso}
                                            onChange={e => (setEstAsso(e.target.checked))} name="estAsso"
                                            color="default" />}
                                        label="Association"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={estMarque}
                                            onChange={e => (setEstMarque(e.target.checked))}
                                            name="estMarque" color="default" />}
                                        label="Marque"
                                    />
                                </FormGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <FormControl required component="fieldset" className={classes.formControl}>
                                <FormLabel component="legend">Type de l'offre</FormLabel>
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Checkbox checked={estAlim}
                                            onChange={e => (setEstAlim(e.target.checked))}
                                            name="Alimentation" color="default" />}
                                        label="Alimentation"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={estAccess}
                                            onChange={e => (setEstAccess(e.target.checked))}
                                            name="Accessoire" color="default" />}
                                        label="Accessoire"
                                    />
                                    <FormControl >
                                        <InputLabel>Services</InputLabel>
                                        <Select
                                            multiple
                                            value={nomsServicesCHoisis}
                                            onChange={handleChange}
                                            input={<Input id="select-multiple-checkbox" />}
                                            renderValue={selected => selected.join(", ")}
                                            MenuProps={MenuProps}
                                        >
                                            {nomsServices.map((name) => (
                                                <MenuItem key={name} value={name}>
                                                    <Checkbox checked={nomsServicesCHoisis.indexOf(name) > -1} />
                                                    <ListItemText primary={name} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </FormGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                    {alertOrganization ? <Alert severity="error">{alertOrganization}</Alert> : <></>}
                    {
                        validAdresse === false && submited === true ?
                            <Alert severity="error" >Adresse non complétée</Alert> : <></>
                    }
                    <Box mt={10}>
                        <Grid container spacing={10} justify="space-around">
                            <Button variant="contained" style={{ backgroundColor: colors.red }} className={classes.btn}
                                onClick={() => (setPageId(pageId - 1))}>
                                Précédent
                            </Button>
                            <Button type="submit" variant="contained" style={{ backgroundColor: colors.red }}
                                className={classes.btn}>
                                Suivant &gt;
                            </Button>
                        </Grid>
                    </Box>
                </>;
            case 2:
                return <div style={{ marginTop: '50px' }} >
                    <TextField variant="outlined" margin="normal" required fullWidth type="password" name="pass1"
                        id="password1" label="Mot de passe" onChange={e => setPassword1(e.target.value)}
                        value={password1} />
                    <TextField variant="outlined" margin="normal" required fullWidth type="password" name="pass2"
                        id="password2" label="Valider le mot de passe"
                        onChange={e => setPassword2(e.target.value)} value={password2} />
                    {alert ? <Alert severity="error">{alert}</Alert> : <></>}
                    <Box mt={10}>
                        <Grid container spacing={10} justify="space-around">
                            <Button variant="contained" style={{ backgroundColor: colors.red }} className={classes.btn}
                                onClick={() => (setPageId(pageId - 1))}>
                                Précédent
                            </Button>
                            <Button type="submit" variant="contained" style={{ backgroundColor: colors.brown }}
                                className={classes.btn}>
                                S'inscrire
                            </Button>
                        </Grid>
                    </Box>
                </div>
            default:
                break;
        }
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={6} md={6} className={classes.image} />
            <Grid item xs={12} sm={6} md={6}>
                <div className={classes.paper}>
                    <Grid>
                        <img alt="Logo Mister Coocky" width={120} src="./logoMisterCoocky.png" />
                    </Grid>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        {getFormContent()}
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}
