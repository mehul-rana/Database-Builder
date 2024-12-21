// REQUIRE DEPENDENCIES
const { error } = require('console');
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
  console.log('Post worked')
  db.collection('tracker').insertOne(
    {move: request.body.move, position: request.body.position, attire: request.body.attire, successfulAttempts: 0, completed: false}
  )
  .then(result => {
    console.log(result)
    response.redirect('/')
  })
})

//todo: need to refactor function, update is not reflecting in MongoDB
app.put('/updateEntry', (request, response) =>{
  console.log(request.body)
  Object.keys(request.body).forEach(key => {
    if(request.body[key] === null || request.body[key] === undefined || request.body[key] === ""){
      delete request.body[key]
    }
  })
  console.log(request.body)
  db.collection('tracker').findOneAndUpdate(
    {move: request.body.moveName, position: request.body.positionName, attire: request.body.giOrNoGi},
    {
      $set: {
        move: request.body.moveName,
        position: request.body.positionName,
        attire: request.body.giOrNoGi
      }
    }
  )
  .then(result => {
    // console.log(result)
    response.json('Success')
  })
  .catch(error => console.log(error))
})

app.delete('/deleteEntry', (request, response) => {
  db.collection('tracker').deleteOne(
    {move: request.body.move}
  )
  .then(result => {
    console.log('Entry Deleted')
    response.json('Entry Deleted')
  })
  .catch(error => console.log(error))
})

// SET UP LOCALHOST ON PORT
app.listen(process.env.PORT || PORT, () =>{
  console.log(`Server running on port ${PORT}`)
})