const express = require('express');
const app = express();

app.use(express.json());

app.get('/',(req,res)=> {
    res.send('Home page');
});


app.get('/customer',(req,res)=> {
    res.send('Customer page');
});

app.get('/employee',(req,res)=>{
res.send('Employee page');
});

app.get('/customer/login',(req,res)=> {
    res.send('Customer page after login');
});

const port = process.env.PORT || 3000;
app.listen(port,()=>{console.log(`Server listening on port ${port}...`)});