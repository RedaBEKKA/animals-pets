import React from 'react';
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import LinkUI from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import {colors} from "../themes/colors";
import CardMedia from '@material-ui/core/CardMedia';
import misterCoocky from "../images/misterCoocky.png";
import facebook from "../images/facebook.png";
import instagram from "../images/instagram.png";
import tiktok from "../images/tiktok.png";
import Card from "@material-ui/core/Card";
import ButtonBase from "@material-ui/core/ButtonBase";
import { useHistory, Link } from "react-router-dom";

let drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: colors.brown,
  },
  appBarShift: {
    width: `calc(100% - ${0}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: 0,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor : colors.grey,
  },
  textBlack:{
    color: '#000',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',

  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,

  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  nested: {
    paddingLeft: theme.spacing(4),
    color: '#000',
  },
  cardAction: {
    display: 'block',
    textAlign: 'initial'
  },
  img :{
    width : "25%",
    float : 'left',
    padding : "10px",
    height: "auto",
    backgroundColor: 'transparent',
    border: 'none',
    boxShadow: 'none'
  },
  imageContent:{
    bottom : "0px",
    position: "absolute",
  }
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openSubOne, setOpenSubOne] = React.useState(false);
  const [openSubTwo, setOpenSubTwo] = React.useState(false);

  let history = useHistory();


  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleClickOne = () => {
    setOpenSubOne(!openSubOne);
  };
  const handleClickTwo = () => {
    setOpenSubTwo(!openSubTwo);
  };
  if(open){
    drawerWidth=240
  } else {
    drawerWidth=0
  }
  return (
    <div className={classes.root}>

      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        className={clsx(classes.menuButton, open && classes.hide)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >


        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>

        <CardMedia component="img" image={misterCoocky}  title="Logo" alt="Logo"/>
        <Divider />
         <List>
          
          <ListItem button >
              <ListItemText className={classes.textBlack} primary="Accueil" onClick={()=>{history.push('/home')}} />
          </ListItem>
          <ListItem button onClick={handleClickOne}>
            <ListItemText className={classes.textBlack} primary="SMR" />
            {openSubOne ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openSubOne} timeout="auto" unmountOnExit >
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <Link to="/products" style={{ textDecoration: 'none' }}>
                    <ListItemText className={classes.textBlack} primary="Liste des produis"  />
                </Link>
              </ListItem>
              <ListItem button className={classes.nested}>
                <LinkUI href="/addproduct" style={{ textDecoration: 'none' }}>
                    <ListItemText className={classes.textBlack} primary="Ajouter des produis" />
                </LinkUI>
              </ListItem>
              <ListItem button className={classes.nested}>
                <LinkUI href="/statistics" style={{ textDecoration: 'none' }}>
                    <ListItemText className={classes.textBlack} primary="Statistiques" />
                </LinkUI>
              </ListItem>
            </List>
          </Collapse>
          <ListItem button onClick={handleClickTwo}>
            <ListItemText className={classes.textBlack} primary="Mr. Adopt" />
            {openSubTwo ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={openSubTwo} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <LinkUI href="/annonces" style={{ textDecoration: 'none' }}>
                  <ListItemText className={classes.textBlack} primary="Liste des annonces" />
                </LinkUI>
              </ListItem>
              <ListItem button className={classes.nested}>
                <LinkUI href="/addannonce" style={{ textDecoration: 'none' }}>
                  <ListItemText className={classes.textBlack} primary="Ajouter des annonces" />
                </LinkUI>
              </ListItem>
              <ListItem button className={classes.nested}>
                <LinkUI href="/statisticsMrAdopt" style={{ textDecoration: 'none' }}>
                  <ListItemText className={classes.textBlack} primary="Statistiques des annonces" />
                </LinkUI>
              </ListItem>
            </List>
          </Collapse>

          <ListItem button>
            <LinkUI href="https://mister-coocky.fr/contact.html" target="_blank" style={{ textDecoration: 'none' }}>
              <ListItemText className={classes.textBlack} primary="Contact" />
            </LinkUI>
          </ListItem>
        </List>
        <div className={classes.imageContent}>

          <Card className={classes.img}>
            <ButtonBase
                className={classes.cardAction}
                onClick={event => window.open(
                    'https://www.facebook.com/profile.php?id=100057654481188',
                    '_blank'
                )}
            >
            <CardMedia component="img" image={facebook} title="Facebook" alt="Facebook"/>
            </ButtonBase>
          </Card>

          <Card className={classes.img}>
            <ButtonBase
                className={classes.cardAction}
                onClick={event =>
                    window.open(
                        'https://www.instagram.com/mister_coocky/',
                        '_blank'
                    )}
            >
            <CardMedia component="img" image={instagram} title="Instagram" alt="Instagram" />
            </ButtonBase>
          </Card>

          <Card className={classes.img}>
            <ButtonBase
                className={classes.cardAction}
                onClick={event =>  window.open(
                    'https://www.tiktok.com/@mistercoocky?lang=fr',
                    '_blank'
                )}
            >
            <CardMedia component="img" image={tiktok} title="tiktok" alt="tiktok" />
            </ButtonBase>
          </Card>
          <div>

          </div>
        </div>


      </Drawer>
    </div>
  );
}
