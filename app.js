import conection_db from "./database/conectionDB.js";
import bookModel from "./models/bookModel.js";
import express from 'express';
import bookRouter from "./routers/routers.js";
import cors from 'cors';

export const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use('/books', bookRouter);

try {
    await conection_db.authenticate();
    console.log('Connection has been established successfully🚀');
    
    await bookModel.sync({ alter: true });
    console.log('The table for the book model was just (re)created!✨');

  } catch (error) {
    console.error('Unable to connect to the database😢:', error);
  }

  export const server = app.listen(4000, () => {
    console.log('Server working at http://localhost:4000')
  })
  