import React, { useEffect, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct.jsx';
import "./Payment.css";
import { UseStateValue } from './StateProvider.jsx';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { get_basket_total } from './reducer.js';
import CurrencyFormat from 'react-currency-format';
import instance from './axiosConfig.js';
import { db } from './firebase.js';
//import axios from 'axios';

//axios.defaults.baseURL = 'http://localhost:5001/clone-905a7/us-central1/api/';

function Payment() {

    const [{basket, user}, dispatch] = UseStateValue();
    const history = useHistory();

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, set_succeeded] = useState(false);
    const [processing, set_processing] = useState("");

    const [error, set_error] = useState(null);
    const [disabled, set_disabled] = useState(true);

    const [client_secret, set_client_secret] = useState(true);

    useEffect(() => {
        
        // generate the special stripe secret which allows us to charge a customer
        const get_client_secret = async () => {

            const response = await instance({

                method: 'POST',
                // Stripe expects the total in a currencies sub-units
                url: `/payments/create?total=${get_basket_total(basket) * 100}`,
            }) 
            //.catch(err=>console.trace("ERROR, ",err))
            console.log(response);

            set_client_secret(response.data.client_secret)
        }

        get_client_secret();
    }, [basket]);

    console.log("The secret is >>>", client_secret);

    const handle_submit = async (e) => {

        // do all the fancy stripe stuff
        e.preventDefault();
        set_processing(true);

        const payload = await stripe.confirmCardPayment(client_secret, {

            payment_method: {

                card: elements.getElement(CardElement)
            }
        })
        .then(({paymentIntent}) => {

            // paymentIntent = payment confirmation for Stripe
            db.collection('users')
            .doc(user?.id)
            .collection('orders')
            .doc(paymentIntent.id)
            .set({

                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            })

            set_succeeded(true);
            set_error(null);
            set_processing(false);

            dispatch({
                
                type: "EMPTY_BASKET"
            })

            history.replace('/orders')
        })
    };

    const handle_change = e => {

        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        set_disabled(e.empty);
        set_error(e.error ? e.error.message : "");
    };

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
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>


                {/* Payment Section - payment method */}
                <div className="payment-section">
                    <div className="payment-title">
                        <h3>Payment Method</h3>
                    </div>

                    <div className="payment-details">
                        <form onSubmit={handle_submit} action="">
                            <CardElement onChange={handle_change}/>

                            <div className="payment-price-container">
                                <CurrencyFormat 
                                    renderText={(value) => (
                                        <h3>Order Total: {value}</h3>
                                    )}

                                    decimalScale={2}
                                    value={get_basket_total(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />

                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>   
                            </div>

                            {/* Error */}
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment;
