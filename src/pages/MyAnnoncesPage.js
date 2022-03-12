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
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import {Link, Redirect} from 'react-router-dom';
import Modal from 'react-modal';
import misterCoockyApi from '../constante/apiUrl'

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

/**
 * Page d'affichage des annonces
 * @returns {*}
 * @constructor
 */
function MyAnnoncesPage() {
    const [data, setData] = useState([]);   //produits de l'utilisateur
    const [selectedAnnouncementId, setSelectedAnnouncementId] = useState(false);   //announce de l'utilisateur ayant cliqué sur modifier
    const [selectedAnnouncementIdToDelete, setSelectedAnnouncementIdToDelete] = useState(null);
    const classes = useStyles();

    const options = {
        selectableRows: false,
        textLabels: {
            body: {
                noMatch: 'Aucune annonce trouvée'
            },
            pagination: {
                next: "Page suivante",
                previous: "Page précédente",
                rowsPerPage: "Annonces par page:",
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
                        return <img src={dataImg} width={100}/>;
                    } else return 'N/A'
                }
            }
        },
        {
            name: "title",
            label: "Titre"
        },
        {
            name: "price",
            label: "Prix (€)"
        },
        {
            name: "petName",
            label: "Animal"
        },
        {
            name: "date",
            label: "Date de mise en ligne"
        },
        {
            name: "vaccine",
            label: "Vacciné",
            options: {
                customBodyRender: function (data) {
                    return <Checkbox checked={data} disabled={true}/>;
                }
            }
        },
        {
            name: "tattoue",
            label: "Tattoué",
            options: {
                customBodyRender: function (data) {
                    return <Checkbox checked={data} disabled={true}/>;
                }
            }
        },
        {
            name: "puce",
            label: "Pucé",
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
                        <IconButton aria-label="Editer" style={{padding: "3px"}} onClick={() => {
                            setSelectedAnnouncementId(res)
                        }}>
                            <EditOutlinedIcon style={{color: colors.grey}}/>
                        </IconButton>
                        <IconButton aria-label="Supprimer" style={{padding: "3px"}} onClick={() => {
                            setSelectedAnnouncementIdToDelete(res)
                        }}>
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
     * Arrangement des annonces pour l'insertion dans le tableau
     * @param arr
     */
    function arrangeParameters(arr) {
        var announcements = [];

        arr.forEach(i => {
            announcements.push({
                'id': i.id,
                'title': i.title,
                'price': i.petAnnouncementInfo.price,
                'petName': i.petAnnouncementInfo.pet.name,
                'tattoue': i.petAnnouncementInfo.tattoo,
                'vaccine': i.petAnnouncementInfo.vaccine,
                'puce': i.petAnnouncementInfo.puce,
                'date': i.date,
                'img': i.image
            })
        });
        setData(announcements)
    }

    /**
     * Suppression d'une annonce
     * @param id
     */
    function deleteAnnouncement(id) {
        fetch(`${misterCoockyApi.misterCoockyApi}/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    mutation DeleteAnnouncementById($id: String!) {
                      deleteAnnouncementById(id: $id){
                          id
                      }
                    }`,
                variables: {
                    "id": id
                }
            }),
        })
            .then((res) => res.json())
            .then(function (result) {
                refreshList();
                setSelectedAnnouncementIdToDelete(null)
            });
    }

    /**
     * Récupère les annonces de l'utilisateur
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
                        getAnnouncementsByUserId(id:"${localStorage.getItem('userId')}"){​​​​​​​    
                            id
                            title
                            petAnnouncementInfo{
                                pet{
                                    name
                                }
                                price
                                tattoo
                                vaccine
                                puce
                            }
                            image
                            date
                        }​​​​​​​
                    }`,
            }),
        })
            .then((res) => res.json())
            .then(function (result) {
                arrangeParameters(result.data.getAnnouncementsByUserId);
            })
    }

    return (
        <div>
            {
                selectedAnnouncementId ?
                    <Redirect
                        to={{
                            pathname: "/addAnnonce",
                            state: {announcementId: selectedAnnouncementId}
                        }}
                    /> : null
            }

            <Header/>
            <Container>
                <Modal
                    isOpen={selectedAnnouncementIdToDelete !== null}
                    onRequestClose={() => setSelectedAnnouncementIdToDelete(null)}
                    style={customStyles}
                >
                    <Grid>Etes vous sûr de vouloir supprimer l'annonce?</Grid>
                    <Button onClick={() => deleteAnnouncement(selectedAnnouncementIdToDelete)}>Oui</Button>
                    <Button onClick={() => setSelectedAnnouncementIdToDelete(null)}>Non</Button>
                </Modal>
                <Title name={"Mr.Adopt — Mes Annonces"}/>
                <Grid container spacing={5} justify="center">
                    <Grid item xs={12} sm={3}>
                        <Button component={Link} to="/annonces" className={classes.btn} variant="contained"
                                style={{backgroundColor: colors.brown}}>Mes annonces</Button>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <Button component={Link} to="/addAnnonce" className={classes.btn} variant="contained"
                                style={{backgroundColor: colors.grey}}>Ajouter une annonce</Button>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Button component={Link} to="/statisticsMrAdopt" className={classes.btn} variant="contained"
                                style={{backgroundColor: colors.grey}}>Statistiques</Button>
                    </Grid>
                </Grid>

                <Box mt={5}>
                    <MuiThemeProvider theme={getMuiTheme()}>
                        <MUIDataTable
                            title={"Annonces"}
                            data={data}
                            columns={columns}
                            options={options}
                            spacing={10}
                        />
                    </MuiThemeProvider>
                </Box>
            </Container>
        </div>

    )
}

export default MyAnnoncesPage
