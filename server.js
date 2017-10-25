const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , massive = require('massive');

const mainCtrl = require('./mainCtrl');

const app = express();

app.use(bodyParser.json())
app.use(cors());

// You need to complete the information below to connect
// to the assessbox database on your postgres server.
// massive({
//   host: 'localhost',
//   port: 3000,
//   database: 'assessbox',
//   user: 'postgres',
//   password: '38024'
// }).then( db => {
//   console.log("database connected");
//   app.set('db', db);

  const connectionString = `postgress://postgres:38024@localhost/assessbox`;
  massive(connectionString).then(db => {
    console.log("DB connected");
    app.set('db', db)


  // Initialize user table and vehicle table.
  db.init_tables.user_create_seed().then( response => {
    console.log('User table init');
    db.init_tables.vehicle_create_seed().then( response => {
      console.log('Vehicle table init');
    })
  })

})


// ===== Build enpoints below ============

app.get('/api/users', mainCtrl.getUsers)

app.get('/api/vehicles', mainCtrl.getVehicles)

app.post('/api/users', mainCtrl.addUser)
// use returning
app.post('/api/vehicles', mainCtrl.addVehicles)
// user returning
app.get('/api/user/:userId/vehiclecount', mainCtrl.getCount)
// response: object with count prop
app.get('/api/user/:userId/vehicle', mainCtrl.getAllVehicles)
app.get('/api/vehicle', mainCtrl.getAllVehicles)
//also Use the above endpoint to also handle 
// the query ?userFirstStart=[letters] to get all 
//vehicles for any user whose first name starts with the provided letters.
app.get('/api/newervehiclesbyyear', mainCtrl.getVehiclesByYear)
// gets all vehicles newer than 2000 and sorted by year with the newest car first. 
//Include the owner's name from the users table.
app.put('/api/vehicle/:vehicleId/user/:userId', mainCtrl.updateVehicleOwner)
// use returning
app.delete('/api/user/:userId/vehicle/:vehicleId', mainCtrl.deleteVehicleOwner)
// use returning
app.delete('/api/vehicle/:vehicleId', mainCtrl.deleteVehicle)
// use returning

// ===== Do not change port ===============
const port = 3000;
app.listen(port, () => {
  console.log('Listening on port: ', port);
})
