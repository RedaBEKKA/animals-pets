import React from 'react'
import Box from "@material-ui/core/Box";

/**
 * Composant Titre de la page
 * @param prop
 * @returns {*}
 * @constructor
 */
function Title(prop) {
    const {name} = prop;
    return (
        <Box mb={3} mt={3}>
            <h2>{name}</h2>
        </Box>
    )
}

export default Title
