import React from 'react'
import { useSelector } from 'react-redux';
import { Redirect } from "react-router-dom";

function ProtectedRoute({children}) {

  const Mail = useSelector((state) => state.Mail);

    if (Mail.isValideEmail){
        return(children)
    }
    else return <Redirect to={{
        pathname: "/forgot"
    }}/>
}

export default ProtectedRoute;
