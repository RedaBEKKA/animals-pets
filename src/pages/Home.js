import {Box, Container} from '@material-ui/core'
import React, {useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import {CardComponent, Header} from '../components';
import mrAdoptLogo from "../images/mrAdoptLogo.jpg"
import smrLogo from "../images/smrLogo.jpg";
import misterCoockyApi from "../constante/apiUrl";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
    centerElements: {
        height: '90vh',
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center'
    }
}));

/**
 * Page principale d'un utilisateur pro standard (pas admin)
 * @returns {*}
 * @constructor
 */
function Home() {
    const classes = useStyles();

    return (
        <div>
            <Header/>
            <Container className={classes.centerElements}>
                <Box my={5}>
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={6}>
                            <CardComponent path={"/products"} image={smrLogo} title="SMR"
                                           description="Notre solution va vous aider à faire connaître vos offre de produits(Alimentation, Accessoire). Elle va vous permettre ainsi de mettre en avant leurs aspects Saint, Malin et/ou Responsable (SMR)."/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <CardComponent path={"/annonces"} image={mrAdoptLogo} title="Mr.Adopt"
                                           description="Notre solution vous aidera à trouver un refuge à vos animaux simplement et rapidement. Vendre, donner et/ou échanger vos animaux se fait en 5 minutes grâceà une image !"/>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </div>

    )
}

export default Home
