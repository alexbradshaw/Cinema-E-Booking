import 'dotenv/config';
import { Admin } from './models/index.js';

import express, { Express, Request, Response } from 'express';
const app: Express = express();

import session, { Store } from 'express-session';

declare module 'express-session' {
  interface SessionData {
      jwt: string;
      userId: number;
      username: string;
      email: string;
      isAdmin: boolean;
      active: boolean;
      remember: boolean;

      permissions : Admin;
  }
}

import sequelizeSession from 'connect-session-sequelize';
const SequelizeStore = sequelizeSession(Store);

import router from './routes/index.js';
import sequelize from './config/connection.js';
const PORT: string | number = process.env.PORT || 3001;
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const store = new SequelizeStore({
    db: sequelize
});

store.on('error', function(error: Error) {
    console.error(error);
});

app.use(session({
    secret: process.env.SECRET || "secret",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      sameSite: 'strict'  
    },
    store: store,
    resave: false,
    saveUninitialized: false,
}));
  
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(router); 

if (process.env.NODE_ENV == 'production' || true) {
  app.use(express.static(path.join(__dirname, '../../client/dist'))); 

  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
  });
}

try {
  sequelize.sync();
  app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
} catch (e) {
  console.error(e);
}