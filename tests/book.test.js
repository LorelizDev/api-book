import request from 'supertest';
import { app, server } from '../app.js';
import conection_db from '../database/conectionDB.js';
import bookModel from '../models/bookModel.js';

describe('CRUD books', () => {
  test('should return a response with status 200 and type json', async () => {
    const response = await request(app).get('/books');
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toContain('application/json');
  });

  test('should create a book', async () => {
    const bookData = {
      title: 'Test Book',
      author: 'Test Author',
      description: 'This is a test Description',
    };
    const response = await request(app).post('/books').send(bookData);
    
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe(bookData.title);
    expect(response.body.author).toBe(bookData.author);
    expect(response.body.description).toBe(bookData.description);
  });

  test('should delete a book', async () => {
    const book = await bookModel.create({
      title: 'Test Book',
      author: 'Test Author',
      description: 'This is a delete test',
    });

    const response = await request(app).delete(`/books/${book.id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Book deleted successfully');
  });

  afterEach(async () => {
    await bookModel.destroy({ where: {
      title: 'Test Book'
    } });
  });

  afterAll(() => {
      server.close();
      conection_db.close();
  });
}); 