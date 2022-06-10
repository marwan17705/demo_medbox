module.exports = {
    // HOST: "203.151.164.229",
    // USER: "admin",
    // PASSWORD: "0x00ff0000",
    // DB: "testdb",
    HOST: "127.0.0.1",
    USER: "user",
    PASSWORD: "123456",
    DB: "demo_medbox",
    port: "3306",
    // HOST: "gravity.giantiot.com",
    // USER: "admin",
    // PASSWORD: "QWer!@34",
    // DB: "demo_medbox",
    // port: "5003",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };

