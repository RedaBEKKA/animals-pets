import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import connexion from '../images/Connexion.png';
import logo from '../images/logo.svg'
import { colors } from "../themes/colors";
import Box from "@material-ui/core/Box";
import { Alert } from "@material-ui/lab";
import Link from "@material-ui/core/Link";
import misterCoockyApi from '../constante/apiUrl'

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: `url(${connexion})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        marginTop: "50px"
    },
    btn: {
        padding: theme.spacing(1),
        color: "#000",
        backgroundColor: "#DEC8A6",
        width: '25%',
    },
    formText: {
        width: '35%'
    },
    centerElements: {
        'display': 'flex',
        'flex-direction': 'column',
        'justify-content': 'flex-end',
        'align-items': 'flex-end',
        'position': 'relative',
        'right': '8%'
    }
}));

/**
 * Page de Connexion
 * @returns {*}
 * @constructor
 */
function Connection() {
    const [textNext, setTextNext] = useState("Se connecter");
    const [email, setEmail] = useState("");
    const [motDePasse, setMotDePasse] = useState("");
    const [signError, setSignError] = useState("");
    const classes = useStyles();

    /**
     * Envoi du formulaire de connexion
     * @param e
     */
    function handleSubmit(e) {
        e.preventDefault();
        fetch(`${misterCoockyApi.misterCoockyApi}/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    query{​​​​​​​
                        logAsUser(email:"${email}", password: "${motDePasse}"){​​​​​​​
                            id
                            organization{
                                id
                                supplier{
                                    id  
                                }
                            }
                            user{
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
                if (result.data.logAsUser == null) {
                    setSignError("Email ou mot de passe incorrects");
                } else {
                    localStorage.setItem('userId', result.data.logAsUser.id);
                    localStorage.setItem('organizationId', result.data.logAsUser.organization.id);
                    localStorage.setItem('supplierId', result.data.logAsUser.organization.supplier.id);
                    if (result.data.logAsUser.user.role?.name === "ROLE_USER") {
                        window.location.href = '/home';
                    } else {
                        window.location.href = '/homeAdmin';
                    }
                }
            });
    }

    /**
     * Récupération du contenu de page
     * @returns {*}
     */
    function getFormContent() {
        return <>
            <TextField required variant="outlined" type="email" margin="normal" fullWidth id="email" label="Email"
                name="remail" onChange={e => setEmail(e.target.value)} value={email} />
            <TextField required type="password" variant="outlined" margin="normal" fullWidth id="phone"
                label="Mot de passe"
                name="phone" onChange={e => setMotDePasse(e.target.value)} value={motDePasse} />
            <Box m={0.5}>
                <Link href={"/forgot"}>Mot de passe oublié</Link>
            </Box>

            {signError ? <Alert severity="error">{signError}</Alert> : <></>}

            <Box mt={10}>
                <Grid container spacing={10} className={classes.centerElements}>
                    <Button type="submit" variant="contained" style={{ backgroundColor: colors.brown }}
                        className={classes.btn}>
                        {textNext}
                    </Button>
                    <Box style={{marginTop:'2'}}>
                        <Link href={"/register"}>Pas de compte? S'inscrire</Link>
                    </Box>
                </Grid>
            </Box>
        </>
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={6} md={6} className={classes.image} />
            <Grid item xs={12} sm={6} md={6}>
                <div className={classes.paper}>
                    <Grid>
                        <img alt="Logo Mister Coocky" width={200} height={250} src={logo} />
                    </Grid>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        {getFormContent()}

                    </form>
                </div>
            </Grid>
        </Grid>
    );
}

export default Connection
