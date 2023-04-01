import { Application } from 'express';
import  { login, register}  from '../controllers/auth';
import { authCheck } from '../middleware/auth';
import { play,getStatistics,getBetterPlayers } from '../controllers/play';

const routes = (app: Application) => {
    //Auth
    app.post('/api/login', login);
    app.post('/api/register', register);

    //Play
    app.post('/api/play', authCheck, play);
    app.get('/api/statistics/:userId', authCheck, getStatistics);
    app.get('/api/better-players', authCheck, getBetterPlayers);
};

export default routes;