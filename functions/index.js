const functions = require("firebase-functions");
const express = require("express");
require("dotenv").config({path: "./keys.env"});
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// API

// - APP config
const app = express();
const test = 123456;

// - Middleware
app.use(cors({origin: true}));
app.use(express.json());

// - API routes 
// http://localhost:5001/clone-905a7/us-central1/api/

app.get('/', (req, res) => res.status(200).send("Hello World"));
app.get('/test', (req, res) => res.status(200).send(console.log(test)));
//app.post('/payments/create', (req, res) => res.send("POSTED!!!"));

app.post('/payments/create', async (req, res) => {

    const total = req.query.total;

    console.log("Payment request received - amazon clone!!!", total);

    const paymentIntent = await stripe.paymentIntents.create({

        amount: total, // subunits of the currency
        currency: "usd",
    });

    // OK - Created
    res.status(201).send({

        client_secret: paymentIntent.client_secret,
    });
});

// - Listen command
exports.api = functions.https.onRequest(app);
