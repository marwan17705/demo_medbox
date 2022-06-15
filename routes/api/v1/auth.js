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
    try {
        var data = req.body
        if(!data.username  || !data.password  )
            return res.status(400).json(http_status.info_400_null)    
        if(typeof(data.username)!="string"||typeof(data.password)!="string")
            return res.status(400).json(http_status.info_400_type)  
        console.log("0")
        var condition = {
            username : data.username,
            password : data.password,
        }
        console.log("1")
        var info = null;
        info =  await member.findOne({
            attributes:['id','expired_min','role','secret'],
            where:  condition
        });
        console.log("2")

        // console.log(info)
        if(info==null)
          return await res.json(http_status.info_403);
        console.log("3")

        var payload =
        {
            "ID": info.id,
            // "role": "some@email",
            "exp" :  new Date(new Date().setMinutes(info.expired_min)).getTime()
        
            
        }
        console.log("4")

        var token = jwt_token.genToken(payload,info.secret)
    
        // console.log(secret)
        // console.log(token)
        // console.log(jwt_token.isValid(token,info.secret));
        http_status.info_200_found.token = token;
    
        return await res.json(http_status.info_200_found);

    } catch (err) {
        console.log("Fail auth")
        console.log(req.url);console.log(err);
        return;
    }

})

module.exports = router;