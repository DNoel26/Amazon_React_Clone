import React from 'react';
import { Link } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct.jsx';
import "./Payment.css";
import { UseStateValue } from './StateProvider.jsx';

function Payment() {

    const [{basket, user}, dispatch] = UseStateValue();

    return (
        <div className="payment">
            <div className="payment-container">
                <h1>
                    Checkout (
                        <Link to="/checkout">
                            {basket?.length} items
                        </Link>
                        )
                </h1>

                {/* Payment Section - delivery address */}
                <div className="payment-section">
                    <div className="payment-title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment-address">
                        <p>{user?.email}</p>
                        <p>123 React Lane</p>
                        <p>Los Angeles, CA</p>
                    </div>
                </div>

                {/* Payment Section - review items */}
                <div className="payment-section">
                    <div className="payment-title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment-items">
                        {basket.map(item => (

                            <CheckoutProduct 
                                id = {item.id}
                                title = {item.title}
                                image = {item.image}
                                price = {item.price}
                                rating = {item.rating}
                            />
                        ))}
                    </div>
                </div>


                {/* Payment Section - payment method */}
                <div className="payment-section">

                </div>
            </div>
        </div>
    )
}

export default Payment
