import React, {useEffect, useState} from 'react'
import {Checkbox, makeStyles} from "@material-ui/core";
import {Header, Title} from "../components";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import MUIDataTable from "mui-datatables";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import {colors} from "../themes/colors";
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import IconButton from "@material-ui/core/IconButton";
import Modal from 'react-modal';
import {Link, Redirect} from 'react-router-dom';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import misterCoockyApi from '../constante/apiUrl'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};


const getMuiTheme = () => createMuiTheme({
    overrides: {
        MuiTableHead: {
            root: {
                position: 'sticky'
            }
        }
    }
});


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

}));

/**
 * Page d'affichage des Produits de l'utilisateur
 * @returns {*}
 * @constructor
 */
function MyProductPage() {
    const [data, setData] = useState([]);   //produits de l'utilisateur
    const [selectedItemId, setSelectedItemId] = useState(false);   //produits de l'utilisateur
    const [selectedItemIdToDelete, setSelectedItemIdToDelete] = useState(null);   //produits de l'utilisateur
    const classes = useStyles();

    function arrangeParameters(arr) {
        var items = [];
        arr.forEach(i => {
            items.push({
                'product': i.product.name,
                'mark': i.mark.name,
                'ttcPrice': Math.round(i.ttcPrice/(1-Math.abs(i.discount/100))),
                'pet': i.pet.name,
                'offer': i.offer.name,
                'category': i.category.name,
                'discount': i.discount,
                'isSmart': i.isSmart,
                'isHealthy': i.isHealthy,
                'isResponsible': i.isResponsible,
                'img': i.uri,
                'id': i.id,
                'priceDeducted': i.ttcPrice
            })
        });
        setData(items)
    }
    const options = {
        selectableRows: false,
        customHeadRender: {
            position: 'absolute'
        },
        textLabels: {
            body: {
                noMatch: 'Aucun produit trouvé'
            },
            pagination: {
                next: "Page suivante",
                previous: "Page précédente",
                rowsPerPage: "Produits par page:",
                displayRows: "sur",
            },
        }
    };
    const columns = [
        {
            name: "img",
            label: "Image",
            options: {
                customBodyRender: function (data) {
                    if (data) {
                        const dataImg = "data:image/png;base64," + data;
                        return <img src={dataImg} width={80}/>;
                    } else return 'N/A'
                }
            }
        },
        {
            name: "product",
            label: "Nom"
        },
        {
            name: "mark",
            label: "Marque"
        },
        {
            name: "ttcPrice",
            label: "Prix (€)"
        },
        {
            name: "discount",
            label: "Discount (%)"
        },
        {
            name: "priceDeducted",
            label: "Prix affiché (€)"
        },
        {
            name: "pet",
            label: "Animal"
        },
        {
            name: "offer",
            label: "Type de produit"
        },
        {
            name: "category",
            label: "Catégorie"
        },
        {
            name: "isHealthy",
            label: "Sain",
            options: {
                customBodyRender: function (data) {
                    return <Checkbox checked={data} disabled={true}/>;
                }
            }
        },
        {
            name: "isSmart",
            label: "Malin",
            options: {
                customBodyRender: function (data) {
                    return <Checkbox checked={data} disabled={true}/>;
                }
            }
        },
        {
            name: "isResponsible",
            label: "Responsable",
            options: {
                customBodyRender: function (data) {
                    return <Checkbox checked={data} disabled={true}/>;
                }
            }
        },
        {
            name: "id",
            label: "Actions",
            options: {
                customBodyRender: function (res) {
                    return <div>
                        <IconButton aria-label="Editer" style={{padding: "3px"}} onClick={() => setSelectedItemId(res)}>
                            <EditOutlinedIcon style={{color: colors.grey}}/>
                        </IconButton>
                        <IconButton aria-label="Supprimer" style={{padding: "3px"}}
                                    onClick={() => setSelectedItemIdToDelete(res)}>
                            <DeleteOutlinedIcon style={{color: colors.grey}}/>
                        </IconButton>
                    </div>
                }
            }
        },

    ];

    useEffect(() => {
        refreshList()
    }, []);


    /**
     * Suppression de l'item sélectionné
     * @param id
     */
    function deleteItem(id) {
        fetch(`${misterCoockyApi.misterCoockyApi}/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    mutation DeleteItemById($id: String!) {
                      deleteItemById(id: $id)
                    }`,
                variables: {
                    "id": id
                }
            }),
        })
            .then((res) => res.json())
            .then(function (result) {
                refreshList();
                setSelectedItemIdToDelete(null)
            });
    }

    /**
     * Récupération des produits
     */
    function refreshList() {
        fetch(`${misterCoockyApi.misterCoockyApi}/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    query{​​​​​​​
                        getItemsBySupplierId(id:"${localStorage.getItem('supplierId')}"){​​​​​​​
                            product{
                                name
                            }
                            mark{
                                name
                            }
                            ttcPrice
                            discount
                            pet{
                                name
                            }
                            offer{
                                name
                            }
                            category{
                                name
                            }
                            subCategories{
                                name
                            }
                            isHealthy
                            isResponsible
                            isSmart
                            uri
                            id
                          }​​​​​​​
                    }`,
            }),
        })
            .then((res) => res.json())
            .then(function (result) {
                arrangeParameters(result.data.getItemsBySupplierId);
            })
    }

    return (
        <div>
            {
                selectedItemId ?
                    <Redirect
                        to={{
                            pathname: "/addProduct",
                            state: {itemId: selectedItemId}
                        }}
                    />
                    : null
            }
            <Header/>
            <Container>
                <Modal
                    isOpen={selectedItemIdToDelete !== null}
                    onRequestClose={() => setSelectedItemIdToDelete(null)}
                    style={customStyles}
                >
                    <Grid>Etes vous sûr de vouloir supprimer l'article?</Grid>
                    <Button onClick={() => deleteItem(selectedItemIdToDelete)}>Oui</Button>
                    <Button onClick={() => setSelectedItemIdToDelete(null)}>Non</Button>
                </Modal>
                <Title name={"SMR — Produits"}/>
                <Grid container spacing={5} justify="center">
                    <Grid item xs={12} sm={3}>
                        <Button component={Link} to="/products" className={classes.btn} variant="contained"
                                style={{backgroundColor: colors.brown}}>Produits ajoutés</Button>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <Button component={Link} to="/addproduct" className={classes.btn} variant="contained"
                                style={{backgroundColor: colors.grey}}>Ajout d'un produit</Button>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Button component={Link} to="/statistics" className={classes.btn} variant="contained"
                                style={{backgroundColor: colors.grey}}>Statistiques</Button>
                    </Grid>
                </Grid>

                <Box mt={5}>
                    <MuiThemeProvider theme={getMuiTheme()}>
                        <MUIDataTable
                            title={"Produits"}
                            data={data}
                            columns={columns}
                            options={options}
                        />
                    </MuiThemeProvider>
                </Box>
            </Container>
        </div>
    )
}

export default MyProductPage
