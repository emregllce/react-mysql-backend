const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors =require("cors");


// const db = mysql.createPool({
//     host : "localhost",
//     user : "root",
//     password : "123456ab",
//     database : "productlist"
// });
const db = mysql.createPool({
    host : "eu-cdbr-west-03.cleardb.net",
    user : "b31fea427f8895",
    password : "b067fb03",
    database : "heroku_77469e7bf477d6a"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM products"
    db.query(sqlGet, (error, result) =>{
        res.send(result)
    });
});

app.post("/api/post", (req, res) => {
    const {SKU, name, price, size, weight, height, width, length} = req.body;
    const sqlInsert = 
    "INSERT INTO products (SKU, name, price, size, weight, height, width, length) VALUES (?,?,?,?,?,?,?,?)";
    db.query(sqlInsert, [SKU, name, price, size, weight, height, width, length], (error, result) =>{
        console.log(error);
    });
});

app.delete("/api/remove/:SKU", (req, res) => {
    const { SKU } = req.params;
    const sqlRemove = 
    "DELETE FROM products WHERE SKU = ?";
    db.query(sqlRemove, SKU, (error, result) =>{
        console.log(error);
    })
})

app.get("/", (req, res) =>{
    // const sqlInsert = "INSERT INTO products (sku, name, price, height, width, length) VALUES ('item-4', 'table', 30, 50, 50, 100)";
    // db.query(sqlInsert, (err, result) =>{
    //      console.log("error", err);
    //      console.log("result", result);
    // res.send("bu sefer ol");
    //   })
})


// app.listen(5000, ()=> {
//     console.log("server is running on port 5000")
// })

app.listen(process.env.PORT || 5000, () =>{
    console.log("server running on PORT");
})