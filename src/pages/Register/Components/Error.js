import { Box } from "@material-ui/core";
import React from "react";
import { useStyles } from "../hooks/Styles";

function Error() {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.errorBox}>
        <Box
          style={{
            textAlign: "center",
            fontWeight: "700",
            marginBottom: 15,
          }}
        >
          Attention
        </Box>
        <li> Les mots de passe ne correspondent pas.</li>
        <li>
          Vous devez avoir au moin un caractere alphanumérique (A-Z, 0-9).{" "}
        </li>
        <li>Votre mot de passe est trop court. </li>
      </Box>
    </>
  );
}

export default Error;
