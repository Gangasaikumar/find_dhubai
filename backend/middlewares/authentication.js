const util = require('../helpers/util');

const Is_Authenticate = async (api_req, api_res, next_route) => {
    let responce = {
        message: "bad request.!",
        data: ""
    }
    try {
        if (api_req.cookies && api_req.cookies.Api_key) {
            const keyCheck = await util.verifyTocken(api_req.cookies.Api_key);
            if (keyCheck)
                return next_route();
            else {
                responce.message = "user Login is expire.! please be Login"
                return api_res.status(400).send(responce);
            }
        } else {
            responce.message = "your logout.! please Login and tryAgain.!"
            return api_res.status(200).send(responce);
        }
    } catch (err) {
        console.log("error at authentication middleware::", err);
        responce.message = "error at authenticate.!"
        return api_res.status(500).send(responce);
    }
}

module.exports = {
    Is_Authenticate
}