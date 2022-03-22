import React from "react";
import { Box, FormControl, FormLabel } from "@material-ui/core";
import FormikControl from "../../../hooks/FormikControl";
import Question from "../../../../../images/Question.png";
import { useStyles } from "./styles";

function OfferCheckbox({ formik, TypeLenseigne, TypeOffre, typeInscrire }) {
  const classes = useStyles();

  return (
    <Box className={classes.Container}>
      <Box>
        <FormikControl
          control="checkbox"
          label="Type de l'enseigne*"
          name="TypeLenseigne"
          options={TypeLenseigne}
          error={
            formik.touched?.TypeLenseigne &&
            !formik?.values?.TypeLenseigne?.length
              ? true
              : false
          }
        />
      </Box>

      <Box>
        <FormikControl
          control="checkbox"
          label="Type de l'enseigne*"
          name="offre"
          options={TypeOffre}
          error={
            formik.touched?.offre && !formik?.values?.offre?.length
              ? true
              : false
          }
        />

        <FormControl style={{ width: "15vw", marginTop: 10 }}>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <FormLabel
              component="legend"
              style={{ fontWeight: "800", color: "#000" }}
            >
              Label SMR
            </FormLabel>
            <img src={Question} style={{ width: 35, height: 30 }} />
          </Box>

          <FormikControl
            control="checkbox"
            label=""
            name="inscrire"
            options={typeInscrire}
            error={
              formik.touched?.inscrire && !formik?.values?.inscrire?.length
                ? false
                : false
            }
          />
        </FormControl>
      </Box>
    </Box>
  );
}

export default OfferCheckbox;
