const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes.js');
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/public/uploads', express.static(__dirname+'/public/uploads'));
app.use('/api', routes);

mongoose.connect(process.env.MONGODB,{
  useNewUrlParser:true,
  useUnifiedTopology:true,
  dbName:'APIDB'
}).then(()=>{
  console.log('DB connected');
})
.catch((err)=>{
  console.log(err);
})

app.listen(process.env.PORT, ()=>{
  console.log('server is running at '+process.env.API_URL);
});