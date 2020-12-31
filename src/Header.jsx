import React from 'react';
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link } from 'react-router-dom';
import { UseStateValue } from './StateProvider.jsx';
import {auth} from './firebase.js';

function Header() {

    const [{basket, user}, dispatch] = UseStateValue();

    const handle_authentication = () => {

        if(user)
        {
            auth.signOut();
        }
    }

    return (
        <div className="header">
            <Link to="/">
                <img className="header-logo" src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"/>
            </Link>

            <div className="header-search">
                <input className="header-search-input" type="text"/>
                <SearchIcon 
                    className="header-search-icon" 
                />
            </div>

            <div className="header-nav">
                <Link to={!user && "/login"}>
                    <div onClick={handle_authentication} className="header-option">
                        
                            <span className="header-option-line-1">
                                Hello {user ? user.email : 'Guest'}
                            </span>
                            <span className="header-option-line-2">
                                {user ? 'Sign Out' : 'Sign In'}
                            </span> 
                    </div>  
                </Link>   

                <Link to="/orders">
                    <div className="header-option">
                        <span className="header-option-line-1">
                            Returns &
                        </span>
                        <span className="header-option-line-2">
                            Orders
                        </span> 
                    </div>   
                </Link>

                <div className="header-option">
                    <span className="header-option-line-1">
                        Your
                    </span>
                    <span className="header-option-line-2">
                        Prime
                    </span> 
                </div>    
            </div>

            <Link to="/checkout">
                <div className="header-option-basket">
                    <ShoppingBasketIcon />
                    <span className="header-option-line-2 header-basket-count">{basket?.length}</span>
                </div>    
            </Link> 
        </div>
    )
}

export default Header;
