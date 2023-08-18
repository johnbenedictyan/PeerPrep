import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Chat Service Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Chat Service is running at http://localhost:${port}`);
});