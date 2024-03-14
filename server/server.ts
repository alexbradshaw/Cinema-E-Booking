import 'dotenv/config';
import { Admin } from './models';

import express, { Express } from 'express';
const app: Express = express();

import session, { Store } from 'express-session';

declare module 'express-session' {
  interface SessionData {
      jwt: string;
      userId: number;
      username: string;
      isAdmin: boolean;

      permissions : Admin
  }
}

import sequelizeSession from 'connect-session-sequelize';
const SequelizeStore = sequelizeSession(Store);

import router from './routes';
import sequelize from './config/connection';
const PORT: string | number = process.env.PORT || 3001;
import path from 'path';

const store = new SequelizeStore({
    db: sequelize
});

store.on('error', function(error: Error) {
    console.error(error);
});

app.use(session({
    secret: process.env.SECRET || "secret",
    cookie: {
      maxAge: 1000 * 60 * 60 * 4,
      sameSite: 'strict'  
    },
    store: store,
    resave: false,
    saveUninitialized: false,
}));
  
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(router); 

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../client/dist'))); 

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
  });
}

try {
  sequelize.sync();
  app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
} catch (e) {
  console.error(e);
}