const dbConfig = require("../../config/db_config.js");
// const dbConfig = require("../../config/");

const { Sequelize } = require('sequelize');

//อันนี้เป็นส่วนที่ใช้ในการบอก Sequelize ว่าเราจะ connect ไปที่ไหน
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    // operatorsAliases: false,
    operatorsAliases: 0,

    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  });

  const db = {};

  db.Sequelize = Sequelize;
  db.sequelize = sequelize;

//ส่วนนี้เป็นการ import model ของ table ใน database เข้ามาเพื่อตั้งต่า relation นะครับ
  db.admins = require("./table/admins")( sequelize , Sequelize );
  db.admins = require("./table/admins")( sequelize , Sequelize );
  db.hospitals = require("./table/hospitals")( sequelize , Sequelize );
  db.medboxs = require("./table/medboxs")( sequelize , Sequelize );
  db.opening_logs = require("./table/opening_logs")( sequelize , Sequelize );
  db.orders = require("./table/orders")( sequelize , Sequelize );
  db.otp = require("./table/otp")( sequelize , Sequelize );
  db.users = require("./table/users")( sequelize , Sequelize );
  db.role = require("./table/role")( sequelize , Sequelize );
  db.member = require("./table/member")( sequelize , Sequelize );
//   db.team = require("./model/team")( sequelize , Sequelize );

//line นี้จะทำให้เราสามารถใช้  team ในการหา player ได้อย่างเดียวและไม่สามารถใช้ player หา team ได้
  // db.orders.belongsTo(db.users, { foreignKey: 'tid' });
  // db.users.belongsTo(db.orders, {
  //   foreignKey: "phone_num", 
  //   targetKey: "user_phone_num", 
  // });  
  db.orders.belongsTo(db.users, {
    foreignKey: "user_phone_num",
    targetKey: "phone_num", 
  });  

  module.exports = db;


  /* Generate sequalize model => ./node_modules/.bin/sequelize-auto -h 127.0.0.1 -d local_mysql -u root -x admin123 -p 3306  --dialect mysql -o models\my_sql\table  */