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
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import {Link} from 'react-router-dom';
import misterCoockyApi from '../constante/apiUrl'
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
    descriptionControl: {
        width: 200,
        height: 300,
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
 * Composant de page d'ajout d'un produit
 * @param props
 * @returns {*}
 * @constructor
 */
function AddProduct(props) {
    const classes = useStyles();
    const [selectedItemToEdit, setSelectedItemToEdit] = useState(props.itemId);

    const [pageId, setPageId] = useState(0);
    const [prix, setPrix] = useState("");
    const [nomProduit, setNomProduit] = useState("");
    const [marque, setMarque] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [estSain, setEstSain] = useState(false);
    const [estMalin, setEstMalin] = useState(false);
    const [estResponsable, setEstResponsable] = useState(false);
    const [typeProduitId, setTypeProduitId] = useState([]);
    const [typeProduitList, setTypeProduitList] = useState([]);
    const [lienProduit, setLienProduit] = useState("");
    const [animalId, setAnimalId] = useState("");
    const [animalList, setAnimalList] = useState([]);
    const [fileTransmited, setFileTransmited] = useState(false);
    const [discount, setDiscount] = useState("");

    const [categoryList, setCategoryList] = useState([]);
    const [categoryId, setCategoryId] = useState("");
    const [sousCateroriesList, setSousCateroriesList] = useState([]);
    const [sousCategorieId, setSousCategorieId] = useState("");

    /**
     * récupère l'item si en mode édition produit
     * et récupère la liste des animaux
     * et récupère les offres
     */
    useEffect(() => {
        if (selectedItemToEdit) {    //si mode configuration
            fetch(`${misterCoockyApi.misterCoockyApi}/graphql`, {    //on récupère l'item
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                    query{​​​​​​​
                      item(id:"${selectedItemToEdit}"){​​​​​​​
                        id
                        ttcPrice
                        mark{
                            id
                            name
                        }
                        isHealthy
                        isSmart
                        isResponsible
                        discount
                        pet{
                            id
                            name
                        }
                        product{
                            id
                            name
                        }
                        offer{
                            id
                            name
                        }
                        comment
                        link
                        uri
                        category{
                            id
                            name
                        }
                        subCategories{
                            id
                            name
                        }
                      }​​​​​​​
                    }`,
                }),
            })
                .then((res) => res.json())
                .then(function (result) {
                    setDescription(result.data.item.comment);
                    setEstMalin(result.data.item.isSmart);
                    setEstResponsable(result.data.item.isResponsible);
                    setEstSain(result.data.item.isHealthy);
                    setPrix(Math.round(result.data.item.ttcPrice / (1 - Math.abs(result.data.item.discount / 100))));
                    setImage((result.data.item.uri));
                    setMarque(result.data.item.mark.name);
                    setDiscount(result.data.item.discount);
                    setNomProduit(result.data.item.product.name);
                    setLienProduit(result.data.item.link);
                    setTypeProduitId(result.data.item.offer.id);
                    setAnimalId(result.data.item.pet.id);
                    if (result.data.item.subCategories[0] != null) {
                        setSousCategorieId(result.data.item.subCategories[0].id);
                    }
                    generateCategories(result.data.item.pet.id, result.data.item.offer.id);
                    onCategorySelected(result.data.item.pet.id, result.data.item.category.id);
                });
        }
        //récupérations de la liste des animaux
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

        fetch(`${misterCoockyApi.misterCoockyApi}/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    query{​​​​​​​
                        getOffers{​​​​​​​
                            id
                            name
                        }​​​​​​​
                    }`,
            }),
        })
            .then((res) => res.json())
            .then(function (result) {
                setTypeProduitList(result.data.getOffers);
            })
    }, []);

    /**
     * Lors de l'import d'un fichier
     * @param event
     */
    function handleFile(event) {
        const file = event.target.files[0];
        let data = new FormData();
        data.append("file", file);
        const userId = localStorage.getItem('userId');
        fetch(`${misterCoockyApi.misterCoockyApi}/uploadFile?sectionName=smr&userId=${userId}`, {
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
     * Lors de la sélection d'un animal
     * @param animalId
     */
    function handleAnimalChange(animalId) {
        setAnimalId(animalId);
        generateCategories(animalId, typeProduitId);
    }

    /**
     * Lors de la sélection d'un type
     * @param type
     */
    function handleTypeChange(type) {
        setTypeProduitId(type);
        generateCategories(animalId, type);
    }

    /**
     * récupération des catégories
     * @param animal
     * @param offer
     */
    function generateCategories(animal, offer) {
        setCategoryList([]);
        setSousCateroriesList([]);
        if ((animal && offer)) {
            fetch(`${misterCoockyApi.misterCoockyApi}/graphql`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                    query{​​​​​​​
                         getCategoriesByPetIdAndOfferId(petId:"${animal}", offerId:"${offer}"){
                            id
                            name
                        }​​​​​​​    
                    }`,
                }),
            })
                .then((res) => res.json())
                .then(function (result) {
                    setCategoryList(result.data.getCategoriesByPetIdAndOfferId);
                });
        }
    }

    /**
     * Lors de la sélection d'une catégorie
     * @param pet
     * @param category
     */
    function onCategorySelected(pet, category) {
        setSousCateroriesList([]);
        setCategoryId(category);
        fetch(`${misterCoockyApi.misterCoockyApi}/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    query{​​​​​​​
                        getSubCategoriesByPetAndCategoryIds(petId:"${pet}", categoryId:"${category}"){
                            id
                            name
                        }​​​​​​​
                    }`,
            }),
        })
            .then((res) => res.json())
            .then(function (result) {
                setSousCateroriesList(arrUnique(result.data.getSubCategoriesByPetAndCategoryIds));
            });
    }

    /**
     * fonction permettant de supprimer les doublons d'une liste
     * @param array
     * @returns {*}
     */
    function arrUnique(array) {
        var clean = array.filter((arr, index, self) =>
            index === self.findIndex((t) => (t.name === arr.name)));
        return clean
    }

    /**
     * Lors de l'ajout d'une image / mise en base64
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
     * Prévisiualisation de l'image impotée
     * @param e
     */
    function handleImagePreview(e) {
        if (e.target.files[0]) {
            imageUploaded(e.target.files[0])
        }
    }


    /**
     * Lors de l'envoi du formulaire de création
     * @param e
     */
    function handleSubmit(e) {
        e.preventDefault();
        let tmpDiscount = discount;
        if (discount === "") {
            tmpDiscount = 0
        }
        if (selectedItemToEdit) { //si mode d'édition
            fetch(`${misterCoockyApi.misterCoockyApi}/graphql`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                        mutation updateItem($input: ItemInput){
                            updateItem(id: "${selectedItemToEdit}", item: $input) {​​​​​​
                            id
                          }​​​​​​​
                        }`,
                    variables: {
                        "input": {
                            "price": prix,
                            "comment": description,
                            "isHealthy": Boolean(estSain),
                            "isSmart": Boolean(estMalin),
                            "isResponsible": Boolean(estResponsable),
                            "link": lienProduit,
                            "uri": image,
                            "discount": tmpDiscount,
                            "productName": nomProduit,
                            "markName": marque,
                            "petId": animalId,
                            "offerId": typeProduitId,
                            "categoryId": categoryId,
                            "subCategoryId": sousCategorieId,
                        }
                    }
                }),
            })
                .then((res) => res.json())
                .then(function (result) {
                    if (result.data.updateItem.id !== null) {
                        window.location.href = '/products';
                    }
                });
        } else {
            let tmpDiscount = discount;
            if (discount === "") {
                tmpDiscount = 0
            }
            fetch(`${misterCoockyApi.misterCoockyApi}/graphql`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                        mutation CreateItem($input: ItemInput){
                            createItem(item: $input) {​​​​​​
                            id
                          }​​​​​​​
                        }`,
                    variables: {
                        "input": {
                            "price": prix,
                            "comment": description,
                            "isHealthy": estSain,
                            "isSmart": estMalin,
                            "isResponsible": estResponsable,
                            "link": lienProduit,
                            "uri": image,
                            "userId": localStorage.getItem('userId'),
                            "productName": nomProduit,
                            "discount": tmpDiscount,
                            "markName": marque,
                            "supplierId": localStorage.getItem('supplierId'),
                            "petId": animalId,
                            "offerId": typeProduitId,
                            "categoryId": categoryId,
                            "subCategoryId": sousCategorieId,
                            "organizationId": localStorage.getItem('organizationId')
                        }
                    }
                }),
            })
                .then((res) => res.json())
                .then(function (result) {
                    if (result.data.createItem.id !== null) {
                        window.location.href = '/products';
                    }
                });
        }
    }


    function handlePriceChanges(value) {
        setPrix(value);
    }
        /**
             * Renvoi du contenu de la page
             * @returns {*}
         */
        function getAddProductContent() {
            const dataImg = "data:image/png;base64," + image;
            switch (pageId) {
                case 0:
                    return <Box mt={10}>
                        {
                            selectedItemToEdit ? <h2 style={{color: colors.brown}}>Mode édition produit </h2> : <></>
                        }
                        <form className={classes.form} onSubmit={handleSubmit}>
                            <Grid container spacing={1}>
                                <Grid container item xs={12} spacing={2}>
                                    <Grid item align={'center'} sm={12} md={6} lg={3}>
                                        {
                                            image ?
                                                <img src={dataImg} width={200}/> :
                                                null
                                        }
                                        <Button variant="outlined" component="label" size={'small'}>
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
                                                value={animalId}
                                                onChange={event => {
                                                    handleAnimalChange(event.target.value)
                                                }}
                                                label="Animal">
                                                {
                                                    animalList ? animalList.map((array) => {
                                                        return <MenuItem key={array.id}
                                                                         value={array.id}>{array.name}</MenuItem>
                                                    }) : <></>
                                                }
                                            </Select>
                                        </FormControl>
                                        <TextField
                                            required
                                            className={classes.formControl}
                                            id="idnNom"
                                            label="Nom du produit"
                                            value={nomProduit}
                                            onChange={e => (setNomProduit(e.target.value))}
                                            variant="outlined"
                                        />
                                        <FormControl component="fieldset" className={classes.formControl}>
                                            <FormLabel component="legend">SMR</FormLabel>
                                            <FormGroup>
                                                <FormControlLabel
                                                    control={<Checkbox checked={estSain} color={"default"}
                                                                       onChange={e => (setEstSain(e.target.checked))}
                                                                       name="Sain"/>}
                                                    label="Sain"
                                                />
                                                <FormControlLabel
                                                    control={<Checkbox checked={estMalin} color={"default"}
                                                                       onChange={e => (setEstMalin(e.target.checked))}
                                                                       name="Malin"/>}
                                                    label="Malin"
                                                />
                                                <FormControlLabel
                                                    control={<Checkbox checked={estResponsable} color={"default"}
                                                                       onChange={e => (setEstResponsable(e.target.checked))}
                                                                       name="Responsable"/>}
                                                    label="Responsable"
                                                />

                                                <TextField
                                                    className={classes.formControl}
                                                    id="idnNom"
                                                    label="Discount (%)"
                                                    value={discount}
                                                    type="number"
                                                    InputProps={{inputProps: {min: -99, max: 0, step: "0.01"}}}
                                                    placeholder={"-0%"}
                                                    onChange={e => (setDiscount(e.target.value))}
                                                    variant="outlined"
                                                />
                                            </FormGroup>
                                        </FormControl>
                                    </Grid>
                                    <Grid item sm={12} md={6} lg={3}>
                                        <TextField
                                            required
                                            className={classes.formControl}
                                            id="idMarque"
                                            label="Marque"
                                            value={marque}
                                            onChange={e => (setMarque(e.target.value))}
                                            variant="outlined"
                                        />

                                        <TextField
                                            required
                                            className={classes.formControl}
                                            id="idPrix"
                                            label="Prix"
                                            type="number"
                                            InputProps={{inputProps: {min: 0.0, step: "0.01"}}}
                                            value={prix}
                                            onChange={e => handlePriceChanges(e.target.value)}
                                            variant="outlined"
                                        />
                                        <FormControl variant="outlined" className={classes.formControl} required={true}>
                                            <InputLabel id="select-typeProduit">Type de produit</InputLabel>
                                            <Select
                                                labelId="select-typeProduit"
                                                id="select-typeProduit"
                                                value={typeProduitId}
                                                onChange={e => (handleTypeChange(e.target.value))}
                                                label="Type de produit">
                                                {
                                                    typeProduitList ? typeProduitList.map(function (type) {
                                                        return <MenuItem key={type.id}
                                                                         value={type.id}>{type.name}</MenuItem>
                                                    }) : <></>
                                                }
                                            </Select>
                                        </FormControl>
                                        <FormControl variant="outlined" className={classes.formControl} required>
                                            <InputLabel id="select-categorie">Catégorie</InputLabel>
                                            <Select
                                                labelId="select-categorie"
                                                id="select-categorie"
                                                value={categoryId}
                                                onChange={function (event) {
                                                    onCategorySelected(animalId, event.target.value)
                                                }}
                                                label="Catégorie">
                                                {
                                                    categoryList ? categoryList.map(function (cat) {
                                                        if (cat) {
                                                            return <MenuItem key={cat.id}
                                                                             value={cat.id}>{cat.name}</MenuItem>
                                                        }
                                                    }) : <></>

                                                }
                                            </Select>
                                        </FormControl>
                                        <FormControl variant="outlined" className={classes.formControl}>
                                            <InputLabel id="select-sousCategorie">Sous catégorie</InputLabel>
                                            <Select
                                                labelId="select-sousCategorie"
                                                id="select-sousCategorie"
                                                value={sousCategorieId}
                                                onChange={e => setSousCategorieId(e.target.value)}
                                                label="Animal">
                                                {
                                                    sousCateroriesList ? sousCateroriesList.map(function (sousCat) {
                                                        return <MenuItem key={sousCat.id}
                                                                         value={sousCat.id}>{sousCat.name}</MenuItem>
                                                    }) : <></>
                                                }
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item sm={12} md={6} lg={3}>
                                        <TextField
                                            id="description"
                                            label="Description"
                                            multiline
                                            rows={8}
                                            defaultValue=""
                                            onChange={e => setDescription(e.target.value)}
                                            value={description}
                                            className={classes.formControl}
                                            variant="outlined"
                                        />
                                        <TextField
                                            required
                                            className={classes.formControl}
                                            id="idLien"
                                            label="Lien du produit"
                                            value={lienProduit}
                                            onChange={e => (setLienProduit(e.target.value))}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container item xs={12} spacing={1}>
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
                                </Grid>
                            </Grid>
                        </form>
                    </Box>;
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
                                            startIcon={<GetAppIcon/>}>Télécharger le template</Button>
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
                                    <Typography className={classes.typotext}>Importer votre fichier en
                                        .xlxs</Typography>
                                    <Button className={classes.btn2} variant="contained"
                                            style={{backgroundColor: colors.red}} component="label"
                                            startIcon={<GetAppIcon/>}>Déposer le template <input accept=".xlsx"
                                                                                                 type="file"
                                                                                                 onChange={e => (handleFile(e))}
                                                                                                 hidden/> </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        {
                            <Snackbar open={fileTransmited} autoHideDuration={6000}
                                      anchorOrigin={{vertical: "top", horizontal: "center"}}
                                      onClose={() => setFileTransmited(false)}>
                                <Alert severity="success">Fichier transmis, il sera bientôt traîté</Alert>
                            </Snackbar>
                        }
                    </Grid>;
                case 2:
                    return <Grid className={classes.paper} align={'center'}>
                        <Grid container spacing={2} className={classes.item}>
                            <Grid item>
                                <Avatar>1</Avatar>
                            </Grid>
                            <Grid item xs zeroMinWidth>
                                <Typography className={classes.typotext}>Importer votre fichier en .xlxs</Typography>
                                <Button className={classes.btn2} variant="contained"
                                        style={{backgroundColor: colors.red}}
                                        component="label" startIcon={<GetAppIcon/>}>Déposer le template <input
                                    accept=".xlsx" type="file" onChange={e => (handleFile(e))} hidden/> </Button>
                            </Grid>
                        </Grid>
                        {
                            <Snackbar open={fileTransmited} autoHideDuration={6000}
                                      anchorOrigin={{vertical: "top", horizontal: "center"}}
                                      onClose={() => setFileTransmited(false)}>
                                <Alert severity="success">Fichier transmis, il sera bientôt traîté</Alert>
                            </Snackbar>
                        }
                    </Grid>;
                default:
                    break;
            }
        }


        return (
            <div>
                <Header/>
                <Container>
                    <Title name={"SMR — Ajouter des Produits"}/>
                    <Grid container spacing={5} justify="center">
                        <Grid item xs={12} sm={3}>
                            <Button component={Link} to="/products" className={classes.btn} variant="contained"
                                    style={{backgroundColor: colors.grey}}>Produits ajoutés</Button>
                        </Grid>

                        <Grid item xs={12} sm={3}>
                            <Button component={Link} to="/addproduct" className={classes.btn} variant="contained"
                                    style={{backgroundColor: colors.brown}}>Ajout d'un produit</Button>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Button component={Link} to="/statistics" className={classes.btn} variant="contained"
                                    style={{backgroundColor: colors.grey}}>Statistiques</Button>
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
                                    startIcon={< GetAppIcon/>} onClick={e => (setPageId(1))}>Remplir un
                                template</Button>
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

export default AddProduct
