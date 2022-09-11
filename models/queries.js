const queries = {
    "getUsers" : "SELECT * FROM users",
    // "getUserByEmail":"SELECT email FROM users",
    "getUserByEmail":"SELECT * FROM users WHERE email=$1",
    // "getUsersById": "SELECT id FROM users",
    "getUsersById": "SELECT * FROM users WHERE id=$1",
    "createUser": `INSERT INTO users (id, email,password, full_name, role,logged) VALUES ($1,$2,crypt($3, gen_salt('bf')),$4,$5,$6)`,
    "updateUser":`UPDATE users SET full_name= $1 WHERE users.email = $2;`,
    "turnToLogged":`UPDATE users SET logged=true WHERE users.email=$1`,
    "deleteUser":`DELETE FROM users WHERE email=$1;`,
    "loginUser":`SELECT email,password FROM users WHERE users.email=$1`,
    "registerUser":`INSERT INTO users(email,full_name,password,role) VALUES($1,$2,crypt($3, gen_salt('bf')),'client')`,
    "recoverPassword":`SELECT password FROM users WHERE users.email = $1`,
    "changePassword":`UPDATE users SET password= crypt($1, gen_salt('bf')) where email=$2;`,
    "getFavAds": `SELECT * FROM favs INNER JOIN users ON users.id= favs.user_id WHERE users.email = $1`,
    "saveFavAd": `INSERT INTO favs (user_id, ad)
    VALUES ((SELECT id FROM users WHERE email =$1),$2');`,
    "deleteFavAd": `DELETE FROM favs WHERE ad=$1`,
    "userProfile": `SELECT email,full_name FROM users WHERE users.email=$1`,
}
module.exports= queries
