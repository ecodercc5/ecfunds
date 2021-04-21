import express from "express";

const router = express.Router();

const STRIPE_WEBHOOK_SECRET = "whsec_UdfJzPrKJYXRJq8bu5HQPR63wEwH5M0G";

router.post("/stripe", (req, res) => {
  const signature = req.header("stripe-signature");

  console.log({ signature });

  res.sendStatus(200);
});

export { router };
