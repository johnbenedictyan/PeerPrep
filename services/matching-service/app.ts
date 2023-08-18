import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Matching Service Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Matching Service is running at http://localhost:${port}`);
});