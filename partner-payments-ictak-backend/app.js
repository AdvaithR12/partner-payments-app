const express = require(`express`);
const cors = require(`cors`);
const path = require('path');
const bodyparser = require('body-parser');  
const authRouter = require(`./src/routes/auth-router`);
const User = require('./src/model/Userdata');

const app = new express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyparser.urlencoded({extended:true}));

app.use(`/api/auth`, authRouter);

app.listen(PORT, ()=> {
  console.log(`Hi, I'm listening at ${PORT}`);
});

