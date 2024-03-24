const models = require("../databses/models");
const util = require("../helpers/util");


const doPayment= async (api_req, api_res) => {
    const responce = {
      message: "bad request.!",
      data: "",
    };
    try {
      responce.message = "Payment reached.!"+" data::"+JSON.stringify(api_req.body);
      api_res.status(200).send(responce);
    } catch (err) {
      responce.message = "something went worng at server.!";
      api_res.status(502).send(responce);
    }
  };

  module.exports={
    doPayment
  }