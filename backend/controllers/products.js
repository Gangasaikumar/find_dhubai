const models = require("../databses/models");

// get all products data
const allProducts = async (api_req, api_res) => {
  const responce = {
    message: "bad request.!",
    data: "",
  };
  try {
    let allProducts = await models.products.find(
      {},
      { brand: 1, model: 1, imageurl: 1, price: 1 }
    );
    if (allProducts && allProducts.length > 0) {
      responce.data = allProducts;
      responce.message = "got allProducts.";
    } else responce.message = "products not found.!";
    api_res.status(200).send(responce);
  } catch (err) {
    console.log();
    responce.message = "something went worng at server.!";
    api_res.status(502).send(responce);
  }
};

// get each single product data
const product = async (api_req, api_res) => {
  const responce = {
    message: "bad request.!",
    data: "",
  };
  try {
    if (api_req.body && "id" in api_req.body && api_req.body.id != undefined) {
      let productData = await models.products.findOne({ _id: api_req.body.id });
      responce.data = productData;
      responce.message = "got Product details.";
    } else responce.message = "products not found.!";
    api_res.status(200).send(responce);
  } catch (err) {
    console.log("err", err);
    responce.message = "something went worng at server.!";
    api_res.status(502).send(responce);
  }
};

module.exports = {
  allProducts,
  product,
};
