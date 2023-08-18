import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Video Call Service Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Video Call Service is running at http://localhost:${port}`);
});