import React, {useEffect, useState} from 'react'
import {makeStyles} from "@material-ui/core";
import {Header, Title} from "../components";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import {colors} from "../themes/colors";
import misterCoockyApi from "../constante/apiUrl";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import Select from "@material-ui/core/Select";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from "react-places-autocomplete";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

const MenuProps = {
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
};

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    btn: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        width: '100%',
        height: '0px',
    },
    btnSubmit: {
        padding: theme.spacing(1),
        color: "#000",
        width: 140,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        maxWidth: 300
    },
    formControlPass: {
        width:300,
        margin: theme.spacing.unit,
    },
    grid: {
        marginTop:'10px'
    }
}));

function UserProfile() {
    const[pageId, setPageId]= useState(0);
    const[dataSaved, setDataSaved]= useState(false);
    const [alert, setAlert] = useState("");    //message d'alerte au niveau du mot de passe
    const [alertMail, setAlertMail] = useState("");    //message d'alerte au niveau de l'adresse mail
    const [alertOrganization, setAlertOrganization] = useState("");    //message d'alerte au niveau de l'organisation
    const [submited, setSubmited] = useState(false);

    const[userPro, setUserPro]= useState("");
    const[nomOrga, setNomOrga]= useState("");
    const[nomFournisseur, setNomFournisseur]= useState("");
    const[adresse, setAdresse]= useState("");
    const [coordinates, setCoordinates] = React.useState({ lat: null, lng: null });
    const [validAdresse, setValidAdresse] = useState(true);
    const[typesOrga, setTypesOrga]= useState();
    const[typesOffres, setTypesOffres]= useState();
    const [estArtisan, setEstArtisan] = useState(false);
    const [estMagasinSpe, setEstMagasinSpe] = useState(false);
    const [estMagasinGen, setEstMagasinGen] = useState(false);
    const [estAsso, setEstAsso] = useState(false);
    const [estMarque, setEstMarque] = useState(false);
    const [estAlim, setEstAlim] = useState(false);
    const [estAccess, setEstAccess] = useState(false);
    const [nomsServicesCHoisis, setNomsServicesCHoisis] = useState([]);
    const nomsServices = ['Cession d\'animaux(don, échange, vente)'];
    const[nomUser, setNomUser]= useState("");
    const[phone, setPhone]= useState("");
    const[email, setEmail]= useState("");
    const[oldPassword, setOldPassword]= useState("");
    const[password1, setPassword1]= useState("");
    const[password2, setPassword2]= useState("");

    const classes = useStyles();

    function getUserProfileData() {
        fetch(`${misterCoockyApi.misterCoockyApi}/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    query{​​​​​​​
                        userPro(id:"${localStorage.getItem('userId')}"){​​​​​​​
                            organization{
                                name
                                supplier{
                                    name
                                }
                                postalAddress{
                                    street
                                    geoLocation{
                                        latitude
                                        longitude
                                    }
                                }
                            }
                            user{
                                name
                                email
                                phoneNumber
                            }
                        }​​​​​​​
                    }`,
            }),
        })
            .then((res) => res.json())
            .then(function (result) {
                setUserPro(result.data.userPro);
                setNomOrga(result.data.userPro.organization.name);
                setAdresse(result.data.userPro.organization.postalAddress.street);
                setCoordinates({lat: result.data.userPro.organization.postalAddress.geoLocation.latitude, lng: result.data.userPro.organization.postalAddress.geoLocation.longitude});
                setNomFournisseur(result.data.userPro.organization.supplier.name);
                setNomUser(result.data.userPro.user.name);
                setPhone(result.data.userPro.user.phoneNumber);
                setEmail(result.data.userPro.user.email);;
                fetch(`${misterCoockyApi.misterCoockyApi}/graphql`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query: `
                            query{​​​​​​​
                                getTypesOrganizationByName(name: "${result.data.userPro.organization.name}")
                            }`,
                    }),
                })
                    .then((res) => res.json())
                    .then(function (result) {
                        result.data.getTypesOrganizationByName.forEach(type => {
                            if (type === "Artisan"){
                                setEstArtisan(true)
                            }
                            if (type === "Magasin spécialisé"){
                                setEstMagasinSpe(true)
                            }
                            if (type === "Magasin généraliste"){
                                setEstMagasinGen(true)
                            }
                            if (type === "Association"){
                                setEstAsso(true)
                            }
                            if (type === "Marque"){
                                setEstMarque(true)
                            }
                        });
                        setTypesOrga(result.data.getTypesOrganizationByName.join(', '))
                    });
                    fetch(`${misterCoockyApi.misterCoockyApi}/graphql`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            query: `
                                query{​​​​​​​
                                    getOffersOrganizationByName(name: "${result.data.userPro.organization.name}")
                                }`,
                        }),
                    })
                    .then((res) => res.json())
                    .then(function (result) {
                        result.data.getOffersOrganizationByName.forEach(type => {
                            if (type === "Alimentation"){
                                setEstAlim(true)
                            }
                            if (type === "Accessoire"){
                                setEstAccess(true)
                            }
                        });
                        setTypesOffres(result.data.getOffersOrganizationByName.join(', '))
                    })
            });
    }

    useEffect(() => {
        getUserProfileData();
    }, []);

    const handleChange = (event) => {
        setNomsServicesCHoisis(event.target.value);
    };

    const handleAddressSelect = async value => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setAdresse(value);
        setCoordinates(latLng);
        setValidAdresse(true)
    };

    function checkAvailableOrganization(orga){
        fetch(`${misterCoockyApi.misterCoockyApi}/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    query{​​​​​​​
                        existsOrganizationByName(name:"${orga}")​​​​​​​
                    }`,
            }),
        })
            .then((res) => res.json())
            .then(function (result) {
                if (result.data.existsOrganizationByName === false) {
                    setAlertOrganization("");
                } else {
                    setAlertOrganization("Nom d'organisation déjà utilisé!");
                }
            });
    }
    function checkAvailableAdress(mail){
        fetch(`${misterCoockyApi.misterCoockyApi}/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    query{​​​​​​​
                        getMail(mail:"${mail}"){​​​​​​​
                            id
                        }​​​​​​​
                    }`,
            }),
        })
            .then((res) => res.json())
            .then(function (result) {
                if (result.data.getMail !== null) {
                    setAlertMail("Email déjà utilisé!");
                }else {
                    setAlertMail("");
                }
            });
    }

    function handleSubmit(event) {
        event.preventDefault();
            if(validAdresse === true && alertOrganization==="" && alertMail==="") {
                setSubmited(true);
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
                typeOffre.concat(nomsServicesCHoisis);
                fetch(`${misterCoockyApi.misterCoockyApi}/graphql`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query: `
                        mutation($userProId: String, $organization: OrganizationInput!, $adress:AdressInput!, $user:UserIntput!){
                            updateUserPro(userProId: $userProId, organization: $organization,  adress:$adress, user:$user)
                            {​​​​​​
                                id
                                organization{
                                    name
                                }
                                user{
                                    name
                                }
                            }​​​​​​​
                        }`,
                        variables: {
                            "userProId": localStorage.getItem("userId"),
                            "organization": {
                                "name": nomOrga,
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
                                "name": nomUser,
                                "email": email,
                                "phone": phone,
                                "password": oldPassword
                            }
                        },
                    }),
                })
                    .then((res) => res.json())
                    .then(function (result) {
                        if (result.data.saveUserPro !== []) {
                            setDataSaved(true)
                        }
                    });
            }

    }
    function handleSubmitPassword(event){
        event.preventDefault();
        if (password1 === password2 && password1.length >= 5) {
            setAlert("");
            fetch(`${misterCoockyApi.misterCoockyApi}/graphql`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                        query{
                            matchPassword(password:"${oldPassword}", userProId: "${localStorage.getItem('userId')}")
                        }​​​​
                    `,
                }),
            })
            .then((res) => res.json())
            .then(function (result) {
                if(result.data.matchPassword === true){
                    setDataSaved(true)

                    if(validAdresse === true && alertOrganization==="" && alertMail==="") {
                        setSubmited(true);
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
                        typeOffre.concat(nomsServicesCHoisis);
                        fetch(`${misterCoockyApi.misterCoockyApi}/graphql`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                query: `
                        mutation($userProId: String, $organization: OrganizationInput!, $adress:AdressInput!, $user:UserIntput!){
                            updateUserPro(userProId: $userProId, organization: $organization,  adress:$adress, user:$user)
                            {​​​​​​
                                id
                                organization{
                                    name
                                }
                                user{
                                    name
                                }
                            }​​​​​​​
                        }`,
                                variables: {
                                    "userProId": localStorage.getItem("userId"),
                                    "organization": {
                                        "name": nomOrga,
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
                                        "name": nomUser,
                                        "email": email,
                                        "phone": phone,
                                        "password": password1
                                    }
                                },
                            }),
                        })
                            .then((res) => res.json())
                            .then(function (result) {
                                if (result.data.saveUserPro !== []) {
                                    setDataSaved(true)
                                }
                            });
                    }



                }else{
                    setAlert("Ancien mot de passe incorrect")
                }
            });

        } else if (password1.length < 5) {
            setAlert("La longueur des mots de passe doit excéder 5 caractères")
        } else if (password1 !== password2) {
            setAlert("Mots de passe différents.")
        }
    }
    function getPageContent() {
        switch (pageId) {
            case 0:
                return <Box mt={10}>
                    {
                        userPro ?
                        <div>
                            <Container>
                                <h3>Organisation</h3>
                                <Box ml={3}>
                                    <Grid container className={classes.grid} >
                                        <Grid item xs={6} sm={3}>
                                            Nom
                                        </Grid>
                                        <Grid item xs={6} sm={3}>
                                            {userPro.organization.name}
                                        </Grid>
                                    </Grid>
                                    <Grid container className={classes.grid}>
                                        <Grid item xs={6} sm={3}>
                                            Types d'organisation
                                        </Grid>
                                        <Grid item xs={6} sm={3}>
                                            {typesOrga}
                                        </Grid>
                                    </Grid>
                                    <Grid container className={classes.grid}>
                                        <Grid item xs={6} sm={3}>
                                            Offres
                                        </Grid>
                                        <Grid item xs={6} sm={3}>
                                            {typesOffres}
                                        </Grid>
                                    </Grid>
                                    <Grid container className={classes.grid}>
                                        <Grid item xs={6} sm={3}>
                                            Adresse Postale
                                        </Grid>
                                        <Grid item xs={6} sm={6}>
                                            {userPro.organization.postalAddress.street}
                                        </Grid>
                                    </Grid>
                                </Box>
                                <h3>Utilisateur</h3>
                                <Box ml={3}>
                                    <Grid container className={classes.grid}>
                                        <Grid item xs={6} sm={3}>
                                            Nom
                                        </Grid>
                                        <Grid item xs={6} sm={3}>
                                            {userPro.user.name}
                                        </Grid>
                                    </Grid>
                                    <Grid container className={classes.grid}>
                                        <Grid item xs={6} sm={3}>
                                            Téléphone
                                        </Grid>
                                        <Grid item xs={6} sm={3}>
                                            {userPro.user.phoneNumber}
                                        </Grid>
                                    </Grid>
                                    <Grid container className={classes.grid}>
                                        <Grid item xs={6} sm={3}>
                                            Email
                                        </Grid>
                                        <Grid item xs={6} sm={3}>
                                            {userPro.user.email}
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Container>
                        </div> : null
                    }
                </Box>;
                break;
            case 1:
                return <Box mt={10}>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        {
                            <Snackbar open={dataSaved} autoHideDuration={6000} anchorOrigin={{vertical: "top", horizontal: "center"}}
                                      onClose={() => setDataSaved(false)}>
                                <Alert severity="success">Informations enrengistrées</Alert>
                            </Snackbar>
                        }
                        <Grid container spacing={1}>
                            <Grid container item xs={12} spacing={2}>
                                <Grid item xs={12} sm={3}>
                                    <FormControl variant="outlined" className={classes.formControl} required={true}
                                                 spacing={3}>
                                        <TextField
                                        className={classes.formControl}
                                        id="nomOrga"
                                        label="Nom de l'enseigne"
                                        value={nomOrga}
                                        required
                                        onChange={function(e){
                                            setNomOrga(e.target.value);
                                            checkAvailableOrganization(e.target.value);
                                        }}
                                        variant="outlined"
                                    />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <FormControl component="fieldset" className={classes.formControl} required={true}>
                                        <FormLabel component="legend">Type de l'enseigne</FormLabel>
                                        <FormGroup>
                                            <FormControlLabel
                                                control={<Checkbox checked={estArtisan}
                                                                   onChange={e => (setEstArtisan(e.target.checked))}
                                                                   name="estArtisan" color="default"/>}
                                                label="Artisan"
                                            />
                                            <FormControlLabel
                                                control={<Checkbox checked={estMagasinSpe}
                                                                   onChange={e => (setEstMagasinSpe(e.target.checked))}
                                                                   name="estMagasinSpe" color="default"/>}
                                                label="Magasin spécialisé"
                                            />
                                            <FormControlLabel
                                                control={<Checkbox checked={estMagasinGen}
                                                                   onChange={e => (setEstMagasinGen(e.target.checked))}
                                                                   name="estMagasinGen" color="default"/>}
                                                label="Magasin généraliste"
                                            />
                                            <FormControlLabel
                                                control={<Checkbox checked={estAsso}
                                                                   onChange={e => (setEstAsso(e.target.checked))} name="estAsso"
                                                                   color="default"/>}
                                                label="Association"
                                            />
                                            <FormControlLabel
                                                control={<Checkbox checked={estMarque}
                                                                   onChange={e => (setEstMarque(e.target.checked))}
                                                                   name="estMarque" color="default"/>}
                                                label="Marque"
                                            />
                                        </FormGroup>
                                    </FormControl>
                                    <FormControl required component="fieldset" className={classes.formControl}>
                                        <FormLabel component="legend">Type de l'offre</FormLabel>
                                        <FormGroup>
                                            <FormControlLabel
                                                control={<Checkbox checked={estAlim}
                                                                   onChange={e => (setEstAlim(e.target.checked))}
                                                                   name="Alimentation" color="default"/>}
                                                label="Alimentation"
                                            />
                                            <FormControlLabel
                                                control={<Checkbox checked={estAccess}
                                                                   onChange={e => (setEstAccess(e.target.checked))}
                                                                   name="Accessoire" color="default"/>}
                                                label="Accessoire"
                                            />
                                            <FormControl >
                                                <InputLabel>Services</InputLabel>
                                                <Select
                                                    multiple
                                                    value={nomsServicesCHoisis}
                                                    onChange={handleChange}
                                                    input={<Input id="select-multiple-checkbox"/>}
                                                    renderValue={selected => selected.join(", ")}
                                                    MenuProps={MenuProps}
                                                >
                                                    {nomsServices.map((name) => (
                                                        <MenuItem key={name} value={name}>
                                                            <Checkbox checked={nomsServicesCHoisis.indexOf(name) > -1} />
                                                            <ListItemText primary={name}/>
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </FormGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <PlacesAutocomplete
                                        value={adresse}
                                        onChange={setAdresse}
                                        onSelect={handleAddressSelect}
                                    >
                                        {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                                            <div>
                                                <TextField variant="outlined" onChange={() => setValidAdresse(false)} className={classes.formControl} required  {...getInputProps({
                                                    label: "Adresse",
                                                    placeholder: "Entrez l'adresse",
                                                })} />
                                                <div>
                                                    {loading ? <div>Chargement...</div> : null}

                                                    {suggestions.map((suggestion, i) => {
                                                        const style = {
                                                            backgroundColor: suggestion.active ? colors.brown : "#fafafa"
                                                        };
                                                        return (
                                                            <div key={i} {...getSuggestionItemProps(suggestion, {style})}>
                                                                {suggestion.description}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </PlacesAutocomplete>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <FormControl variant="outlined" className={classes.formControl} required={true}
                                                 spacing={3}>
                                        <TextField
                                            className={classes.formControl}
                                            id="nomUser"
                                            label="Nom d'utilisateur"
                                            required
                                            value={nomUser}
                                            onChange={e => (setNomUser(e.target.value))}
                                            variant="outlined"
                                        />
                                    </FormControl>
                                    <FormControl variant="outlined" className={classes.formControl} required={true}
                                                 spacing={3}>
                                        <TextField
                                            className={classes.formControl}
                                            id="idRace"
                                            label="Email"
                                            required
                                            value={email}
                                            type="email"
                                            onChange={function(e){
                                                setEmail(e.target.value);
                                                checkAvailableAdress(e.target.value);
                                            }}
                                            variant="outlined"
                                        />
                                    </FormControl>
                                    <FormControl variant="outlined" className={classes.formControl} required={true}
                                                 spacing={3}>
                                        <TextField
                                            className={classes.formControl}
                                            id="phone"
                                            label="Téléphone"
                                            type="tel"
                                            required
                                            value={phone}
                                            onChange={e => (setPhone(e.target.value))}
                                            variant="outlined"
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid container item xs={12} spacing={2}>
                                <Grid item xs={12} sm={3}>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                {alertMail ? <Alert severity="error" fullwidth>{alertMail}</Alert> : <></>}
                                {alertOrganization ? <Alert severity="error">{alertOrganization}</Alert> : <></>}
                                {
                                    validAdresse === false && submited === true ?
                                        <Alert severity="error" >Adresse non complétée</Alert> : <></>
                                }
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Button type="submit" variant="contained" style={{backgroundColor: colors.red}}
                                            fullwidth className={classes.btnSubmit}>
                                        Sauvegarder
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </Box>;
                break;
            case 2:
                return <Box mt={10}>
                    <form className={classes.form} onSubmit={handleSubmitPassword}>
                        <Grid container spacing={1}>
                            <Grid container item xs={12} spacing={2}>
                                <Grid item lg={4} md={6} sm={12}>
                                    <FormControl variant="outlined" className={classes.formControlPass} required={true}
                                                 spacing={3} xs={6}>
                                        <TextField variant="outlined" margin="normal" required fullWidth type="password" name="oldPass" sm={12} md={12} xs={12}
                                                   id="oldPswd" label="Ancien mot de passe" onChange={e => setOldPassword(e.target.value)}
                                                   value={oldPassword}/>
                                    </FormControl>
                                </Grid>
                                <Grid item lg={6} md={6} sm={12}>
                                    <FormControl variant="outlined" className={classes.formControlPass} required={true} spacing={3} >
                                        <TextField variant="outlined" margin="normal" required fullWidth type="password" name="pass1"
                                                   id="password1" label="Nouveau mot de passe" onChange={e => setPassword1(e.target.value)}
                                                   value={password1}/>
                                    </FormControl>
                                    <FormControl variant="outlined" className={classes.formControlPass} required={true} spacing={3} xs={6}>
                                        <TextField variant="outlined" margin="normal" required fullWidth type="password" name="pass2"
                                                   id="password2" label="Confirmer le nouveau mot de passe" onChange={e => setPassword2(e.target.value)}
                                                   value={password2}/>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid container item xs={12} spacing={2}>
                                <Grid item xs={12} sm={3}>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    {alert ? <Alert severity="error">{alert}</Alert> : <></>}
                                    {alertMail ? <Alert severity="error" fullwidth>{alertMail}</Alert> : <></>}
                                    {alertOrganization ? <Alert severity="error">{alertOrganization}</Alert> : <></>}
                                    {
                                        validAdresse === false && submited === true ?
                                            <Alert severity="error" >Adresse non complétée</Alert> : <></>
                                    }
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Button type="submit" variant="contained" style={{backgroundColor: colors.red}}
                                            className={classes.btnSubmit}>
                                        Sauvegarder
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Snackbar open={dataSaved} autoHideDuration={6000} anchorOrigin={{vertical: "top", horizontal: "center"}}
                                  onClose={() => setDataSaved(false)}>
                            <Alert severity="success">Informations enrengistrées</Alert>
                        </Snackbar>
                    </form>
                </Box>;
                break;
        }
    }

    return (
        <div>
            <Header/>
            <Container>
                <Title name={"Profile"}/>
                <Grid container spacing={5} justify="center">
                    <Grid item xs={12} sm={3}>
                        <Button className={classes.btn} variant="contained"
                                style={pageId === 0 ? {backgroundColor: colors.brown} : {backgroundColor: colors.grey}}
                                onClick={function(e){
                                    getUserProfileData()
                                    setPageId(0)
                                }}>Mon profil</Button>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Button className={classes.btn} variant="contained"
                                style={pageId === 1 ? {backgroundColor: colors.brown} : {backgroundColor: colors.grey}}
                                onClick={function(e) {
                                    getUserProfileData()
                                    setPageId(1)
                                }}>Modifier mon profil</Button>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Button className={classes.btn} variant="contained"
                                style={pageId === 2 ? {backgroundColor: colors.brown} : {backgroundColor: colors.grey}}
                                onClick={function(e) {
                                    getUserProfileData()
                                    setPageId(2)
                                }}>Modifier mon mot de passe</Button>
                    </Grid>
                </Grid>
                <Box mt={5}>
                    {getPageContent()}
                </Box>
            </Container>
        </div>

    )
}

export default UserProfile
