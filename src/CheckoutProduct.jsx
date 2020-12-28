import React from 'react';
import './CheckoutProduct.css';
import { UseStateValue } from './StateProvider.jsx';

function CheckoutProduct({id, image, title, price, rating}) {

    const [{basket}, dispatch] = UseStateValue();

    const remove_from_basket = () => {

        // Remove the item from the basket
        dispatch({

            type: 'REMOVE_FROM_BASKET',
            id: id,
        })
    };

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

                <button onClick={remove_from_basket}>Remove From Basket</button>
            </div>
        </div>
    )
}

export default CheckoutProduct
