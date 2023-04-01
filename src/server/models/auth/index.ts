import Database from '../../services/db';
import { Auth } from '../../types/auth';
import { findByEmail, createUser } from './stmt';
class AuthModel{
    private db:Database;
    constructor(){
        this.db = Database.getInstance();
    }

    async getUserByEmail(email: string): Promise<Auth>{
        const result = await this.db.query(findByEmail, [email]);
        return result.rows[0];
    }

    async create(email:string, pass:string): Promise<string>{       
        const result = await this.db.query(
            createUser,
            [email, pass]
        );
        return result.rows[0].id;
    }   
}

export default AuthModel;