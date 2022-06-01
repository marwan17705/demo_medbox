const express = require("express");
const router = express.Router();
const db = require('../../../models/my_sql/index');
const http_status = require('../../../utils/status_http');

const {orders,users} = db
/**
 * 9. Orders detail 
GET /api/v2/systems/orders?q_str=<order_code, box_sn, receiver_phone_number, user_name>&hid=<hid>

curl --location --request GET 'https://www.giantiot.com:8084/api/v2/systems/orders?q_str=EP202204051' \
--header 'x-api-key: AIzaSyCNQ1CCnRL7tNa0NwFyKEj8Mh9H9KTvQxE'
*/

router.get("/orders",async (req, res) => {
  var q_str = req.query.q_str
  var hid = req.query.hid
  console.log(req.query)
  if(!hid)
    return res.status(400).json(http_status.info_400_null)    
  if(typeof(hid)!="string")
    return res.status(400).json(http_status.info_400_type)

  const name = q_str.split(' ');
  if(name.length > 1)
  {
    var condition = {
      [db.Sequelize.Op.and] :[
        {
          [db.Sequelize.Op.and]:[
            db.Sequelize.literal('`user`.`fname_th`= \'%'+ name[0] +'%\''),
            db.Sequelize.literal('`user`.`lname_th` like \'%'+ name[1] +'%\''),
        ]
      },
        {hid: hid},
      ] ,
     }
  }
  else
  {
    var condition = {
      [db.Sequelize.Op.and] :[
        {
          [db.Sequelize.Op.or]:[
            {hid: q_str},
            {box_sn: q_str},
            {user_phone_num: q_str},
            {order_code: q_str},
            db.Sequelize.literal('`user`.`fname_th`= \'%'+ q_str +'%\''),
        ]
      },
        {hid: hid},
      ] ,
     }
  }
  var info =  await orders.findAll({
    // attributes: ['user_phone_num','order_code','box_sn','hid'],//,'hid','created_at'],
    include: [{
      model: users,
      required: true,
      attributes: ['fname_th','lname_th'] ,
      // where: {fname_th: q_str  },
      // as: 'users_inc'
     },],
     where:  condition
  });
  if(info.length>0)
  {
    http_status.info_200_found.info = info;
    await res.json(http_status.info_200_found);
  }
  else
    await res.json(http_status.info_200_not_found);

});



module.exports = router;