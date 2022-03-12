import React, {useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import {Header, Title} from "../components";
import Container from "@material-ui/core/Container";
import misterCoockyApi from "../constante/apiUrl";

/**
 * Composant d'affichage des données d'une organisation
 * @param props
 * @returns {*}
 * @constructor
 */
function OrganizationInfo(props) {
    const [userPro, setUserPro] = useState(null);
    const [userAdmin, setUserAdmin] = useState(false);
    const [offerOrga, setOfferOrga] = useState([]);
    const [typesOrga, setTypesOrga] = useState([]);

    /**
     * Récupération de l'utilisateur pro et de l'organisation
     */
    useEffect(() => {
        if (props.organizationName) {

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

             //Récupération de l'organisation
            fetch(`${misterCoockyApi.misterCoockyApi}/graphql`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                        query{​​​​​​​
                            getUserProByOrganizationName(name:"${props.organizationName}"){​​​​​​​
                                id,
                                user{
                                    id
                                    name
                                    email
                                    phoneNumber
                                }
                                organization{
                                    id
                                    name
                                    postalAddress{
                                        street
                                    }
                                    supplier{
                                        id
                                        name
                                    }
                                }
                            }​​​​​​​
                        }`,
                }),
            })
                .then((res) => res.json())
                .then(function (result) {
                    setUserPro(result.data.getUserProByOrganizationName);
                });
            //Récupération des types d'orga de l'organisation
            fetch(`${misterCoockyApi.misterCoockyApi}/typeOrga/${props.organizationName}`, {})
                .then((res) => res.json())
                .then(function (result) {
                    setTypesOrga(result.join(', '))
                });
            //Récupération des offres de l'orga
            fetch(`${misterCoockyApi.misterCoockyApi}/offerOrga/${props.organizationName}`, {})
                .then((res) => res.json())
                .then(function (result) {
                    setOfferOrga(result.join(', '))
                })
        }
    }, []);

    if (userAdmin === true) {
        return (
            <div>
                <Header/>
                {userPro ?
                    <Container>
                        <Title name={"Profile de: " + props.organizationName}/>
                        <h3>Utilisateur Pro</h3>
                        <Grid container>
                            <Grid item xs={6} sm={3}>
                                Identifiant
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                {userPro.id}
                            </Grid>
                        </Grid>

                        <h3>Organisation</h3>
                        <Grid container>
                            <Grid item xs={6} sm={3}>
                                Identifiant
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                {userPro.organization.id}
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={6} sm={3}>
                                Nom
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                {userPro.organization.name}
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={6} sm={3}>
                                Types d'organisation
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                {typesOrga}
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={6} sm={3}>
                                Offres
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                {offerOrga}
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item xs={6} sm={3}>
                                Adresse Postale
                            </Grid>
                            <Grid item xs={6} sm={6}>
                                {userPro.organization.postalAddress.street}
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={6} sm={3}>
                                Nom fournisseur
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                {userPro.organization.supplier.name}
                            </Grid>
                        </Grid>

                        <h3>Utilisateur</h3>
                        <Grid container>
                            <Grid item xs={6} sm={3}>
                                Identifiant
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                {userPro.user.id}
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={6} sm={3}>
                                Nom
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                {userPro.user.name}
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={6} sm={3}>
                                Téléphone
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                {userPro.user.phoneNumber}
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={6} sm={3}>
                                Email
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                {userPro.user.email}
                            </Grid>
                        </Grid>
                    </Container> : null
                }
            </div>
        )
    } else {
        return <Container>
            <h2>Access denied</h2>
            Vous n'avez pas accès à cette page, veuillez contacter le support Datagrowb pour plus de renseignements
        </Container>
    }
}

export default OrganizationInfo
