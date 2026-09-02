
import { poolDB } from "../db/db.js";
export async function signupRepository(username: string, googleID: string){
    try{
        const user = await poolDB.query(`INSERT INTO users (username, google_id) VALUES ($1, $2) RETURNING *`, [username, googleID]);
        return user.rows[0];
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function checkIfUserExists(username: string){
    try{
        const users = await poolDB.query('SELECT * FROM users WHERE username = $1', [username]);
        return users.rows;
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function insertRefreshToken(
    refreshtoken: string,
    username: string
) {
    try {
        await poolDB.query(
            `UPDATE users
             SET refreshtoken = $1
             WHERE username = $2`,
            [refreshtoken, username]
        );
    } catch (err) {
        console.log(err);
        throw err;
    }
}
export async function insertPassword(username:string, password:string){
    try{
       await poolDB.query(`UPDATE users SET password = $2 WHERE username = $1`, [username, password]);
    }catch(err){
      console.log(err);
      throw err;
    }
}
export async function cancelConfirmationRepository(username: string){
    try{
        await poolDB.query(`DELETE FROM users WHERE username = $1`, [username]);
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function getUserRole(username: string){
    try{
         const role = await poolDB.query(`SELECT role FROM users WHERE username = $1`, [username]);
         return role.rows[0];
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function logoutRepository(username: string){
    try{
        await poolDB.query(`UPDATE users SET refreshtoken = NULL WHERE username = $1`,[username]);
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function getRefreshToken(username: string){
    try{
        const refreshToken = await poolDB.query(`SELECT refreshtoken FROM users WHERE username = $1`, [username]);
        return refreshToken.rows[0].refreshtoken;
    }catch(err){
        console.log(err);
        throw err;
    }
}
export async function loginRepository(username:string){
    try{
        const user_password = await poolDB.query('SELECT * FROM users WHERE username = $1', [username]);
        return {
            rowCount: user_password.rowCount,
            rows: user_password.rows
        }
    }catch(err){
        console.log(err);
        throw err;
    }
}
