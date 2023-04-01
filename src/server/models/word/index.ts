import Database from '../../services/db';
import { GET_WORD, UPDATE_WORD_TO_USED,UPDATE_WORD } from './stmt';
import { Word } from '../../types/word';
class WordModel{
    private db:Database;
    constructor(){
        this.db = Database.getInstance();
    }

    async findOne(status:string ): Promise<Word>{
        const result = await this.db.query(GET_WORD, [status]);
        return result.rows[0];
    }

    async updateAllToUsed(): Promise<any[]>{
        const result = await this.db.query(UPDATE_WORD_TO_USED);
        return result.rows[0];
    }

    async update(status:string, wordId:string): Promise<any[]>{
        const result = await this.db.query(UPDATE_WORD, [status, wordId]);
        return result.rows[0];
    }
}

export default WordModel;