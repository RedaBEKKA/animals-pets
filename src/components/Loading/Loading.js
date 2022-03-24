

import { Box, CircularProgress } from '@material-ui/core'
import { colors } from '../../themes/colors';
import useStyles from  './stylesLoading'


const color = colors.black;

function Loading() {
    const classes = useStyles()
    return (
        <Box className={classes.boxLoading}>
        <CircularProgress  color={color} />
      </Box>
    )
}

export default Loading
    