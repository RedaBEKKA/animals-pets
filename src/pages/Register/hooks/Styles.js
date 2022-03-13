import { makeStyles } from "@material-ui/core";
import parrot from "../../../images/parrot.png";
import { colors } from "../../../themes/colors";

export const useStyles = makeStyles((theme) => ({
    MenuProps: {
      PaperProps: {
        style: {
          maxHeight: 300,
          maxWidth: 50,
        },
      },
      // Show dropdow at bottom of select
      getContentAnchorEl: null,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "left",
      },
    },
    root: {
      height: "100vh",
    },
    image: {
      backgroundImage: `url(${parrot})`,
      backgroundRepeat: "no-repeat",
      backgroundColor:
        theme.palette.type === "light"
          ? theme.palette.grey[50]
          : theme.palette.grey[900],
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    paper: {
      margin: theme.spacing(5, 4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    form: {
      width: "90%",
      marginTop: "0px",
    },
    btn: {
      padding: theme.spacing(1),
      color: "#000",
      width: "30%",
    },
    formText: {
      width: "45%",
    },
    formControl: {
      width: 200,
      margin: theme.spacing(3),
    },
    chips: {
      display: "flex",
      flexWrap: "wrap",
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
    errorBox:{
        backgroundColor: "#ffff",
        position:'absolute',
        top:20,
        left:"30%",
        width:'20vw',
        height:'15vh',
        borderRadius:6,
        zIndex:10,
        border:`1px solid ${colors.red}`,
        color:colors.red,
        display:'flex',
        flexDirection:'column',
        justifyContent: 'center',
        padding:10
    }
  }));