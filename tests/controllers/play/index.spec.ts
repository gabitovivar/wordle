import { Request, Response } from 'express';
import request from 'supertest'
import WordModel from '../../../src/server/models/word';
import AttemptsModel from '../../../src/server/models/attempts';
import { LetterResponse } from '../../../src/server/types/play';
import PlayModel from '../../../src/server/models/play';
import { Attempts } from '../../../src/server//types/attempts';
import { Play } from '../../../src/server//types/play';
import { listenerCount } from 'process';
import { play, getStatistics, getBetterPlayer } from '../../../src/server/controllers/play';


const wordInstance = new WordModel();
const attemptInstance = new AttemptsModel();
const playInstance = new PlayModel();

describe('play function', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    jest.resetAllMocks();
    req = {} as Request;
    res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
  });

  it('should return a 500 status code when an error occurs', async () => {
    const error = new Error('Server error');
    jest.spyOn(attemptInstance, 'findByUserId').mockRejectedValue(error);

    await play(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({ message: 'Server error' });
  });

  it('should return a 400 status code when attempts are greater than or equal to 5', async () => {
    jest.spyOn(attemptInstance, 'findByUserId').mockResolvedValue({ attempt: 5 });
    req.body = { user_word: 'TEST', auth: { userId: '1' } };
    await play(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ message: 'se te acabaron los intentos', response: [] });
  });

//   it('should return a success message when the word is guessed correctly', async () => {
//     jest.spyOn(attemptInstance, 'findByUserId').mockResolvedValue({attempt: 0});
//     jest.spyOn(playInstance, 'findByUserId').mockResolvedValue({ playes: 0, wins: 0, user_id:'1' });
//     jest.spyOn(wordInstance, 'findOne').mockResolvedValue({ word: 'TEST', id:'1', status:'ACTIVE' });
//     req.body = { user_word: 'TEST', auth: { userId: '1' } };

//     await play(req, res);

//     expect(res.send).toHaveBeenCalledWith({ message: 'Adivinaste la palabra', response: [] });
//   });

//   it('should return a failure message when the word is guessed incorrectly', async () => {
//     jest.spyOn(attemptInstance, 'findByUserId').mockResolvedValue({ attempt: 0 });
//     jest.spyOn(playInstance, 'findByUserId').mockResolvedValue({ user_id:'1', playes: 0, wins: 0 });
//     jest.spyOn(wordInstance, 'findOne').mockResolvedValue({ word: 'TEST', id:'1', status:'ACTIVE' });
//     req.body = { user_word: 'FAIL', auth: { userId: '1' } };

//     await play(req, res);

//     expect(res.status).toHaveBeenCalledWith(400);
//     expect(res.send).toHaveBeenCalledWith({ message: 'No adivinaste la palabra, sigue intentando', response: [{ letter: 'F', value: 3 }, { letter: 'A', value: 2 }, { letter: 'I', value: 3 }, { letter: 'L', value: 3 }] });
//   });
});