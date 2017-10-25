const getUsers = (req,res) => {

    req.app.get('db').get_users().then(response => res.json(response)).catch(err => console.log(err))

}


const getVehicles = (req,res) => {

    req.app.get('db').get_vehicles().then(response => res.json(response)).catch(err => console.log(err))

}


const addUser = (req,res) => {

    const {name, email} = req.body

    req.app.get('db').add_user([name, email]).then(response => res.json(response)).catch(err => console.log(err))
}
const addVehicles = (req,res) => {

    const {make, model, year, owner_id} = req.body
    req.app.get('db').add_vehicles([make, model, year, owner_id]).then(response => res.json(response)).catch(err => console.log(err))

}
const getCount  = (req,res) => {

    let {userId} = req.params;

    userId = parseInt(userId);

    req.app.get('db').get_count([userId]).then(response => res.json(response)).catch(err => console.log(err))

}
const getAllVehicles = (req,res) => {

    if(req.params.userId){
    let {userId} = req.params;
    
    userId = parseInt(userId);
    
    req.app.get('db').get_all_vehicles([userId], ["owner_id"]).then(response => res.json(response)).catch(err => console.log(err))}
    else{
        console.log(req.query)
        if(req.query.userFirstStart){
            console.log("firststart")
            let { userFirstStart } = req.query
            console.log(userFirstStart)
            req.app.get('db').get_all_vehicles_start([userFirstStart]).then(response => res.json(response)).catch(err => console.log(err))
        }
        else{
            console.log("email")
            let {userEmail} = req.query;

            req.app.get('db').get_all_vehicles_email([userEmail]).then(response => res.json(response)).catch(err => console.log(err))
        }



    }
}
    
const getVehiclesByYear = (req,res) => {
    req.app.get('db').get_vehicles_by_year().then(response => res.json(response)).catch(err => console.log(err))
}
const updateVehicleOwner = (req,res) => {
    console.log(req.params)
    let {userId, vehicleId} = req.params;
    userId = parseInt(userId);
    vehicleId = parseInt(vehicleId);
    req.app.get('db').update_vehicle_owner([userId, vehicleId]).then(response => res.json(response)).catch(err => console.log(err))
}
const deleteVehicleOwner = (req,res) => {
    console.log(req.params)
    let {userId, vehicleId} = req.params;
    userId = parseInt(userId);
    vehicleId = parseInt(vehicleId);
    req.app.get('db').delete_vehicle_owner([userId, vehicleId]).then(response => res.json(response)).catch(err => console.log(err))
}
const deleteVehicle = (req,res) => {
    let {vehicleId} = req.params;
    vehicleId = parseInt(vehicleId);
    req.app.get('db').delete_vehicle([vehicleId]).then(response => res.json(response)).catch(err => console.log(err))
}



module.exports = {
getUsers,
getVehicles,
addUser,
addVehicles,
getCount,
getAllVehicles,
getVehiclesByYear,
updateVehicleOwner,
deleteVehicleOwner,
deleteVehicle
}
