import React from 'react'
import { Redirect } from "react-router-dom";

function SecuredRoute({children}) {
    if (localStorage.getItem('userId') !== "null"){
        return(children)
    }
    else return <Redirect to={{
        pathname: "/signIn"
    }}/>
}

export default SecuredRoute;
