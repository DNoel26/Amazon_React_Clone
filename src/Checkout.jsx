import React from 'react';
import "./Checkout.css";
import CheckoutProduct from './CheckoutProduct.jsx';
import { UseStateValue } from './StateProvider.jsx';
import Subtotal from './Subtotal.jsx';

function Checkout() {

    const [{basket, user}, dispatch] = UseStateValue();

    return (
        <div className="checkout">
            <div className="checkout-left">
                <img src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" alt="" className="checkout-ad"/>
            
                <div>
                    <h3>Hello, {user?.email}</h3>
                    <h2 className="checkout-title">Your Shopping Basket</h2>

                    {basket.map(item => (

                        <CheckoutProduct 
                            id = {item.id}
                            title = {item.title}
                            image = {item.image}
                            price = {item.price}
                            rating = {item.rating}
                        />
                    ))}

                    {/* <CheckoutProduct 
                        id = '112342' //{item.id}
                        title = 'This is a test, bla bla bla bla bla bla bla bla bla bla bla bla bla' //{item.title}
                        image = 'https://m.media-amazon.com/images/I/51WIKlio9qL.jpg' //{item.image}
                        price = {199.99} //{item.price}
                        rating = {5} //{item.rating}
                    /> */}
                </div>
            </div>

            <div className="checkout-right">
                <Subtotal />
                {/*<h2>The subtotal will go here</h2>*/}
            </div>
        </div>
    )
}

export default Checkout;
