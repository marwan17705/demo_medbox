module.exports = {
    // HOST: "203.151.164.229",
    // USER: "admin",
    // PASSWORD: "0x00ff0000",
    // DB: "testdb",
    HOST: "127.0.0.1",
    USER: "root",
    PASSWORD: "admin123",
    DB: "local_mysql",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
