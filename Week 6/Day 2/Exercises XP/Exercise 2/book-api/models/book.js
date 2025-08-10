import db from '../config/db.js'

const Books = {
  async toCreateBooks({title, author, published_year}){
    const query = `INSERT INTO books (title, author, published_year) VALUES($1, $2, $3)`;
    const values = [title, author, published_year];
    const result = await db.query(query, values);
    return result.rows[0]
  },

  async toGetAllBooks(){
    const query = `SELECT * FROM books ORDER BY created_at ASC`
    const result = await db.query(query);
    return result.rows;
  },

  async toGetBookById(id){
    const query = `SELECT * FROM books WHERE id = $1`;
    const result = await db.query(query, [id]);
    return result.rows[0];
  },

  async toUpdateBook({id, title, author, published_year }){
    const query = `UPDATE books 
                SET title = COALESCE($2, title),
                    author = COALESCE($3, author),
                    published_year = COALESCE($4, published_year)
                WHERE id = $1
                RETURNING *`;
    
    const values = [id, title, author, published_year];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  async toDeleteBook(id){
    const query = `DELETE FROM books WHERE id = $1 RETURNING *`;
    const result = await db.query(query, [id]);
    return result.rows[0];
  }
}

export default Books;