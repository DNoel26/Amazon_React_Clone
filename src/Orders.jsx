import React, { useEffect, useState } from 'react';
import { db } from './firebase.js';
import "./Orders.css";
import { UseStateValue } from './StateProvider.jsx';
import Order from "./Order.jsx"

function Orders() {

    const [{basket, user}, dispatch] = UseStateValue();
    const [orders, set_orders] = useState([]);

    useEffect(() => {
        
        if(user) 
        {
            db.collection("users")
                .doc(user?.uid)
                .collection("orders")
                .orderBy("created","desc")
                .onSnapshot(snapshot => (

                    set_orders(snapshot.docs.map(doc => ({

                        id: doc.id,
                        data: doc.data()
                    })))
                ));
        }

        else
        {
            set_orders([]);
        }
        
    }, [user]);

    return (
        <div className="orders">
            <h1>Your Orders</h1>

            <div className="orders-order">
                {orders?.map(order => (<Order order={order} />))}
            </div>
        </div>
    )
}

export default Orders;
