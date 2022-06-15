const express = require("express");
const router = express.Router();
const db = require('../../../models/my_sql/index');
const {orders,opening_logs,otp} = db;
const http_status = require('../../../utils/status_http');

//* 2 api */
/**
 * . API บันทึกเจ้าหน้าที่ผู้เปิดกล่อง (OneChat. Bot ยิงมาบันทึก)
PUT /api/v1/admins/medboxs/open/<box_sn>

curl --location --request POST 'https://www.giantiot.com:8084/api/v1/admins/medboxs/open/LYSfc58fa3bd6c9' \
--header 'x-api-key: AIzaSyCNQ1CCnRL7tNa0NwFyKEj8Mh9H9KTvQxE' \
--header 'Content-Type: application/json' \
--data-raw '{
    "open_by":"0877967516",
    "open_with":"onechat"
}'
 */
router.post("/medboxs/open/:box_sn",async (req, res) => {
  var box_sn = req.params.box_sn
  var data = req.body

  // await orders.in({open_by,open_with}, { where: {box_sn: box_sn}});
  if(!data.open_by  || !data.open_with || !box_sn )
    return res.status(400).json(http_status.info_400_null)    
  if(typeof(data.open_by)!="string"||typeof(data.open_with)!="string"||typeof(box_sn)!="string")
    return res.status(400).json(http_status.info_400_type)  
  await opening_logs.upsert ({
    box_sn: box_sn,
    open_with: data.open_with,
    open_by: data.open_by,
  });
  // http_status.info_200_insert.info = "success, log is added"

  await res.json(http_status.info_200_insert)
});

/**
 * 4. API ยืนยันกล่องพร้อมส่ง (Record and Send confirm hook event to One Express) (OneChat. Bot ยิงมาบันทึก)
PUT /api/v1/admins/medboxs/readytosend/<box_sn>
curl --location --request PUT 'https://www.giantiot.com:8084/api/v1/admins/medboxs/readytosend/LYSfc58fa3bd6c9' \
--header 'x-api-key: AIzaSyCNQ1CCnRL7tNa0NwFyKEj8Mh9H9KTvQxE' \
--header 'Content-Type: application/json' \
--data-raw '{
    "one_id":"6271993808",
    "order_code":"EP202204051"
}'
 */
router.put("/medboxs/readytosend/:box_sn",async (req, res) => {
  var box_sn = req.params.box_sn
  var data = req.body

  // await orders.in({open_by,open_with}, { where: {box_sn: box_sn}});
  if(!data.one_id  || !data.order_code || !box_sn )
    return res.status(400).json(http_status.info_400_null)    
  if(typeof(data.one_id)!="string"||typeof(data.order_code)!="string"||typeof(box_sn)!="string")
    return res.status(400).json(http_status.info_400_type)

  // await orders.update({confirm_by,order_code}, { where: {box_sn: box_sn}});

  var info = await orders.update(
    {
      confirm_by: data.one_id,
      box_sn: box_sn,
    },
    {
      where: { order_code: data.order_code },
      // returning: true,  //only supported in postgres with options.returning true [https://sequelize.org/api/v6/class/src/model.js~model#static-method-update]

    }
  );
  // console.log(info)

  if(info[0] != 0)
  {
    // http_status.info_200_insert.info = "success, data is updated successfully"
    await res.json(http_status.info_200_update)
  }
  else
  {
    // http_status.info_200_no_insert.info = "Fail, data cannot update"
    await res.json(http_status.info_200_no_update)
  }

  //Send confirm hook event to One Express
});

/**
 * curl --location --request POST 'https://www.giantiot.com:8084/api/v1/medbox/verify_otp' \
--header 'x-api-key: AIzaSyCNQ1CCnRL7tNa0NwFyKEj8Mh9H9KTvQxE' \
--header 'Content-Type: application/json' \
--data-raw '{
    "box_sn":"LYSfc58fa3bd6c9",
    "pin":"577020"
}'

 */

router.post("/medboxs/verify_otp",async (req, res) => {
  // var box_sn = req.params.box_sn
  var data = req.body

  // await orders.in({open_by,open_with}, { where: {box_sn: box_sn}});
  if(!data.box_sn  || !data.pin)
    return res.status(400).json(http_status.info_400_null)    
  if(typeof(data.box_sn)!="string"||typeof(data.pin)!="string")
    return res.status(400).json(http_status.info_400_type)
    var data = req.body

  //get ref 
  
  //get token 

  // get send to 
  // notNull Violation: otp.refno cannot be null,
  // notNull Violation: otp.sent_to cannot be null,
  // notNull Violation: otp.status cannot be null

  var info = await otp.create ({
    order_code: data.box_sn,
    pin: data.pin,
    refno:"NULL",
    sent_to:"user",
    status:"delivery",
    token:"token"
  });
  // await res.send('test')
  if(info!=null)
  {
    // http_status.info_200_insert.info = "success, data is inserted successfully"
    await res.json(http_status.info_200_insert)
  }
  else
    await res.json(http_status.info_200_not_insert);

});
 
module.exports = router;