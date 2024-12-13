const express = require('express');
let cors = require('cors');

const app = express();
app.use(cors());
const port = 3010;

app.get('/', (req, res) => {
  res.send('Homepage');
});

let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let totalCartPrice = newItemPrice + cartTotal;
  res.send(totalCartPrice.toString());
});

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;
  let finalPrice;
  if (isMember == 'true') {
    finalPrice = cartTotal - (cartTotal * discountPercentage) / 100;
    res.send(finalPrice.toString());
  } else {
    res.send(finalPrice);
  }
});

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let totalTax = (cartTotal * taxRate) / 100;
  res.send(totalTax.toString());
});

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  // shippingMethod.toLowerCase();
  let distance = parseFloat(req.query.distance);
  let numberOfDay;
  if (shippingMethod === 'standard') {
    numberOfDay = distance / 50;
    res.send(numberOfDay.toString());
  } else if (shippingMethod === 'express') {
    numberOfDay = distance / 100;
    res.send(numberOfDay.toString());
  } else {
    res.send('Wrong Delivery Method Please Enter the Correct One');
  }
});

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let shippingCost = weight * distance * 0.1;
  res.send(shippingCost.toString());
});

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyalityPoint = purchaseAmount * 2;
  res.send(loyalityPoint.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// app.get('/estimate-delivery',(req,res)=>{
//   let = (req.query)
//   let = (req.query)

// })
