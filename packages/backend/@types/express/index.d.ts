import express from "express";
import Stripe from "stripe";

declare global {
  namespace Express {
    interface Request {
      rawBody?: Buffer;
      stripeEvent?: Stripe.Event;
    }
  }
}
