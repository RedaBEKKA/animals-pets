import { makeStyles } from "@material-ui/core";
import { colors } from "../../../../../themes/colors";

export const useStyles = makeStyles((theme) => ({
    inputBox:{
        width:'80%',
        backgroundColor:colors.whiteTr,
        padding:'15px 3px'
    },
    Field:{
        marginBottom:15
    },
    Container:{
        backgroundColor:'#fff',
        width:"80%",
        display:'flex',
        justifyContent:'space-between',
        padding:10
    },
    item:{
        backgroundColor:'#fff',
        margin:'10px 0',
        padding:4
    },
    textLabel:{
        fontWeight:'400',
        paddingLeft:10
    }
  }));