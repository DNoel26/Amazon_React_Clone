import React from "react";
import './App.css';
import Header from "./Header.jsx";
import Home from "./Home.jsx";
import Checkout from "./Checkout.jsx"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {
  return (
    //BEM
    <Router>
      <div className="app">
        <Header />

        <Switch> 
          <Route path="/checkout">
            <Checkout />
          </Route>

          <Route path="/"> {/* DEFAULT OR HOME PATH MUST BE PLACED AT BOTTOM I.E. LAST ROUTE */}
            <Home />
          </Route>
        </Switch>  
      </div>
    </Router>
  );
}

export default App;
