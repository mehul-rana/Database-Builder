// REQUIRE DEPENDENCIES
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const PORT = 8005;
require('dotenv').config();

// DECLARED DB VARIABLES
let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'tracker'

// CONNECT TO MONGODB
MongoClient.connect(dbConnectionStr)
  .then(client => {
    console.log(`Connected to ${dbName} Database`)
    db = client.db(dbName)
  });

// SET MIDDLEWARE
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// CRUD METHODS
app.get('/', (request, response) =>{
  db.collection('tracker').find().toArray()
    .then(data => {
      let moveList = data.map(item => item.move)
      console.log(moveList)
      response.render('index.ejs', {info: moveList})
    })
    .catch(error => console.log(error))
})

app.post('/api', (request, response) =>{

})


app.put('/updateEntry', (request, response) =>{

})

app.delete('/deleteEntry', (request, response) => {

})

// SET UP LOCALHOST ON PORT
app.listen(process.env.PORT || PORT, () =>{
  console.log(`Server running on port ${PORT}`)
})