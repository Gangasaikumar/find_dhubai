const models = require('../databses/models');
const util = require('../helpers/util');

// user registration control
const signUp = async (api_req, api_res) => {
    const responce = {
        message: "bad request.!",
        data: ""
    }
    try {
        if (api_req.body && "fn" in api_req.body && "ln" in api_req.body && "eml" in api_req.body && "mob" in api_req.body && "pwd" in api_req.body) {
            const isEmailValid = await util.emailValidation(api_req.body.eml);
            if (isEmailValid) {
                const encripted_pwd = await util.encriptPw(api_req.body.pwd);
                api_req.body.pwd=encripted_pwd;
                api_req.body["rd"]=await util.EpochTimeStamp();
                new models.user_register(api_req.body).save().then(async res => {
                    api_req.body.adds["user_id"]=res._id;
                    const address=api_req.body.adds;
                    if(address && "door" in address && "locality" in address && "state" in address && "pin" in address)
                        new models.user_address(address).save().then(async ress=>{});
                    // generate JWT Tocken
                    const jwt_tocken = await util.generateTocken(res._id);
                    const date = new Date();
                    date.setDate(date.getDate() + 1);
                    date.setHours(0, 0, 0, 0);
                    api_res.cookie('Api_key', jwt_tocken, { path: '/', maxAge: 60 * 55 * 8 });
                    responce.message = "user rigistered";
                    api_res.status(200).send(responce);
                }).catch(err => {
                    if (err.code == 11000)
                        responce.message = "user alredy rigstered.!";
                    else
                        responce.message = "user details not saved in db.!";
                        api_res.status(502).send(responce);
                })
            } else {
                responce.message = "user email is wrong.!";
                api_res.status(400).send(responce);
            }
        } else {
            responce.message = "user details wrong.!";
            api_res.status(400).send(responce);
        }
    } catch (err) {
        responce.message = "something went worng at server.!";
        api_res.status(502).send(responce);
    }
}

// user login control
const login = async (api_req, api_res) => {
    console.log("login hit:::",api_req);
    let responce = {
        message: "bad request.!",
        data: ""
    }
    try {
        if ("eml" in api_req.body && "pwd" in api_req.body) {
            // validate email --> pending
            const isEmailValid = await util.emailValidation(api_req.body.eml);
            if (isEmailValid) {
                await models.user_register.findOne({ eml: api_req.body.eml }).then(async res => {
                    if (res) {
                        responce.message = "user found";
                        const verify = await util.verifyPassword(api_req.body.pwd, res.pwd);
                        if (verify) {
                            // generate JWT Tocken
                            const jwt_tocken = await util.generateTocken(res._id);
                            api_res.cookie('Api_key', jwt_tocken, { path: "/", maxAge: (1000 * 60) * (8 * 60), httpOnly: false });
                        }
                        else
                            responce.message = "user password is wrong.!";
                    } else
                        responce.message = "user not found:, please rigister.!";

                    api_res.status(200).send(responce);
                }).catch(err => {
                    responce.message = "error db.!";
                    api_res.status(500).send(responce);
                });
            } else {
                responce.message = "user email is wrong.!";
                api_res.status(400).send(responce);
            }
        } else {
            responce.message = "user details wrong.!";
            api_res.status(400).send(responce);
        }
    } catch (err) {
        responce.message = "something went wrong at server.!";
        api_res.status(502).send(responce);
    }
}


module.exports = { login ,signUp };