import express from "express";
import { v4 as uuidv4 } from "uuid";
import stripe from "stripe";
const Router = express.Router();
const StripeObject = stripe(process.env.STRIPE_KEY);
Router.post("/", async (req, res) => {
  console.log("Request:", req.body);

  let error;
  let status;
  try {
    const { amount, token } = req.body;

    const customer = await StripeObject.customers.create({
      email: token.email,
      source: token.id,
    });

    const idempotencyKey = uuidv4();
    const charge = await StripeObject.charges.create(
      {
        amount: amount,
        currency: "inr",
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased the shirts`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip,
          },
        },
      },
      {
        idempotencyKey,
      }
    );

    status = "success";
    res.status(201).send({ error, status });
    
  } catch (error) {
    status = "failure";
    res.status(201).send({ error, status });
  }
});
export default Router;
