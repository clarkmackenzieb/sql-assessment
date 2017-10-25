SELECT (make, model, year, owner_id, name) FROM vehicles
JOIN users ON users.id=vehicles.owner_id
WHERE year > 2000
ORDER BY year DESC;
--this returns vehicle info and owner name, idk why the test isn't passing  