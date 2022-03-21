import { makeStyles } from "@material-ui/core";
import { colors } from "../../../../themes/colors";

export const useStyles = makeStyles((theme) => ({
  Container: {
    // backgroundColor: colors.grey,
    width: "30vw",
    padding: "15px 20px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  ContainerButtons: {
    justifyContent: "flex-end",
    display: "flex",
    width: "100%",
    alignItems: "center",
  },
  btn: {
    width: "12vw",
    color: colors.white,
    fontWeight: "700",
    borderRadius: "8px",
  },
  ErrorMes:{
    color:colors.red,
    width:'100%',
    paddingLeft:5
  }
}));
