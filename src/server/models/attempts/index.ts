import Database from '../../services/db';
import { GET_ATTEMPTS_BY_USERID, UPDATE_ATTEMPT_BY_USER,RESET_ATTEMPTS, CREATE_ATTEMPTS } from './stmt';
import { Attempts } from '../../types/attempts';
class AttemptsModel{
    private db:Database;
    constructor(){
        this.db = Database.getInstance();
    }

    async findByUserId(userId:string ): Promise<Attempts>{
        const result = await this.db.query(GET_ATTEMPTS_BY_USERID, [userId]);
        return result.rows[0];
    }

    async update(attempt:number, userId:string): Promise<any[]>{
        const result = await this.db.query(UPDATE_ATTEMPT_BY_USER, [ attempt, userId]);
        return result.rows[0];
    }

    async create(attempt:number, userId:string): Promise<any[]>{
        const result = await this.db.query(CREATE_ATTEMPTS, [userId, attempt]);
        return result.rows[0];
    }

    async resetAll(): Promise<any[]>{
        const result = await this.db.query(RESET_ATTEMPTS);
        return result.rows[0];
    }
}

export default AttemptsModel;