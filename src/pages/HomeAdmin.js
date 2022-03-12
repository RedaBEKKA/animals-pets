import {Box, Container} from '@material-ui/core'
import React, {useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import {Header} from '../components';
import Button from "@material-ui/core/Button";
import {colors} from "../themes/colors";
import misterCoockyApi from "../constante/apiUrl";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    centerElements: {
        height: '100vh',
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center'
    }
}));

/**
 * Page principale pour un utilisateur pro admin
 * @returns {*}
 * @constructor
 */
function HomeAdmin() {
    const classes = useStyles();
    const [userAdmin, setUserAdmin] = useState(false);

    /**
     * On regarde s'il s'agit bien d'un admin
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
                setUserAdmin(result.data.userPro.user.role?.name === "ROLE_ADMIN")
            });
    }, []);
    if (userAdmin === true) {
        return (<div>
            <Header/>
            <Container className={classes.centerElements}>
                <Box my={5}>
                    <Grid container spacing={5}>
                        <Button onClick={() => window.location.href = '/filesControlPanel'} className={classes.btn}
                                variant="contained" style={{backgroundColor: colors.brown}}>Contrôle de fichiers</Button>
                    </Grid>
                </Box>
            </Container>
        </div>)
    } else {
        return <Container>
            <h2>Access denied</h2>
            Vous n'avez pas accès à cette page, veuillez contacter le support Datagrowb pour plus de renseignements
        </Container>
    }
}

export default HomeAdmin
