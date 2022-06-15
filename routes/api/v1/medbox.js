const express = require("express");
const router = express.Router();

const db = require('../../../models/my_sql/index');
const {otp} = db;
const http_status = require('../../../utils/status_http');

/**
PUT /api/v1/medbox/send_otp
/*-> ใช้ order_code แทน box_sn

curl --location --request POST 'https://www.giantiot.com:8084/api/v1/medbox/send_otp' \
--header 'x-api-key: AIzaSyCNQ1CCnRL7tNa0NwFyKEj8Mh9H9KTvQxE' \
--header 'Content-Type: application/json' \
--data-raw '{
    "phone_number":"0877967516",
    "order_code":"EP202204051"
}'
 */

router.put("/send_otp",async (req, res) => {
  var data = req.body

  // await orders.in({open_by,open_with}, { where: {box_sn: box_sn}});
  if(!data.phone_number  || !data.order_code  )
    return res.status(400).json(http_status.info_400_null)    
  if(typeof(data.phone_number)!="string"||typeof(data.order_code)!="string")
    return res.status(400).json(http_status.info_400_type)

  // await orders.update({confirm_by,order_code}, { where: {box_sn: box_sn}});
  await otp.update(
    {
      sent_to: data.phone_number,
    },
    {
      where: { order_code: data.order_code },
    }
  );
  // await res.send('test')
  // http_status.info_200_insert.info = "success, data is updated successfully"
  await res.json(http_status.info_200_insert)
});

module.exports = router;