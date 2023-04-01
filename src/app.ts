import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { cronjob } from './server/services/cron'
dotenv.config();
import routes from './server/routes';
import Database from './server/services/db';
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
Database.getInstance();
routes(app);
app.get('/', (req, res) => {
  res.send('Hello World!');
});
cronjob()


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

export default app;