import React, {useEffect} from "react";
import './App.css';
import Header from "./Header.jsx";
import Home from "./Home.jsx";
import Checkout from "./Checkout.jsx"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from "./Login.jsx";
import { auth } from "./firebase.js";
import { UseStateValue } from './StateProvider.jsx';

function App() {

  const [{}, dispatch] = UseStateValue();

  useEffect(() => {

    //will only run once when the app component loads...
    auth.onAuthStateChanged(auth_user => {

      console.log('THE USER IS >>> ', auth_user);

      if(auth_user)
      {
        // the user just logged in / the user was logged in
        dispatch({

          type: 'SET_USER',
          user: auth_user,
        })
      }

      else
      {
        // the user is logged out
        dispatch({

          type: 'SET_USER',
          user: null,
        })
      }
    })
  }, []);

  return (
    //BEM
    <Router>
      <div className="app">
        <Switch> 
          <Route path="/login">
            <Login />
          </Route>

          <Route path="/checkout">
            <Header />

            <Checkout />
          </Route>

          <Route path="/"> {/* DEFAULT OR HOME PATH MUST BE PLACED AT BOTTOM I.E. LAST ROUTE */}
            <Header />

            <Home />
          </Route>
        </Switch>  
      </div>
    </Router>
  );
}

export default App;
