import express from "express";
import Stripe from "stripe";
import { stripe } from "../modules/stripe";
import { StripeWebhookService } from "../services/stripeWebhook";

const router = express.Router();

const STRIPE_WEBHOOK_SECRET = "whsec_UdfJzPrKJYXRJq8bu5HQPR63wEwH5M0G";

router.use(
  express.raw({
    type: "application/json",
    verify: (req: express.Request, res, buf) => {
      req.rawBody = buf;
    },
  })
);

router.post("/stripe", async (req, res) => {
  const signature = req.header("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody!,
      signature,
      STRIPE_WEBHOOK_SECRET
    );
  } catch {
    return res.sendStatus(400);
  }

  switch (event.type) {
    case "account.updated": {
      await StripeWebhookService.handleAccountUpdated(event);
      break;
    }
  }

  return res.sendStatus(200);
});

export { router };
