import React from "react";
import { Box, Button, Grid } from "@material-ui/core";
import { useStyles } from "../../../hooks/Styles";
import { colors } from "../../../../../themes/colors";
import { useSelector } from "react-redux";

function Buttons({ onReturn, formik }) {
  const classes = useStyles();
  const { isSubmitting, isValid } = formik;
  // console.log(formik.values.TypeLenseigne.length);
  // console.log(formik.values.offre.length);
  const Address = useSelector((state) => state.Address);

  const { Cordinates, Adresses } = Address;
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
        disabled={
          formik?.values?.TypeLenseigne?.length !== 0 &&
          formik?.values?.offre?.length &&
          Adresses.length !== 0
            ? false
            : true
        }
      >
        {isSubmitting ? <Loading /> : "Terminer"}
      </Button>
    </Box>
  );
}

export default Buttons;
