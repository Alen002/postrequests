const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(express.json()); 



app.use(morgan('short'));  //short or combines
app.use(express.static('./public/')); //server is serving all the files inside the public folder

app.use(bodyParser.urlencoded({extended: false})); // middleware - necessary to receive the inform. from data entered in the form
/* app.use(bodyParser.json()); */


app.listen(3000, () => {console.log('Server is up and running on 3000')});

//Our database on the server. It is a simple array with will be updated with POST requests
const users = [{id: 1, firstName:"A", lastName:'B'}];



app.get('/', (req, res) => {
    res.send('Hello World')    
});



app.get(('/users'), (req, res) => {  
  res.json(users);   // or alternate would be res.send(users);
  
});

app.get(('/users/:id'), (req, res) => {
  /* res.send(req.params.id) */
 console.log(req.params);  //this shows you the param you entered in :id, /users/1 req.params is {id: '1'} 
 console.log(req.params.id);  
 res.send(users[req.params.id-1]);
});

app.post(('/user_create'), (req, res) => {
  console.log('Trying to create a new user:');
  const user = {
    id: users.length + 1,
    firstName: req.body.first_name, //taken from the form name="first_name"
    lastName: req.body.last_name //taken from the form name="last_name"
  };
  users.push(user);
  console.log(user);
  res.send('User updated on server');
  res.end();
});