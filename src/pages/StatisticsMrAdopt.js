import React, {useEffect, useState} from 'react'
import {makeStyles} from "@material-ui/core";
import {Header, Title} from "../components";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import {colors} from "../themes/colors";
import {Bar} from 'react-chartjs-2';
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from "@material-ui/core/MenuItem";
import misterCoockyApi from '../constante/apiUrl'

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
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        maxWidth: 300
    }
}));

/**
 * Page de statistiques des annonces
 * @returns {*}
 * @constructor
 */
function StatistiqueMrAdopt() {
    const classes = useStyles();
    const [productsNames, setProductsNames] = useState([]);
    const [productsClicks, setProductsClicks] = useState([]);
    const [productsSelected, setProductsSelected] = useState([]);

    /**
     * Récupération des produits de utililsateur
     */
    useEffect(() => {
        fetch(`${misterCoockyApi.misterCoockyApi}/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    query{​​​​​​​
                        getAnnouncementsByUserId(id:"${localStorage.getItem('userId')}"){​​​​​​​    
                            id
                            title
                            numberOfClick
                        }​​​​​​​
                    }`,
            }),
        })
            .then((res) => res.json())
            .then((json) => {
                let tmpProductsName = [];
                let tmpProductsClicks = [];
                if (json.data.getAnnouncementsByUserId) {
                    json.data.getAnnouncementsByUserId.forEach((produit) => {
                        tmpProductsName.push(produit.title);
                        tmpProductsClicks.push(produit.numberOfClick);
                    });
                    setProductsNames(tmpProductsName);
                    setProductsClicks(tmpProductsClicks);
                    setProductsSelected([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19])   //on n'affiche que les 20premiers
                }
            })
    }, []);

    /**
     * Récupération des noms des produits/annonces
     * @returns {Array}
     */
    function getSelectedNames() {
        let selectedNames = [];
        for (let i = 0; i < productsNames.length; i++) {
            if (productsSelected.includes(i)) {
                selectedNames.push(productsNames[i])
            }
        }
        return selectedNames
    }

    /**
     * Récupération des nombres de clicks sur les produits/annonces
     * @returns {Array}
     */
    function getSelectedClicks() {
        let selectedClicks = [];
        for (let i = 0; i < productsClicks.length; i++) {
            if (productsSelected.includes(i)) {
                selectedClicks.push(productsClicks[i])
            }
        }
        return selectedClicks
    }

    /**
     * Lors du click sur un select
     * @param event
     */
    function handleChange(event) {
        let changeProductState = -1;
        //on récupère le produit changé
        productsNames.map((product, index) => {
            if (!event.target.value.includes(product)) {
                changeProductState = index
            }
        });
        //on change le produit concerné
        let tmpSelected = [];
        productsSelected.map(selec => {
            tmpSelected.push(selec)
        });   //on rerempli par les valeurs initiales
        if (tmpSelected.includes(changeProductState)) {  //lors d'une suppression
            const index = tmpSelected.indexOf(changeProductState);
            if (index > -1) {
                tmpSelected.splice(index, 1);
            }
        } else {  //lors d'un ajout
            tmpSelected.push(changeProductState)
        }
        setProductsSelected(tmpSelected)
    }

    return (
        <div>
            <Header/>
            <Container>
                <Title name={"Mr.Adopt — Statistiques"}/>
                <Grid container spacing={10} justify="center">
                    <Grid item xs>
                        <Button onClick={() => window.location.href = '/annonces'} className={classes.btn}
                                variant="contained" style={{backgroundColor: colors.grey}}>Mes annonces</Button>
                    </Grid>
                    <Grid item xs>
                        <Button onClick={() => window.location.href = '/addAnnonce'} className={classes.btn}
                                variant="contained" style={{backgroundColor: colors.grey}}>Ajouter une annonce</Button>
                    </Grid>
                    <Grid item xs>
                        <Button onClick={() => window.location.href = '/statisticsMrAdopt'} className={classes.btn}
                                variant="contained" style={{backgroundColor: colors.brown}}>Statistiques</Button>
                    </Grid>
                </Grid>


                <Box mt={5}>
                    <Grid container justify="flex-end">
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="select-multiple-checkbox">Filtrer</InputLabel>
                            <Select
                                multiple
                                value={productsNames}
                                onChange={handleChange}
                                input={<Input id="select-multiple-checkbox"/>}
                                renderValue={selected => selected.join(", ")}
                                MenuProps={MenuProps}
                            >
                                {productsNames.map((name, index) => (
                                    <MenuItem key={name} value={name}>
                                        <Checkbox checked={productsSelected.includes(index)}/>
                                        <ListItemText primary={name}/>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Bar
                        data={{
                            labels: getSelectedNames(),
                            datasets: [{
                                label: 'Nombre de vues',
                                data: getSelectedClicks(),
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)'
                                ],
                                borderColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)'
                                ],
                                borderWidth: 1
                            }]
                        }}
                    />
                </Box>
            </Container>
        </div>

    )
}

export default StatistiqueMrAdopt;
