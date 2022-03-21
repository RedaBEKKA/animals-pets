import { makeStyles } from "@material-ui/core";
import connexion from "../../../images/Connexion.png";
import { colors } from "../../../themes/colors";

export const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${connexion})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "80%",
  },
  form: {
    marginTop: "50px",
  },
  btn: {
    padding: theme.spacing(1),
    color: "#000",
    backgroundColor: "#DEC8A6",
    width: "25%",
  },
  formText: {
    width: "35%",
  },
  centerElements: {
    display: "flex",
    "flex-direction": "column",
    "justify-content": "flex-end",
    "align-items": "flex-end",
    position: "relative",
    right: "8%",
  },
  BoxImage: {
    alignItems: "center",
    justifyContent: "centers",
    marginTop: 15,
  },
}));
