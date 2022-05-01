import { Box, CssBaseline, Grid } from "@material-ui/core";
import React from "react";
import { useStyles } from "./Hooks/styles";
import logo from "../../images/logo.svg";
import FormForgot from "./Components/FormForgot";
import { useLocation } from "react-router-dom";

function ResetPass() {
  const classes = useStyles();
  // const location = useLocation();
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={6} md={6} className={classes.image} />
      <Grid item xs={12} sm={6} md={6}>
        <div className={classes.paper}>
          <Box className={classes.BoxImage}>
            <img alt="Logo Mister Coocky" width={350} height={250} src={logo} />
          </Box>
          <FormForgot />
        </div>
      </Grid>
    </Grid>
  );
}

export default ResetPass;
