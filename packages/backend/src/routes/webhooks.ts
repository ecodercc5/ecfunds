import express from "express";
import Stripe from "stripe";
import { stripe } from "../modules/stripe";
import { ProjectService } from "../services/project";
import { StripeWebhookService } from "../services/stripeWebhook";

const router = express.Router();

const STRIPE_WEBHOOK_SECRET = "whsec_UdfJzPrKJYXRJq8bu5HQPR63wEwH5M0G";

// convert req.body into its raw form
router.use(
  express.raw({
    type: "application/json",
    verify: (req: express.Request, res, buf) => {
      req.rawBody = buf;
    },
  })
);

router.post("/stripe-test", async (req, res, next) => {
  console.log("stripe-test");

  const projectId = "ZP33MCk3BFBMQsDaTrkw";
  const backerUid = "C7w32quWMyhVA7KC47JRcWSPnAvU";
  const stripeAmount = 10000;
  const amount = stripeAmount / 100;

  console.log({ projectId, amount });

  try {
    await ProjectService.updateFundedProject({ projectId, amount, backerUid });
    return res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

router.post("/stripe", async (req, res) => {
  const signature = req.header("stripe-signature")!;

  let event: Stripe.Event;

  console.log("stripe webhook");

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
