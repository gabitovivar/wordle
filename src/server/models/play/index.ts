import Database from '../../services/db';
import { GET_PLAYS, UPDATE_PLAY,CREATE_PLAY,FIND_BETTER_PLAYERS } from './stmt';
import { Play } from '../../types/play';
class PlayModel{
    private db:Database;
    constructor(){
        this.db = Database.getInstance();
    }

    async findByUserId(userId:string ): Promise<Play>{
        const result = await this.db.query(GET_PLAYS, [userId]);
        return result.rows[0];
    }

    async update(userId:string, wins:number, playes:number): Promise<any[]>{
        const result = await this.db.query(UPDATE_PLAY, [wins, playes, userId,]);
        return result.rows[0];
    }

    async create(wins:number, playes:number,userId:string): Promise<any[]>{
        const result = await this.db.query(CREATE_PLAY, [userId, playes,wins]);
        return result.rows[0];
    }

    

    async findBetterPlayers(): Promise<Play[]>{
        const result = await this.db.query(FIND_BETTER_PLAYERS);
        return result.rows;
    }

    
}

export default PlayModel;