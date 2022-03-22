import { Box, Button } from '@material-ui/core';
import React from 'react'
import { Link } from 'react-router-dom';
import Alert from "@material-ui/lab/Alert";
import { colors } from '../../../../../themes/colors';
import { useStyles } from '../Styles';


function ButtonContainer({formik,ActivateAlert,onSubmit,NextPage}) {
  const classes = useStyles();




  return (
    <Box className={classes.containerButtons}>
    <Link to="/signIn" style={{ paddingLeft: 15 }}>
      {" "}
      Déja un compte ? Se connecter
    </Link>
    <Button
      onClick={() => {
        NextPage();
      }}
      variant="contained"
      style={{
        backgroundColor: colors.brown,
        color: colors.white,
        fontWeight: "700",
      }}
      className={classes.btn}
      disabled={formik?.isSubmitting ? true : false}
    >
      Suivant &gt;
    </Button>
  </Box>
  )
}

export default ButtonContainer