import { makeStyles } from "@material-ui/core";
import { colors } from "../../../../themes/colors";

export const useStyles = makeStyles((theme) => ({
  IndexPanier: {
    backgroundColor: colors.white,
    width:'80%',
    padding:20,
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    marginTop:5
  },
}));
