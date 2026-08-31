
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