import React from 'react';
import "./Product.css";

function Product({id, title, image, price, rating}) {
    return (
        <div className="product">   
            <div className="product-info">
                <p>{title}</p>

                <p className="product-price">
                    <small>$</small>
                    <strong>{price.toFixed(2)}</strong>
                </p>

                <div className="product-rating">
                    {Array(rating).fill().map((_, i) => {
                        
                        return <p>⭐</p>
                    })}
                </div>
            </div>

            <img src={image} alt=""/>

            <button>Add to Basket</button>
        </div>
    )
}

export default Product;
