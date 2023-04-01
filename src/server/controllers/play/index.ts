import { Request, Response } from 'express';
import WordModel from '../../models/word';
import AttemptsModel from '../../models/attempts';
import { LetterResponse } from '../../types/play';
import PlayModel from '../../models/play';
import { Attempts } from '../../types/attempts';
import { Play } from '../../types/play';

const wordInstance = new WordModel();
const attemptInstance = new AttemptsModel();
const playInstance = new PlayModel();

export const play = async (req: Request, res: Response) => {
    try{
        const ACTIVE = 'ACTIVE';
        const { user_word, auth } = req.body;
        
        const attempts = await attemptInstance.findByUserId(auth.userId);
        const playes = await playInstance.findByUserId(auth.userId);
        if(attempts && attempts.attempt >= 5){
            res.status(400).send({message:'se te acabaron los intentos'});
            return;
        }

        const word = await wordInstance.findOne(ACTIVE);
        const response = compareWords( word.word.toUpperCase(),user_word.toUpperCase());

        if(response.length === 0){
            console.log('Adivistate la palabra');
            await registerGame(playes,auth.userId,1);
            return res.send({message:'Adivinaste la palabra', response});
        }else{
            console.log('Sigue intentando');
            await registerAttempt(attempts,auth.userId);
            await registerGame(playes,auth.userId,0);
            
            return res.status(400).send({message:'No adivinaste la palabra, sigue intentando', response});
        }
        
    }catch(err){
        console.log(err);
        res.status(500).send({ message: 'Server error' });
    }
};


const registerAttempt = async (attempts:Attempts, userId:string) =>{
    console.log('create or udarte attempt with', userId);
    if(attempts){
        const attempt = attempts.attempt + 1;
        await attemptInstance.update(attempt, userId);
        return;
    }
    await attemptInstance.create(1, userId);
    return;
};

const registerGame = async (playes:Play, userId:string, win: number) =>{
    console.log('create or udarte playes with', userId);
    if(playes){
        const games = playes.playes + 1;
        const wins = playes.wins + win;
        await playInstance.update(userId, wins, games);
        return;
    }
    await playInstance.create(win, 1, userId);
    return;
};



const compareWords = (palabraSeleccionada: string, palabraUsuario: string) => {
    const result: LetterResponse[] = [];
    if (palabraSeleccionada === palabraUsuario) {
        return result;
    }
    for (let i = 0; i < palabraUsuario.length; i++) {
      if (palabraUsuario[i] === palabraSeleccionada[i]) {
        result.push({
            letter: palabraUsuario[i],
            value: 1
        });
      } else if (palabraSeleccionada.includes(palabraUsuario[i])) {
        result.push({
            letter: palabraUsuario[i],
            value: 2
        });
      } else {
        result.push({
            letter: palabraUsuario[i],
            value: 3
        });
      }
    }
    return result;    
  };

  export const getStatistics = async (req: Request, res: Response) => {
    //
    try{
        const { userId } = req.params;
        const statistics = await playInstance.findByUserId(userId);
        res.send({data:statistics});
    }catch(err){
        res.status(500).send({ message: 'Server error' });
    }
  }

  export const getBetterPlayers = async (req: Request, res: Response) => {
    try{
        const betterPlayers = await playInstance.findBetterPlayers();
        res.send({data:betterPlayers});
    }catch(err){
        res.status(500).send({ message: 'Server error' });
    }
  }

  
  
  
  
  
  