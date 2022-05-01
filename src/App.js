import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import {
  AddAnnonce,
  Addproduct,
  FilesControlPanel,
  Home,
  HomeAdmin,
  MyAnnoncesPage,
  MyProductPage,
  OrganizationInfo,
  SignIn,
  Statistics,
  StatisticsMrAdopt,
  UserProfile,Register,ForgotPass
} from './pages';

import React from "react";
import SecuredRoute from "./components/SecuredRoute";
import ResetPass from './pages/ResetPassword';
import Protected from './components/Protected';

function App() {
  return (
    <Router>
      <Switch>
        <SecuredRoute path="/home"><Home/></SecuredRoute>
        <SecuredRoute path="/homeAdmin"><HomeAdmin/></SecuredRoute>
        <SecuredRoute path="/filesControlPanel"><FilesControlPanel/></SecuredRoute>
        <Route path="/organizationInfos" render={(props) => <OrganizationInfo {...props.location.state}/>} />
        <SecuredRoute path="/statistics"><Statistics/></SecuredRoute>
        <SecuredRoute path="/products"><MyProductPage/></SecuredRoute>
        <SecuredRoute path="/annonces"><MyAnnoncesPage/></SecuredRoute>
        <Route path="/addproduct" render={(props) => <Addproduct {...props.location.state}/>} />
        <Route path="/addAnnonce" render={(props) => <AddAnnonce {...props.location.state}/>} />
        <SecuredRoute path="/userProfile"><UserProfile/></SecuredRoute>
        <SecuredRoute path="/statisticsMrAdopt"> <StatisticsMrAdopt/></SecuredRoute>
        <Route path="/register"><Register/></Route>
        <Route path="/signIn"><SignIn/></Route>
        <Route path="/forgot"><ForgotPass/></Route>
        <Protected path="/reset-password"><ResetPass/></Protected>
        <Route path="/"><SignIn/></Route>


      </Switch>
    </Router>
  );
}

export default App;
