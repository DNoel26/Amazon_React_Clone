import React from 'react';
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link } from 'react-router-dom';
import { UseStateValue } from './StateProvider.jsx';

function Header() {

    const [{basket}, dispatch] = UseStateValue();
    
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
                <div className="header-option">
                    <span className="header-option-line-1">
                        Hello Guest
                    </span>
                    <span className="header-option-line-2">
                        Sign In
                    </span> 
                </div>  

                <div className="header-option">
                    <span className="header-option-line-1">
                        Returns &
                    </span>
                    <span className="header-option-line-2">
                        Orders
                    </span> 
                </div>   

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
