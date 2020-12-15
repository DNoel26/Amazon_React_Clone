import React from 'react';
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { UseStateValue } from './StateProvider.jsx';
import { get_basket_total } from './reducer.js';

function Subtotal() {

    const [{basket}, dispatch] = UseStateValue();

    return (
        <div className="subtotal">
            <CurrencyFormat 
                renderText={(value) => (
                    <>
                        <p>
                            {/* Part of HW */}
                            Subtotal ({basket?.length} items):
                            <strong> {value}</strong>
                        </p>
                        <small className="subtotal-gift">
                            <input type="checkbox" /> This order contains a gift
                        </small>
                    </>
                )}

                decimalScale={2}
                value={get_basket_total(basket)} //Part of HW
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />

            <button>Proceed to Checkout</button>
        </div>
    )
}

export default Subtotal;
