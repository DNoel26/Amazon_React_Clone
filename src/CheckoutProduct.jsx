import React from 'react';
import './CheckoutProduct.css';

function CheckoutProduct({id, image, title, price, rating}) {
    return (
        <div className="checkout-product">
            <img className="checkout-product-image" src={image} alt=""/>

            <div className="checkout-product-info">
                <p className="checkout-product-title">{title}</p>

                <p className="checkout-product-price">
                    <small>$</small>
                    <strong>{price.toFixed(2)}</strong>
                </p>

                <div className="checkout-product-rating">
                    {Array(rating).fill().map((_, i) => {
                        
                        return <p>⭐</p>
                    })}
                </div>
            </div>
        </div>
    )
}

export default CheckoutProduct
