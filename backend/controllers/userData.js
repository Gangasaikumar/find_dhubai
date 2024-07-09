const models = require("../databses/models");
const util = require("../helpers/util");


const getOrders= async (api_req, api_res) => {
    const responce = {
      message: "bad request.!",
      data: "",
    };
    try {
      const user= await util.verifyTocken(api_req.cookies.Api_key);
      if("id" in user && user.id != undefined){
      responce.message = "orders reached.!"+" user id is::"+user.id;
        api_res.status(200).send(responce);
      }else{
        responce.message = "user data is missing.! please login again.!";
        api_res.status(400).send(responce);
      }
    } catch (err) {
      responce.message = "something went worng at server.!";
      api_res.status(502).send(responce);
    }
  };

  // fetch all addreses -> related to user
  const getAddresses=async (api_req, api_res) => {
    const responce = {
      message: "bad request.!",
      data: "",
    };
    try {
      const user= await util.verifyTocken(api_req.cookies.Api_key);
      if("id" in user && user.id != undefined){
        await models.user_address.find({user_id:user.id}).then(async res => {
          if (res && res.length > 0) {
            responce.message= "addresses found.!";
            responce.data= { addressData: res };
        } else
            responce.message = "addresses not found.!";
        });
        api_res.status(200).send(responce);
      }
      else{
      responce.message = "user data is missing.! please login again.!";
      api_res.status(400).send(responce);
      }
    } catch (err) {
      console.log("error::",err);
      responce.message = "something went worng at server.!";
      api_res.status(502).send(responce);
    }
  };

  module.exports={
    getOrders,
    getAddresses
  }