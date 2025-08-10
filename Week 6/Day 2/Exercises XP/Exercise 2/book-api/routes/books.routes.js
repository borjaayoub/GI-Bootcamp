import express from "express";
import {
  createBook,
  getAllbooks,
  getBookById,
} from "../controllers/books.controller.js";

const router = express.Router();

router.post("/", createBook);
router.get("/", getAllbooks);
router.get("/:id", getBookById);

export default router;
