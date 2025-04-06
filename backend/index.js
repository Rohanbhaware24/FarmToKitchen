const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const Stripe = require('stripe');
//import PayPalButton from './PayPalButton';

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 8080;

// MongoDB connection
console.log("MongoDB URL:", process.env.MONGODB_URL);

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// User Schema
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  confirmPassword: String,
  image: String,
});

const userModel = mongoose.model("user", userSchema);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.post("/signup", async (req, res) => {
  const { email } = req.body;

  try {
    const result = await userModel.findOne({ email });
    if (result) {
      res.send({ message: "Email id is already registered", alert: false });
    } else {
      const data = new userModel(req.body);
      await data.save();
      res.send({ message: "Successfully signed up", alert: true });
    }
  } catch (err) {
    res.status(500).send({ message: "Error occurred", alert: false });
  }
});

app.post("/login", async (req, res) => {
  const { email } = req.body;

  try {
    const result = await userModel.findOne({ email });
    if (result) {
      const dataSend = {
        _id: result._id,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        image: result.image,
      };
      res.send({ message: "Login successful", alert: true, data: dataSend });
    } else {
      res.send({ message: "Email is not available, please sign up", alert: false });
    }
  } catch (err) {
    res.status(500).send({ message: "Error occurred", alert: false });
  }
});

// Product Schema
const schemaProduct = mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  description: String,
});
const productModel = mongoose.model("product", schemaProduct);

app.post("/uploadProduct", async (req, res) => {
  try {
    const data = new productModel(req.body);
    await data.save();
    res.send({ message: "Product uploaded successfully" });
  } catch (err) {
    res.status(500).send({ message: "Error occurred while uploading product" });
  }
});

app.get("/product", async (req, res) => {
  try {
    const data = await productModel.find({});
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: "Error fetching products" });
  }
});

// paypal payment gateway
const stripe = new Stripe(process.env.PAYPAL_SECRET_KEY); // Use the correct key here

app.post("/create-checkout-session", async (req, res) => {
  try {
    const params = {
      submit_type: 'pay',
      mode: "payment",
      payment_method_types: ['card'],
      billing_address_collection: "auto",
      shipping_options: [{ shipping_rate: "shr_1N0qDnSAq8kJSdzMvlVkJdua" }],
      line_items: req.body.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: { name: item.name },
          unit_amount: item.price * 100,
        },
        adjustable_quantity: { enabled: true, minimum: 1 },
        quantity: item.qty,
      })),
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    };

    const session = await stripe.checkout.sessions.create(params);
    res.status(200).json(session.id);
  } catch (err) {
    res.status(err.statusCode || 500).json(err.message);
  }
});

app.listen(PORT, () => {
  console.log("Server is running at port : " + PORT);
});
