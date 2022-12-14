const queries = {
    "getUsers" : "SELECT * FROM users",
    // "getUserByEmail":"SELECT email FROM users",
    "getUserByEmail":"SELECT * FROM users WHERE email=$1",
    // "getUsersById": "SELECT id FROM users",
    "getUsersById": "SELECT * FROM users WHERE id=$1",
    "createUser": `INSERT INTO users (email,password, full_name, role) VALUES ($1,crypt($2, gen_salt('bf')),$3,$4)`,
    "updateUser":`UPDATE users SET full_name= $1 WHERE users.email = $2;`,
    "turnToLogged":`UPDATE users SET logged=true WHERE users.email=$1`,
    "turnToNoLogged":'UPDATE users SET logged=false WHERE users.email=$1',
    "checkLogged":'SELECT logged FROM users WHERE users.email=$1',
    "deleteUser":`DELETE FROM users WHERE email=$1;`,
    "checkAdmin":`SELECT role FROM users WHERE users.email=$1`,
    "loginUser":`SELECT * FROM users WHERE users.email=$1`,
    "registerUser":`INSERT INTO users(email,full_name,password,role) VALUES($1,$2,crypt($3, gen_salt('bf')),'client')`,
    "recoverPassword":`SELECT password FROM users WHERE users.email = $1`,
    "changePassword":`UPDATE users SET password= crypt($1, gen_salt('bf')) where email=$2;`,
    "getFavAds": `SELECT ad FROM favs INNER JOIN users ON users.id= favs.user_id WHERE users.email = $1`,
    "saveFavAd": `INSERT INTO favs (user_id, ad) VALUES ((SELECT id FROM users WHERE email=$1),$2)`,
    "deleteFavAd": `DELETE FROM favs WHERE ad=$1`,
    "userProfile": `SELECT email,full_name FROM users WHERE users.email=$1`,
}
module.exports= queries
