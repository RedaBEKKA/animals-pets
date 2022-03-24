// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );


// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();



import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import DataProvider from "./Redux/store";
import Loading from "./components/Loading/Loading";
// import "simplebar/dist/simplebar.min.css";
import { Box } from "@material-ui/core";

ReactDOM.render(
  <Suspense
    fallback={
      <Box
        style={{
          display: "flex",
          width: "100%",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Loading />
        <Box style={{ fontFamily: "", fontWeight: 600 }}>Chargement ...</Box>
      </Box>
    }
  >
    <DataProvider>
      <App />
    </DataProvider>
  </Suspense>,
  document.getElementById("root")
);
