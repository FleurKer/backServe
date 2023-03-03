var express = require("express");
var router = express.Router();

const Supplier = require("../models/suppliers");
const User = require("../models/users");
const Feedback = require("../models/feedbacks");

const PUBLISHABLE_KEY = process.env.PUBLISHABLE_KEY;
const SECRET_KEY = process.env.SECRET_KEY;

const stripe = require('stripe')(`${SECRET_KEY}`);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

//GET User infos vers MyProfile
router.get("/user/:token", (req, res) => {
  User.findOne({ token: req.params.token })
    .populate("feedbacks")
    .then((data) => {
      console.log(data);
      res.json(data);
    });
});

//PUT POUR MAJ User
router.put("/user/:token", (req, res) => {
  User.updateMany(
    { token: req.params.token },
    {
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      phone: req.body.phone,
      languagesSpoken: req.body.languagesSpoken,
    }
  ).then(() => {
    User.find({ token: req.params.token }).then((data) => {
      res.json({ data });
      console.log("data", data);
    });
    // res.json({ data });
  });
});

//GET Supplier infos vers SupplierProfile
router.get("/supplier/:id", (req, res) => {
  Supplier.findById(req.params.id)
    .populate("feedbacks")
    .then((data) => {
      res.json(data);
    });
});

router.post('/create-payment-intent', async (req, res) => {
  const {paymentMethodType, currency,paymentMethodOptions, amount} = req.body;
  console.log("req. body", req.body)

  // Each payment method type has support for different currencies. In order to
  // support many payment method types and several currencies, this server
  // endpoint accepts both the payment method type and the currency as
  // parameters.
  //
  // Some example payment method types include `card`, `ideal`, and `alipay`.
  const params = {
  // automatic_payment_methods,
    amount: amount,
    currency: currency,
  }

  console.log("params", params)
  console.log("paymentMethodType", paymentMethodType)
  // If this is for an ACSS payment, we add payment_method_options to create
  // the Mandate.
  // if(paymentMethodType === 'acss_debit') {
  //   params.payment_method_options = {
  //     acss_debit: {
  //       mandate_options: {
  //         payment_schedule: 'sporadic',
  //         transaction_type: 'personal',
  //       },
  //     },
  //   }
  // } else if (paymentMethodType === 'konbini') {
    /**
     * Default value of the payment_method_options
     */
  //   params.payment_method_options = {
  //     konbini: {
  //       product_description: 'Tシャツ',
  //       expires_after_days: 3,
  //     },
  //   }
  // } else if (paymentMethodType === 'customer_balance') {
  //   params.payment_method_data = {
  //     type: 'customer_balance',
  //   }
  //   params.confirm = true
  //   params.customer = req.body.customerId || await stripe.customers.create().then(data => data.id)
  // }

  /**
   * If API given this data, we can overwride it
   */
  // if (paymentMethodOptions) {
  //   params.payment_method_options = paymentMethodOptions
  // }

  // Create a PaymentIntent with the amount, currency, and a payment method type.
  //
  // See the documentation [0] for the full list of supported parameters.
  //
  // [0] https://stripe.com/docs/api/payment_intents/create

      
  // try {
    const paymentIntent = await stripe.paymentIntents.create(params);
    console.log("paymentIntent", paymentIntent)
        // Send publishable key and PaymentIntent details to client
        res.send({
          clientSecret: paymentIntent.client_secret,
          nextAction: paymentIntent.next_action,
        });
  // } catch (e) {
  //   return res.status(400).send({
  //     error: {
  //       message: e.message,
  //     },
  //   });
  // }
});

module.exports = router;

// POUR TEST POST Feedback
// router.post("/feedback", (req, res) => {
//   const newFeedback = new Feedback({
//     prenom: req.body.prenom,
//     date: req.body.date,
//     note: req.body.note,
//     comment: req.body.comment,
//   });
//   newFeedback.save().then((newDoc) => {
//     res.json({ creationFeedback: newDoc });
//   });
// });

// router.get("/user", (req, res) => {
//   User.find().then((data) => {
//     res.json({ usersList: data });
//   });
// });

// router.put

// //POST POUR TEST Creation Supplier
// router.post("/supplier", (req, res) => {
//   const newSupplier = new Supplier({
//     nom: req.body.nom,
//     prenom: req.body.prenom,
//     photoUrl: req.body.photoUrl,
//     languagesSpoken: req.body.languagesSpoken,
//     serviceDetail: req.body.serviceDetail,
//     presentation: req.body.presentation,
//     feedback: req.body.feedback
//   });
//   newSupplier.save().then((newDoc) => {
//     res.json({ creationSupplier: newDoc });
//   });
// });

//GET Supplier infos vers SupplierProfile
router.get("/supplier/:id", (req, res) => {
  Supplier.findById(req.params.id).then((supplierData) => {
    res.json({ supplierData });
  });
});

// const newUser = new User({
//   username: req.body.username,
//   password: req.body.password,
// });
// newUser.save().then((user) => {
//   res.json({ creationUser: user });
// });
