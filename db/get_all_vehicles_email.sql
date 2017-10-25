SELECT (make, model, year, vehicles.owner_id) FROM vehicles 
    JOIN users ON vehicles.owner_id = users.id
    WHERE email = $1;