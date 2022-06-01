const express = require("express");
const router = express.Router();
const db = require('../../../models/my_sql/index');
const {member} = db;
const http_status = require('../../../utils/status_http');
const jwt_token = require('../../../utils/jwt_token')

/**
 * {
    "username":"dev1",
    "password":"GRskGk7r878="
}
 */


router.post("/getToken",async (req, res) => {
    var data = req.body
    if(!data.username  || !data.password  )
        return res.status(400).json(http_status.info_400_null)    
    if(typeof(data.username)!="string"||typeof(data.password)!="string")
        return res.status(400).json(http_status.info_400_type)  

    var condition = {
        username : data.username,
        password : data.password,
    }
    var info =  await member.findOne({
        attributes:['id','expired_min','role','secret'],
        where:  condition
    });
    if(info.length<1)
      return await res.json(http_status.info_403);
  

    var payload =
    {
        "ID": info.id,
        // "role": "some@email",
        "exp" :  new Date(new Date().setMinutes(info.expired_min)).getTime()
    
    }
    var token = jwt_token.genToken(payload,info.secret)

    // console.log(secret)
    // console.log(token)
    // console.log(jwt_token.isValid(token,info.secret));
    http_status.info_200_found.info = token;

    return await res.json(http_status.info_200_found);

});

module.exports = router;