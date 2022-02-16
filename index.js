const express = require("express");
const app = express ();
let port = process.env.PORT || 3000;
const customers = require("./data.json");
var bodyParser = require('body-parser')
const cors = require('cors');
const { json } = require("body-parser");
const { response, Router } = require("express");
const e = require("express");

//Customer Array
let custarray = [];
let errorArr = [];



app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api", (req,res)=>{
 res.send("Welcome to the Customer API");
});

// API endpoint to get the last customer entered.
app.get("/api/customer",(req,res)=>{

    const getLastCustomer = custarray.slice(-1);
    res.send (getLastCustomer)

});

// API endpoint to get the all customers
app.get("/api/customers",(req,res)=>{
    
    res.send(custarray);

    

});

// API endpoint to get specific customer

app.get("/api/customers/:cust_id", (req,res)=>{

    
    
     // gets the URL parameter of the customer No. Eg. 34
     const cust_id = req.params.cust_id; 

     // it goes through the array and finds the associated URL No and Connects it to the Array
     const foundCust = custarray.find( ({ customerNo }) => customerNo == cust_id);
    
     

     errorArr = [
        {
            error: "customer not found",
            Customer_No: cust_id,
            error_code: 404,
        }
    ];
     
    try {
     if(foundCust["customerNo"] == cust_id)
         
         res.send(foundCust);
     }
    catch(err){

        return res.send(errorArr);
    }

     
  });
   
 // API to addcustomers from webform
app.post('/api/addcustomers', (req,res) =>{

    errorArr = [
        {
            error: "No Customers have been added",
            error_code: 404,
        }
    ];

try {

    if(custarray !== null){
        const postCustomer = req.body;
        custarray.push(postCustomer);
        res.send(custarray);
        console.log(custarray);
    }

}
catch (err){

    console.log("No customers found");

}


});

// API to removeCustomers
app.delete("/api/remove/all",(req,res)=>{
    
    custarray.length = 0;
    res.send("All Customers have been deleted");

});

app.listen(port, () =>{
    console.log ("App is listening on port http://localhost:" + port +"/api");

});

