const express= require('express');
const mongoose = require('mongoose')
const app =express();
const port =3000;

//middleware (setting up the parsers)
app.use(express.json());

const mongo= 'mongodb://localhost:27017/taskmanager';

mongoose.connect(mongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{
    console.log("Database connected");
})
.catch(()=>{
    console.error("Database connection error",err)
})

app.get('/',(req,res)=>{
    res.send('hello');
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});


