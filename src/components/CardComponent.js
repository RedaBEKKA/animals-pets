import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom'
const useStyles = makeStyles({
  root: {

  },
  cardStyle:{
    height:'500px'
  }
});

/**
 * Carte composant du menu principal (pour Mr.Adopt ou SMR)
 * @param title
 * @param description
 * @param image
 * @param path
 * @returns {*}
 * @constructor
 */
export default function CardComponent({title, description, image, path}) {
  const classes = useStyles();
  function handleRedirect(){
    window.location.href = path;
  }

  return (
    <Card className={classes.cardStyle} >
      <CardActionArea to={path} component={RouterLink}>
        <CardMedia
          onClick={handleRedirect}
          component="img"
          height="305"
          image={image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={handleRedirect} size="small" color="primary">
          Aller
        </Button>
      </CardActions>
    </Card>
  );
}
