const express = require("express");
const app = express();
// const { Pool } = require("pg");
const pool =require("./dbConfig");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const flash = require("express-flash");
const passport =require("passport");
const logger = require('morgan');
const cookieParser =require('cookie-parser');
const path = require('path');
var bodyParser = require("body-parser");


//middleware
app.use(cors());

// create application/json parser
app.use(express.json());
// create application/x-www-form-urlencoded parser
app.use(express.urlencoded({ extended: false}));
app.use(logger('dev'))
app.use(cookieParser())
// app.use(express.static(path.join(__dirname, 'public' )));
app.use('/public', express.static('public'));

const initializePassport = require("./passportCon");

initializePassport(passport);

// const PORT  = process.env.PORT || 4000;

app.set ("view engine", "ejs");


app.use
  (session({
    secret: 'secret',

    resave: false,

    saveUninitialized: false
  })
  
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());




app.get("/", (req, res)=> {
    res.render("index");
});

app.get("/users/register", (req, res)=> {
    res.render("register");
});

app.get("/users/login",(req, res)=> {
    res.render("login");
});

// app.get("/users/dashboard", (req, res)=> {
//     res.render("dashboard",{ user: req.user.name});
// });

app.get("/users/logout",(req,res)=>{
     req.logOut();
     req.flash("success_msg", "You have logged out");
     res.redirect("/users/login")
    });




app.post("/users/register",  async (req, res)=>{
    let { name, email, password, password2 }=req.body;
    console.log({
        name,
        email,
        password,
         password2
    });

    let errors = [];

    if (!name || !email || !password || !password2){
        errors.push({message : "please enter all fields"});
    }
    if (password.length < 6) {
        errors.push({ message: "password should be atleast 6 characters"});
    }
    if (password != password2){
        errors.push({ message: "password do not match"});
    }
    if (errors.length > 0) {
    res.render("register",{ errors });
 }else {
    //Form validation has passed

    let hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    

    

 pool.query(
     `SELECT * FROM users
     WHERE email = $1`,
     [email],
     (err, results) => {
         if (err) {
             throw err;
         }

         console.log(results.rows);

         if (results.rows.length > 0) {
             errors.push({ message: "Email already registered fools"});
             res.render('register', {errors})
          } else{
              pool.query(
                  `INSERT INTO USERS (name, email, password)
                  VALUES ($1, $2, $3)
                  RETURNING id, password`, [name, email, hashedPassword], (err, results) =>{
                    if (err){
                        throw err;
                    }
                    console.log(results.rows);
                    req.flash('success_msg', "You are now registered. please log in");
                    res.redirect("/users/login")
                  }
              )
          }
     }
 );
   

   
  


 }
});

app.post(
"/users/login",  
  passport.authenticate("local",{
   successRedirect: "http://localhost:3000/client/src/App.j" ,
   failureRedirect: "/users/login",
   failureFlash: true  
  })
);



//dashboard post

                      

app.post("/detailss", async (req, res)=>{
    try {
      console.log(req.body)
        const { address } = req.body;
        const{ city }  =req.body;
        const {state}=req.body;
        const{phone_number}=req.body;
        const newDetails = await pool.query(
          "INSERT INTO details (address,city,state,phone_number) VALUES($1,$2,$3,$4) RETURNING *",
          [address, city, state, phone_number]
        );
    
        res.json(newDetails.rows[0]);
      } catch (err) {
        console.error(err.message);
      }
    });

    
    app.get("/detailss", async (req, res) => {
        try {
          const allDetails = await pool.query("SELECT * FROM details");
          res.json(allDetails.rows);
        } catch (err) {
          console.error(err.message);
        }
      });
      

    
      app.get("/detailss/:id", async (req, res) => {
        try {
            
          const { id } = req.params;
          const detailss = await pool.query("SELECT * FROM details WHERE details_id = $1", [
            id
          ]);
      
          res.json(detailss.rows[0]);
        } catch (err) { 
          console.error(err.message);
        }
      });



      app.put("/detailss/:id", async (req, res) => {
        try {
          const {id}=req.params;
          const { address } = req.body;
          const{ city }  =req.body;
          const {state}=req.body;
          const{phone_number}=req.body;
          
      const updateDetails = await pool.query(
            "UPDATE details SET address = $1 WHERE details_id = $2",
            [address, id]
          
          );
         await pool.query(
            "UPDATE details SET city = $1 WHERE details_id = $2",
            [city, id]
          
          );
          await pool.query(
            "UPDATE details SET state = $1 WHERE details_id = $2",
            [state, id]
          
          );
          await pool.query(
            "UPDATE details SET phone_number = $1 WHERE details_id = $2",
            [phone_number, id]
          
          );
      
          res.json("Details was updated!");
        } catch (err) {
          console.error(err.message);
        }
      });


      app.delete("/detailss/:id", async (req, res) => {
        try {
          const { id } = req.params;
          const deleteDetails = await pool.query("DELETE FROM details WHERE details_id = $1", [
            id
          ]);
          res.json("Details was deleted!");
        } catch (err) {
          console.log(err.message);
        }
      });
    


app.listen(5007, () => {
    console.log("Server running on port 5007");
});