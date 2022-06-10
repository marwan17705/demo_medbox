const config = require("../config/Global_config");
const http_status = require('../utils/status_http');
// const http_status = require('./middleware/middle_check')
const db = require('../models/my_sql/index');
const {member} = db;
const jwt_token = require('../utils/jwt_token')

module.exports = async function validateToken (req,res,next){
    if(req.url == "/auth/getToken")
    {
        next();
        return ;
    }
    // console.log("Request: "+req.method + ":"+req.url)
    var auth = await req.headers['authorization'];
    if(!auth || typeof(auth)!="string")
        return await res.json(http_status.info_403);
    var token = await (auth.split(' '))[1]
    var payload = await jwt_token.get_payload(token)
    if(!payload)
        return await res.json(http_status.info_403);
    var info =  await member.findOne({
        attributes:['id','expired_min','role','secret'],
        where:  {id : payload.ID}
    });
    var isValid = jwt_token.isValid(token,info.secret)
    
    if(isValid.state)
        await next();
    else
    {
        http_status.info_403.info = isValid.info;
        await res.json(http_status.info_403)
    }
    return;
}