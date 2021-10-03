import React, {useEffect} from "react";
import './App.css';
import Header from "./Header.jsx";
import Home from "./Home.jsx";
import Checkout from "./Checkout.jsx"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from "./Login.jsx";
import Payment from "./Payment.jsx";
import { auth } from "./firebase.js";
import { UseStateValue } from './StateProvider.jsx';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Orders.jsx";

const promise = loadStripe("pk_test_51I3jCGDGzO9d02ojtoJ5EBPEMLU7N3UXIIvaiOfg77Lk1lAdt9POYoaHuzJXtGiLxqflNtRxwj6jBC3UnkehrE2s00virG7rFT");

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

          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
            {/*<h1>I am the payment route</h1>*/}
          </Route>

          <Route path="/payment/id">
            <Header />

            {<h1>I am the payment route</h1>}
          </Route>

          <Route path="/orders">
            <Header />
            <Orders />
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
