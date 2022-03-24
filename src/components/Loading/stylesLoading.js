/** @jsxImportSource theme-ui */

import { makeStyles } from "@material-ui/core/styles";
import { colors } from "../../themes/colors";
const useStyles = makeStyles((theme) => ({
    boxLoading:{
        // height:'200px',
        backgroundColor: '#fff',
        margin:"20px 10px",
        display:'flex',
        alignItems:'center',
        justifyContent: 'center',
        color:colors.brown,
        border:'none',
        // height:'105vh',
    }
}));
export default useStyles;
