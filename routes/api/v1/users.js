const express = require("express");
// const users = require("../../../Users");
const router = express.Router();

const db = require('../../../models/my_sql/index');
const http_status = require('../../../utils/status_http');

const {users} = db


/**
 * POST /api/v1/users/receiver/registrations
curl --location --request POST 'https://www.giantiot.com:8084/api/v1/users/receiver/registration' \
--header 'x-api-key: AIzaSyCNQ1CCnRL7tNa0NwFyKEj8Mh9H9KTvQxE' \
--header 'Content-Type: application/json' \
--data-raw '{
    "userName": "ทดสอบ",
    "userLastName": "สำรวจ",
    "userPhoneNumber": "0812345678"
}'
 */
// check body - > insert 

router.post("/receiver/registrations",async (req, res) => {
  //?? ชื่อ อยู่ใน รูปแบบ องิ หรือไทย
  // console.log(req.body)
  try{
    var data = req.body

    if(!data.userName  || !data.userLastName || !data.userPhoneNumber)
      return res.status(400).json(http_status.info_400_null)    
    if(typeof(data.userName)!="string"||typeof(data.userLastName)!="string"||typeof(data.userPhoneNumber)!="string")
      return res.status(400).json(http_status.info_400_type)    
  
    await users.upsert ({
      fname_th: data.userName,
      lname_th: data.userLastName,
      phone_num: data.userPhoneNumber,
      created_by: "one_id",
    });
  
    // var info = await users.findAll({})
    // http_status.info_200_insert.info = data //data.userName;
  
    // console.log(data)
    await res.json(http_status.info_200_insert)
  }catch(err)
  {
    console.log(req.url);console.log(err);
  }


});


module.exports = router;