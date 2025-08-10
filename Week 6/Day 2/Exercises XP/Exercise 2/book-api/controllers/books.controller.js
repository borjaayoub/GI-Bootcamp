import Books from "../models/book.js";

export const createBook = async (req, res) => {
  try {
    const { title, author, published_year } = req.body;
    if (!title || !author || !published_year) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const book = await Books.toCreateBooks({ title, author, published_year });

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      errors: error.message,
    });
  }
};

export const getAllbooks = async (req, res) => {
  try {
    const books = await Books.toGetAllBooks();

    if (!books || books.length === 0) {
      return res.status(404).json("No books found");
    }

    res.json({
      success: true,
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      errors: error.message,
    });
  }
};

export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Book ID is required",
      });
    }

    const book = await Books.toGetBookById(id);

    if (!book) {
      return res.status(400).json({
        success: false,
        errors: "Book not found",
      });
    }

    res.json({
      success: true,
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      errors: error.message,
    });
  }
};