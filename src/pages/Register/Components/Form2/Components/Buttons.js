import React from "react";
import { Box, Button, Grid } from "@material-ui/core";
import { useStyles } from "../../../hooks/Styles";
import { colors } from "../../../../../themes/colors";

function Buttons({ onReturn, formik ,Adresses}) {
  const classes = useStyles();
  const { isSubmitting, isValid } = formik;
  // console.log(formik.values.TypeLenseigne.length);
  // console.log(formik.values.offre.length);
  console.log("btn",Adresses);
  const Loading = () => {
    return <Box>Envoi...</Box>;
  };
  return (
    <Box className={classes.BoxButtons}>
      <Button
        variant="contained"
        style={{
          backgroundColor: colors.white,
          color: "#000",
          border: `1px solid ${colors.brown}`,
        }}
        className={classes.btn}
        onClick={onReturn}
      >
        Précédent
      </Button>
      <Button
        type="submit"
        variant="contained"
        style={{ backgroundColor: colors.brown, color: colors.white }}
        className={classes.btn}
        disabled={ formik.values.offre.length  !== 0 && Adresses.length !==0 && formik.values.TypeLenseigne.legnth !== 0 ?   false : true}
      >
        {isSubmitting ? <Loading /> : "Terminer"}
      </Button>
    </Box>
  );
}

export default Buttons;
