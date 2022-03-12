import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import {colors} from '../themes/colors';
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import misterCoockyApi from "../constante/apiUrl";
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {PersistentDrawerLeft} from '.';

const drawerWidth = 240;


/**
 * Permet de gérer le menu déroulant
 * @param props
 * @returns {*}
 * @constructor
 */
function HideOnScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({ target: window ? window() : undefined });
    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}
HideOnScroll.propTypes = {
    window: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },

    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: colors.brown,
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
}));


/***
 * Header principal de l'application
 * @param props
 * @returns {*}
 * @constructor
 */
export default function Header(props) {

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const[userName, setUserName] = useState(null);
    const[admin, setAdmin] = useState(false);


    /**
     * Récupération du userpro
     */
    useEffect(() => {
        //si utilisateur non connecté
        if(localStorage.getItem('userId') === null && localStorage.getItem('organizationId') === null && localStorage.getItem('supplierId') === null){
            window.location.href = '/signIn';
        }else{
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
                            organization{
                                name
                            }
                        }​​​​​​​
                    }`,
                }),
            })
                .then((res) => res.json())
                .then((json) => {
                    if(json.data.userPro){
                        setAdmin(json.data.userPro.user.role?.name);
                        setUserName(json.data.userPro.organization.name)
                    }
                })
        }
    }, []);

    /**
     * lors du clic du menu déroulant
     * @param event
     */
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    /**
     * Lors du clic sur déconnexion
     */
    const handleDisconnect= () => {
        localStorage.setItem('userId', null);
        localStorage.setItem('organizationId', null);
        localStorage.setItem('supplierId', null);
        window.location.href = '/signIn';
    };
    const handleProfile = () => {
        window.location.href = '/userProfile';
    };

    /**
     * lors de la fermeture du menu déroulant
     */
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <React.Fragment>
            <div className={classes.root}>
                <AppBar position="static" style={{backgroundColor: colors.brown}}>
                    <Toolbar>
                        <PersistentDrawerLeft/>
                        <Typography variant="h6" className={classes.title}  onClick={() => {admin === "ROLE_ADMIN"? window.location.href = '/homeAdmin' : window.location.href = '/home'}} style={{cursor:'pointer'}}>
                            Mister Coocky
                        </Typography>
                        {userName !== null ?
                            <div>
                            <Button style={{color: colors.white, fontSize:'16px'}} endIcon={<Icon><ArrowDropDownIcon/></Icon>} onClick={handleClick}>
                                <span style={{marginTop:'4px'}}>{userName}{admin === "ROLE_ADMIN"? " [Admin]":null}</span>
                            </Button>

                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleProfile}>Profil</MenuItem>
                                <MenuItem onClick={handleDisconnect}>Se déconnecter</MenuItem>
                            </Menu>
                            </div>
                                : null
                        }
                    </Toolbar>
                </AppBar>
            </div>
        </React.Fragment>

    );
}
