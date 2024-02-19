import 'dotenv/config';

import express, { Express } from 'express';
const app: Express = express();

import session, { Store } from 'express-session';
import sequelizeSession from 'connect-session-sequelize';
const SequelizeStore = sequelizeSession(Store);

import router from './routes';
import sequelize from './config/connection';
const PORT: string | number = process.env.PORT || 3001;
import path from 'path';

const store = new SequelizeStore({
    db: sequelize,
    extendDefaultFields: () => {
      return { 
        jwt: ''
      }
    }
});

store.on('error', function(error: Error) {
    console.error(error);
});

app.use(session({
    secret: process.env.SECRET || "secret",
    cookie: {
      maxAge: 1000 * 60 * 60 * 4
    },
    store: store,
    resave: false,
    saveUninitialized: false
}));
  
app.use(express.json()); // Middleware to parse incoming body as JSON, sets up req.body
app.use(express.urlencoded({ extended: true })); // Good for parsing HTML forms for POST requests
app.use(router); // Tell server to use our routes

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist'))); // Setting up public folder

  app.get('*', (req, res) => { // Route grabs any requests that aren't handled by API and sends html file
    res.sendFile(path.join(__dirname, '../client/dist/index.html')); // Sending over final built html file, which should embody our entire webpage
  });
}

try {
  sequelize.sync();
  app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
} catch (e) {
  console.error(e);
}