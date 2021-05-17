import express from "express";
import Stripe from "stripe";
import { stripe } from "../modules/stripe";
import { ProjectService } from "../services/project";
import { StripeWebhookService } from "../services/stripeWebhook";

const router = express.Router();

const STRIPE_CONNECT_WEBHOOK_SECRET = "whsec_UdfJzPrKJYXRJq8bu5HQPR63wEwH5M0G";
const STRIPE_WEBHOOK_SECRET = "whsec_4jkvGkFhPhGsDLWH0R5JnQLNpMXmHmyP";

// convert req.body into its raw form
router.use(
  express.raw({
    type: "application/json",
    verify: (req: express.Request, res, buf) => {
      req.rawBody = buf;
    },
  })
);

const verifyStripeWebhook = (secret: string): express.Handler => {
  return (req, res, next) => {
    const signature = req.header("stripe-signature")!;

    let event: Stripe.Event;

    console.log("stripe webhook !!!");

    try {
      event = stripe.webhooks.constructEvent(req.rawBody!, signature, secret);

      req.stripeEvent = event;

      next();
    } catch {
      return res.sendStatus(400);
    }
  };
};

router.post(
  "/stripe",
  verifyStripeWebhook(STRIPE_WEBHOOK_SECRET),
  async (req, res, next) => {
    const event = req.stripeEvent!;

    switch (event.type) {
      case "payment_intent.succeeded": {
        await StripeWebhookService.handlePaymentIntentSucceeded(event);
      }
    }

    return res.sendStatus(200);
  }
);

router.post(
  "/stripe/connect",
  verifyStripeWebhook(STRIPE_CONNECT_WEBHOOK_SECRET),
  async (req, res) => {
    const event = req.stripeEvent!;

    switch (event.type) {
      case "account.updated": {
        await StripeWebhookService.handleAccountUpdated(event);
        break;
      }
    }

    return res.sendStatus(200);
  }
);

export { router };
