import React from "react";
import { Box, Button, Grid } from "@material-ui/core";
import { useStyles } from "../../../hooks/Styles";
import { colors } from "../../../../../themes/colors";

function Buttons({ onReturn, formik }) {
  const classes = useStyles();
  const { isSubmitting } = formik;

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
      >
        {isSubmitting ? <Loading /> : "Terminer"}
      </Button>
    </Box>
  );
}

export default Buttons;
