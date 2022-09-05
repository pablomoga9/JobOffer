const queries = {
    "getUsers" : "SELECT * FROM users",
    "getUsersById": "SELECT id FROM users",
    "createUser": `INSERT INTO users (id, email,password, full_name, role) VALUES ($1,$2,crypt($3, gen_salt('bf')),$4,client)`,
    "updateUser":`UPDATE users SET full_name= $1 WHERE email = $2;`,
    "deleteUser":`DELETE FROM users WHERE email=$1;`,
    "loginUser":`SELECT email,password FROM users`,
    "registerUser":`INSERT INTO users(email,password,full_name,role='client')`,
    "recoverPassword":`SELECT password FROM users WHERE users.email = $1`,
    "changePassword":`UPDATE users SET password= crypt($1, gen_salt('bf')) where email=$2;`,
    "favAds": `SELECT ad FROM favs INNER JOIN users ON users.id=favs.user_id WHERE users.email=$1`,
    "userProfile": `SELECT email,full_name FROM users WHERE users.email=$1`,
    "saveFavAd": `INSERT INTO favs(ad) VALUES($1) INNER JOIN users ON users.id=favs.user_id`,
    "DeleteFavAd": `DELETE FROM favs WHERE ad=$1`,
}
module.exports= queries