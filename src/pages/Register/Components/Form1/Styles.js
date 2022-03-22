import { makeStyles } from "@material-ui/core";
import { colors } from "../../../../themes/colors";

export const useStyles = makeStyles((theme) => ({
  btn: {
    padding: theme.spacing(1),
    color: "#000",
    width: "30%",
  },
  formText: {
    width: "48%",
  },
  formControl: {
    width: 200,
    margin: theme.spacing(3),
  },
  ContainerForm1: {
    backgroundColor: colors.white,
    width: "40vw",
    padding: "0px 30px",
    height: "60vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop:10
  },
  containerButtons:{
    width:'100%',
    display:'flex',
    justifyContent:"space-between",
    marginTop:"15px"
  }
}));
