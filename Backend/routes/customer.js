const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const {
    createJWT,
} = require('../Utility/authJWT');

let Customer = require('../models/customer.model');
let Tables = require('../models/tables.model');
let Orders = require('../models/orders.model');
let Feedback = require('../models/feedback.model');
let BusboyNotif = require('../models/busboynotif.model');
let meals = require('../models/manager.meals.model');

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const scoreRegexp = /[1-10]/;
// router.route('/all').get((req, res) => {
//     Customer.find()
//         .then(customers => res.json(customers))
//         .catch(error => res.status(400).json('Error: ' + error));
// });

// router.route('/delete/:id').delete((req, res) => {
//     Customer.findByIdAndDelete(req.params.id)
//         .then(() => res.json('Customer data deleted. '))
//         .catch(err => res.status(400).json('Error : ' + err));
// });

router.route('/signup').post((req, res, next) => {
    let { firstname, surname, phoneNo, email, password, password_confirmation } = req.body;
    let errors = [];
    if (!firstname) {
        errors.push({ firstname: "required" });
    }
    if (!surname) {
        errors.push({ surname: "required" });
    }
    if (!email) {
        errors.push({ email: "required" });
    }
    if (!phoneNo) {
        errors.push({ email: "required" });
    }
    if (!emailRegexp.test(email)) {
        errors.push({ email: "invalid" });
    }
    if (!password) {
        errors.push({ password: "required" });
    }
    if (!password_confirmation) {
        errors.push({
            password_confirmation: "required",
        });
    }
    if (password != password_confirmation) {
        errors.push({ password: "mismatch" });
    }
    if (errors.length > 0) {
        return res.status(422).json({ errors: errors });
    }
    Customer.findOne({ email: email })
        .then(customer => {
            if (customer) {
                return res.status(422).json({ errors: [{ customer: "email already exists" }] });
            } else {
                const customer = new Customer({

                    firstname: firstname,
                    surname: surname,
                    phoneNo: phoneNo,
                    email: email,
                    password: password,
                });
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(password, salt, function (err, hash) {
                        if (err) throw err;
                        customer.password = hash;
                        customer.save()
                            .then(response => {
                                res.status(200).json({
                                    MESSAGE: 'User is signd up and in the database',
                                    success: true,
                                    result: response
                                })
                            })
                            .catch(err => {
                                res.status(500).json({
                                    errors: [{ error: err }]
                                });
                            });
                    });
                });
            }
        }).catch(err => {
            res.status(500).json({
                errors: [{ error: 'Something went wrong' }]
            });
        })
});


router.route('/signin').post((req, res) => {
    let { email, password } = req.body;
    let errors = [];
    if (!email) {
        errors.push({ email: "required" });
    }
    if (!emailRegexp.test(email)) {
        errors.push({ email: "invalid email" });
    }
    if (!password) {
        errors.push({ passowrd: "required" });
    }
    if (errors.length > 0) {
        return res.status(422).json({ errors: errors });
    }
    Customer.findOne({ email: email }).then(customer => {
        if (!customer) {
            return res.status(404).json({
                errors: [{ customer: "not found" }],
            });
        } else {
            bcrypt.compare(password, customer.password)
                .then((isMatch) => {
                    if (isMatch) {
                        let access_token = createJWT(
                            customer.email,
                            customer._id,
                            3600
                        );
                        jwt.verify(access_token, process.env.TOKEN_SECRET, (err,
                            decoded) => {
                            if (err) {
                                res.status(500).json({ MESSAGE: 'Error at line 128 of customer.js', erros: err });
                            }
                            if (decoded) {
                                return res.status(200).json({
                                    MESSAGE: 'customer is logged in.',
                                    success: true,
                                    token: access_token,
                                    message: customer
                                });
                            }
                        });
                    } else {
                        return res.status(400).json({
                            errors: [{
                                password:
                                    "incorrect",
                            }]
                        });
                    }

                }).catch(err => {
                    console.log({ MESSAGE: 'Error at line 140 of customer.js', MSG_pass_req: password, MSG_data: customer.password, erros: err });
                });
        }
    }).catch(err => {
        res.status(500).json({ MESSAGE: 'Error at line 144 of customer.js', erros: err });
    });
});

router.route('/forgotPassword').post((req, res) => {
    let { email, password } = req.body;
    let errors = [];
    if (!email) {
        errors.push({ email: "required" });
    }
    if (!emailRegexp.test(email)) {
        errors.push({ email: "invalid email" });
    }
    if (!password) {
        errors.push({ passowrd: "required" });
    }
    if (errors.length > 0) {
        return res.status(422).json({ errors: errors });
    }
    Customer.findOne({ email: email })
        .then(customer => {
            if (!customer) {
                return res.status(404).json({
                    errors: [{ customer: "not found" }],
                });
            } else {

                customer.firstname = customer.firstname,
                    customer.surname = customer.surname,
                    customer.email = customer.email,
                    customer.password = password,
                    // customer.save()
                    //     .then(response => {
                    //         res.status(200).json({
                    //             MESSAGE: 'User password is updated in the database. Now Sign in using new password!!',
                    //             success: true,
                    //             result: response
                    //         })
                    //     })
                    //     .catch(err => {
                    //         res.status(500).json({
                    //             errors: [{ error: err }],
                    //             MESSAGE: [{ firstname: customer.firstname, lastname: customer.surname, email: customer.email, newpassword: passowrd }]
                    //         });
                    //     });
                    bcrypt.genSalt(10, function (err, salt) {
                        bcrypt.hash(password, salt, function (err, hash) {
                            if (err) throw err;
                            customer.password = hash;
                            customer.save()
                                .then(response => {
                                    res.status(200).json({
                                        MESSAGE: 'User password is updated in the database. Now Sign in using new password!!',
                                        success: true,
                                        result: response
                                    })
                                })
                                .catch(err => {
                                    res.status(500).json({
                                        errors: [{ error: err }],
                                        MESSAGE: [{ firstname: customer.firstname, lastname: customer.surname, email: customer.email, newpassword: passowrd }]
                                    });
                                });
                        });
                    });

            }

        }).catch(err => {
            res.status(500).json({
                errors: [{ error: 'Something went wrong' }]
            });
        })
});


router.route('/updateinfo').post((req, res) => {

    let { email} = req.body;

    Customer.findOne({ email: email })
        .then(customer => {
            customer.phoneNo = req.body.phoneNo!=null ? req.body.phoneNo : customer.phoneNo;
            customer.firstname = req.body.firstname!=null ? req.body.firstname : customer.firstname;
            customer.surname = req.body.surname!=null ? req.body.surname : customer.surname;
            customer.password = req.body.password!=null ? req.body.password : customer.password;
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(customer.password, salt, function (err, hash) {
                    if (err) throw err;
                    customer.password = hash;
                    customer.save()
                        .then(response => {
                            res.status(200).json({
                                MESSAGE: 'Customer info is UPDATED in the database',
                                success: true,
                                result: response
                            })
                        })
                        .catch(err => {
                            res.status(500).json({
                                errors: [{ error: err }]
                            });
                        });
                });
            });
        }).catch(err => res.status(400).json('Error :' + err));
});




// Customer feedback

router.route('/feedback').post((req,res)=>{
    let {restaurant_ambience,restaurant_service,restaurant_food,additional_comments} = req.body;
    var feedbackID;
    let errors=[];
    if (!restaurant_ambience) {
        errors.push({ restaurant_ambience: "required" });
    }
    if (!restaurant_service) {
        errors.push({ restaurant_service: "required" });
    }
    if (!restaurant_food) {
        errors.push({ restaurant_food: "required" });
    }
    // if (!scoreRegexp.test(restaurant_ambience)) {
    //     errors.push({ restaurant_ambience: "invalid" });
    // }
    // if (!scoreRegexp.test(restaurant_service)) {
    //     errors.push({ restaurant_service: "invalid" });
    // }
    // if (!scoreRegexp.test(restaurant_food)) {
    //     errors.push({ restaurant_food: "invalid" });
    // }
    if (errors.length > 0) {
        return res.status(422).json({ errors: errors });
    }
    Feedback.find()
    .then(feedback=>{
        feedbackID = feedback.length+1;
        console.log(feedbackID);

        const newFeedback = new Feedback({feedbackID,restaurant_ambience,restaurant_service,restaurant_food,additional_comments});
        newFeedback.save()
        .then(() => res.json({ MESSAGE: 'Feedback added to the database', Result: newFeedback }))
        .catch(error => res.status(400).json('Error :' + error));
    })
    .catch(error => res.status(400).json('Error: ' + error));
    
})





// Customer choosing the desired table
router.route('/getTableStatus').get((req, res) => {
    Tables.find()
        .then(table => res.json(table))
        .catch(error => res.status(400).json('Error: ' + error));
});


// updated table selection as a part of req,res
router.route('/tableSelection').post((req, res) => {
    let {tableId,email} = req.body;
    Tables.findOne({tableId:tableId})
        .then(table => {
            let available = table.available;
            let reserved = table.reserved;
            if (available && !reserved) {
                table.available = false;
                table.tableId = table.tableId;
                table.email = email;
                table.save()
                    .then(response => { res.json({ result: response }) })
                    .catch(err => res.status(400).json({ error: err }));
            } else {
                res.json({ result: 'unable to book the table. Please try again later!' })
            }
        }).catch(err => res.status(400).json({ errro: err }));
});



// //Meals database access to the manager
// router.route('/meals/all').get((req, res) => {
//     meals.find()
//         .then(manager => res.json(manager))
//         .catch(err => res.status(400).json('Error :' + err))
// });



// Busboy notification
router.route('/notifybusboy').post((req, res) => {
    let {tableId} = req.body;
    Tables.find({tableId:tableId})
        .then(table => {
            let callbusboy = true; 

            buscall = new BusboyNotif({tableId, callbusboy})
            buscall.save()
            .then(response => { res.json({ success:true,result: response }) })
            .catch(err => res.status(400).json({ error: err }));
            // customer.save()
            //         .then(response => { res.json({ success:true,result: response }) })
            //         .catch(err => res.status(400).json({ error: err }));
           
        }).catch(err => res.status(400).json({ errro: err }));
});






// Customers order the meals
router.route('/orderMeal').post((req,res)=>{
    let {mealId,tableId,email} = req.body;
    var orderId;
    var mealName;
    meals.findOne({mealId:mealId})
    .then(meal=>{
mealName = meal.mealName;
    })
    Orders.find()
    .then(orders=>{
        orderId = orders.length+1;

        const newOrder = new Orders({mealName, mealId,tableId,orderId,email });
    newOrder.save()
    .then(() => res.json({ MESSAGE: 'Order added to the database', Result: newOrder }))
    .catch(error => res.status(400).json('Error :' + error));

    })
    .catch(error => res.status(400).json('Error: ' + error));    
});



// ** Transaction util for the customer is inside the /paytm-nodejs/index.js file.
// ** API for calling the mongodb trasnaction as well is availabe in that very file. 


module.exports = router;