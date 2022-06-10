const express = require("express");
const app = express();

const config = require("./config/Global_config");

// const db = require('./models/my_sql/index');
const http_status = require('./utils/status_http');
const middle_check = require('./middleware/middle_check')

// db.sequelize.sync();

// Model.findAll({
//     attributes: ['foo', 'bar']
//   });


app.use(express.json());

app.use(express.urlencoded({ extended: false }));

// app.get('/adminInfo', async (req, res) => {
//     await sequelize.sync();

//     info =  await admins.findAll({
//         attributes: ['user_id','one_id','ID']
//       });
    
//     res.json(info);
//   });


console.log("key : "+config.api_key );



app.use("/api/v1",middle_check);
app.use("/api/v2",middle_check);

app.use("/api/v1/auth", 
        require("./routes/api/v1/auth")
    );

app.use("/api/v1/admins", 
        require("./routes/api/v1/admins")
    );

app.use("/api/v1/medbox", 
        require("./routes/api/v1/medbox")
    );

app.use("/api/v1/systems", 
        require("./routes/api/v1/systems")
    );

app.use("/api/v2/systems", 
        require("./routes/api/v2/systems")
    );    
 
app.use("/api/v1/users", 
        require("./routes/api/v1/users")
    );    


app.listen(40001, () => console.log('Server started'));
