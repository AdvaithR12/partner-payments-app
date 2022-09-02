const express = require(`express`);
const cors = require(`cors`);
const path = require('path');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');  
const authRouter = require(`./src/routes/auth-router`);
const adminRouter = require(`./src/routes/admin-router`);
const partnerRouter = require('./src/routes/partner-router')

const app = new express();
const PORT = process.env.PORT || 8080;

// mongoose.connect('mongodb://localhost:27017/partner-payments', {
mongoose.connect('mongodb+srv://ictakuser1:BDuEr7h0j2F7wIM0@ppp.16ftfvb.mongodb.net/partner-payments?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((succ)=>{
  console.log(`MongoDB connected`);
}).catch((err)=> {
  console.log(`MongoDB connection error! Can't connect`);
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyparser.urlencoded({extended:true}));

//for work order pdf generation
app.set('views','./src/assets/work-orders/template-files/');
app.set('view engine','ejs'); 
app.use(express.static(path.join(__dirname , '/src/assets/work-orders/template-files/'))); 

app.use(`/api/auth`, authRouter);
app.use(`/api/admin`, adminRouter);
app.use(`/api/partner`, partnerRouter);

app.listen(PORT, ()=> {
  console.log(`Hi, I'm listening at ${PORT}`);
});