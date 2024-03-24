const models = require("../databses/models");
const util = require("../helpers/util");
const stripe_key = require("../common/config.json").stripe_Secret_key;
const stripe = require("stripe")(stripe_key);

const doPayment = async (api_req, api_res) => {
  const responce = {
    message: "bad request.!",
    data: "",
  };
  try {
    const user = await util.verifyTocken(api_req.cookies.Api_key);
    console.log('user id::',user.id);
    const orderDetails={
      user_id:user.id,
      addr_id:api_req.body.addr_id
    };
    const product_ids=[];
    const { orderItems } = api_req.body;
    let totalPrice=0;
    orderItems.map(eachOrder=>{
      totalPrice+= eachOrder.price*eachOrder.quantity;
      product_ids.push(eachOrder._id);
    });
    orderDetails['bill']=totalPrice;
    orderDetails["products"]=product_ids;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalPrice*100,
      currency: "inr"
    });
    orderDetails["pay_id"]=paymentIntent.id;
    orderDetails["orderDate"]=await util.EpochTimeStamp();
    // save payment data into db
    const savedOrder=await models.orders(orderDetails).save();
    responce.message =`Payment reached.!`;
    responce.data={"orderId":savedOrder._id};
    api_res.status(200).send(responce);
  } catch (err) {
    responce.message = "something went worng at server.!";
    console.log("err:",err);
    api_res.status(502).send(responce);
  }
};

module.exports = {
  doPayment,
};
