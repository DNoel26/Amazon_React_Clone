import React, { useEffect, useState } from 'react';
import "./Product.css";
import { UseStateValue } from './StateProvider.jsx';

function Product({id, title, image, price, rating}) {

    const [{basket, user}, dispatch] = UseStateValue();
    const [products, set_products] = useState([]);

    useEffect(() => {
        
        if(!user)
        {
            dispatch({

                type: 'EMPTY_BASKET',
            })
        }
    }, [user]);

    // console.log("this is the basket >>>", basket);

    const add_to_basket = () => {

        // Dispatch the item into the data layer
        dispatch({

            type: 'ADD_TO_BASKET',
            item: {

                id: id,
                title: title,
                image: image,
                price: price, 
                rating: rating,
            },
        });
    };

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

            <button onClick={add_to_basket}>Add to Basket</button>
        </div>
    )
};

export default Product;
