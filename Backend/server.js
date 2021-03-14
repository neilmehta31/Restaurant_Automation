const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

require('dotenv').config();

app.use(express.json());
app.use(cors());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true });
// Added the codeStream bot to the MS teams SE Project channel
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

// app.get('/', (req, res) => {
//     res.send('Home page');
// });


// app.get('/customer', (req, res) => {
//     res.send('Customer page');
// });

// app.get('/employee', (req, res) => {
//     res.send('Employee page');
// });

// app.get('/customer/login', (req, res) => {
//     res.send('Customer page after login');
// });


const customerRouter = require('./routes/customer.js');
const employeeRouter = require('./routes/employee.js');
const managerRouter = require('./routes/manager.js');

app.use('/customer', customerRouter);
app.use('/employee', employeeRouter);
app.use('/manager/meals', managerRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`Server listening on port ${port}...`) });