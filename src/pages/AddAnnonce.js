import React, {useEffect, useState} from 'react'
import {makeStyles} from "@material-ui/core";
import {Header, Title} from "../components";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {colors} from "../themes/colors";
import GetAppIcon from '@material-ui/icons/GetApp';
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import misterCoockyApi from '../constante/apiUrl'
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
    getContentAnchorEl: null,
    anchorOrigin: {
        vertical: "bottom",
        horizontal: "left"
    },
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
    btn2: {
        fontSize: "0.7em",
        marginTop: "10px"
    },
    formControl: {
        width: 200,
        margin: "5px 0 5px 0"
    },
    item: {
        maxWidth: 400,
        padding: theme.spacing(2),
    },
    typotext: {
        fontSize: '1.4em'
    },

}));

/**
 * Page d'ajout d'une annonce
 * @param props
 * @returns {*}
 * @constructor
 */
function AddAnnonce(props) {
    const classes = useStyles();
    const [pageId, setPageId] = useState(0);
    const [selectedAnnouncementToEdit, setSelectedAnnouncementToEdit] = useState(props.announcementId);

    const [image, setImage] = useState("");
    const [addressMessageAlert, setAddressMessageAlert] = useState(null);
    const [prix, setPrix] = useState("");
    const [description, setDescription] = useState("");
    const [age, setAge] = useState("");   //date de naissance
    const [estVaccine, setEstVaccine] = useState("");
    const [titreAnnonce, setTitreAnnonce] = useState("");
    const [race, setRace] = useState("");
    const [estPuce, setEstPuce] = useState("");
    const [estTatoue, setEstTatoue] = useState("");
    const [numId, setNumId] = useState("");
    const [animalId, setAnimalId] = useState("");
    const [animalList, setAnimalList] = useState([]);
    const [adress, setAdress] = useState("");
    const [fileTransmited, setFileTransmited] = useState(false);
    const [coordinates, setCoordinates] = React.useState({
        lat: null,
        lng: null
    });

    /**
     * Récupération de l'annonce si en mode édition
     * et récupération des animaux
     */
    useEffect(() => {
        //si mode édition
        if (selectedAnnouncementToEdit) {
            fetch(`${misterCoockyApi.misterCoockyApi}/graphql`, {    //on récupère l'item
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                    query{​​​​​​​
                        announcement(id:"${selectedAnnouncementToEdit}"){​​​​​​​
                            id
                            platform
                            title
                            description
                            date
                            valid
                            url
                            image
                            numberOfClick
                            petAnnouncementInfo{
                                pet{
                                    id
                                    name
                                }
                                price
                                race
                                age
                                tattoo
                                puce
                                vaccine
                                identificationNumber
                            }
                            postalAddress{
                                street
                                geoLocation{
                                    latitude
                                    longitude
                                }
                            }
                        }
                    }`,
                }),
            })
                .then((res) => res.json())
                .then(function (result) {
                    setTitreAnnonce(result.data.announcement.title);
                    setDescription(result.data.announcement.description);
                    setImage((result.data.announcement.image));
                    setAnimalId(result.data.announcement.petAnnouncementInfo.pet.id);
                    setPrix(result.data.announcement.petAnnouncementInfo.price);
                    setEstTatoue(result.data.announcement.petAnnouncementInfo.tattoo);
                    setEstPuce(result.data.announcement.petAnnouncementInfo.puce);
                    setEstVaccine(result.data.announcement.petAnnouncementInfo.vaccine);
                    setNumId(result.data.announcement.petAnnouncementInfo.identificationNumber);
                    setAge(result.data.announcement.petAnnouncementInfo.age);
                    setRace(result.data.announcement.petAnnouncementInfo.race);
                    setAdress(result.data.announcement.postalAddress.street);
                    setCoordinates({
                        lat: result.data.announcement.postalAddress.geoLocation.latitude,
                        lng: result.data.announcement.postalAddress.geoLocation.longitude
                    });
                });
        }

        fetch(`${misterCoockyApi.misterCoockyApi}/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                query{​​​​​​​
                    pets{​​​​​​​
                        id
                        name
                    }​​​​​​​
                }`,
            }),
        })
            .then((res) => res.json())
            .then(function (result) {
                setAnimalList(result.data.pets);
            });
    }, []);


    /**
     * lors de l'import du fichier
     */
    function handleFile(event) {
        const file = event.target.files[0];
        let data = new FormData();
        data.append("file", file);
        const userId = localStorage.getItem('userId');
        fetch(`${misterCoockyApi.misterCoockyApi}/uploadFile?sectionName=adopt&userId=${userId}`, {
            method: 'POST',
            body: data
        })
            .then((res) => res.json())
            .then(function (result) {
                setFileTransmited(true);
            }).catch(function (error) {
            console.log('Erreur pendant l\'upload : ' + error.message);
        });
    }

    /**
     * Mise en base 64 d'une image importée
     * @param file
     */
    function imageUploaded(file) {
        let base64String = "";
        let reader = new FileReader();
        reader.onload = function () {
            base64String = reader.result.replace("data:", "")
                .replace(/^.+,/, "");
            setImage(base64String);
        };
        reader.readAsDataURL(file);
    }

    /**
     * Apercu de l'image importée
     * @param e
     */
    function handleImagePreview(e) {
        if (e.target.files[0]) {
            imageUploaded(e.target.files[0])
        }
    }

    /**
     * Lors de la sélection d'une adresse
     * @param value
     * @returns {Promise<void>}
     */
    const handleAddressSelect = async value => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setAdress(value);
        setCoordinates(latLng);
    };

    /**
     * Lors de l'envoi du formulaire de création
     * @param e
     */
    function handleSubmit(e) {
        e.preventDefault();
        if (coordinates.lng !== null) {
            if (selectedAnnouncementToEdit) { //si mode d'édition
                fetch(`${misterCoockyApi.misterCoockyApi}/graphql`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query: `
                        mutation updateAnnouncement(
                        $announcementInput : AnnouncementInput!,
                        $petAnnouncementInfosInput : PetAnnouncementInfosInput!){
                            updateAnnouncement(
                                id: "${selectedAnnouncementToEdit}",
                                announcementInput : $announcementInput,
                                petAnnouncementInfosInput : $petAnnouncementInfosInput 
                            ){​​​​​​
                            id
                          }​​​​​​​
                        }`,
                        variables: {
                            "announcementInput": {
                                "platform": "Mister Coocky",
                                "title": titreAnnonce,
                                "description": description,
                                "url": "",
                                "image": image,
                                "postalAddress": {
                                    "street": adress,
                                    "geoLocation": {
                                        "latitude": coordinates.lat,
                                        "longitude": coordinates.lng
                                    }
                                }
                            },
                            "petAnnouncementInfosInput": {
                                "petId": animalId,
                                "price": prix,
                                "race": race,
                                "age": age,
                                "tattoo": estTatoue,
                                "puce": estPuce,
                                "vaccine": estVaccine,
                                "identificationNumber": numId
                            }
                        }
                    }),
                })
                    .then((res) => res.json())
                    .then(function (result) {
                        if (result.data.updateAnnouncement.id !== null) {
                            window.location.href = '/annonces';
                        }
                    });
            } else {
                fetch(`${misterCoockyApi.misterCoockyApi}/graphql`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query: `
                            mutation CreateAnnouncement($userId:String!, $announcementInput:AnnouncementInput!, $petAnnouncementInfosInput:PetAnnouncementInfosInput!){
                            createAnnouncement( userId : $userId, announcementInput : $announcementInput, petAnnouncementInfosInput : $petAnnouncementInfosInput
                            ) {​​​​​​
                                id
                            }​​​​​​   ​
                    }`,
                        variables:
                            {
                                "userId": localStorage.getItem('userId'),
                                "announcementInput": {
                                    "platform": "Mister Coocky",
                                    "title": titreAnnonce,
                                    "description": description,
                                    "url": "",
                                    "image": image,
                                    "postalAddress": {
                                        "street": adress,
                                        "geoLocation": {
                                            "latitude": coordinates.lat,
                                            "longitude": coordinates.lng
                                        }
                                    }
                                },
                                "petAnnouncementInfosInput": {
                                    "petId": animalId,
                                    "price": prix,
                                    "race": race,
                                    "age": age,
                                    "tattoo": estTatoue,
                                    "puce": estPuce,
                                    "vaccine": estVaccine,
                                    "identificationNumber": numId
                                }
                            }
                    }),
                })
                    .then((res) => res.json())
                    .then(function (result) {
                        if (result.data.createAnnouncement.id !== null) {
                            window.location.href = '/annonces';
                        }
                    });
            }
        } else {
            setAddressMessageAlert("Addresse incomplète")
        }
    }


    /**
     * Renvoi du contenu de la page
     * @returns {*}
     */
    function getAddProductContent() {
        let dataImg = "data:image/png;base64," + image;
        switch (pageId) {
            case 0:
                return <Box mt={10}>
                    {
                        selectedAnnouncementToEdit ?
                            <h2 style={{color: colors.brown}}>Mode édition Annonce </h2> : <></>
                    }
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={1}>
                            <Grid container item xs={12} spacing={2}>
                                <Grid item xs={12} sm={3} align={'center'}>
                                    {
                                        image ?
                                            <img src={dataImg} xs={12} width={200}/> :
                                            null
                                    }
                                    <Button variant="outlined" xs={12} component="label" size={'small'}>
                                        {image ? "Remplacer l'image" : "Ajouter une image"}
                                        <input type="file" accept="image/*" hidden onChange={handleImagePreview}/>
                                    </Button>
                                </Grid>
                                <Grid item sm={12} md={6} lg={3}>
                                    <FormControl variant="outlined" className={classes.formControl} required={true}
                                                 spacing={3}>
                                        <InputLabel id="select-animal">Animal</InputLabel>
                                        <Select
                                            labelId="select-animal"
                                            id="select-animal"
                                            onChange={e => setAnimalId(e.target.value)}
                                            value={animalId}
                                            label="Animal">
                                            {
                                                animalList.map(ani => {
                                                    return <MenuItem key={ani.id} value={ani.id}>{ani.name}</MenuItem>
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                    <TextField
                                        className={classes.formControl}
                                        id="idRace"
                                        label="Race"
                                        value={race}
                                        onChange={e => (setRace(e.target.value))}
                                        variant="outlined"
                                    />
                                    <TextField
                                        required
                                        className={classes.formControl}
                                        id="idPrix"
                                        label="Prix"
                                        inputmode="decimal"
                                        type="number"
                                        InputProps={{ inputProps: { min: 0, step: "0.01"} }}
                                        value={prix}
                                        onChange={e => (setPrix(e.target.value))}
                                        variant="outlined"
                                    />
                                    <FormControl variant="outlined" className={classes.formControl} required={true}
                                                 spacing={3}>
                                        <InputLabel id="select-animal">Age</InputLabel>
                                        <Select
                                            labelId="select-age"
                                            id="select-age"
                                            onChange={e => setAge(e.target.value)}
                                            value={age}
                                            label="age">
                                            <MenuItem key="1" value="Moins de 8 semaines">Moins de 8 semaines</MenuItem>
                                            <MenuItem key="2" value="Plus de 8 semaines">Plus de 8 semaines</MenuItem>
                                            <MenuItem key="3" value="Adulte">Adulte</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item sm={12} md={6} lg={3}>
                                    <TextField
                                        required
                                        className={classes.formControl}
                                        id="idTitreAnnonce"
                                        label="Titre annonce"
                                        value={titreAnnonce}
                                        onChange={e => (setTitreAnnonce(e.target.value))}
                                        variant="outlined"
                                    />

                                    <FormControl variant="outlined" className={classes.formControl} spacing={3}>
                                        <InputLabel id="select-vaccine">Vacciné</InputLabel>
                                        <Select
                                            labelId="select-vaccine"
                                            id="select-vaccine"
                                            value={estVaccine}
                                            onChange={e => setEstVaccine(e.target.value)}
                                            label="vaccine">
                                            <MenuItem value={false}>Non</MenuItem>
                                            <MenuItem value={true}>Oui</MenuItem>
                                        </Select>
                                    </FormControl>

                                    <FormControl variant="outlined" className={classes.formControl} spacing={3}>
                                        <InputLabel id="select-puce">Pucé</InputLabel>
                                        <Select
                                            labelId="select-puce"
                                            id="select-puce"
                                            value={estPuce}
                                            onChange={e => setEstPuce(e.target.value)}
                                            label="puce">
                                            <MenuItem value={false}>Non</MenuItem>
                                            <MenuItem value={true}>Oui</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl variant="outlined" className={classes.formControl} spacing={3}>
                                        <InputLabel id="select-puce">Tattoué</InputLabel>
                                        <Select
                                            labelId="select-tattoue"
                                            id="select-tattoue"
                                            value={estTatoue}
                                            onChange={e => setEstTatoue(e.target.value)}
                                            label="puce">
                                            <MenuItem value={false}>Non</MenuItem>
                                            <MenuItem value={true}>Oui</MenuItem>
                                        </Select>
                                    </FormControl>

                                </Grid>
                                <Grid item sm={12} md={6} lg={3}>
                                    <TextField
                                        id="description"
                                        label="Description"
                                        multiline
                                        rows={4}
                                        className={classes.formControl}
                                        onChange={e => setDescription(e.target.value)}
                                        value={description}
                                        variant="outlined"
                                    />
                                    <TextField
                                        className={classes.formControl}
                                        id="idNumId"
                                        label="Numéro d'identification"
                                        variant="outlined"
                                        value={numId}
                                        onChange={e => (setNumId(e.target.value))}
                                    />

                                    <PlacesAutocomplete
                                        value={adress}
                                        onChange={setAdress}
                                        onSelect={handleAddressSelect}
                                    >
                                        {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                                            <div>
                                                <TextField className={classes.formControl} variant="outlined" required
                                                           fullWidth {...getInputProps({
                                                    label: "Adresse",
                                                    placeholder: "Entrez l'adresse"
                                                })} />
                                                {addressMessageAlert ? <Alert className={classes.formControl}
                                                                              severity="error">{addressMessageAlert}</Alert> : <></>}
                                                <div>
                                                    {loading ? <div>Chargement...</div> : null}

                                                    {suggestions.map(suggestion => {
                                                        const style = {
                                                            backgroundColor: suggestion.active ? colors.brown : "#fafafa"
                                                        };
                                                        return (
                                                            <div  {...getSuggestionItemProps(suggestion, {style})}>
                                                                {suggestion.description}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </PlacesAutocomplete>


                                </Grid>
                            </Grid>

                            <Grid container item xs={12} spacing={1}>
                                <React.Fragment>
                                    <Grid item xs={12} sm={3} align={'center'}>
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                    </Grid>
                                    <Grid item xs={12} sm={3} align={'center'}>
                                        <Button type="submit" variant="contained"
                                                style={{backgroundColor: colors.brown}}>Valider</Button>
                                    </Grid>
                                </React.Fragment>
                            </Grid>
                        </Grid>
                    </form>
                </Box>;
                break;
            case 1:
                return <Grid container spacing={3} direction={"column"} align={"center"} className={classes.root}>
                    <Grid className={classes.paper}>
                        <Grid container spacing={2} className={classes.item}>
                            <Grid item>
                                <Avatar>1</Avatar>
                            </Grid>
                            <Grid item xs zeroMinWidth>
                                <Typography className={classes.typotext}>Télécharger le template</Typography>
                                <Button href={"files/formulaire_produits.xlsx"} className={classes.btn2}
                                        style={{backgroundColor: colors.red}} download target="_blank"
                                        startIcon={<GetAppIcon/>}> Télécharger le template</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid className={classes.paper}>
                        <Grid container spacing={2} className={classes.item}>
                            <Grid item>
                                <Avatar>2</Avatar>
                            </Grid>
                            <Grid item xs zeroMinWidth>
                                <span className={classes.typotext}>Remplir le document Excel avec vos différents produits</span>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid className={classes.paper}>
                        <Grid container spacing={2} className={classes.item}>
                            <Grid item>
                                <Avatar>3</Avatar>
                            </Grid>
                            <Grid item xs zeroMinWidth>
                                <Typography noWrap className={classes.typotext}>Déposer le template rempli</Typography>
                                <Button className={classes.btn2} variant="contained"
                                        style={{backgroundColor: colors.red}} component="label"
                                        startIcon={<GetAppIcon/>}>Déposer le template <input accept=".xlsx" type="file"
                                                                                             onChange={e => (handleFile(e))}
                                                                                             hidden/> </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    {
                        <Snackbar open={fileTransmited} autoHideDuration={6000} anchorOrigin={{vertical: "top",horizontal: "center"}}
                                  onClose={() => setFileTransmited(false)}>
                            <Alert severity="success">Fichier transmis, il sera bientôt traîté</Alert>
                        </Snackbar>
                    }
                </Grid>;
                break;
            case 2:
                return <Grid className={classes.paper} align={'center'}>
                    <Grid container spacing={2} className={classes.item}>
                        <Grid item>
                            <Avatar>1</Avatar>
                        </Grid>
                        <Grid item xs zeroMinWidth>
                            <Typography noWrap className={classes.typotext}>Déposer le template rempli</Typography>
                            <Button className={classes.btn2} variant="contained" style={{backgroundColor: colors.red}}
                                    component="label" startIcon={<GetAppIcon/>}>Déposer le template <input
                                accept=".xlsx" type="file" onChange={e => (handleFile(e))} hidden/> </Button>
                        </Grid>
                    </Grid>
                    {
                        <Snackbar open={fileTransmited} autoHideDuration={6000} anchorOrigin={{vertical: "top",horizontal: "center"}}
                                  onClose={() => setFileTransmited(false)}>
                            <Alert severity="success">Fichier transmis, il sera bientôt traîté</Alert>
                        </Snackbar>
                    }
                </Grid>;
                break;
        }
    }

    return (
        <div>
            <Header/>
            <Container>
                <Title name={"Mr.Adopt — Ajouter des annonces"}/>
                <Grid container spacing={5} justify="center">
                    <Grid item xs={12} sm={3}>
                        <Button onClick={() => window.location.href = '/annonces'} className={classes.btn}
                                variant="contained" style={{backgroundColor: colors.grey}}>Mes annonces</Button>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Button onClick={() => window.location.href = '/addAnnonce'} className={classes.btn}
                                variant="contained" style={{backgroundColor: colors.brown}}>Ajouter une annonce</Button>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Button onClick={() => window.location.href = '/statisticsMrAdopt'} className={classes.btn}
                                variant="contained" style={{backgroundColor: colors.grey}}>Statistiques</Button>
                    </Grid>
                </Grid>
                <Grid container spacing={5} justify="center">
                    <Grid item xs={12} sm={3}>
                        <Button className={classes.btn} variant="contained"
                                style={pageId === 0 ? {backgroundColor: colors.brown} : {backgroundColor: colors.grey}}
                                onClick={e => (setPageId(0))}>Remplir un formulaire</Button>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Button className={classes.btn} variant="contained"
                                style={pageId === 1 ? {backgroundColor: colors.brown} : {backgroundColor: colors.grey}}
                                startIcon={< GetAppIcon/>} onClick={e => (setPageId(1))}>Remplir un template</Button>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Button className={classes.btn} variant="contained"
                                style={pageId === 2 ? {backgroundColor: colors.brown} : {backgroundColor: colors.grey}}
                                startIcon={<GetAppIcon/>} onClick={e => (setPageId(2))}>Importer un fichier</Button>
                    </Grid>
                </Grid>
                <Box mt={5}>
                    {getAddProductContent()}
                </Box>
            </Container>
        </div>

    )
}

export default AddAnnonce
