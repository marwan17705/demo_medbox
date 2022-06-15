const express = require("express");
const router = express.Router();
const db = require('../../../models/my_sql/index');
const {orders , users ,admins} = db;
const http_status = require('../../../utils/status_http');

/**
 * API ค้นหารายการที่รอบรรจุ (OneChat. Bot ยิงมาถาม)
GET /api/v1/systems/orders?name=ฉัตรเพชร&phone_num=0877967516
curl --location --request GET 'https://www.giantiot.com:8084/api/v1/systems/orders?name=ฉัตรเพชร&phone_num=0877967516' \
--header 'x-api-key: AIzaSyCNQ1CCnRL7tNa0NwFyKEj8Mh9H9KTvQxE'

 * 
 */

router.get("/orders",async (req, res) => {
  // console.log(req.query)
  try{
    var data = req.query;

    if(!data.name  || !data.phone_num )
      return res.status(400).json(http_status.info_400_null)    
    if(typeof(data.name)!="string"||typeof(data.phone_num)!="string")
      return res.status(400).json(http_status.info_400_type)

    var info =  await orders.findAll({
      attributes: ['user_phone_num','order_code','box_sn','hid'],//,'hid','created_at'],
      include: [{
        model: users,
        required: false,
        attributes: ['fname_th','lname_th'] ,
        where: {
            fname_th: data.name,
          
        }
        // as: 'users_inc'
      },],
      where: {
          user_phone_num: data.phone_num,
      }


      });
    if(info.length>0)
    {
      http_status.info_200_found.info = info;
      await res.json(http_status.info_200_found);
    }
    else
      await res.json(http_status.info_200_not_found);
  }
  catch(err)
  {
    console.log(req.url);console.log(err);
  }


});



router.get("/medboxs/:box_sn", async(req, res) => {
  try{
    var box_sn = req.params.box_sn
    if(!box_sn )
      return res.status(400).json(http_status.info_400_null)    
    if(typeof(box_sn)!="string")
      return res.status(400).json(http_status.info_400_type)
    var info =  await orders.findAll({
      // attributes: ['user_phone_num','order_code','box_sn','hid'],//,'hid','created_at'],
        where: {
          box_sn: box_sn,
        }

      });
    if(info.length>0)
    {
      http_status.info_200_found.info = info;
      await res.json(http_status.info_200_found);
    }
    else
      await res.json(http_status.info_200_not_found);
  }
  catch(err)
  {
    console.log(req.url);console.log(err);
  }
});

/**
 * 
 * curl --location --request POST 'https://www.giantiot.com:8084/api/v1/systems/orders' \
--header 'x-api-key: AIzaSyCNQ1CCnRL7tNa0NwFyKEj8Mh9H9KTvQxE' \
--header 'Content-Type: application/json' \
--data-raw '{
 "orderCode":"EP202204053",
 "userName":"ฉัตรเพชร",
 "userLastName":"เคนานัน",
 "userPhoneNumber":"0877967516"
}'
 */
router.post("/orders", async(req, res) => {
  try{
    // await res.send('test');
    var data = req.body;
  //check usernama จากตาราง user ด้วย "userPhoneNumber":"0877967516"

    if(!data.userName  || !data.userLastName || !data.userPhoneNumber || !data.orderCode)
      return res.status(400).json(http_status.info_400_null)    
    if(typeof(data.userName)!="string"||typeof(data.userLastName)!="string"||typeof(data.userPhoneNumber)!="string"||typeof(data.orderCode)!="string")
      return res.status(400).json(http_status.info_400_type)    

    var query = await users.findAll({
                  where: {
                    phone_num: data.userPhoneNumber,
                  }
                });
    console.log(query.length)
    if(query.length)
    {
  //ถ้า มี   inser t order ไปยัง order 
  //system -> phone ,order
      // hid user_phone_num created_by status confirm_by order_code
      var res_http = http_status.info_200_update
    }
    else
    {
  // ถ้าไม่มี insert username ไปยัง user table 
      await users.upsert ({
        fname_th: data.userName,
        lname_th: data.userLastName,
        phone_num: data.userPhoneNumber,
        created_by: "one_id",
      });
      var res_http = http_status.info_200_insert

    }
      // ดึง hid จากโรงบาล

      //insert or updat order 
    await orders.upsert ({
      hid: 1,
      order_code: data.orderCode,
      user_phone_num: data.userPhoneNumber,
      created_by: "one_id",
      status: "wait",
      confirm_by: "one_id",
    });
    await res.json(res_http)
  }
  catch(err)
  {
    console.log(req.url);console.log(err);
  }
});

/**
 * 11. ดึงข้อมูล Admin (Future, after link admin register feature)
 * curl --location --request POST 'https://www.giantiot.com:8084/api/v1/systems/admins' \
--header 'x-api-key: AIzaSyCNQ1CCnRL7tNa0NwFyKEj8Mh9H9KTvQxE' \
--header 'Content-Type: application/json' \
--data-raw '{
    "one_id":"6271993808"
}'
 */
// SELECT `id`, `one_id`, `user_id`, `row`, `hid`, `created_at` AS `createdAt`, `updated_at` AS `updatedAt`
router.post("/admins", async(req, res) => {
  try{
    var one_id = req.body.one_id;
    if(!one_id)
      return res.status(400).json(http_status.info_400_null)    
    if(typeof(one_id)!="string")
      return res.status(400).json(http_status.info_400_type)  
    var info =  await admins.findAll({
      attributes: ['id','user_id','one_id','row','hid','created_at'],
      where: {
        one_id: one_id,
      }
      });

    if(info.length>0)
    {
      http_status.info_200_found.info = info;
      return await res.json(http_status.info_200_found);
    }
    else
      return await res.json(http_status.info_200_not_found);
  }
  catch(err)
  {
    console.log(req.url);console.log(err);
  }
});
 
/**
 * GET /api/v2/systems/orders?q_str=<order_code, box_sn, receiver_phone_number, user_name>&hid=<hid>

curl --location --request GET 'https://www.giantiot.com:8084/api/v2/systems/orders?q_str=EP202204051' \
--header 'x-api-key: AIzaSyCNQ1CCnRL7tNa0NwFyKEj8Mh9H9KTvQxE'

*hid ดูข้อ 11

10. Order Eject
curl --location --request DELETE 'https://www.giantiot.com:8084/api/v1/systems/orders' \
--header 'x-api-key: AIzaSyCNQ1CCnRL7tNa0NwFyKEj8Mh9H9KTvQxE' \
--header 'Content-Type: application/json' \
--data-raw '{"order_code":"EP22050500004"}'

 */

router.delete("/orders", async(req, res) => {
  try{
    var data = req.body

    // await orders.in({open_by,open_with}, { where: {box_sn: box_sn}});
    if( !data.order_code  )
      return res.status(400).json(http_status.info_400_null)    
    if(typeof(data.order_code)!="string")
      return res.status(400).json(http_status.info_400_type)

    var info = await orders.destroy({
      where: {
        order_code:data.order_code
      }
    });
    // console.log(info)
    if(info)
    {
      http_status.info_200_delete.info ="order "+ data.order_code + " is rejected";
      await res.json(http_status.info_200_delete)  

    }
    else
    {
      http_status.info_200_not_found.info ="order "+ data.order_code + " isn't found";
      await res.json(http_status.info_200_not_found)  
    }
  }
  catch(err)
  {
    console.log(req.url);console.log(err);
  }

});

module.exports = router;

