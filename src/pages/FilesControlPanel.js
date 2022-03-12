import {Header, Title} from "../components";
import {Box, Container, createMuiTheme, makeStyles, MuiThemeProvider} from "@material-ui/core";
import {colors} from "../themes/colors";
import React, {useEffect, useState} from "react";
import misterCoockyApi from "../constante/apiUrl";
import MUIDataTable from "mui-datatables";
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import IconButton from "@material-ui/core/IconButton";
import Modal from 'react-modal';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {HashLink as Link} from '../../node_modules/react-router-hash-link';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
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

/**
 * Page de gestion des fichiers importés par les utilisateurs pro
 * @returns {*}
 * @constructor
 */
export default function FilesControlPanel() {
    const classes = useStyles();
    const [data, setData] = useState([]);   //ensemble des fichiers
    const [selectedFileIdToDelete, setSelectedFileIdToDelete] = useState(null);   //ensemble des fichiers
    const [userAdmin, setUserAdmin] = useState(false);

    const options = {
        selectableRows: false,
        customHeadRender: {
            position: 'absolute'
        },
        textLabels: {
            body: {
                noMatch: 'Fichier trouvé'
            }
        }
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

    const columns = [
        {
            name: "name",
            label: "Nom fichier"
        },
        {
            name: "sectionName",
            label: "Section"
        },
        {
            name: "orga",
            label: "Organisation",
            options: {
                customBodyRender: function (res) {
                    return <Link to={{pathname: "/organizationInfos", state: {organizationName: res}}}> {res}</Link>
                }
            }
        },
        {
            name: "dateAjout",
            label: "Date d'ajout"
        },
        {
            name: "id",
            label: "Actions",
            options: {
                customBodyRender: function (res) {
                    return <div>
                        <IconButton aria-label="Editer" style={{padding: "3px"}} onClick={() => downloadFile(res)}>
                            <GetAppIcon style={{color: colors.grey}}/>
                        </IconButton>
                        <IconButton aria-label="Supprimer" style={{padding: "3px"}}
                                    onClick={() => setSelectedFileIdToDelete(res)}>
                            <DeleteOutlinedIcon style={{color: colors.grey}}/>
                        </IconButton>
                    </div>
                }
            }
        },
    ];

    useEffect(() => {
        //1 On récupère le rôle de l'utilisateur
        fetch(`${misterCoockyApi.misterCoockyApi}/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    query{​​​​​​​
                        userPro(id:"${localStorage.getItem('userId')}"){​​​​​​​
                            id
                            user{
                                name
                                role{
                                    name
                                }
                            }
                        }​​​​​​​
                    }`,
            }),
        })
            .then((res) => res.json())
            .then(function (result) {
                setUserAdmin(result.data.userPro.user.role.name === "ROLE_ADMIN")
            });
        refreshList()
    }, []);

    /**
     * refresh de liste de fichiers
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
                        getDbFiles{​​​​​​​
                            id
                            fileName
                            sectionName
                            userPro{
                                organization{
                                    name
                                }
                            }
                            dateAjout
                          }​​​​​​​
                    }`,
            }),
        })
            .then((res) => res.json())
            .then(function (result) {
                arrangeParameters(result.data.getDbFiles);
            })
    }

    /**
     * On sélectionne les données des fichiers pour qu'ils soient interprétables par le tableau
     * @param arr
     */
    function arrangeParameters(arr) {
        var items = [];
        arr.forEach(i => {
            items.push({
                'id': i.id,
                'name': i.fileName,
                'sectionName': i.sectionName,
                'orga': i.userPro.organization.name,
                'date': i.id,
                'dateAjout': i.dateAjout,
            })
        });
        setData(items)
    }

    /**
     * téléchargmnt du fichier choisi
     * @param res
     */
    function downloadFile(res) {
        fetch(`${misterCoockyApi.misterCoockyApi}/downloadFile/${res}`, {
            method: 'GET',
        })
            .then(res => res.blob())
            .then(blob => {
                var file = window.URL.createObjectURL(blob);
                window.location.assign(file);
            }).catch(function (error) {
            console.log('Erreur pendant le téléchargement : ' + error.message);
        });
    }

    /**
     * Suppression du fichier
     * @param id
     */
    function deleteFile(id) {
        fetch(`${misterCoockyApi.misterCoockyApi}/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    mutation DeleteDbFileById($id: String!) {
                      deleteDbFileById(id: $id){
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
                setSelectedFileIdToDelete(null)
            });
    }

    if (userAdmin === true) {
        return (
            <div>
                <Header/>
                <Container>

                    <Modal
                        isOpen={selectedFileIdToDelete !== null}
                        onRequestClose={() => setSelectedFileIdToDelete(null)}
                        style={customStyles}
                    >
                        <Grid>Etes vous sûr de vouloir supprimer le document?</Grid>
                        <Button onClick={() => deleteFile(selectedFileIdToDelete)}>Oui</Button>
                        <Button onClick={() => setSelectedFileIdToDelete(null)}>Non</Button>
                    </Modal>

                    <Title name={"Panneau de contrôle de fichiers"}/>
                    <Box mt={5}>
                        <MuiThemeProvider theme={getMuiTheme()}>
                            <MUIDataTable
                                title={"Fichiers"}
                                data={data}
                                columns={columns}
                                options={options}
                                spacing={10}></MUIDataTable>
                        </MuiThemeProvider>
                    </Box>
                </Container>
            </div>
        )
    } else {
        return <Container>
            <h2>Access denied</h2>
            Vous n'avez pas accès à cette page, veuillez contacter le support Datagrowb pour plus de renseignemnts
        </Container>
    }
}
