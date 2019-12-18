//use path module
const path = require('path');
//use express module
const express = require('express');
//use hbs view engine
const hbs = require('hbs');
//use bodyParser middleware
const bodyParser = require('body-parser');
//use mysql database
const mysql = require('mysql');
//use express-session
var session = require('express-session');

//express constructor initialized
const app = express();
//use express session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
//hbs helper function
hbs.registerHelper('if_equal', function(a, b, opts) {
  if (a == b) {
      return opts.fn(this)
  } else {
      return opts.inverse(this)
  }
})


//multer for upload of file
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/imgs');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({
  storage: storage
});
//Create Connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'crudapp_db'
});

//connect to database
conn.connect((err) => {
  if (err) throw err;
  console.log('Mysql Connected...');
});

//set views file
app.set('views', path.join(__dirname, 'views'));
//set view engine
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
//set folder public as static folder for static file
app.use('/assets', express.static(__dirname + '/public'));

//Route for login and authentication
app.get('/', (req, res) => {

  res.render('login.hbs');

});
//Route for user authentication
app.post('/auth', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  if (username && password) {
    conn.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
      if (results.length > 0) {
        req.session.loggedin = true;
        req.session.username = username;
        req.session.role=results[0].role;
        req.session.uid=results[0].id;
        //console.log(results[0].role);
        //console.log(req.session.username);
        //console.log(req.session.role);
        res.redirect('/home');

      } else {
        res.send('Incorrect Username and/or Password!');
      }
      res.end();
    });
  } else {
    res.send('Please enter Username and Password!');
    res.end();
  }
});

//Route for signup
app.post('/signup',function(req,res){
  //console.log(req.body);
  var username = req.body.username;
  var password = req.body.password;
  var email=req.body.email;
  var role=req.body.role;
  //console.log(username +" "+ password +" "+email +" "+ role);
  if(username && password && email && role){
    console.log(username +" "+ password +" "+email +" "+ role);
    var sql = "INSERT INTO accounts (username, password , email ,role) VALUES ('"+username+"','"+password+"','"+email+"','"+role+"')";
    conn.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  }
  res.redirect('/');

})



//route for logout 
app.post('/logout',(req,res) => {
  req.session.destroy((err) => {
      if(err) {
          return console.log(err);
      }
      res.redirect('/');
  });

});


//route for homepage
app.get('/home',(req, res) => {
 // let sql = "SELECT * FROM product where user_id="+req.session.uid;
  if(req.session.role == "buyer"){
    sql = "SELECT * FROM product";
  }
  if(req.session.role == "saler"){
    sql = "SELECT * FROM product where user_id="+req.session.uid;
  }
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    //console.log(req.session.username);
    //console.log(req.session.role);
    console.log(req.session);

    res.render('product_view',{
      results: results,
      session:req.session
    });
  });
});




//route for insert data
app.post('/save', upload.single('product_img'), (req, res) => {
  let data = {
    product_name: req.body.product_name,
    product_desc: req.body.product_desc,
    product_price: req.body.product_price,
    product_categ: req.body.product_categ,
    product_img: '/assets/imgs/' + req.file.originalname,
    user_id:req.session.uid
  };
  let sql = "INSERT INTO product SET ?";
  let query = conn.query(sql, data, (err, results) => {
    if (err) throw err;
    console.log(data);
    res.redirect('/home');
  });
});

//route for update data
app.post('/update', (req, res) => {
  let sql = "UPDATE product SET product_name='" + req.body.product_name + "',product_desc='" + req.body.product_desc + "', product_price='" + req.body.product_price + "', product_categ='" + req.body.product_categ + "' WHERE product_id=" + req.body.id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    console.log(req.body);
    res.redirect('/home');
  });
});

//route for delete data
app.post('/delete', (req, res) => {
  let sql = "DELETE FROM product WHERE product_id=" + req.body.product_id + "";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect('/home');
  });
});

//server listening
app.listen(8000, () => {
  console.log('Server is running at port 8000');
});

